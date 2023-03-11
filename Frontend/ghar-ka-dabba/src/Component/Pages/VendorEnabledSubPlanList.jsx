import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"


const VendorEnabledSubPlanList = () => {
    const [subPlanList, setSubPlanList] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        axios.get(`${IP_ADDRS}/vendors/getAllAvaliablePlanByVendorId/${ven.id}`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
            .then(res => {
                console.log(res.data);
                setSubPlanList(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Something went Wrong", "", "error")
            })
    }, [refreshFlag])

    const makeAvaliable = (d) => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        axios.get(`${IP_ADDRS}/subscription/${d.id}/activate`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
            .then(res => {
                setRefreshFlag(~refreshFlag);
            }).catch(err =>
                swal("Unable to Enable", "", "error")
            );
    }

    const makeUnAvaliable = (d) => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        axios.get(`${IP_ADDRS}/subscription/${d.id}/deactivate`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
            .then(res => {
                setRefreshFlag(~refreshFlag);
            }).catch(err =>
                swal("Unable to Disable", "", "error")
            );
    }


    return (
        <>
            <div className="container my-4">
                <div>
                    <h3>All Enabled Subscription Plans</h3>

                    <table className="table table-bordered" style={{ textAlign: "center" }}>
                        <thead className="bg-dark text-light">
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Name</th>
                                <th style={{ width: 400 }}>Description</th>
                                <th>Plan Type</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {subPlanList.map((v, i) => {
                                return (
                                    <tr key={v.id}>
                                        {/* <td>{v.id}</td> */}
                                        <td><a href={`/subcription/plan/${v.id}`}>{v.name}</a></td>
                                        <td>{v.description}</td>
                                        <td>{v.planType}</td>
                                        <td>{v.price} /-   </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => navigate(`/showSubscribedCustomers/${v.id}`)}>Customers</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => navigate(`/editSubscriptionPlan/${v.id}`)}>Edit</button>
                                        </td>

                                        <td>
                                            {v.avaliable ? (<button className="btn btn-danger" onClick={() => makeUnAvaliable(v)}>Disable</button>) : (<button className="btn btn-primary" onClick={() => makeAvaliable(v)}>Enable</button>)}
                                        </td>
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
export default VendorEnabledSubPlanList;