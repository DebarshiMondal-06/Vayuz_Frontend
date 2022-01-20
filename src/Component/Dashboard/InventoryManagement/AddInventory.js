import React, { useContext, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { addInventory, updateInventory } from './inventroyapi'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { createContextInventory } from './InventoryContext';
import { authContext } from '../../../Context/authContext';
import { RHFInput } from 'react-hook-form-input';
import Select from "react-select";




const AddEditInventory = () => {
    const loc = useLocation();
    const history = useHistory();
    const { getInventory, stock, editData } = useContext(createContextInventory);
    const { checkAdmin } = useContext(authContext);



    // ******************** Schema Validaitons ******************************
    const schema = yup.object().shape({
        cylinder_type: yup.object().required(),
        filledOpeningStock: yup
            .string().required('Filled Opening Stock Required*').max(200).trim(),
        filledAvailableStock: yup
            .string().required('Filled Available Stock Required*').max(200).trim(),
        filledClosingStock: yup
            .string().max(200).trim(),
        emptyOpeningStock: yup
            .string().required('Empty Opening Stock Required*').max(200).trim(),
        emptyAvailableStock: yup
            .string().required('Empty Available Stock Required*').max(200).trim(),
        emptyClosingStock: yup
            .string().max(200).trim(),
        dispatchQty: yup.string().required(),
        receiptQty: yup.string().required()

    });
    const { register, handleSubmit, errors, watch, setValue } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
        defaultValues: {
            ...editData,
            cylinder_type: {
                label: editData.cylinder_type ? editData.cylinder_type.cylinder_name : '',
                value: editData.cylinder_type ? editData.cylinder_type._id : ''
            },
        }
    });


    console.log(editData);

    const filledStock = watch('filledOpeningStock');
    const filledAvailStock = watch('filledAvailableStock');
    useEffect(() => {
        if (filledStock) {
            setValue('filledAvailableStock', filledStock);
            setValue('dispatchQty', filledStock - filledAvailStock);
        }
        // eslint-disable-next-line 
    }, [filledStock]);

    const filledAvailSk = watch('filledAvailableStock');
    useEffect(() => {
        if (filledStock) {
            setValue('dispatchQty', filledStock - filledAvailSk);
        }
        // eslint-disable-next-line 
    }, [filledAvailSk]);

    const emptyOpening = watch('emptyOpeningStock');
    const emptyAvailStock = watch('emptyAvailableStock');
    useEffect(() => {
        if (emptyOpening) {
            setValue('emptyAvailableStock', emptyOpening);
            setValue('receiptQty', emptyOpening - emptyAvailStock);
        }
        // eslint-disable-next-line 
    }, [emptyOpening]);

    const emptyAvailSk = watch('emptyAvailableStock');
    useEffect(() => {
        if (emptyOpening) {
            setValue('receiptQty', emptyOpening - emptyAvailSk);
        }
        // eslint-disable-next-line 
    }, [emptyAvailSk]);







    // *********** Order Creating and Updating ********************
    const btntextChnage = (val) => {
        document.getElementById('addbtn').textContent = val;
    }
    const submitHandler = (data) => {
        btntextChnage('Processing...');
        const operation = (loc.pathname === '/inventory/add' || loc.pathname === '/manager_inventory/add')
            ? addInventory : updateInventory;
        operation({
            id: editData.editId || null,
            ...data,
            cylinder_type: data.cylinder_type.value,
        }).then(() => {
            btntextChnage('Redirecting...');
            getInventory();
            toast.success('Successfully Implemented');
            setTimeout(() => {
                checkAdmin()
                    ? history.push('/inventory')
                    : history.push('/manager_inventory');
            }, 2000);
        }).catch((err) => {
            btntextChnage('Try Again');
            if (err && err.response) {
                toast.error(err.response.data.message);
            }
            else toast.error(`Something went Wrong!`);
        });
    }


    const cylinderOptions = stock.map((ele) => {
        return { label: ele.cylinder_name, value: ele._id };
    });


    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-row">
                <div className="col-md-6 mb-3">
                    <label>Cylinder Name</label>
                    <RHFInput
                        as={<Select options={cylinderOptions} />}
                        name="cylinder_type" setValue={setValue} register={register} />
                    {errors.cylinder_type && <p className="text-capitalize text-danger small p-1">{errors.cylinder_type.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Filled opening Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        name='filledOpeningStock'
                        ref={register}
                    />
                    {errors.filledOpeningStock && <p className="text-capitalize text-danger small p-1">{errors.filledOpeningStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Filled available Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        name='filledAvailableStock'
                        ref={register}
                    />
                    {errors.filledAvailableStock && <p className="text-capitalize text-danger small p-1">{errors.filledAvailableStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Empty opening Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        name='emptyOpeningStock'
                        ref={register}
                    />
                    {errors.emptyOpeningStock && <p className="text-capitalize text-danger small p-1">{errors.emptyOpeningStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Empty available Stock</label>
                    <input type="number" className="form-control" name='emptyAvailableStock' ref={register} />
                    {errors.emptyAvailableStock && <p className="text-capitalize text-danger small p-1">{errors.emptyAvailableStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Filled closing Stock</label>
                    <input type="number" className="form-control" name='filledClosingStock' ref={register} />
                    {errors.filledClosingStock && <p className="text-capitalize text-danger small p-1">{errors.filledClosingStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Empty closing Stock</label>
                    <input type="number" className="form-control" name='emptyClosingStock' ref={register} />
                    {errors.emptyClosingStock && <p className="text-capitalize text-danger small p-1">{errors.emptyClosingStock.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Dispatch Quantity</label>
                    <input type="number" className="form-control" readOnly name='dispatchQty' ref={register}
                    />
                    {errors.dispatchQty && <p className="text-capitalize text-danger small p-1">{errors.dispatchQty.message}</p>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Receipt Quantity</label>
                    <input type="number" className="form-control" readOnly name='receiptQty' ref={register} />
                    {errors.receiptQty && <p className="text-capitalize text-danger small p-1">{errors.receiptQty.message}</p>}
                </div>
            </div>
            <div className="col-md-12 text-right">
                <Link to={`${checkAdmin() ? '/inventory' : '/manager_inventory'}`}>
                    <button className="btn btn-dark">Cancel</button>
                </Link> &nbsp;
                <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
                    {(loc.pathname === '/inventory/add' || loc.pathname === '/manager_inventory/add') ? 'Add' : 'Update'}
                </button>
            </div>
        </form>
    )
}

export default AddEditInventory;
