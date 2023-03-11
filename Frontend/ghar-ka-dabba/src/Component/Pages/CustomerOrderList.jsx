import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant"


const CustomerOrderList = () => {
    const [orderList, setOrderList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        axios.get(`${IP_ADDRS}/orders/getAllOrderByCustomerId/${cust.id}`, { headers: { "Authorization": `Bearer ${cust.jwt}` } })
            .then(res => {
                console.log(res.data);
                setOrderList(res.data);

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
                    <h3>All Orders Placed</h3>

                    <table className="table table-bordered" style={{ textAlign: "center" }}>
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Id</th>
                                <th>DateTime</th>
                                <th>Plan </th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((v, i) => {
                                return (
                                    <tr key={v.id}>
                                        <td>{v.id}</td>
                                        <td>{v.dateTime}</td>
                                        <td><a href={`/subcription/plan/${v.planIds}`}>{v.name}</a></td>

                                        <td>{v.price}</td>
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
export default CustomerOrderList;