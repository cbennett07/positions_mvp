import './App.css';
import {Component} from "react";
import axios from "axios";
import CreatePosition from "./CreatePosition";
import PositionsList from "./PositionsList";

let currentTotalValue = 0;

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            positions: [],
            originalTotalValue: 0,
            currentTotalValue: 0,

        }
}
    componentDidMount() {
        this.fetchPositions();
    }


    fetchPositions(){
        console.log("fetching positions...")
        axios.get("http://localhost:3001/position")
            .then(response => this.setState({positions: response.data,}))
            .finally(()=>console.log("got positions!"));
    }

    render(){
      return (
        <div className="App background-black">
         Stock Tracker
            <PositionsList  positions={this.state.positions}
                            fetchPositions={()=>this.fetchPositions()}
            />
            <CreatePosition fetchPositions={()=>this.fetchPositions()}
            />
        </div>
      );
    }
}

export default App;
