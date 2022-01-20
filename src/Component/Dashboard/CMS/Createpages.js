import React, { useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { createPageData } from './cmsapis';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { CMS } from './context/CMSContext';
import { authContext } from '../../../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';




const Createpages = () => {
  const { dataName, fetchCMS } = useContext(CMS);
  const { checkAdmin } = useContext(authContext);
  const history = useHistory();
  const [content, setContent] = useState('');
  const handleChange = (e) => {
    setContent(e);
  }



  // ***************** Schema *************************************
  const schema = yup.object().shape({
    forPageName: yup.object().required()
  });
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema)
  });





  // ********************* Handle Submit*******************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handlePage = async (data) => {
    const { forPageName } = data;
    try {
      btntextChnage('Processing...');
      const result = await createPageData({
        content,
        forPageName: forPageName.value
      });
      if (result) {
        toast.success('Successfully Implemented');
        btntextChnage('Redirecting...');
        setContent('');
        fetchCMS();
        setTimeout(() => {
          history.push('/cms');
        }, 1500);
      }
    } catch (error) {
      if (error && error.response) toast.error(error.response.data.message);
      btntextChnage('Try Again');
    }
  }


  const pageOptions = dataName.map((el) => {
    return { label: el.pageName, value: el._id };
  })


  // **************************** renders *******************
  return <section>
    <form className="container w-100" onSubmit={handleSubmit(handlePage)}>
      <ToastContainer autoClose={2500} position='bottom-center' />
      <div className='input-fields col-md-12'>
        <div className="col-md-12 mb-3" style={{ zIndex: '2' }}>
          <label>Choose Page</label>
          <RHFInput
            as={<Select
              options={pageOptions}
            />}
            name='forPageName'
            setValue={setValue}
            register={register}
          />
          {errors.forPageName && <p className="text-capitalize text-danger small p-1">{errors.forPageName.message}</p>}
        </div>
        <label htmlFor="">Write Content</label>
        <div className='card editor rounded-sm p-1'>
          <Editor
            value={content}
            apiKey='s8bzafsjzpox7htmwv0cd8vj7t3oxlne3fnnfmo3u6itj3ik'
            init={{
              height: 300,
              plugins: 'lists link paste help',
              toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image link |  help',
              branding: false
            }}
            onEditorChange={handleChange}
          />
        </div>
        <br />
        <div className="col-md-12 text-right">
          <Link to={`${checkAdmin() ? '/cms' : '/manager_cms'}`}>
            <button className="btn btn-dark">Cancel</button>
          </Link> &nbsp;
        <button id='addbtn' style={{ width: '100px' }} type='submit' className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  </section >
}

export default Createpages;
