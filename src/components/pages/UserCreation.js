import React,{Component} from "react";
import { MDBContainer,MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import FirebaseDB from "../../Firebase";
import firebase from "firebase";
import Swal from 'sweetalert';
import DropDown from './SiteDropdown';

class UserCreation extends Component {


    constructor(props) {
        super(props);

        this.database = FirebaseDB.database().ref().child('User');

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeSite = this.onChangeSite.bind(this);
        this.setRole = this.setRole.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            phoneNo: '',
            address:'',
            userRole:'admin',
            sites:[],
            site:'',
            siteName:''
        }

    }

    componentDidMount() {
        const siteRef = FirebaseDB.database().ref('Sites');
        siteRef.on('value', (snapshot) => {
            console.log(snapshot.val())
            var sites = snapshot.val();
            var newSites = [];
            for (let site in sites) {
                console.log(site)
                newSites.push({
                    id:site,
                    name: sites[site].name,
                    email: sites[site].location
                });
            }
            this.setState({
                sites: newSites,
            });
            
        });
    };

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

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeSite(e) {
        this.setState({
            site: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phoneNo: e.target.value
        });
    }

    setRole(event) {
    
        console.log(event.target.value);
        this.setState({
            userRole:event.target.value
        })
      }

      dropdownRow(){
        return this.state.sites.map(function(object, i){
           return <DropDown obj={object} key={i}/>
        });
     }

    onSubmit(e) {



        // console.log(this.state.userRole)
        // console.log("name : " + this.state.name + '\n' +
        //     "email : " + this.state.email + '\n' +
        //     "password : " + this.state.password + '\n' +
        //     "cPassword : " + this.state.cPassword + '\n'
        // );

        


        
        



        if (this.state.name !== '' && this.state.name !== null) {
            if (this.state.email !== '' && this.state.email !== null) {
                if (this.state.password !== '' && this.state.password !== null) {
                    if (this.state.address !== '' && this.state.address !== null) {
                        if(this.state.phoneNo !== '' && this.state.phoneNo !== null) {

                            
                                const siteRef = FirebaseDB.database().ref('Sites').child(this.state.site);
                                siteRef.on('value', (snapshot) => {
                                    var sites = snapshot.val();
                                    const userInfo = {
                                        name: this.state.name,
                                        email: this.state.email,
                                        address: this.state.address,
                                        phoneNo: this.state.phoneNo,
                                        role:this.state.userRole,
                                        site:this.state.site,
                                        siteName:sites.name
                                    };
                            
                                    console.log(userInfo.siteName);
                                    console.log(userInfo.address);
                                    console.log(userInfo.email);
                                    console.log(userInfo.phoneNo);

                                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(respose=>{

                                        console.log(respose.user)
                                            this.database.child(respose.user.uid).set(userInfo)
                                            .then(response => {
                                                   
                                                console.log(response);
                                                this.setState({
                                                    name: '',
                                                    email: '',
                                                    password: '',
                                                    address: '',
                                                    phoneNo:'',
                                                    userRole:'',
                                                    site:'',
                                                    siteName:''
                                                });
                
                                                Swal("Success !", "User Added Sucessfully !!", "success");
                
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                        
                                    
                                    }).catch(function(error) {
                                    // Handle Errors here.
                                    Swal("Failed !", "User registration fail !!", "error");
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    // ...
                                    });
                                });


                            
                        
                        }else {
                            Swal("Failed !", "Enter your phone number", "error");
                        }

                    } else {
                        Swal("Failed !", "Enter address", "error");
                    }
                } else {
                    Swal("Failed !", "Enter Password", "error");
                }
            } else {
                Swal("Failed !", "Enter Email", "error");
            }
        } else {
            Swal("Failed !", "Enter Name", "error");
        }
    }

    render(){
        return (
            <div class="row d-flex justify-content-center">

                    <div class="col-md-7">
                        <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" >
                                 <MDBCard>
                                        <MDBCardBody>
                                    <form>
                                        <p className="h4 text-center mb-4">Sign up</p>
                                            <label className="black-text">Your name: </label>
                                                <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                                            <br />
                                            <label  className="black-text">Your email: </label>
                                                <input type="email" id="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail}/>
                                            <br />
                                            <label className="black-text" >Password:</label>
                                                <input type="text" id="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                                            <br />
                                            <label className="black-text">Phone number: </label>
                                                <input type="number" id="number" className="form-control" value={this.state.phoneNo} onChange={this.onChangePhone}/>
                                            <br />
                                            <label className="black-text" >Address: </label>
                                                <textarea id="address" className="form-control"  value={this.state.address} onChange={this.onChangeAddress}></textarea>
                                            <br/>
                                            <div>
                                                <label className="black-text" >Select User Role: </label>
                                                <br/>
                                                
                                                <div >
                                                    <input type="radio" id="role" value="admin" name="role" checked={this.state.userRole=='admin'} onChange={this.setRole}/> Admin
                                                    <br/>
                                                    <input type="radio" id="role" value="site_manager" name="role" onChange={this.setRole}  checked={this.state.userRole=='site_manager'}/> Site-Manager
                                                    <br/>
                                                    <input type="radio" id="role" value="supervisor" name="role" onChange={this.setRole} checked={this.state.userRole=='supervisor'}/> Supervisor
                                                    <br/>
                                                    <input type="radio" id="role" value="accountant" name="role" onChange={this.setRole} checked={this.state.userRole=='accountant'}/> Accountant
                                                
                                                </div>
                                            </div>
                                            <br/>

                                            <label className="black-text" >Address: </label>
                                                <select id="address" className="form-control"  value={this.state.site} onChange={this.onChangeSite}>
                                                <option selected className="form-control" value="">Select the Station</option>
                                                    {  this.dropdownRow()  }
                                                </select>
                                            <br/>

                                            <div className="text-center mt-4">
                                                    <MDBBtn color="success" type="button" onClick={this.onSubmit}>Register</MDBBtn>
                                            </div>
                                            
                                    </form>
                                    </MDBCardBody>
                                    </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        </MDBContainer>
                        </div>
            </div>
        
    );
}
};

export default UserCreation;