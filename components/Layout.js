/* /components/Layout.js */
import React, { useContext } from "react";
import Head from "next/head";

import {
	Container,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";

const Layout = (props) => {
  const title = "homes";
  const { user, setUser } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>{title} </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <NavLink href="/" className="nav-link-lg">Home</NavLink>
          </NavItem>

          <NavItem className="ml-auto">
            {user ? (
              <h5 className="nav-link-text">{user.username}</h5>
            ) : (
              <NavLink href="/register">Sign up</NavLink>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <NavLink href="/"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}>Logout</NavLink>
            ) : (
              <NavLink href="/login">Sign in</NavLink>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;