import "./topbar.css";
import { NavLink, Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/appContext/AppContext";
import axios from "axios";
import DrawerContext from "../../context/DrawerContext";

export default function Topbar() {
  const { authenticated, user, dispatch } = useContext(AppContext);
  const { isOpen, setOpen } = useContext(DrawerContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const getLoggedIn = async () => {
    const res = await axios.get("https://yoga-xrrk.onrender.com/api/private/getuser", config);
    if (res) {
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "EMPTY_STATE" });
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  const handleDrawer = () => {
    setOpen();
  };
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "EMPTY_STATE" });
    <Navigate to="/signin" replace={true} />;
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <NavLink exact className="nav-link" to="/">
          <span className="homeLogo1">
            <i class="fa fa-solid fa-dice-d20"></i> YOGA
          </span>
        </NavLink>
        <span className="homeLogo" onClick={handleDrawer}>
          YOGA
        </span>

        <ul className="topbarList">
          {!authenticated && (
            <>
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/signin">
                  Login
                </NavLink>
              </li>
              {/* <li className="nav-item">
                                    <NavLink exact className="nav-link" to="/signup">Sign Up</NavLink>
                                </li> */}
              <div class="dropdown-menu">
                <div className="dropdown-flex">
                  <li class="menu-btn">
                    More <i class="fas fa-caret-down"></i>
                  </li>

                  <div class="menu-content">
                    {/* <NavLink exact className="links-hidden" to='/userdashboard/profile'>DashBoard</NavLink> */}
                    <NavLink exact className="links-hidden" to="/signup">
                      Signup
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
        </ul>
        {authenticated && user && (
          <div className="topbarProfile">
            <div class="dropdown-menu">
              <div className="dropdown-flex">
                <img className="topbarProfImg" src={user.profileImg} />
                <li class="menu-btn1">{user.email} </li>
                <div class="menu-content1">
                  <NavLink exact className="links-hidden" to="/profile">
                    My Profile
                  </NavLink>
                  <p className="links-hidden" onClick={logoutHandler}>
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
