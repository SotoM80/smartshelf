//import logo from '../assets/logo.png'
import { NavLink, Outlet } from "react-router";

export default function Nave () {
    return (
          <div>
            <nav className="nav">
                
                {/* <NavLink to="/" end>
                <span className="nav-brand">
                    <img src={logo} className="base" width="50%"  alt="" /></span>
                </NavLink> */}
                
                <div className="nav-links">
                    <NavLink to="/" end>Home</NavLink>
                   <NavLink to="/alerts">Alerts</NavLink>
                    <NavLink to="/inventory">Inventory</NavLink>
                    
                </div>
            </nav>

            <main className="main">
                <Outlet/>
            </main>
        </div>
    )
}