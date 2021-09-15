import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Search, History, Home } from "./components";

/* used tutorial for Navigation reference
 * copied index.css for basic styling (since exercise isn't centered around design/UI)
 * https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/
 *
 */

class App extends React.Component {

    state = {
        historyList: []
    }

    //save search to list of previous searches
    handleCallback = (childData) => {
        this.state.historyList.push(childData);
    }

    render() {
        return (
        <div className="App">
            <Router>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                        <Route path="/history" exact component={() => <History history={ this.state.historyList } />} />
                        <Route path="/search" exact component={() => <Search parentCallback = {this.handleCallback}/>} />
                </Switch>
            </Router>
            </div>
            )
    };
}

export default App;