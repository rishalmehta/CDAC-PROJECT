import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"

function UpdateProfilePicture() {

    const navigate = useNavigate();
    const [userRole, setUserRole] = useState();
    const [imageFile, setImageFile] = useState();
    const [data, setData] = useState({
        id: "",
        jwt: "",
    });

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (ven != null) {
            setUserRole("vendors")
            setData({
                id: ven.id,
                jwt: ven.jwt
            })
        }
        else {
            let cust = JSON.parse(sessionStorage.getItem("customer"));
            if (cust != null) {
                setUserRole("customers")
                setData({
                    id: cust.id,
                    jwt: cust.jwt
                })
            }
            else {
                swal("Relogin to Access this Page", "", "error");
                sessionStorage.clear()
                navigate("/sign-in")
            }
        }

    }, []);


    const submitData = (e) => {
        e.preventDefault();

        swal({
            title: "Are you Confirm to Upload Picture?",
            text: "Image Will be upload !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((upload) => {
                if (upload) {
                    const form = new FormData();
                    form.append("profileImage", imageFile);
                    const options = {
                        method: 'POST',
                        url: `${IP_ADDRS}/${userRole}/${data.id}/profileImage`,
                        headers: {
                            Authorization: ``,
                            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                        },
                        data: form
                    };

                    axios.request(options).then(response => {
                        console.log(response.data)
                        swal(`${response.data}`, ``, "success");
                        if (userRole === "vendors") navigate("/vendor")
                        else navigate("/customer")

                    }).catch(error => {
                        console.log(error);
                    });
                }
            })

    }


    return (
        <div className="container fluid">

            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className='text-center'>Update ProfilePicture </h2>

                    <form>
                        <div>
                            <img src={`${IP_ADDRS}/${userRole}/${data.id}/profileImage`} height={200} width={200} style={{ marginLeft: 170 }} />
                        </div>

                        <div style={{ marginTop: '10px' }} className="form-group">
                            <label><b>  Choose Profile Photo: </b></label><br></br>
                            <input type="file" accept=".png, .jpg,.jpeg" className="form-control" name="file" onChange={(e) => {
                                console.log(e.target.files[0])
                                setImageFile(e.target.files[0])
                            }}></input>
                        </div >

                        <div>
                            <table style={{ margin: "auto" }}>
                                <thead />
                                <tbody>
                                    <tr>
                                        <td> <button className="btn btn-success" onClick={submitData}>Update</button></td>
                                        <td><button className="btn btn-danger" onClick={() => {
                                            if (userRole === "vendors") navigate("/vendor")
                                            else navigate("/customer")
                                        }}>Cancel</button></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </form>

                </div>
            </div>
        </div>








    );

}
export default UpdateProfilePicture;

