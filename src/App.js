import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home/Home";
import AddressList from "./components/pages/Address/AddressList";
import AddressEdit from "./components/pages/Address/AddressEdit";
import {Fragment} from "react";
import Header from "./components/Header/Header";

function App() {
    return (
        <Router>
            <Fragment>
                <Header/>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/addresses' exact={true} component={AddressList}/>
                    <Route path='/addresses/:id' exact={true} component={AddressEdit}/>
                </Switch>
            </Fragment>
        </Router>
    );
}

export default App;
