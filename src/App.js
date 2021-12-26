import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Fragment} from "react";
import Header from "./components/Header/Header";
import Home from "./components/pages/Home/Home";
import AddressList from "./components/pages/Address/AddressList";
import AddressEdit from "./components/pages/Address/AddressEdit";
import FitnessCenterList from "./components/pages/Fitness_center/FitnessCenterList";
import FitnessCenterEdit from "./components/pages/Fitness_center/FitnessCenterEdit";
import StaffList from "./components/pages/Staff/StaffList";
import StaffEdit from "./components/pages/Staff/StaffEdit";
import StaffAddToFC from "./components/pages/Staff/StaffAddToFC";
import StaffInFitnessCenterList from "./components/pages/Fitness_center/StaffInFitnessCenterList";

function App() {
    return (
        <Router>
            <Fragment>
                <Header/>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/addresses' exact={true} component={AddressList}/>
                    <Route path='/addresses/:id' exact={true} component={AddressEdit}/>
                    <Route path='/fitness_centers' exact={true} component={FitnessCenterList}/>
                    <Route path='/fitness_centers/:id' exact={true} component={FitnessCenterEdit}/>
                    <Route path='/fitness_centers/staff/:id' exact={true} component={StaffInFitnessCenterList}/>
                    <Route path='/staff/' exact={true} component={StaffList}/>
                    <Route path='/staff/:id' exact={true} component={StaffEdit}/>
                    <Route path='/staff/:id/add' exact={true} component={StaffAddToFC}/>
                </Switch>
            </Fragment>
        </Router>
    );
}

export default App;
