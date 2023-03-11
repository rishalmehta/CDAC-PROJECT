import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"

function Vendor() {
    const [vendor, setVendor] = useState({
        firstName: "",
        email: "",
        lastName: "",
        id: "",
        jwt: ""
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (ven == null) {
            swal("Not Authorized", "", "error");
        }
        else {
            axios.get(`${IP_ADDRS}/vendors/${ven.id}`)
                .then((res) => {
                    console.log(res.data);
                    setLoggedIn(true);
                    setVendor({
                        firstName: res.data.firstName, lastName: res.data.lastName,
                        id: ven.id,
                        email: res.data.email,
                        jwt: ven.jwt
                    })
                })
                .catch((err) => {
                    console.log(err);
                    swal("Something went Wrong", "", "error");
                });
        }
    }, [])


    return (
        <>
            {loggedIn ?
                (<>
                    <div className="jumbotron" style={{ marginLeft: 20 }}>
                        <img src={`${IP_ADDRS}/vendors/${vendor.id}/profileImage`} style={{ float: "right", marginRight: 18 }} height={165} width={165} />
                        <h3 style={{ marginTop: 10 }}>Hello ,
                        </h3>
                        <h1 style={{ marginLeft: 30 }}>
                            {vendor.firstName}&nbsp;{vendor.lastName}
                        </h1>

                        <h5 style={{ marginLeft: 30 }}>
                            {vendor.email}
                        </h5>
                        <br />
                    </div>
                    <hr className="my-4" />

                    <div className="container" style={{ marginBottom: "50px", textAlign: "center" }}>
                        <div className="row" >
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/updateVendor")}>
                                    <div className="card-body" >
                                        <h5 className="card-title">Update Profile</h5>
                                        <p className="card-text">Update your account details.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/addSubcriptionPlan")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Add Subscription Plan</h5>
                                        <p className="card-text">Add new Subscription Plan Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/vendorAllPlans")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Display Subscription Plans</h5>
                                        <p className="card-text">Show all Added Subscription Plans</p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/enabledPlans")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Enabled Subscription Plan</h5>
                                        <p className="card-text">Show Enabled Subscription Plans</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/disabledPlans")}>
                                    <div className="card-body" >
                                        <h5 className="card-title">Disabled Subscription Plans</h5>
                                        <p className="card-text">Show Disabled Subscription Plans</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </>)

                : <div style={{ textAlign: "center" }}><h1>Please Log in to Access this page</h1></div>}
        </>
    )

}

export default Vendor;