import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import FirebaseDB from "../../Firebase";
import firebase from "firebase";
import UserCreation from "./UserCreation";
import Swal from 'sweetalert';


class LoginPage extends Component{

  constructor(props) {
    super(props);

    this.database = FirebaseDB.database().ref().child('User');

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      msg:''
    }
      
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

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);

    
     const user = {
        email: this.state.email,
        password: this.state.password
    }


    if (this.state.email !== '' && this.state.email !== null) {
        if (this.state.password !== '' && this.state.password !== null) {


          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(response=>{

            console.log(response.user);

            const userRef = FirebaseDB.database().ref('User').child(response.user.uid);
            userRef.on('value', (snapshot) => {
                  var users = snapshot.val();
                  sessionStorage.setItem('loggedIn', 'true');
                    sessionStorage.setItem('UserID', users.uid);
                    sessionStorage.setItem('UserName',users.name);
                    sessionStorage.setItem('UserEmail', users.email);
                    sessionStorage.setItem('UserRole', users.userRole);

                    this.setState({
                      name: '',
                      password: '',
                      msg:''
                          
                    });
          
                  Swal("Success !", "Login Successfull !", "success");
                  this.props.history.push("/dashboard");
                    let{history} = this.props;
                    history.push({
                        pathname:'/dashboard',
                        state: {detail : users}
                    });
                    window.location.reload();
                  console.log(users);
              });
            // this.database.child(response.user.uid).set(user)
            // .then(response => {

            //   let UserData = response.data;

            //         sessionStorage.setItem('loggedIn', 'true');
            //         sessionStorage.setItem('UserID', UserData.user[0].uid);
            //         sessionStorage.setItem('UserName', UserData.user[0].name);
            //         sessionStorage.setItem('UserEmail', UserData.user[0].email);
            //         sessionStorage.setItem('UserPassword', UserData.user[0].password);
            //         sessionStorage.setItem('UserRole', UserData.user[0].userRole);

            //         this.setState({
            //           name: '',
            //           password: '',
            //           msg:''
                
            //         });

            //       Swal("Success !", "Login Successfull !", "success");

            //       this.props.history.push("/");
            //         let{history} = this.props;
            //         history.push({
            //             pathname:'/',
            //             state: {detail : UserData}
            //         });
            //         window.location.reload();
            
          //   })
          // .catch(function(error) {
          //   console.log(error);
          //           this.setState({
          //               msg: 'Invalid Credentials'
          //           })

          //           Swal("Failed !", "Check Your Credentials", "error");
          // });
          
          })

        } else {
            this.setState({ msg: '***** Please Enter Password  *****' });
            Swal("Failed !", "Please Enter Password", "warning");
          }
      } else {
          this.setState({ msg: '***** Please Enter Username *****' });
          Swal("Failed !", "Please Enter Username", "warning");
      }
  }




          

  render(){
    return (

      
      <div class="row d-flex justify-content-center">

          <div class="col-md-9">
                
                                    <MDBContainer>
                                      <MDBRow>
                                        <MDBCol md="7">
                                          <MDBCard>
                                            <MDBCardBody className="mx-4">
                                              <div className="text-center">
                                                <h3 className="dark-grey-text mb-5">
                                                  <strong>Sign in</strong>
                                                </h3>
                                              </div>
                                              <MDBInput label="Your email" group type="email" value={this.state.email} onChange={this.onChangeEmail} validate error="wrong" success="right" />
                                              <MDBInput label="Your password" group type="password" value={this.state.password} onChange={this.onChangePassword} validate containerClass="mb-0" />
                                              <p className="font-small blue-text d-flex justify-content-end pb-3">
                                                Forgot
                                              <a href="#!" className="blue-text ml-1">
                                                Password?
                                              </a>
                                            </p>
                                            <div className="text-center mb-3">
                                              <MDBBtn type="button"  gradient="blue" rounded className="btn-block z-depth-1a" onClick={this.onSubmit}>
                                                Sign in
                                              </MDBBtn>
                                            </div>
                                            
                                          
                                          </MDBCardBody>
                                          <MDBModalFooter className="mx-5 pt-3 mb-1">
                                            <p className="font-small grey-text d-flex justify-content-end">
                                              Not a member?
                                              <a href="#!" className="blue-text ml-1"> Sign Up </a>
                                            </p>
                                          </MDBModalFooter>
                                        </MDBCard>
                                      </MDBCol>
                                    </MDBRow>
                                  </MDBContainer>
            </div>
        </div>                                     
        
  );
}
};

export default LoginPage;