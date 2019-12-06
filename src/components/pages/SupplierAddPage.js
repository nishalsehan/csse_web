import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';


class SupplierAddPage extends Component {


    constructor(props) {
        super(props);

        this.database = FirebaseDB.database().ref().child('suppliers');

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            contact: '',
            address: ''
        }

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onSubmit(e) {


        console.log("name : " + this.state.name + '\n' +
            "email : " + this.state.email + '\n' +
            "contact : " + this.state.contact + '\n' +
            "address : " + this.state.address + '\n'
        );


        const supplier = {
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            address: this.state.address
        };

        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.email !== '' && this.state.email !== null) {
                if (this.state.contact !== '' && this.state.contact !== null) {
                    if (this.state.address !== '' && this.state.address !== null) {


                        this.database.push().set(supplier)
                            .then(response => {
                                console.log(response);

                                this.setState({
                                    name: '',
                                    email: '',
                                    contact: '',
                                    address: ''
                                });

                                Swal("Success !", "Supplier Added Sucessfull !", "success");
                                this.props.history.push("/");
                            })
                            .catch(error => {
                                console.log(error);
                            });


                    } else {
                        Swal("Failed !", "Enter Address", "error");
                    }
                } else {
                    Swal("Failed !", "Enter Contact", "error");
                }
            } else {
                Swal("Failed !", "Enter Email", "error");
            }
        } else {
            Swal("Failed !", "Enter Name", "error");
        }
    }


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
                                    <input
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        type="text"
                                        id="name"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Email
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        type="email"
                                        id="email"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Contact
                                    </label>
                                    <input
                                        value={this.state.contact}
                                        onChange={this.onChangeContact}
                                        type="text"
                                        id="contact"
                                        className="form-control"
                                    />
                                    <br/>
                                    <label className="grey-text">
                                        Address
                                    </label>
                                    <input
                                        value={this.state.address}
                                        onChange={this.onChangeAddress}
                                        type="text"
                                        id="address"
                                        className="form-control"
                                    />
                                    <div className="text-center mt-4">
                                        <MDBBtn color="indigo" type="button" onClick={this.onSubmit}>Add
                                            Supplier</MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );


    }
};


export default SupplierAddPage;