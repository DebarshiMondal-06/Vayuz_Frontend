import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import ManageProfile from './ManageProfile';
import HandleEdit from './HandleEdit';



const ProfileConditional = () => {
    const loc = useLocation();
    const { setChangeText } = useContext(authContext);

    if (loc.pathname === '/manager_profile/edit') {
        setChangeText('Edit Profile')
        return <HandleEdit />
    }

    return <ManageProfile>
        {setChangeText('Profile')}
    </ManageProfile>
}

export default ProfileConditional;
