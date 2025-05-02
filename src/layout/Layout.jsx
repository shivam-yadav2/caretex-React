import React from 'react'
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";
const Layout = ({ children }) => {
    return (
        <div>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout