import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {


            let logged = sessionStorage.getItem('loggedIn');
            let type = sessionStorage.getItem('UserType');
            if (logged === 'true') {

                return (


                    

                        <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                            <MDBNavbarBrand href="">
                                <strong>Alexa</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick = { this.onClick } />

                            <MDBCollapse isOpen = { this.state.collapse } navbar>
                                <MDBNavbarNav left>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    <MDBNavbarBrand href="">
                                        <strong>{sessionStorage.getItem('UserName')}</strong>
                                    </MDBNavbarBrand>
                                    <MDBNavItem>
                                        <MDBNavLink to="/logout">Logout</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    
                );
            }else {
                return (
                    <div></div>
                );
            }
    }
}

export default TopNavigation;