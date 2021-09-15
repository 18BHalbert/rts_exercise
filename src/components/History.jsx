import React from 'react';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            historyList: props.history
        };
        this.showResults = this.showResults.bind(this);
    }

    render() {
        return (
            <div className="home">
                <div class="container">
                    <button onClick={this.showResults} >Show History</button>
                    <div id="historyList" class="row align-itetems-center my-5">
                    </div>
                </div>
            </div>
        );
    }

    //displayd ordered list of searches, assuming there are any
    showResults() {
        let result = document.getElementById("historyList");
        let resultList = document.createElement("ul");

        //checks if any searched have been saved
        if (!this.state.historyList[0]) {
            alert("no searches have been saved")
        }
        else {
            for (let i = 0; i < this.state.historyList.length; i++) {
                let newResultHolder = document.createElement("li");
                newResultHolder.innerHTML = this.state.historyList[i];
                resultList.appendChild(newResultHolder);
            }
            result.appendChild(resultList);
        }
    }
}
export default History;