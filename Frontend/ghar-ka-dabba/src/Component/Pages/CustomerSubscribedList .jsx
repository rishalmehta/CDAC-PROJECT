import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"


const CustomerSubscribedList = () => {
    const [subPlanList, setSubPlanList] = useState([]);
    const { id } = useParams();
    const [planName, setPlanName] = useState("");

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        axios.get(`${IP_ADDRS}/subscription/plan/${id}`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
            .then(res => {
                console.log(res.data);
                setPlanName(res.data.name);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`${IP_ADDRS}/subscription/getAllCustomerSubscribedToSubPlanId/${id}`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
            .then(res => {
                console.log(res.data);
                setSubPlanList(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Something went Wrong", "", "error")
            })
    }, [])

    return (
        <>
            <div className="container my-4">
                <div>
                    <h3>Plan : {planName}</h3>

                    <table className="table table-bordered" style={{ textAlign: "center" }}>
                        <thead className="bg-dark text-light">
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Name</th>
                                <th style={{ width: 400 }}>Start Date</th>
                                <th>End Date</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subPlanList.map((v, i) => {
                                return (
                                    <tr key={v.id}>
                                        {/* <td>{v.id}</td> */}
                                        <td>{v.custFirstName} {v.custLastName}</td>
                                        <td>{v.startDate}</td>
                                        <td>{v.endDate}</td>
                                        <td>{v.line1} {v.line2},
                                            {v.city}{v.pincode},
                                            {v.state}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default CustomerSubscribedList;