import React from 'react'
import {MDBCard, MDBCol, MDBRow, MDBCardBody, MDBBtn, MDBDataTable, MDBContainer, MDBCardHeader} from 'mdbreact';
import FirebaseDB from "../../Firebase";

class SiteUsers extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.addItem = this.addItem.bind(this);

        this.state = {
            siteId:'',
            users: [],
            rows: [],
            columns: [
                
                {
                    label: 'Name',
                    field: 'name'
                },
                {
                    label: 'Email',
                    field: 'email'
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
                }
            ]

        }

    }//end of constructor

    onClick() {

        console.log("click");

        this.props.history.push("/signup");
    };
    addItem(e) {

        console.log(e.target.id);
        this.props.history.push("/supplieradditem");

    };



    componentDidMount() {

        const { id } = this.props.match.params

        fetch(`http://localhost:3000/siteUsers/${id}`)
        .then((user) => {
            
            const userRef = FirebaseDB.database().ref('User');
            userRef.on('value', (snapshot) => {
            var users = snapshot.val();
            var newusers = [];
            for (let user in users) {
                console.log(users[user].site)
                console.log(this.state.siteId)
                if(users[user].site==id){
                    newusers.push({
                        name: users[user].name,
                        email: users[user].email,
                        phoneNo: users[user].phoneNo,
                        address: users[user].address,
                        role: users[user].role
                    });
                }
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
            this.setState({
                siteId:id
            })
        })


        
    };

    componentWillMount() {
        const userRef = FirebaseDB.database().ref('User');
        userRef.on('value', (snapshot) => {
            var users = snapshot.val();
            var newusers = [];
            for (let user in users) {
                

                if(users[user].site==this.state.siteId){
                    newusers.push({
                        name: users[user].name,
                        email: users[user].email,
                        phoneNo: users[user].phoneNo,
                        address: users[user].address,
                        role: users[user].role
                    });
                }
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
                            <MDBCardHeader>Site Users</MDBCardHeader>
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

export default SiteUsers;