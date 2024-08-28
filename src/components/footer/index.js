import React from "react";

import "./styles.scss";
import logo from "../../assets/images/news-logo.svg"

const Footer = () => {
    return (
        <div className="footer-main">
            <div className="logo-container"><img alt="NEWS Logo" src={logo} /></div>
            <div className="copyright-container">Copyright © 2024 NEWS</div>
        </div>
    )
}

export default Footer