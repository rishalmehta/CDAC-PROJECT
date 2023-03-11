import React, { useEffect, useState } from "react";
// import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Pages/Home";
import SignUp from "./Component/Pages/SignUp";
// import Footer from "./Component/Footer/Footer";
import VendorSubsList from "./Component/Pages/VendorSubsList";
import SubscriptionPlanDetails from "./Component/Pages/SubscriptionPlanDetails";
import Customer from "./Component/Pages/Customer";
import Login from "./Component/Pages/Login";
import Vendor from "./Component/Pages/Vendor";
import Admin from "./Component/Pages/Admin";
import ApprovedVendorList from "./Component/Pages/ApprovedVendorList";
import UnApprovedVendorList from "./Component/Pages/UnApprovedVendorList";
import BlockedVendorList from "./Component/Pages/BlockedVendorList";
import CustomerList from "./Component/Pages/CustomerList";
import ForgotPassword from "./Component/Pages/ForgotPassword";
import ChangePassword from "./Component/Pages/ChangePassword";
import UpdateVendor from "./Component/Pages/UpdateVendor";
import UpdateBasic from "./Component/Pages/UpdateBasic";
import UpdateCustomer from "./Component/Pages/UpdateCustomer";
import UpdateAddress from "./Component/Pages/UpdateAddress";
import UpdateProfilePicture from "./Component/Pages/UpdateProfilePicture";
import AddAddress from "./Component/Pages/AddAddress";
import AddSubscription from "./Component/Pages/AddSubscription";
import VendorSubPlanList from "./Component/Pages/VendorSubPlanList";
import VendorDisabledSubPlanList from "./Component/Pages/VendorDisabledSubPlanList";
import VendorEnabledSubPlanList from "./Component/Pages/VendorEnabledSubPlanList";
import EditSubscription from "./Component/Pages/EditSubscription";
import CustomerSubscribedList from "./Component/Pages/CustomerSubscribedList ";
import TiffinDetails from "./Component/Pages/TiffinDetails";
import CustomerOrderList from "./Component/Pages/CustomerOrderList";
import CustomerOngoingList from "./Component/Pages/CustomerOngoingList";

function App() {
  const [checkLoggedIn, setCheckLoggedIn] = useState();

  useEffect(() => {
    let cust = JSON.parse(sessionStorage.getItem("customer"));
    let ven = JSON.parse(sessionStorage.getItem("vendor"));
    let adm = JSON.parse(sessionStorage.getItem("admin"));
    if (cust !== null || ven !== null || adm !== null) setCheckLoggedIn(true);
    else setCheckLoggedIn(false);
  }, []);

  const updateLogin = (val) => {
    setCheckLoggedIn(val);
  };

  return (
    <Router>
      <Navbar signIn={checkLoggedIn} signOut={updateLogin} />
      <Routes>
        {/* Common Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route path="/sign-in" element={<Login isLogged={updateLogin} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/updateBasicDetails" element={<UpdateBasic />} />
        <Route path="/editAddress" element={<UpdateAddress />} />
        <Route path="/AddAddress" element={<AddAddress />} />
        <Route path="/uploadProfilePicture" element={<UpdateProfilePicture />} />
        <Route path="/tiffin/:spid/:id" element={<TiffinDetails />} />

        {/* Customer Routes */}
        <Route path="/vendor/:id" element={<VendorSubsList />} />
        <Route path="/subcription/plan/:spid" signIn={checkLoggedIn} element={<SubscriptionPlanDetails />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/updateCustomer" element={<UpdateCustomer />}></Route>
        <Route path="/viewCustOrder" element={<CustomerOrderList />}></Route>
        <Route path="/customerCurrentPlan" element={<CustomerOngoingList />}></Route>

        {/* Vendor Routes */}
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/updateVendor" element={<UpdateVendor />} />
        <Route path="/addSubcriptionPlan" element={<AddSubscription />} />
        <Route path="/editSubscriptionPlan/:id" element={<EditSubscription />} />
        <Route path="/vendorAllPlans" element={<VendorSubPlanList />} />
        <Route path="/disabledPlans" element={<VendorDisabledSubPlanList />} />
        <Route path="/enabledPlans" element={<VendorEnabledSubPlanList />} />
        <Route path="/showSubscribedCustomers/:id" element={<CustomerSubscribedList />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/getAllApprovedVendors" element={<ApprovedVendorList />} />
        <Route path="/getBlockedVendors" element={<BlockedVendorList />} />
        <Route path="/getUnapprovedVendors" element={<UnApprovedVendorList />} />
        <Route path="/getAllCustomers" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;
