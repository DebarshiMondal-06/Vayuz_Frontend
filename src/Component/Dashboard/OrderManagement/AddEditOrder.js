import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createContextOrder } from './OrderContext';
import { getBranchFromExecutive, getExecutiveFromManager } from '../UserManagement/Distributor/distributorapi';
import {
  addOrder, getCustomerFromDistributor,
  updateOrders, getAmountFromCylinder, getDistributorFromBranch, addDispatch
} from './orderapis';
import { authContext } from '../../../Context/authContext';
import { useCookies } from 'react-cookie';




const AddEditOrder = () => {
  const loc = useLocation();
  const history = useHistory();
  const [cookie] = useCookies();
  const { manager, editData,  stock } = useContext(createContextOrder);
  const { checkAdmin, token: { ID }, logout } = useContext(authContext);
  const [Executive, setExecutive] = useState([]);
  const [Distributor, setDistributor] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [Customer, setCustomer] = useState([]);
  if ((loc.pathname === '/order/edit' || loc.pathname === '/manager_order/edit') && !editData.editId) {
    window.location.href = checkAdmin() ? '/order' : '/manager_order';
  };

  var amt;
  const schema = yup.object().shape({
    distributor: yup.object().required(),
    branch: yup.object().required(),
    manager: yup.object().required(),
    executive: yup.object().required(),
    customer: yup.object().required(),
    cylinder_name: yup.object().required(),
    amount: yup.string().required('Amount Cannot be empty*'),
    order_id: yup.string().required(),
    location: yup.string().required(),
    filled_cylinders: yup.string().required('This field cannot be empty*'),
    empty_cylinders: yup.string().required('This field cannot be empty*'),
    vechile_no: (checkAdmin() && loc.pathname === '/order/add')
      ? yup.string().required('This Field is Required')
        .max(50).matches(/^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/, 'Not a valid Vechile number').trim() : null,
    driver_name: (checkAdmin() && loc.pathname === '/order/add')
      ? yup.string().max(200).trim().required() : null,
    comment: (checkAdmin()) ? yup.string().max(200) : null,
    discount: yup.string().max(200).notRequired().test('check', 'Discount cannot be greater than Original amount', (val) => {
      return val < (amt * 1);
    })
  });
  const { register, handleSubmit, setValue, errors, watch } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });

  amt = watch('amount');

  // ******************  Data Fetching *********************************************
  useEffect(() => {
    if (!editData.manager && !checkAdmin()) {
      console.log('hit');
      const obj = { label: cookie.authToken.name, value: cookie.authToken._id };
      setValue('manager', obj);
    }
    // eslint-disable-next-line
  }, [cookie]);

  const dataManager = watch('manager');
  useEffect(() => {
    if (dataManager && dataManager.value !== undefined) {
      if (Executive.length > 0) setValue('executive', undefined);
      getExecutiveFromManager({ manager: dataManager.value }, ID).then((ele) => {
        if (ele.data.result) {
          setExecutive(ele.data.result);
        }
      });
    } else {
      setValue('executive', undefined);
    }
    // eslint-disable-next-line
  }, [dataManager]);

  const dataExecutive = watch('executive');
  useEffect(() => {
    if (dataExecutive && dataExecutive.value !== undefined) {
      if (Branch.length > 0) setValue('branch', undefined);
      getBranchFromExecutive({ executive: dataExecutive.value }).then((ele) => {
        if (ele.data.result) {
          setBranch(ele.data.result);
        }
      });
    } else {
      setBranch([]);
      setValue('branch', undefined);
    }
    // eslint-disable-next-line
  }, [dataExecutive]);

  const dataBranch = watch('branch');
  useEffect(() => {
    if (dataBranch && dataBranch.value !== undefined) {
      if (Distributor.length > 0) setValue('distributor', undefined);
      getDistributorFromBranch(({ branchId: dataBranch.value })).then((el) => {
        if (el.data.result) {
          setDistributor(el.data.result);
        }
      });
    } else {
      setDistributor([]);
      setValue('distributor', undefined);
    }
    // eslint-disable-next-line
  }, [dataBranch]);

  const dataDistributor = watch('distributor');
  useEffect(() => {
    if (dataDistributor && dataDistributor.value !== undefined) {
      if (Customer.length > 0) setValue('customer', undefined);
      getCustomerFromDistributor(({ distributor_id: dataDistributor.value })).then((el) => {
        if (el.data.result) {
          setCustomer(el.data.result);
        }
      });
    } else {
      setCustomer([]);
      setValue('customer', undefined);
    }
    // eslint-disable-next-line
  }, [dataDistributor]);




  const customer = watch('customer');
  const dataCylinder = watch('cylinder_name');
  const quantity = watch('filled_cylinders');
  useEffect(() => {
    if (dataCylinder && dataCylinder.value !== undefined && customer) {
      const customer_id = customer && customer.value;
      getAmountFromCylinder({ cylinder_id: dataCylinder.value, customer_id }).then((el) => {
        if (el.data) {
          var { amount } = el.data;
          amount = amount * quantity;
          setValue('amount', amount.toFixed(2));
        }
      });
    } else {
      setValue('amount', undefined);
      setValue('cylinder_name', undefined);
    }
    // eslint-disable-next-line
  }, [dataCylinder, quantity, customer]);




  // *********** Order Creating and Updating ********************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleS = (data) => {
    const { manager, executive, branch, customer,
      distributor, cylinder_name, vechile_no, driver_name, comment, discount, amount } = data;
    btntextChnage('Processing...');
    const operation = (loc.pathname === '/order/add' || loc.pathname === '/manager_order/add') ? addOrder : updateOrders;
    const approval = checkAdmin()
      ? { admin_approval: 'Approved', }
      : { manager_approval: 'Approved', }
    operation({
      id: editData.editId,
      ...data,
      amount: checkAdmin() ? (discount) ? (amount - discount) : amount : amount,
      manager: manager.value,
      ...approval,
      executive: executive.value,
      branch: branch.value,
      customer: customer.value,
      distributor: distributor.value,
      cylinder_name: cylinder_name.value,
      createdBy: (checkAdmin() ? 'Admin' : 'Manager')
    }, ID).then(async (el) => {
      if (checkAdmin() && !editData.editId) {
        const { _id } = el.data.newOrder;
        await addDispatch({ forOrder: _id, vechile_no, driver_name, comment }, ID);
      }
      btntextChnage('Redirecting...');
      toast.success('Successfully Implemented');
      setTimeout(() => {
        checkAdmin()
          ? history.push('/order')
          : history.push('/manager_order');
      }, 2400);
    }).catch((err) => {
      btntextChnage('Try Again');
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message);
        logout();
      }
      else toast.error(err.response && err.response.data.message);
    });
  }



  // ********************* Fetching Values **************************
  const cylinderOptions = stock.map((ele) => {
    return { label: ele.cylinder_name, value: ele._id };
  });
  const managerOption = manager.map((ele) => {
    return { label: ele.name, value: ele._id };
  });
  const executiveOption = Executive.map((item) => {
    return { label: item.name, value: item._id };
  });
  const branchOption = Branch.map((item) => {
    return { label: item.branch, value: item._id };
  });
  const distributorOption = Distributor.map((item) => {
    return { label: item.company, value: item._id };
  });
  const customerOption = Customer.map((item) => {
    return { label: item.company_name, value: item._id };
  });



  const amountWatch = watch('amount');

  // ****************** Renders ***************************************
  return <form onSubmit={handleSubmit(handleS)}>
    <div className="form-row">
      <div className="col-md-6 mb-3">
        <label>OrderID</label>
        <input type="text" className="form-control" name='order_id' ref={register} />
        {errors.order_id && <p className="text-capitalize text-danger small p-1">{errors.order_id.message}</p>}
      </div>

      {
        (checkAdmin())
          ? <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select options={managerOption} />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
          : <div className="col-md-6 mb-3">
            <label>Sales Manager</label>
            <RHFInput as={<Select isDisabled placeholder='Search or Select' />}
              name="manager" setValue={setValue} register={register} />
            {errors.manager && <p className="text-danger small p-1">{errors.manager.message}</p>}
          </div>
      }


      <div className="col-md-6 mb-3">
        <label>Executive</label>
        <RHFInput
          as={<Select options={executiveOption} noOptionsMessage={() => 'Choose Manager'} />}
          name="executive" setValue={setValue} register={register} />
        {errors.executive && <p className="text-capitalize text-danger small p-1">{errors.executive.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Branch</label>
        <RHFInput
          as={<Select options={branchOption} noOptionsMessage={() => 'Choose Executive'} />}
          name="branch" setValue={setValue} register={register} />
        {errors.branch && <p className="text-capitalize text-danger small p-1">{errors.branch.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Distributor Company</label>
        <RHFInput
          as={<Select options={distributorOption} noOptionsMessage={() => 'Choose Branch'} />}
          name="distributor" setValue={setValue} register={register} />
        {errors.distributor && <p className="text-capitalize text-danger small p-1">{errors.distributor.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Customer Company</label>
        <RHFInput
          as={<Select options={customerOption} noOptionsMessage={() => 'Choose Distributor'} />}
          name="customer" setValue={setValue} register={register} />
        {errors.customer && <p className="text-capitalize text-danger small p-1">{errors.customer.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Cylinder Name</label>
        <RHFInput
          as={<Select options={cylinderOptions} />}
          name="cylinder_name" setValue={setValue} register={register} />
        {errors.cylinder_name && <p className="text-capitalize text-danger small p-1">{errors.cylinder_name.message}</p>}
      </div>


      <div className="col-md-6 mb-3">
        <label>Filled Cylinders</label>
        <input type="text" className="form-control" name='filled_cylinders' ref={register} />
        {errors.filled_cylinders && <p className="text-capitalize text-danger small p-1">{errors.filled_cylinders.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Empty Cylinders Returned</label>
        <input type="text" className="form-control" name='empty_cylinders' ref={register} />
        {errors.empty_cylinders && <p className="text-capitalize text-danger small p-1">{errors.empty_cylinders.message}</p>}
      </div>

      <div className='col-md-6'>
        <label>Amount (Including GST)</label>
        <div className="input-group">
          <input name='amount' placeholder='0.00' ref={register} type="text" readOnly class="form-control" aria-label="Amount" />
          <div className="input-group-append">
            <span className="input-group-text">/-</span>
          </div>
        </div>
        {errors.amount && !amountWatch.length > 0 && <p className="text-capitalize text-danger small p-1">{errors.amount.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label>Location</label>
        <input type="text" className="form-control" name='location' ref={register} />
        {errors.location && <p className="text-capitalize text-danger small p-1">{errors.location.message}</p>}
      </div>
      <div className="col-md-6 mb-3">
        <label>Discount</label>
        <input type="number" className="form-control" name='discount' ref={register} />
        {errors.discount && <p className="text-capitalize text-danger small p-1">{errors.discount.message}</p>}
      </div>

      {
        (checkAdmin() && !editData.editId)
          ? <>
            <div className="col-md-12 mb-1"><h5><b>Delivery Detials:</b></h5></div>
            <div className="col-md-6 mb-3">
              <label>Vechile No:</label>
              <input type="text" className="form-control" name='vechile_no' ref={register} />
              {errors.vechile_no && <p className="text-capitalize text-danger small p-1">{errors.vechile_no.message}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Driver Name</label>
              <input type="text" className="form-control" name='driver_name' ref={register} />
              {errors.driver_name && <p className="text-capitalize text-danger small p-1">{errors.driver_name.message}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <label>Comment</label>
              <input type="text" className="form-control" name='comment' ref={register} />
              {errors.comment && <p className="text-capitalize text-danger small p-1">{errors.comment.message}</p>}
            </div>
          </>
          : null
      }

      <div className="col-md-12 text-right">
        <Link to={`${checkAdmin() ? '/order' : '/manager_order'}`}>
          <button className="btn btn-dark">Cancel</button>
        </Link> &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
          {(loc.pathname === '/order/add' || loc.pathname === '/manager_order/add') ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  </form>
}

export default AddEditOrder;
