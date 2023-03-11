import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

function SignUp() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
    userRole: "",
  });

  const [validEmailFlag, setValidEmailFlag] = useState(false);

  const [otp, setOtp] = useState({
    sendOTPflag: false,
    num: "",
  });

  const handleChange = (event) => {
    setObj({
      ...obj,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value)
  };

  const options = ["ROLE_CUSTOMER", "ROLE_VENDOR"];
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmailFlag) {
      swal("Validate Email Id First", "", "error");
      return;
    }
    if (obj.firstName === "" || obj.lastName === "" || obj.email === "" || obj.password === "" || obj.mobile === "" || obj.userRole === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);

      axios
        .post(`http://localhost:8080/auth/signup`, obj)
        .then((response) => {
          sessionStorage.setItem("signUpData", JSON.stringify({ userRole: obj.userRole, firstName: obj.firstName, id: response.data.id }))
          setObj({ email: "", password: "", firstName: "", lastName: "", mobile: "", userRole: "---select one role---" });
          navigate(`/AddAddress`);
        })
        .catch((error) => {
          console.log(error);
          swal("Something went Wrong", "", "error");
        });
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        {/* <h1>User {obj.firstName} {obj.lastName} successfully registered!!</h1> */}
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const sendOTP = () => {
    if (obj.email === "") {
      swal("Please Enter Email", "", "error");
      return;
    }
    let emailObj = { email: obj.email };
    axios
      .post(`${IP_ADDRS}/auth/validateEmail`, emailObj)
      .then((res) => {
        swal(res.data, "", "success");
        setOtp({ ...otp, sendOTPflag: true });
      })
      .catch((err) =>
        swal({
          title: "Email Id Already Registered",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      );
  };

  const verifyOTP = () => {
    if (obj.email === "") {
      swal("Please Enter Email", "", "error");
      return;
    }
    if (otp.num === "") {
      swal("Please Enter OTP", "", "error");
      return;
    }
    let otpObj = { email: obj.email, otp: otp.num };
    axios
      .post(`${IP_ADDRS}/auth/verifyOtp`, otpObj)
      .then((res) => {
        swal(res.data, "", "success");
        setValidEmailFlag(true);
      })
      .catch((err) => swal(`${err}`, "", "error"));
  };

  return (
    <div className="card col-md-6 offset-md-3 offset-md-3">
      <div>
        <h2 className="text-center">
          <b>User Registration</b>
        </h2>
        <hr className="lead"></hr>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}

        <form style={{ textAlign: "center" }}>
          {/* Labels and inputs for form data */}
          <label className="label">Firstname</label>
          <input onChange={handleChange} style={{ width: 300, margin: "auto" }} name="firstName" value={obj.firstName} type="text" />

          <label className="label">Lastname</label>
          <input onChange={handleChange} style={{ width: 300, margin: "auto" }} name="lastName" value={obj.lastName} type="text" />

          <label className="label">Email</label>
          <input onChange={handleChange} style={{ width: 300, margin: "auto" }} name="email" value={obj.email} type="email" />
          <br />
          {validEmailFlag ? (
            <span>Email Validated</span>
          ) : otp.sendOTPflag ? (
            <div>
              <span>
                <input
                  onChange={(e) => {
                    setOtp({ ...otp, num: e.target.value });
                  }}
                  style={{ width: 300, margin: "auto" }}
                  name="otp"
                  value={otp.num}
                  type="email"
                />
              </span>
              <span>
                <p>Enter Otp</p>
                <button type="button" onClick={verifyOTP} className="btn btn-primary">
                  Verify OTP
                </button>
              </span>
            </div>
          ) : (
            <div>
              <span>Click on Send OTP to Validate email</span>
              <span>
                <button type="button" onClick={sendOTP} className="btn btn-primary">
                  Send OTP
                </button>
              </span>
            </div>
          )}

          <label className="label">Password</label>
          <input onChange={handleChange} style={{ width: 300, margin: "auto" }} name="password" value={obj.password} type="password" />

          <label className="label">Mobile</label>
          <input onChange={handleChange} style={{ width: 300, margin: "auto" }} name="mobile" value={obj.mobile} type="number" minLength={10} maxLength={10} />

          <label className="label">I am</label>
          <select style={{ width: 170, margin: "auto" }} onChange={handleChange} name="userRole">
            <option>---select one role---</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <button onClick={handleSubmit} className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
