/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { updateOne } from './cmsapis';
import { Link, useHistory } from 'react-router-dom';
import { CMS } from './context/CMSContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { authContext } from '../../../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';



const EditPage = () => {
  const history = useHistory();

  const { checkAdmin } = useContext(authContext);
  const { fetchCMS, dataName, editData, distLoading, setLoading } = useContext(CMS);
  const [Editcontent, setContent] = useState('');
  const handleChange = (e) => {
    setContent(e);
  }



  useEffect(() => {
    setLoading(false);
    setContent(editData.content);
  }, [editData]);




  // ***************** Schema *************************************
  const schema = yup.object().shape({
    forPageName: yup.object().required()
  });
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      ...editData
    }
  });



  //**********************Handle Update *************************************
  const btntextChnage = (val) => {
    document.getElementById('addbtn').textContent = val;
  }
  const handleUpdate = (data) => {
    const { forPageName } = data;
    btntextChnage('Updating...');
    updateOne({
      editID: editData.editId || null,
      content: Editcontent,
      forPageName: forPageName.value
    }).then(() => {
      toast.success('Successfully Implemented');
      fetchCMS();
      btntextChnage('Redirecting....');
      setTimeout(() => {
        history.push('/cms');
      }, 2000);
    }).catch((err) => {
      if (err && err.response) toast.error(err.response.data.message);
      btntextChnage('Try Again');
    })
  }



  const pageOptions = dataName.map((el) => {
    return { label: el.pageName, value: el._id };
  });



  if (distLoading) {
    return (
      <div className="loading-gif">
        <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" alt="some" />
      </div>
    );
  }


  //********************* Renders **********************
  return <section>
    <form className="w-100 container-fluid" onSubmit={handleSubmit(handleUpdate)}>
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
        <label htmlFor="">Edit Content</label>
        <div className='card editor rounded-sm p-1'>
          <Editor
            value={Editcontent}
            apiKey='s8bzafsjzpox7htmwv0cd8vj7t3oxlne3fnnfmo3u6itj3ik'
            init={{
              height: 500,
              menubar: 'file insert help',
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
            Update
          </button>
        </div>
      </div>
    </form>
  </section>
}

export default EditPage;
