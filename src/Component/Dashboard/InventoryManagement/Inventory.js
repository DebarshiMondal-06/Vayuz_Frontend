import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../../Context/authContext';
import InventoryConditional from './InventoryConditional';
import { InventoryContext } from './InventoryContext';



const Inventory = () => {
    const { changeTitle, changeText } = useContext(authContext);
    changeTitle('Inventory');
    const loc = useLocation();



    return <div className="app-main__inner">
        <div className="row mb-3">
            <div className="col-md-10">
                <h5 className="card-title">
                    {changeText}
                </h5>
            </div>
            {
                (loc.pathname === '/inventory') ? <div className="col-md-2 text-right add-to-center">
                    <Link to='/inventory/add'><button className="btn add-btn" type="submit">Add Inventory
        </button></Link>
                </div> : ''
            }
        </div>
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <InventoryContext>
                        <InventoryConditional />
                    </InventoryContext>
                </div>
            </div>
        </div>
}

export default Inventory;
