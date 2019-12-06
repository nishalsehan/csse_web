import React,{Component} from 'react';
import firebase from 'firebase';
export default class Logout extends Component{

    render(){


        firebase.auth().signOut().then(function() {

        }).catch(function(error) {
            console.log(error)
        });
            sessionStorage.setItem('loggedIn','false');
            sessionStorage.removeItem('UserID');
            sessionStorage.removeItem('UserName');
            sessionStorage.removeItem('UserEmail');
            sessionStorage.removeItem('UserPassword');
            sessionStorage.removeItem('UserType');

            let{history} = this.props;
            history.push({
                pathname:'/',
            });
            window.location.reload();

            
            return(
                <div></div>
            );

        // firebase.auth().signOut().then(function() {
        //     console.log('logged out')
        //     sessionStorage.setItem('loggedIn','false');
        //     sessionStorage.removeItem('UserID');
        //     sessionStorage.removeItem('UserName');
        //     sessionStorage.removeItem('UserEmail');
        //     sessionStorage.removeItem('UserRole');

            
        //     this.props.history.push("/");
        //             let{history} = this.props;
        //             history.push({
        //                 pathname:'/',
                        
        //             });
        //             window.location.reload();
        //   }).catch(function(error) {
        //     // An error happened.
        //   });

        
        // return(
        //     <div></div>
        // );
    }
}