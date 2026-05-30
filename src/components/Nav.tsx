
import { NavLink, Outlet } from "react-router";
import smartshelflogo from "../assets/smartshelflogo.png"
import Footer from "./Footer";

export default function Nave () {
    return (
          <div>
            <nav className="nav">
                
                 <NavLink to="/" end>
                <span className="nav-brand">
                    <img src={smartshelflogo} className="base" width="90%"  alt="" /></span>
                </NavLink> 
                
                <div className="nav-links">
                    <NavLink to="/" end>Home</NavLink>
                   <NavLink to="/alerts">Alerts</NavLink>
                    <NavLink to="/inventory">Inventory</NavLink>
                    
                </div>
            </nav>

            <main className="main">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}