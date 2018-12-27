import React, { Component } from 'react';
import { Target, User } from 'react-feather';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to="/">
                                <Target className="feather" />
                                Targets <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contacts">
                                <User className="feather" />
                                Contacts
                            </NavLink>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Bookmarks</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <User className="feather" />
                                Bob Thornton
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <Target className="feather" />
                                Williams & Son
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
