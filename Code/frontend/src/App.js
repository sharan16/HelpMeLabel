import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Layout Components
import Navbar from "./components/layout/Navbar"

import ImageLabeler from "./components/imagelabeler/ImageLabeler"

const App = () => { 

  return (
      	<Router>
        	<Fragment>
          		<Navbar />
          		<Switch>
                    <Route exact path ='/label' component = {ImageLabeler} />
          		</Switch>
        	</Fragment>
      	</Router>
)}

export default App;