import React, { Component } from 'react';
import { Target, User } from 'react-feather';
import { NavLink } from 'react-router-dom';
import Bookmarks from './Bookmarks';

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
                    <Bookmarks />
                </div>
            </nav>
        );
    }
}

export default Sidebar;
