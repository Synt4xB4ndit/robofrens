import React, { useState, useEffect } from "react";
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
function App() {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
        console.log(count)
    }, [count]) // only  run if count changes 

    //create an event from the search change. 
    //every time a search changes we get an event
    // we can console.log this event
    const onSearchChange = (event) => {
        // always call it like BELOW to change state
        setSearchfield(event.target.value)
    }
    // with event we ALWAYS have event.target.value !

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
                <button onClick={() => setCount(count + 1)}>Click Me</button>
                <Searchbox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <Cardlist robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>

        )
};

export default App;
