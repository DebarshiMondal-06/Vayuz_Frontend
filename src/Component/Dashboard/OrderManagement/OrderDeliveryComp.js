import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { check_OTP } from './orderapis';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/authContext';



const OrderDeliveryComp = ({ payment_stat }) => {
  const history = useHistory();
  const { checkAdmin, logout, token: { ID } } = useContext(authContext);
  const [payment, setPayment] = useState({
    payment_mode: '',
    payment_status: ''
  });
  const [transcation, SetTranscation] = useState('');
  const { payment_mode, payment_status } = payment;





  const schema = yup.object().shape({
    actual_cylinders_return: yup
      .string()
      .required('This Field is Required').max(50).trim(),
    otp: yup
      .string()
      .required('This Field is Required').matches(/^[0-9]*$/, 'Not a Valid OTP')
      .max(6, 'Otp must be 6 char long').min(6, 'Not a Valid OTP'),
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });


  useEffect(() => {
    if (payment_stat === 'Paid') {
      setPayment({ payment_status: 'Paid', payment_mode: 'Online' });
    } else {
      setPayment({ payment_status: '', payment_mode: '' });
    }
  }, [payment_stat])




  const buttonOptions = {
    Paid: { text: 'Paid', className: 'bg-success' },
    Credit: { text: 'Credit' },
  };
  const modeOptions = {
    Online: { text: 'Online', className: 'bg-warning' },
    Cash: { text: 'Cash' },
  };
  const handlePayment = (payment_status, payment_mode) => {
    if (payment_status) {
      setPayment({ payment_mode, payment_status });
    }
  }


  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleOTP = (data) => {
    if (payment_status && payment_mode) {
      const { payment_status, payment_mode } = payment;
      btntextChnage('Processing...');
      const { otp, actual_cylinders_return, } = data;
      check_OTP({
        otp, actual_cylinders_return, payment_mode, payment_status, transcation
      }, ID).then(() => {
        btntextChnage('Redirecting...');
        toast.success('Order Successfully Delivered!');
        setTimeout(() => {
          checkAdmin()
            ? history.push('/order')
            : history.push('/manager_order');
        }, 2000);
      }).catch((err) => {
        btntextChnage('Try Again');
        if (err.response && err.response.status === 401) {
          toast.error(err.response.data.message);
          logout();
        }
        else toast.error(err.response && err.response.data.message);
      });
    } else {
      toast.warn('Complete the Payment Process!');
    }
  }



  return <form onSubmit={handleSubmit(handleOTP)}
    className="col-md-12" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <div class="col-md-6">
      <section style={{ marginLeft: -10 }}>
        <label>Actual Empty Cylinders Return</label>
        <input className="form-control" name="actual_cylinders_return" ref={register} type="text" />
        {errors.actual_cylinders_return && <p className="text-danger small p-1">This Field is Required</p>}
        <section>
          {
            payment_stat !== 'Paid' ? <> <div className="btn btn-success mt-2 mb-4" onClick={() => {
              swal({
                title: 'Change Payment Status',
                icon: 'info',
                buttons: { ...buttonOptions }
              }).then((val) => {
                if (val === 'Paid') {
                  swal({
                    title: 'Choose Payment Mode',
                    icon: 'info',
                    buttons: { ...modeOptions },
                    closeOnClickOutside: false
                  }).then((val) => {
                    if (val === 'Cash') handlePayment('Paid', 'Cash')
                    if (val === 'Online') {
                      Swal.fire({
                        title: "Enter the Transcations ID",
                        input: 'text',
                        inputPlaceholder: 'Type Here',
                        showCancelButton: true,
                        allowOutsideClick: false,
                        preConfirm: (value) => {
                          if (!value) {
                            Swal.showValidationMessage(
                              'Trasncation ID  Required'
                            );
                          }
                        }
                      }).then((result) => {
                        if (result.value) {
                          SetTranscation(result.value);
                          handlePayment('Paid', 'Online')
                        }
                      });
                    }
                  })
                }
                if (val === 'Credit') handlePayment('Credit', 'None');
              })
            }}>
              Choose Payment
            </div>
              <section>{payment_status
                ? <span><b>Selected Payment: </b>
                  {payment_status} {(payment_mode !== 'None') ? ',' + payment_mode : null}
                </span>
                : null}
              </section>
            </>
              : null
          }
        </section>
      </section>
    </div>
    <div class="col-md-6">
      <label>Enter the OTP</label>
      <input name="otp" ref={register} className="form-control" type="text" />
      {errors.otp && <p className="text-danger small p-1">{errors.otp.message}</p>}
      <button style={{ float: 'right' }} type="submit" id="addbtn"
        className="btn btn-secondary mt-2">Proceed
      </button>
    </div>
  </form>
}

export default OrderDeliveryComp;
