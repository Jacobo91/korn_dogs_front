import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {

    const [role, setRole] = React.useState<string | null>("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
        window.location.reload();
    }

    React.useEffect(() => {
        const currentRole = localStorage.getItem("role");
    
        if (currentRole !== null) {
            const parsedRole = JSON.parse(currentRole);
            setRole(parsedRole);
        } 
    }, []);

    return (
        <nav>
            <ul>
                {
                    role == "ventas" || role == "admin" ? (
                        <li>
                            <NavLink 
                                to="/ventas"
                                className={({isActive}) => isActive ? "active" : "" }
                            >
                                Ventas
                            </NavLink>
                        </li>
                    ) : null
                }
                {
                    role == "preps" || role == "admin" ? (
                        <li>
                            <NavLink 
                                to="/preps"
                                className={({isActive}) => isActive ? "active" : "" }
                            >
                                Preps
                            </NavLink>
                        </li>
                    ) : null
                }
                {
                    role == "admin" && (
                        <li>
                            <NavLink 
                                to="/admin"
                                className={({isActive}) => isActive ? "active" : "" }
                            >
                                Admin
                            </NavLink>
                        </li>
                    )
                }
                {
                    role && (
                        <li>
                            <button
                                className='btn btn--logout'
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar