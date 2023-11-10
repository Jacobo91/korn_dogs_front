
import { NavLink, Outlet } from 'react-router-dom';

function Admin() {
    return (
        <div className="page-wrapper">
            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to={'/admin/users'}
                            className={({isActive}) => isActive ? "active" : "" }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/admin/inventory'}
                            className={({isActive}) => isActive ? "active" : "" }
                        >
                            Inventory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={'/admin/daily-ops'}
                            className={({isActive}) => isActive ? "active" : "" }
                        >
                            Daily Ops
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Admin