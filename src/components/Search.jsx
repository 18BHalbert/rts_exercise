import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            results: ''
        };
        this.searchAPI = this.searchAPI.bind(this);
    }

    //record search term for history
    recordSearch() {
        this.props.parentCallback(this.state.searchTerm);
    }
    
    render() {
        return (
            <div className="home">
                <div class="container">
                    <div class="row align-items-center my-5">
                        <div class="col-lg-7">
                            <input placeholder="search" onChange={(e) => this.setState({ searchTerm: e.target.value })} />
                            <button onClick={this.searchAPI} >Search</button>
                        </div>
                        <div class="col-lg-5">
                            <h1 class="font-weight-light">Search</h1>
                            <div id='results'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //take the search input and call the api, saving the returned object
    searchAPI() {
        const https = require('https');
        let data = '';
        let { searchTerm } = this.state;

        let request = 'https://hn.algolia.com/api/v1/search?query=' + {searchTerm}.searchTerm;

        https.get(request, (resp) => {

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                this.setState({ results: JSON.parse(data) })

                this.recordSearch(); //record search term
                try {
                    this.showResults();
                } catch (error) {
                    alert('Error: search may not have results to display')
                }
                
            });

        }).on("error", (err) => {
                        console.log("Error: " + err.message);
        });

    }

    // create an unordered list of the first ten results
    showResults() {

        let result = document.getElementById("results");
        let resultList = document.createElement("ul");
        resultList.id = "resultList";

        //remove previous search list
        try{
            result.removeChild(result.firstChild);
        } catch (error) {}

        //loops through the first ten results in the object
        for (let i = 0; i < 10; i++) {

            let newRusultHolder = document.createElement("li");
            let newResult = document.createElement("a");
            newResult.innerHTML = this.state.results.hits[i].title;
            newResult.href = this.state.results.hits[i].url;
            newRusultHolder.appendChild(newResult);
            resultList.appendChild(newRusultHolder);
        }

        result.appendChild(resultList);
	}
}

export default Search;