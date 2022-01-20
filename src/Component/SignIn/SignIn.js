import React, { useContext, useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './signin.css';
import { authContext } from '../../Context/authContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from './uni-gas-logo.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



const SignIn = () => {
  const loc = useLocation();
  const { getSignIn, setResult, changeTitle } = useContext(authContext);
  const [hideShow, setHideShow] = useState(false);
  const [checkRecaptcha, setCheckRecaptcha] = useState(false);
  const schema = yup.object().shape({
    username: (loc.pathname === '/admin/signin')
      ? yup.string().email().required().trim()
      : yup
        .string()
        .required().lowercase().matches(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/, 'Either Email or Phone required').trim(),
    password: yup
      .string()
      .required().min(6, 'Password must contain atleast 6 char long').trim()
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });
  changeTitle('SignIn')




  // *****************  Handle Submit ***********************
  const onSubmit = (data) => {
    if (checkRecaptcha) {
      const { username, password } = data;
      document.getElementById('btn-sign').textContent = 'Processing...';

      getSignIn({
        email: (username.includes('@')) ? username : '',
        phone_no: (!username.includes('@')) ? username : '',
        password
      })
        .then(() => {
          toast.success('Successfully Logined');
          setResult({ successMsg: true, errorMsg: false });
          document.getElementById('btn-sign').textContent = 'Redirecting...';
          setTimeout(() => {
            (loc.pathname === '/admin/signin')
              ? window.location.href = '/salesmanager'
              : window.location.href = '/manager_salesexecutive'
          }, 2500);
        })
        .catch(err => {
          toast.error(err);
          document.getElementById('btn-sign').textContent = 'Try Again';
          setResult({ successMsg: false, errorMsg: true });
        });
    } else {
      setResult({ errorMsg: true, successMsg: false });
      toast.info('Recaptcha Not Checked!')
    }
  }




  // *********************** Handle Reacaptcha ******************************
  const onChange = (val) => {
    if (val) {
      setCheckRecaptcha(true);
    }
  }
  const onError = (val) => {
    console.log(val);
    setResult({ successMsg: true, errorMsg: false });
    toast.warn('Check your connectivity')
    setCheckRecaptcha(false);
  }
  const onExpired = () => {
    setCheckRecaptcha(false);
  }

  // *********************** Renders ****************************************
  return <section className='container'>
    <main className='card sign-container text-center'>
      <div className='text-center'>
        <img height='100px' width='100px' src={Logo} alt="logo-unigas" />
      </div>
      <p className='h5 mb-2 text-left'>{(loc.pathname === '/admin/signin') ? 'Admin' : 'Sales Manager'}</p>
      <form className='input-groups' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-1'>
          <input
            type="text"
            name="username"
            className='form-control'
            placeholder='Username'
            ref={register}
          />
          {errors.username && <p className="text-danger small p-1">{errors.username.message}</p>}
        </div>
        <div className='input-2'>
          <input
            type={(hideShow) ? 'text' : 'password'}
            name="password"
            className='form-control'
            placeholder='Password'
            ref={register}
          />
          {errors.password && <p className="text-danger small p-1">{errors.password.message}</p>}
          <span onClick={() => setHideShow(!hideShow)}>
            {(hideShow) ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>
        <div className='google-recaptcha'>
          <ReCAPTCHA
            sitekey="6Leb2kkaAAAAAIHjPE45-_trsb-QXpb2ynmC7zOq"
            onChange={onChange}
            onErrored={onError}
            onExpired={onExpired}
          />
        </div>
        <div className='button-sigin text-center'>
          <button
            id="btn-sign"
            className={`btn-secondary button shadow`}>
            Sign in</button>
        </div>
      </form>
      {
        (loc.pathname === '/manager/signin') ? <Link className='mb-2' to='/forgotpassword'>Forgot Password?</Link> : ''
      }
      <p className='small p-0'>* All fields are required</p>
    </main>
  </section>
}

export default SignIn;
