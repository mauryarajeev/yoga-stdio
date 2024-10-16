const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


//  SignIn user
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
     
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

  //   Register user
exports.signup = async (req, res, next) => {
    const { fullname, email, age, password, cpassword } = req.body;
    console.log(req.body)
    console.log(email)
    try {
      const oldUser = await User.findOne({ email: req.body.email });
      if (password != cpassword) {
        return res.status(401).json({ sucess: false, error: "Invalid credential" });
      }
      if (oldUser) {
        return res.status(409).json({ sucess: false, error: "user already exist" })
      }
      if(age<18 || age>65) return res.status(400).json({ sucess: false, error: "user's age must be in 18 to 65 years." })
      const user = await User.create({
        fullname,
        email,
        age,
        password,
      });
  
      sendToken(user, 200, res);
    }
    catch (err) {
      next(err);
    }
  };
  

  const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };

