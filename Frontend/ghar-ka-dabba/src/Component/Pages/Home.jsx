import React from "react";
import Slider from "../Carousal/slider";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import Footer from "../Footer/Footer";
import Cards from "../Card/VendorCards";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Slider />
      <div className="container">
        <h2 style={{ margin: "25px" }}>Vendors</h2>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
