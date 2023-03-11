import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Signin from '../Pages/Signin';
import { useParams } from "react-router-dom";

function VendorAddress() {
  const { id } = useParams();

  const [address, setAddress] = useState({
    Line1: "",
    Line2: "",
    city: "",
    pincode: "",
    state: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value)
  };

  // States for registration
  //   const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setlastname] = useState('');
  // const [mobile, setMobile] = useState('');
  // const [role, setRole] = useState('');
  // const [line1, setLine1] = useState('');
  // const [line2, setLine2] = useState('');
  // const [city, setCity] = useState('');
  // const [pincode, setPincode] = useState('');
  // const [state, setState] = useState('');

  //   const options = ['ROLE_CUSTOMER','ROLE_VENDOR'];
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //   // Handling the name change
  //   const handleName = (e) => {
  //     setName(e.target.value);
  //     setSubmitted(false);
  //   };

  // Handling the firstname change
  // const handleFirstName = (e) => {
  //   setFirstname(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the lastname change
  // const handleLastName = (e) => {
  //   setlastname(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the email change
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the password change
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the mobile change
  // const handleMobile = (e) => {
  //   setMobile(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the mobile change
  // const handleRole = (e) => {
  //   setRole(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the address line1 change
  // const handleLine1 = (e) => {
  //   setLine1(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the address line2 change
  // const handleLine2 = (e) => {
  //   setLine2(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the city change
  // const handleCity = (e) => {
  //   setCity(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the pincode change
  // const handlePincode = (e) => {
  //   setPincode(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the state change
  // const handleState = (e) => {
  //   setState(e.target.value);
  //   setSubmitted(false);
  // };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.Line1 === "" || address.Line2 === "" || address.city === "" || address.pincode === "" || address.state === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      console.log("address in vendor");
      console.log(address);
      // console.log(firstname);
      // console.log(lastname);
      // console.log(email);
      // console.log(mobile);
      // console.log(password);
      // console.log(line1);
      // console.log(line2);
      // console.log(city);
      // console.log(pincode);
      // console.log(role);
      // console.log(state);

      //axios post request
      //   console.log(tempobj)
      axios
        .post(`http://localhost:8080/vendors/${id}/addaddress`, address)
        .then(
          (response) => {
            setAddress({ Line1: "", Line2: "", city: "", pincode: "", state: "" });
            navigate("/sign-in");
          }
          // console.log(response.data.id)
          // setObj({email:"",password:"",firstName:"",lastName:"",mobile:"",userRole:"---select one role---"})
          // console.log(response.data.id)
        )
        .catch((error) => {
          console.log(error);
        });

      // handleReset();
    }
  };

  //reset function
  // const handleReset = () => {
  //   this.obj.email="",
  //   this.obj.password="",
  //   this.obj.firstName="",
  //   this.obj.lastName="",
  //   this.obj.mobile="",
  //   this.obj.role=""
  // }

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User successfully registered!!</h1>
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

  return (
    <div className="form">
      <center>
        {/* <div> */}
        {/* <label className="label">User Registration</label> */}
        {/* <h1>User Registration</h1> */}
        {/* </div> */}

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">Line1</label>
          <input onChange={handleChange} className="label" name="Line1" value={address.Line1} type="text" />

          <label className="label">Line2</label>
          <input onChange={handleChange} className="label" name="Line2" value={address.Line2} type="text" />

          <label className="label">City</label>
          <input onChange={handleChange} className="label" name="city" value={address.city} type="text" />

          <label className="label">Pincode</label>
          <input onChange={handleChange} className="label" name="pincode" value={address.pincode} minLength={10} maxLength={10} type="number" />

          <label className="label">State</label>
          <input onChange={handleChange} className="label" name="state" value={address.state} type="text" />

          {/* <label className="label">Address</label>
        <br></br>

        <label className="label">Line1</label>
        <input onChange={handleLine1} className="label"
          value={line1} type="text" />

        <label className="label">Line2</label>
        <input onChange={handleLine2} className="label"
          value={line2} type="text" />

        <label className="label">City</label>
        <input onChange={handleCity} className="label"
          value={city} type="text" />

        <label className="label">pincode</label>
        <input onChange={handlePincode} className="label"
          value={pincode} type="text" />

        <label className="label">state</label>
        <input onChange={handleState} className="label"
          value={state} type="text" /> */}

          {/* <label className="label">I am</label>
        <select className="label" onChange={handleChange} name="userRole">
        <option>---select one role---</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}        
        </select> */}
          {/* <input  className="resetbtn" type="reset" value="reset"></input>

        <input onClick={handleSubmit} className="submitbtn" type="submit" value="submit"></input> */}
          {/* <button onClick={handleReset} className="btn" type="reset">Reset</button> */}

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </center>
    </div>
  );
}

export default VendorAddress;
