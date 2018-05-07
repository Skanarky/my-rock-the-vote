import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";

import About from "./pages/About.js";
import Home from "./pages/Home.js";
import IssueList from "./pages/IssuesList/IssuesList.js";

const App = () => {
    return (
        <div className="wrapper">
            <Header></Header>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/issues" component={IssueList}></Route>
                <Route path="/about" component={About}></Route>
            </Switch>
            <Footer></Footer>
        </div>
    )
}

export default App;

