import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <Link to="https://www.facebook.com/" target="_blank" className="fa fa-facebook"></Link>
            <Link to="https://twitter.com/" target="_blank" className="fa fa-twitter"></Link>
            <Link to="https://www.instagram.com/" target="_blank" className="fa fa-instagram"></Link>
        </footer>
    )
}

export default Footer;