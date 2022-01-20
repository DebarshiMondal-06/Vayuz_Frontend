import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock } from '@material-ui/icons';
import { forgotPass, otpVerify } from './forgotapis';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';

const Forgot = () => {
  const history = useHistory();
  const [sent, setSent] = useState(false);
  const [cookie, setCookie] = useCookies();



  // ***************** Cookie expires in 10min ***********************
  useEffect(() => {
    if (cookie.forgotPass) {
      setSent(true);
    } else {
      setSent(false);
    }
    // eslint-disable-next-line
  }, []);


  // ****************** handle Valiaditon ************************
  const schema = yup.object().shape({
    email: (!sent) ? yup
      .string()
      .email()
      .required() : '',
    otp: (sent) ? yup.string().required() : ''
  });
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });


  // **************** Submitting ********************************
  const email = watch('email');
  const handleClick = () => {
    document.getElementById('forgot-button').textContent = 'Processing...';
    forgotPass({ email }).then(() => {
      setCookie('forgotPass', 'token-sent-for-forgotpassword', {
        maxAge: 600
      });
      toast.success('Successfully Sent');
      document.getElementById('forgot-button').textContent = 'Redirecting...';
      setSent(true);
    }).catch((err) => {
      document.getElementById('forgot-button').textContent = 'Try Again';
      if (err.response) toast.error(err.response.data.message);
      else toast.error('Something went wrong');
    });
  }


  const otp = watch('otp');
  const handleOTP = () => {
    console.log(otp);
    otpVerify({ otp }).then((el) => {
      console.log(el);
      const { value } = el.data;
      setCookie('opt1_for', value, {
        path: '/'
      });
      history.push('/resetPassword');
    }).catch((err) => toast.error(err.response.data.message));
  }



  // ***************** Renders *******************************
  return <div className='container' style={{ marginTop: '8rem' }}>
    <ToastContainer position='top-right' autoClose={2500} />
    <section className='card sign-container'>
      <div className='text-center mt-4 mb-4'>
        <Lock style={{ fontSize: 70 }} />
      </div>
      {
        !sent ? <form onSubmit={handleSubmit(handleClick)}>
          <div className='input-1 mb-4'>
            <label htmlFor="" className='ml-2'>Username</label>
            <input
              type="text"
              name="email"
              className='form-control'
              placeholder='Type your registered email'
              ref={register}
            />
            {errors.email && <p className="text-danger small p-1">{errors.email.message}</p>}
          </div>
          <div className='button-sigin text-center'>
            <button
              type='submit'
              id="forgot-button"
              className={`btn-secondary button shadow`}>
              Procced
            </button>
          </div>
        </form> : <form className='text-center' onSubmit={handleSubmit(handleOTP)}>
          <p className='mb-5'>,
            Check your mail box for OTP.
          </p>
          <div className='input-1 mb-4'>
            <label htmlFor="" className='ml-2'> OTP </label>
            <input
              type="text"
              name="otp"
              className='form-control'
              placeholder='Enter OTP'
              ref={register}
            />
            {errors.otp && <p className="text-danger small p-1">{errors.otp.message}</p>}
          </div>
          <div className='button-sigin text-center'>
            <button
              type='submit'
              id="forgot-button"
              className={`btn-secondary button shadow`}>
              Procced
            </button>
          </div>
        </form>
      }
    </section>
  </div>
}

export default Forgot;
