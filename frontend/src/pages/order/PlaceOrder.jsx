import React, { useEffect } from "react";
import "./placeorder.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/appContext/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { user } = useContext(AppContext);
  const [isFetching, setIsFetching] = useState(false);
  const [batch, setBatch] = useState("");
  const [date1, setDate1] = useState();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const CompletePayment = async (e) => {
    // e.preventDefault();
    console.log(e);
    setIsFetching(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api/private/chooseplan",
        { batch: e, paymentStatus: true, uid: user._id },
        config
      );
      setIsFetching(false);
      window.location.reload();
    } catch (error) {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (user) {
      // console.log(user._id);
      const analytics = async () => {
        setIsFetching(true);
        setErrors(false);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        try {
          setIsFetching(true);
          const { data } = await axios
            .post(`/api/private/chooseplan/`, { usid: user._id }, config)
            .catch((err) => {
              if (err.response.status === 409) {
                setErrors("Invalid seller");
                throw new Error(`Invalid seller`);
              } else {
                setErrors("Internal Server Error");
                throw new Error(`Internal Server Error`);
              }
              throw err;
            });
          //  console.log(data.userData.createdAt.split("T")[0]);
          navigate('/chooseplan')
          data.userData.batch ? setBatch(data.userData.batch): setBatch("");
          setDate1(data.userData.createdAt.split("T")[0]);
        } catch (err) {
          setIsFetching(false);
          setErrors(err.message);
        }
      };
      analytics();
    }
  }, [user]);
// console.log(typeof(date1))
var date = new Date(date1); // Now
date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
// console.log(Date.now()< date);
console.log(date)
  return (
    <>
      {user && (batch=="" || (Date.now() > date))? (
        <>
          <h1 className="timeHeading">Choose your Timing</h1>
          <h3 className="priceHeading">Price : Rs INR 500 per Month only </h3>
          <div className="orderContainer">
            <div className="orderWrapper">
              <div className="orderRight">
                <div
                  className="orderBox1"
                  onClick={() => CompletePayment("6-7AM")}
                >
                  <div className="batch">6-7AM </div>
                </div>
                <div
                  className="orderBox1"
                  onClick={() => CompletePayment("7-8AM")}
                >
                  <div className="batch">7-8AM </div>
                </div>
              </div>
              <div className="orderRight">
                <div
                  className="orderBox1"
                  onClick={() => CompletePayment("8-9AM ")}
                >
                  <div className="batch">8-9AM </div>
                </div>
                <div
                  className="orderBox1"
                  onClick={() => CompletePayment("5-6PM")}
                >
                  <div className="batch">5-6PM</div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        ""
      )}
      {batch && (Date.now() < date)? (
        <>
          <h1 className="timeHeading">Your Payment is Done.</h1>
          <h3 className="priceHeading">Your Timing is {batch}</h3>
          <h3 className="priceHeading"> Validity till : {date.toString()}</h3>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PlaceOrder;
