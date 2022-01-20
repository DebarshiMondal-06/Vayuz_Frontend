import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock } from '@material-ui/icons';
import { resetPass } from './forgotapis';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router';



const Reset = () => {
  const [cookie] = useCookies();
  const history = useHistory();

  useEffect(() => {
    if (!cookie.opt1_for) {
      history.push('/manager/signin')
    }
    // eslint-disable-next-line
  }, [cookie]);


  const schema = yup.object().shape({
    password: yup
      .string()
      .required().min(6, 'Password must contain atleast 6 char long'),
    confirmPassword: yup.string().required()
  });
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });



  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const handleReset = () => {
    document.getElementById('reset-button').textContent = 'Processing...';
    const { opt1_for } = cookie;
    resetPass({ password: password, email: opt1_for, confirmPassword: confirmPassword }).then((el) => {
      // setCookie('passwordChanged', 'password-changed-successfully', {
      //   maxAge: 1800,
      // });
      document.getElementById('reset-button').textContent = 'Redirecting...';
      toast.success('Password Reset Successfully!');
      setTimeout(() => {
        window.location.href = '/manager/signin'
      }, 2000)
    }).catch((err) => {
      document.getElementById('reset-button').textContent = 'Try Again';
      if (err.response) toast.error(err.response.data.message);
      else toast.error('Something went Wrong!!!');
    })
  }





  return <div>
    <div className='container' style={{ marginTop: '8rem' }}>
      <ToastContainer position='top-right' autoClose={2000} />
      <section className='card sign-container'>
        <div className='text-center mt-4 mb-4'>
          <Lock style={{ fontSize: 70 }} />
        </div>
        <form onSubmit={handleSubmit(handleReset)}>
          <div className='input-1 mb-4'>
            <label htmlFor="" className='ml-2'>Password</label>
            <input
              type="text"
              name="password"
              className='form-control'
              ref={register}
            />
            {errors.password && <p className="text-danger small p-1">{errors.password.message}</p>}
          </div>
          <div className='input-1 mb-4'>
            <label htmlFor="" className='ml-2'>Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              className='form-control'
              ref={register}
            />
            {errors.confirmPassword && <p className="text-danger small p-1">{errors.confirmPassword.message}</p>}
          </div>
          <div className='button-sigin text-center'>
            <button
              id='reset-button'
              type='submit'
              className={`btn-secondary button shadow`}>
              Procced
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
}

export default Reset
