import yog from "../../Images/yoga.png";
import { Navigate, useNavigate } from "react-router-dom";
import "./home.css";

export default function Homescreen() {
  const navigate = useNavigate();
  const gotoLogin = (e) => {
    // e.preventDefault();
    navigate("/chooseplan");
  };
  return (
    <div className="homescreen">
      <div className="homescreenWrapper">
        <div className="hs1">
          <div className="hs1Wrapper">
            <h1>
              Welcome to Yoga <br></br>Classes
            </h1>

            <button onClick={gotoLogin}>Start now</button>
          </div>
        </div>
        <div className="hs2">
          <img src={yog} alt="" />
        </div>
      </div>
    </div>
  );
}
