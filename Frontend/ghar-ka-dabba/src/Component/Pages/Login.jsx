import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from "react-simple-captcha";
import swal from "sweetalert";
import "../../App.css"
import { IP_ADDRS } from "../../Service/Constant"

function Login(props) {

    const [data, setData] = useState({
        username: "",
        password: "",
        loginerror: ""
    });
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

    const submitData = (e) => {
        if (data.username == '') {
            alert('Username cannot be null');
            return;
        }
        if (data.password == '') {
            alert('Password cannot be null');
            return;
        }
        e.preventDefault();

        let user_captcha = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha) === true) {
            const obj = { "email": data.username, "password": data.password }
            axios.post(`${IP_ADDRS}/auth/signin`, obj)
                .then(response => {
                    props.isLogged(true);
                    if (response.data.role.includes("ROLE_CUSTOMER")) {
                        sessionStorage.setItem("customer", JSON.stringify(response.data));
                        navigate(`/customer`);
                    }
                    else if (response.data.role.includes("ROLE_VENDOR")) {
                        sessionStorage.setItem("vendor", JSON.stringify(response.data));
                        navigate(`/vendor`);
                    }
                    else if (response.data.role.includes("ROLE_ADMIN")) {
                        sessionStorage.setItem("admin", JSON.stringify(response.data));
                        navigate(`/admin`);
                    }
                }).catch(err => {
                    swal("Wrong Detials You were Entered", "Enter Correct Details again, Make Sure you are registered before Login", "error");
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
                        <h2 className='text-center'><b>Login</b></h2>
                        <hr className="lead"></hr>

                        <form style={{ textAlign: "center" }}>
                            <div className="form-group">
                                <label> Email Id: </label>
                                <input type="email" placeholder="Enter Email ID" name="username" className="form-control"
                                    value={data.username} onChange={changeHandler} style={{ width: 300, margin: "auto" }} />

                            </div>
                            <div className="form-group">
                                <label> Password: </label>
                                <input type={passType} placeholder="Password" name="password" className="form-control"
                                    value={data.password} onChange={changeHandler} style={{ width: 300, margin: "auto" }} />
                                <span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} id="show" ></input>&emsp;</span><label htmlFor="show">Show Password</label>

                            </div >

                            <div className="form-group" style={{ "marginTop": "20px", textAlign: "center" }}>
                                <LoadCanvasTemplate />
                            </div >
                            <div className="form-group" style={{ textAlign: "center" }}>
                                <label> Enter Captcha: </label>
                                <input type="text" placeholder="Enter Captcha" id="user_captcha_input" name="user_captcha_input" className="form-control" style={{ width: 200, margin: "auto" }}
                                />
                            </div >


                            <div>
                                <table style={{ margin: "auto" }}>
                                    <thead />
                                    <tbody>
                                        <tr>
                                            <td><button className="btn btn-success" onClick={submitData}>Login</button></td>
                                            <td><button className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </form>
                        <div style={{ textAlign: "center" }}>
                            <a href="/forgotpassword">Forgot password? click here...</a>
                            <p className="text-danger">{data.loginerror}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Login;