import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";

import "./styles.scss"
import logo from "../../assets/images/news-logo.svg"
import menuDetails from "../../config/menu";

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(true)
    const [isMobileView, setIsMobileView] = useState(false)
    const [activeMenu, setActiveMenu] = useState("")

    const location = useLocation()

    const handleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu)
    }

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobileView(true)
            setShowMobileMenu(false)
        } else {
            setIsMobileView(false)
            setShowMobileMenu(true)
        }
    }

    const handlClickMenu = (e) => {
        setActiveMenu(e)

        if (isMobileView) {
            handleMobileMenu()
        }
    }

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const currentPath = location.pathname
        setActiveMenu(currentPath)
    }, [])

    return (
        <div className="header-main">
            <div className="logo-section">
                <div className="logo-container"><img alt="NEWS Logo" src={logo} /></div>
                <div className="icon-container" onClick={() => handleMobileMenu()}>{showMobileMenu ? <IoClose /> : <TbMenuDeep />}</div>
            </div>
            {showMobileMenu && (
                <div className="menu-container">
                    {menuDetails?.map(menu => {
                        return (
                            <NavLink className="menu-item" key={menu?.id} to={menu.url} onClick={() => { handlClickMenu(menu?.url) }}>
                                <div className={`menu ${menu?.url === activeMenu ? "active-menu" : ""}`}>{menu?.name}</div>
                            </NavLink>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Header