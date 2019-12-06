import React from 'react';
import logo from "../assets/new_logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {




    let logged = sessionStorage.getItem('loggedIn');
            let type = sessionStorage.getItem('UserType');
            if (logged === 'true') {

            return (
                <div className="sidebar-fixed position-fixed">
                    <a href="#!" className="logo-wrapper waves-effect">
                        <img alt="MDB React Logo" className="img-fluid" src={logo}/>
                    </a>
                    <MDBListGroup className="list-group-flush">
                        <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="chart-pie" className="mr-3"/>
                                Dashboard
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/supplier" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="user" className="mr-3"/>
                                Supplier
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/users" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="user-friends" className="mr-3"/>
                                Users
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/signup" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="user-plus" className="mr-3"/>
                                Add Users
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/sites" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="sitemap" className="mr-3"/>
                                Sites
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/404" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="exclamation" className="mr-3"/>
                                404
                            </MDBListGroupItem>
                        </NavLink>
                    </MDBListGroup>
                </div>
            );
            }else{
                return(
                    <div></div>
                )
            }
}

export default TopNavigation;