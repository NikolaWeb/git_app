import "./navbar.scss";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest";

const Navbar = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="navLeft">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">Vehicles</Link>
        <Link to="/about">About</Link>
        <Link to="/sponsors">Sponsors</Link>
      </div>

      <div className="navRight">
        {
                currentUser
                   ?
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span className="profileName">{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">{number}</div>
              <span>Profile</span>
            </Link>
            <button className="logoutBtn" onClick={handleLogout}>
              <img src="/logout.png" alt="" />
              Logout
            </button>
          </div>
                   :
          <div className="loginRegister">
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="register">Sign Up</Link>
          </div>
        }
        <div className="menu-icon">
          <img src="/menu.png" alt="" onClick={() => setOpen(!open)}/>
        </div>
        <div className={open ? "mobile-menu active" : "mobile-menu"}>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
        </Link>
          <Link to="/">Home</Link>
          <Link to="/list">Vehicles</Link>
          <Link to="/about">About</Link>
          <Link to="/sponsors">Sponsors</Link>
          {
                     !currentUser
                         &&
            <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar