import React, { Component } from "react";
import Cardlist from "../components/Cardlist";
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";



// in order to use state we need to go back
// to how we originally did react components
// with class App extends
// once imported component can just use it

//class extends always has a render()

//We Are declaring a class / render
class App extends Component {
    constructor() {
        // super() always come before 'this'
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { this.setState({ robots: users }) });
    }



    //create an event from the search change. 
    //every time a search changes we get an event
    // we can console.log this event
    onSearchChange = (event) => {
        // always call it like BELOW to change state
        this.setState({ searchField: event.target.value })
    }
    // with event we ALWAYS have event.target.value !

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        //referring to the state of the app
        //what its currently doing, and then event
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className="tc">
                    <h1 className="f1">Robofrends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>

            )
    }
}

;

export default App;
