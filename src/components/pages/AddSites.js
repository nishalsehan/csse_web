import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';


class AddSites extends Component {


    constructor(props) {
        super(props);

        this.database = FirebaseDB.database().ref().child('Sites');

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            location: '',
            contact: '',
        }

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

   
    onSubmit(e) {


        


        const site = {
            name: this.state.name,
            location: this.state.location,
            contact: this.state.contact,
        };

        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.location !== '' && this.state.location !== null) {
                if (this.state.contact !== '' && this.state.contact !== null) {
                        this.database.push().set(site)
                            .then(response => {
                                console.log(response);

                                this.setState({
                                    name: '',
                                    location: '',
                                    contact: '',
                              });

                                Swal("Success !", "Supplier Added Sucessfull !", "success");

                            })
                            .catch(error => {
                                console.log(error);
                            });


                    
                } else {
                    Swal("Failed !", "Enter Contact", "error");
                }
            } else {
                Swal("Failed !", "Enter Location", "error");
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
                                    <p className="h4 text-center mb-4">Add Sites</p>
                                        <label className="grey-text">Site Name</label>
                                            <input value={this.state.name}  onChange={this.onChangeName}  type="text" id="name" className="form-control" />
                                    <br/>
                                        <label className="grey-text">Location </label>
                                            <textarea value={this.state.location} onChange={this.onChangeLocation}  id="location"  className="form-control"  ></textarea>
                                    <br/>
                                        <label className="grey-text">Contact </label>
                                        <input value={this.state.contact} onChange={this.onChangeContact} type="text"  id="contact" className="form-control" />
                                    <br/>
                                   
                                    <div className="text-center mt-4">
                                        <MDBBtn color="red" type="button" onClick={this.onSubmit}>Add Site</MDBBtn>
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


export default AddSites;