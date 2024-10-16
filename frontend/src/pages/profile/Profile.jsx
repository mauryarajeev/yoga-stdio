import "./profile.css";
// import emptyprofile from '../../images/emptyprofile.png'
import { useState, useContext } from "react";
import { AppContext } from "../../context/appContext/AppContext";

export default function Profile() {
  const { user } = useContext(AppContext);

  return (
    <div className="profile">
      {user ? (
        <div className="profileWrapper">
          <h1 className="profileHeading">Profile</h1>
          <div className="profileImgDiv">
            <img className="profileImg" src={user.profileImg} />
          </div>

          <div className="pInfo">
            <h2>Personal Infomation</h2>
            <p>Full Name: {user.fullname}</p>
          </div>

          <div className="pInfo">
            <h2>Email</h2>
            <p>Email: {user.email}</p>
          </div>

          <div className="pInfo">
            <h2>Age</h2>
            <p>Age : {user.age}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
