import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import AddCMS from './Createpages';
import EditPage from './EditPage';
import CMSTable from './CMSTable';



const CMSConditional = () => {
  const loc = useLocation();
  const { setChangeText } = useContext(authContext);



  if (loc.pathname === '/cms/add') {
    setChangeText('Add CMS')
    return <AddCMS />
  }
  if (loc.pathname === '/cms/edit') {
    setChangeText('Edit CMS')
    return <EditPage />
  }
  return <CMSTable>
    {setChangeText('CMS')}
  </CMSTable>
}

export default CMSConditional;
