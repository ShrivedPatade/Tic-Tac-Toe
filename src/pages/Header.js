import React from "react";
function Header(props) {
    return (
        <header>
            <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid d-flex justify-content-center align-items-center">
                    <span className="navbar-brand mb-4 my-4 h1">{props.title}</span>
                </div>
            </nav>
        </header>
    );
}
export default Header;