import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <nav className="flex justify-end pa1">
        <p
          className="link dim black pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end pa1">
        <p
          className="link dim black pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="link dim black pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
}
