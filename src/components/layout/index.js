import React from "react"

import "./styles.scss";
import Header from "../header"
import Footer from "../footer"

const LayoutMain = ({ Component }) => {
    return (
        <div className="layout-main">
            <Header />
            <div className="layout-body">{Component}</div>
            <Footer />
        </div>
    )
}

export default LayoutMain