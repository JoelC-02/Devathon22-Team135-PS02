import React, { useEffect, useState } from "react";
import "./Header.css";

function Header(props) {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 h3">
                <li><a href="/" className="nav-link px-2 text-white">Product name</a></li>
                </ul>
            </div>
            </div>
        </header>
    );
}

export default Header;