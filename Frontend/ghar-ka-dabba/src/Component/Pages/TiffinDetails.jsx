import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"
import { useParams } from "react-router-dom";

function TiffinDetails() {

    const { id, spid } = useParams();
    const navigate = useNavigate();
    const [tiffin, setTiffin] = useState({
        id: "",
        name: "",
        price: "",
        description: "",
        foodType: "",
        day: ""
    });

    useEffect(() => {
        axios
            .get(`${IP_ADDRS}/tiffins/${id}`)
            .then((res) => {
                console.log(res.data);
                setTiffin({
                    ...tiffin, id: res.data.id, name: res.data.name,
                    price: res.data.price, description: res.data.description,
                    foodType: res.data.foodType, day: res.data.day
                });
            })
            .catch((err) => {
                console.log(err);
                swal("Something went Wrong", "", "error");
            });

    }, []);



    return (
        <div className="container fluid">

            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className='text-center'>{tiffin.day} </h2>

                    <center>
                        <div>
                            <img src={`${IP_ADDRS}/tiffins/${tiffin.id}/tiffinImage`} height={200} width={200} />
                        </div>

                        <div style={{ marginTop: '10px' }} className="form-group">
                            <h5>{tiffin.name}</h5>
                            <h6>{tiffin.description}</h6>
                            <h6>{tiffin.foodType}</h6>
                            <h6>Cost : {tiffin.price}/- Rs</h6>

                        </div >
                        <div>
                            <td><button className="btn btn-danger" onClick={() => { navigate(`/subcription/plan/${spid}`) }}>Cancel</button></td>
                        </div>

                    </center>

                </div>
            </div>
        </div>

    );

}
export default TiffinDetails;

