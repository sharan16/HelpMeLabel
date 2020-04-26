import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Layout Components
import Navbar from "./components/layout/Navbar"

import Landing from "./components/landing/Landing"
import ImageLabeler from "./components/imagelabeler/ImageLabeler"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

const App = () => { 

  return (
      	<Router>
        	<Fragment>
          		<Navbar />
          		<Switch>
                    <Route exact path ='/' component = {Landing} />
                    <Route exact path ='/label' component = {ImageLabeler} />
                    <Route exact path ='/login' component = {Login} />
                    <Route exact path ='/signup' component = {Signup} />
          		</Switch>
        	</Fragment>
      	</Router>
)}

export default App;