import React from "react";

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <p className="text-center"> © {new Date().getFullYear()}, Product name</p>
        </footer>
    )
}

export default Footer;