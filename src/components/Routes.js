import React from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SupplierPage from './pages/SupplierPage';
import SupplierAddPage from './pages/SupplierAddPage';
import SupplierAddItemPage from './pages/SupplierAddItemPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import NotFoundPage from './pages/NotFoundPage';
import FormPage from './pages/LoginPage';
import SignUpPage from './pages/UserCreation';
import UserPage from './pages/UsersPage';
import SitePage from './pages/SitePage';
import AddSite from './pages/AddSites';
import SiteUsers from './pages/ViewSiteUsers';
import UserUpdate from './pages/UserUpdate';
import LoginPage from './pages/LoginPage';
import Logout from './pages/Logout';








class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={LoginPage}/>
                <Route path='/dashboard' component={DashboardPage}/>
                <Route path='/supplier' component={SupplierPage}/>
                <Route path='/supplieradd' component={SupplierAddPage}/>
                <Route path='/supplieradditem' component={SupplierAddItemPage}/>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/tables' component={TablesPage}/>
                <Route path='/404' component={NotFoundPage}/>
                <Route path='/login' component={FormPage}/>
                <Route path='/signup' component={SignUpPage}/>
                <Route path='/users' component={UserPage}/>
                <Route path='/sites' component={SitePage}/>
                <Route path='/addSite' component={AddSite}/>
                <Route path='/siteUsers/:id' component={SiteUsers}/>
                <Route path='/userUpdate/:id' component={UserUpdate}/>
                <Route path='/logout' component={Logout}/>




            </Switch>
        );
    }
}

export default Routes;
