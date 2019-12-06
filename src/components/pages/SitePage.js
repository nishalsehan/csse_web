import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer,MDBIcon} from 'mdbreact';
import FirebaseDB from "../../Firebase";

class SupplierPage extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.seeUsers = this.seeUsers.bind(this);

        this.state = {
            sites: [],
            rows: [],
            columns: [
                
                
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Location',
                    field: 'location'
                },
                {
                    label: 'Contact',
                    field: 'contact'
                },
                {
                    label: 'Action',
                    field: 'action'
                }
            ]

        }

    }//end of constructor

    onClick() {

        console.log("click");

        this.props.history.push("/addSite");
    };
    seeUsers(e) {

        console.log(e.target.id);
        this.props.history.push("/siteUsers/"+e.target.id);

    };



    componentDidMount() {
        const siteRef = FirebaseDB.database().ref('Sites');
        siteRef.on('value', (snapshot) => {
            var sites = snapshot.val();
            var newsites = [];
            for (let site in sites) {
                newsites.push({
                    name: sites[site].name,
                    location: sites[site].location,
                    contact:sites[site].contact,
                    action:<MDBBtn color="purple" size="sm" id={site} onClick={this.seeUsers}><MDBIcon icon="users" /></MDBBtn>


                });
            }
            this.setState({
                rows: newsites,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };

    componentWillMount() {
        const siteRef = FirebaseDB.database().ref('Sites');
        siteRef.on('value', (snapshot) => {
            var sites = snapshot.val();
            var newsites = [];
            for (let site in sites) {
                newsites.push({
                
                    name: sites[site].name,
                    location: sites[site].location,
                    contact:sites[site].contact,
                    action:<MDBBtn color="purple" size="sm" id={site} onClick={this.seeUsers}><MDBIcon icon="users" /></MDBBtn>

                });
            }
            this.setState({
                rows: newsites,
            });
            this.setState({
                data: {
                    columns: this.state.columns,
                    rows: this.state.rows
                }
            });
        });
    };

    render() {

        return (

            <MDBContainer>

                <MDBRow>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                    </MDBCol>
                    <MDBCol sm="12" md="6" lg="3" className="mb-5">
                        <MDBBtn color="blue" onClick={this.onClick}>Add Sites</MDBBtn>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol sm="12" md="12" lg="12" className="mb-5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable
                                    striped
                                    hover
                                    data={this.state.data}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

        );//end of return
    };//end of render

}

export default SupplierPage;