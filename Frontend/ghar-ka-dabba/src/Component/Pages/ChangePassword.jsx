import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"

function ChangePassword() {

    const [userRole, setUserRole] = useState();

    const [data, setData] = useState({
        currentpass: "",
        newpass: "",
        confirmpass: "",
        passerror: ""
    });
    const [passType, setPassType] = useState("password");
    const [isChecked, setIsChecked] = useState(false);


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

    const [login, setLogin] = useState({ email: "", token: "" });


    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (ven != null) {
            setLogin({ email: ven.email, token: ven.jwt });
            setUserRole("ven")
        }
        else {
            let cust = JSON.parse(sessionStorage.getItem("customer"));
            if (cust != null) {
                setLogin({ email: cust.email, token: cust.jwt });
                setUserRole("cust")
            }
            else {
                swal("Relogin to Access this Page", "", "error");
                sessionStorage.clear()
                navigate("/sign-in")
            }
        }
    }, []);


    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
        //console.log(e.target.name+" "+e.target.value)
    }

    const navigate = useNavigate();

    const submitData = (e) => {
        e.preventDefault();
        if (data.currentpass === data.newpass) {
            setData({ passerror: "Current password and new password must be different.. Please enter new password" })
        }
        else if (data.newpass === data.confirmpass) {
            if (data.newpass === "") {
                setData({ passerror: "New password cannot be null!" })
                return;
            }
            setData({ passerror: "" })
            if (true) {
                let obj = { "email": login.email, "oldPassword": data.currentpass, "newPassword": data.newpass };
                axios.post(`${IP_ADDRS}/auth/updatepassword`, obj).then(res => {
                    if (userRole == "ven") {
                        navigate(`/vendor`)
                    }
                    else if (userRole == "cust") {
                        navigate(`/customer`)
                    }
                    swal(`${res.data}`, "", "success");
                })
                    .catch(err => {
                        console.log(err)
                        swal("You Entered Wrong details", "", "error");
                    })
            }
            else {
            }
        }
        else {
            setData({ passerror: "New password and confirm password should be same.." })
        }
    }

    return (
        <div className="container container-fluid">
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className='text-center'>Change Password</h2>
                        <hr className="lead"></hr>

                        <form style={{ textAlign: "center" }}>

                            <div className="form-group">
                                <label>Current Password: </label>
                                <input type="password" placeholder="Current Password" name="currentpass" className="form-control"
                                    value={data.currentpass} onChange={changeHandler} style={{ width: 200, margin: "auto" }} />

                            </div >

                            <div className="form-group">
                                <label>New Password: </label>
                                <input type={passType} placeholder="New Password" name="newpass" className="form-control"
                                    value={data.newpass} onChange={changeHandler} style={{ width: 200, margin: "auto" }} />
                                <span><span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} id="show_new_password"></input>&emsp;</span><label htmlFor="show_new_password">Show Password</label></span>

                            </div >

                            <div className="form-group">
                                <label>Confirm Password: </label>
                                <input type="password" placeholder="Confirm Password" name="confirmpass" className="form-control"
                                    value={data.confirmpass} onChange={changeHandler} style={{ width: 200, margin: "auto" }} />
                                {/* <span><span><input type="checkbox" checked={isChecked} onChange={handleShowPassword} id="show_confirm_password"></input>&emsp;</span><label htmlFor="show_confirm_password">Show Password</label></span> */}

                            </div >

                            <div>
                                <table style={{ margin: "auto" }}>
                                    <thead />
                                    <tbody>
                                        <tr>
                                            <td><button className="btn btn-success" onClick={submitData}>Change</button></td>
                                            <td><button className="btn btn-danger" onClick={() => {
                                                if (userRole == "ven") {
                                                    navigate(`/vendor`)
                                                }
                                                else if (userRole == "cust") {
                                                    navigate(`/customer`)
                                                }
                                            }} style={{ marginLeft: "10px" }}>Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </form>
                        <span className="text-danger">
                            {data.passerror}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePassword;