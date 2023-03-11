import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"


const CustomerOngoingList = () => {
    const [subPlanList, setSubPlanList] = useState([]);

    useEffect(() => {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        axios.get(`${IP_ADDRS}/customers/ongoingPlans/${cust.id}`, { headers: { "Authorization": `Bearer ${cust.jwt}` } })
            .then(res => {
                console.log(res.data);
                setSubPlanList(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Something went Wrong", "", "error");
            })
    }, [])

    return (
        <>
            <div className="container my-4">
                <div>
                    <h3>Ongoing Plans</h3>

                    <table className="table table-bordered" style={{ textAlign: "center" }}>
                        <thead className="bg-dark text-light">
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subPlanList.map((v, i) => {
                                return (
                                    <tr key={v.id}>
                                        {/* <td>{v.id}</td> */}
                                        <td><a href={`/subcription/plan/${v.planId}`}>{v.planName}</a></td>
                                        <td>{v.startDate}</td>
                                        <td>{v.endDate}</td>

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
export default CustomerOngoingList;