import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from "react-simple-captcha";

function ForgotPassword() {

    const [data, setData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        userCaptcha: ""
    });

    const [otpFlag, setOtpFlag] = useState(false);
    const [waitOTP, setWaitOTP] = useState(false);
    const [sendOTPButton, setSendOTPButton] = useState(true);
    const [waitLockFlag, setWaitLockFlag] = useState(true);

    const [passType, setPassType] = useState("text");
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        loadCaptchaEnginge(6, 'red', 'black', 'upper');
    }, [])
    const handleShowPassword = () => {
        setIsChecked(!isChecked);
    }
    useEffect(() => {
        if (isChecked == true) {
            setPassType("text");
            return;
        }
        setPassType("password");
    }, [isChecked])


    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const navigate = useNavigate();

    const changeFlag = () => {
        setWaitLockFlag(false);
    }

    const updatePassword = (e) => {
        e.preventDefault();

        const obj = { "email": data.email, "otp": data.otp, "newPassword": data.newPassword };
        axios.post(`${IP_ADDRS}/auth/changeForgottenPassword`, obj)
            .then(res => {
                swal("Password Updated", "", "success");
                navigate(`/sign-in`)
            })
            .catch(err => {
                swal("Enter Correct Details", "", "error");
            })
    }
    const setTempFlag = () => {
        setWaitOTP(false);
    }

    const submitData = (e) => {
        e.preventDefault();
        setTempFlag();

        if (validateCaptcha(data.userCaptcha) === true) {
            changeFlag();
            if (data.email == '') {
                swal("Email Field Empty", "Enter Valid Email", "error");
                return;
            }
            const obj = { "email": data.email }
            console.log(obj)
            axios.post(`${IP_ADDRS}/auth/forgotPassword`, obj)
                .then(res => {
                    swal("OTP sent to your Email", "if not received click on resend, make sure to enter correct details", "success");
                    setWaitOTP(true);
                })
                .catch(err => {
                    swal("Something Went Wrong, Retry Again", "Make sure you are entering correct email!", "error");
                    setWaitLockFlag(true);
                    console.log("Error");
                })
        }
        else {
            swal("Captcha Does Not Match !", "Enter Correct Captcha", "error");
        }
    }




    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className='text-center'><b>Forgot Password</b></h2>
                        <hr className="lead"></hr>

                        <form style={{ textAlign: "center" }}>
                            <div className="form-group">
                                <label> Enter your registered emailId: </label>
                                <input type="email" placeholder="Enter Email ID" name="email" className="form-control"
                                    value={data.email} onChange={changeHandler} style={{ width: 300, margin: "auto" }} />

                            </div>


                            {waitOTP && <div><div className="form-group">
                                <label> Enter OTP: </label>
                                <input type="number" placeholder="Enter OTP" name="otp" className="form-control"
                                    value={data.otp} onChange={changeHandler} style={{ width: 200, margin: "auto" }} />

                            </div>

                                <div className="form-group">
                                    <label> Enter New Password: </label>
                                    <input type={passType} placeholder="Enter New Password" name="newPassword" style={{ width: 200, margin: "auto" }} className="form-control"
                                        value={data.newPassword} onChange={changeHandler} />
                                    <span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} id="show"></input>&emsp;</span><label htmlFor="show">Show Password</label>
                                </div></div>}
                            {
                                waitLockFlag &&
                                <div> <div className="form-group" style={{ "marginTop": "20px", "marginLeft": "0px" }}>
                                    <LoadCanvasTemplate />
                                    <input type="text" placeholder="Enter Captcha" onChange={changeHandler} value={data.userCaptcha} id="user_captcha_input" name="userCaptcha" className="form-control"
                                        style={{ width: 200, margin: "auto" }} />
                                </div>
                                </div>
                            }


                            {waitLockFlag ? (<div>
                                <table style={{ margin: "auto" }}>
                                    <thead />
                                    <tbody>
                                        <tr>
                                            <td>{waitLockFlag && <button className="btn btn-success" onClick={submitData}>SEND OTP</button>}</td>
                                            <td><button className="btn btn-danger" onClick={() => navigate("/login")} style={{ marginLeft: "10px" }}>Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>) : (waitOTP ? (<table style={{ margin: "auto" }}>
                                <thead />
                                <tbody>
                                    <tr>
                                        <td>{waitOTP && <button className="btn btn-success" onClick={submitData}>RE-SEND OTP</button>}</td>
                                        <td> {waitOTP && <button className="btn btn-success" onClick={updatePassword}>Update Password</button>}</td>
                                        <td><button className="btn btn-danger" onClick={() => navigate("/login")} >Cancel</button></td>
                                    </tr>
                                </tbody>
                            </table>) : "")}


                        </form>
                    </div>
                </div>
            </div>
        </div >

    );
}
export default ForgotPassword;