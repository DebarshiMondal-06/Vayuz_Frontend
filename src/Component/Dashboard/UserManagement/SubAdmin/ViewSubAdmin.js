import React, { useContext } from 'react';
import { createContextSubAdmin } from './SubAdminContext';


const ViewSubAdmin = () => {
  const { viewSubAdmin } = useContext(createContextSubAdmin);
  const { employee_id, contact, email, admin_name, role, staff_roles
  } = viewSubAdmin;
  return (
    <div style={{ fontSize: '16px', display: 'flex' }}>
      <div style={{ width: '400px' }}>
        <p><b>Employee ID:</b> {employee_id}</p>
        <p><b>Contact:</b> {contact}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Name:</b> {admin_name}</p>
        <p><b>Role:</b> <span className='bg-info badge'>{role}</span></p>
      </div>
      <div>
        <p><b>Roles & Rights:</b>
          {staff_roles && staff_roles.map((items) => {
            return <div>
              <span className='badge bg-success'>
                {items}
              </span>
              <br/>
            </div>
          })}
        </p>
      </div>
    </div>
  )
}

export default ViewSubAdmin;
