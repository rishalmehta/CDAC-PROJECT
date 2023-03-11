import React, { useEffect } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElement";
import { useState } from "react";

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [cust, setCust] = useState();
  const [ven, setVen] = useState();
  const [adm, setAdm] = useState();

  useEffect(() => {
    setLoggedIn(props.signIn);
    setCust(JSON.parse(sessionStorage.getItem("customer")));
    setVen(JSON.parse(sessionStorage.getItem("vendor")));
    setAdm(JSON.parse(sessionStorage.getItem("admin")));
  }, [props.signIn]);

  const logout = () => {
    sessionStorage.clear();
    props.signOut(false);
  };

  return (
    <>
      {loggedIn ? (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "50px" }}>
          <div className="container-fluid">
            <div>
              <NavMenu>
                <NavLink to="/">gharkadabba</NavLink>
              </NavMenu>
            </div>
            <div align="right">
              <NavMenu>
                {cust != null ? <NavLink to="/customer">{cust.firstName}</NavLink> : ven != null ? <NavLink to="/vendor">{ven.firstName}</NavLink> : adm != null ? <NavLink to="/admin">{adm.firstName}</NavLink> : ""}
                <NavLink onClick={logout} to="/">
                  Logout
                </NavLink>
              </NavMenu>
            </div>
          </div>
        </Nav>
      ) : (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "50px" }}>
          <div className="container-fluid">
            <div>
              <NavMenu>
                <NavLink to="/">gharkadabba</NavLink>
              </NavMenu>
            </div>
            <div align="right">
              <NavMenu>
                <NavLink to="/sign-in">Sign in</NavLink>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </NavMenu>
            </div>
          </div>
        </Nav>
      )}
    </>
  );
};

export default Navbar;
