import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer,MDBIcon} from 'mdbreact';
import FirebaseDB from "../../Firebase";
import Swal from 'sweetalert';
import firebase from 'firebase';

class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.userUpdate = this.userUpdate.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            users: [],
            rows: [],
            columns: [
                
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Contact',
                    field: 'contact'
                },
                {
                    label: 'Address',
                    field: 'address'
                },
                {
                    label: 'Role',
                    field: 'role'
                },
                {
                    label: 'Site',
                    field: 'site'
                }
            ]

        }

    }//end of constructor

    onClick() {

        console.log("click");

        this.props.history.push("/signup");
    };
    userUpdate(e) {

        console.log(e.target.id);
        this.props.history.push("/userUpdate/"+e.target.id);

    };

    deleteUser(e){
        const id = e.target.id;

        // var user = firebase.auth().deleteUser(id).then(function() {
        //     console.log("Successfully deleted user");
            FirebaseDB.database().ref('User').child(id).set(null)
            .then(response => {
                Swal("Success !", "User Deleted Sucessfully !!", "success");
                window.location.reload();
            }).catch(err=>{
                Swal("Error !", "User delection denied !!", "error");
            })
        // })
        // .catch(function(error) {
        //     console.log("Error deleting user:", error);
        // });
        
    }



    componentDidMount() {
        const userRef = FirebaseDB.database().ref('User');
        userRef.on('value', (snapshot) => {
            var users = snapshot.val();
            var newusers = [];
            for (let user in users) {
                newusers.push({
                    name: users[user].name,
                    phoneNo: users[user].phoneNo,
                    address: users[user].address,
                    role: users[user].role,
                    site: users[user].siteName,
                    action:<div><MDBBtn color="success" size="sm" id={user} onClick={this.userUpdate}><MDBIcon icon="user-edit" /></MDBBtn><MDBBtn color="danger" size="sm" id={user} onClick={this.deleteUser}><MDBIcon icon="user-slash" /></MDBBtn></div>
                    
                });
            }
            this.setState({
                rows: newusers,
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
        const userRef = FirebaseDB.database().ref('User');
        userRef.on('value', (snapshot) => {
            var users = snapshot.val();
            var newusers = [];
            for (let user in users) {
                newusers.push({
                    name: users[user].name,
                    phoneNo: users[user].phoneNo,
                    address: users[user].address,
                    role: users[user].role,
                    site: users[user].siteName,
                    action:<div><MDBBtn color="success" size="sm" id={user} onClick={this.userUpdate}><MDBIcon icon="user-edit" /></MDBBtn><MDBBtn color="danger" size="sm" id={user} onClick={this.deleteUser}><MDBIcon icon="user-slash" /></MDBBtn></div>
                    
                });
            }
            this.setState({
                rows: newusers,
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

export default UserPage;