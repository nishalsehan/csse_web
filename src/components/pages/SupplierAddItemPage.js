import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";



class SupplierAddItemPage extends Component {



    render() {

        return (

            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <p className="h4 text-center mb-4">Add A Supplier</p>
                                    <label className="grey-text">
                                        Full Name
                                    </label>
                                    {/*<input*/}
                                    {/*    value={this.state.name}*/}
                                    {/*    onChange={this.onChangeName}*/}
                                    {/*    type="text"*/}
                                    {/*    id="name"*/}
                                    {/*    className="form-control"*/}
                                    {/*/>*/}
                                    <br/>
                                    <label className="grey-text">
                                        Email
                                    </label>
                                    {/*<input*/}
                                    {/*    value={this.state.email}*/}
                                    {/*    onChange={this.onChangeEmail}*/}
                                    {/*    type="email"*/}
                                    {/*    id="email"*/}
                                    {/*    className="form-control"*/}
                                    {/*/>*/}
                                    <br/>
                                    <label className="grey-text">
                                        Contact
                                    </label>
                                    {/*<input*/}
                                    {/*    value={this.state.contact}*/}
                                    {/*    onChange={this.onChangeContact}*/}
                                    {/*    type="text"*/}
                                    {/*    id="contact"*/}
                                    {/*    className="form-control"*/}
                                    {/*/>*/}
                                    <br/>
                                    <label className="grey-text">
                                        Address
                                    </label>
                                    {/*<input*/}
                                    {/*    value={this.state.address}*/}
                                    {/*    onChange={this.onChangeAddress}*/}
                                    {/*    type="text"*/}
                                    {/*    id="address"*/}
                                    {/*    className="form-control"*/}
                                    {/*/>*/}
                                    {/*<div className="text-center mt-4">*/}
                                    {/*    <MDBBtn color="indigo" type="button" onClick={this.onSubmit}>Add*/}
                                    {/*        Supplier</MDBBtn>*/}
                                    {/*</div>*/}
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );


    }


};


export default SupplierAddItemPage;