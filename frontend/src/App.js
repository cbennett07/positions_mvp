import './App.css';
import {Component} from "react";
import axios from "axios";
import CreatePosition from "./CreatePosition";
import Positions from "./Positions";


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
        <div align={"center"} className="App content-center w-full bg-gradient-to-r from-black via-green-700 to-black h-full">
            &nbsp;
            <div className={'rounded-2xl p-2 h-1/4 border-2 shadow-2xl border-yellow-400 p-1 m-1 bg-white w-11/12 bg-green-700 bg-gradient-to-r from-black via-black to-black'}>
                <table className={' border-rounded  w-full content-center '}>
                    <tr className={'h-20'}>
                        <td align={"center"} className={"text-lg font-bold text-5xl text-white"}>
                            Stock Tracker Lite</td>
                        {/*<td className={"text-gray-700 text-lg font-bold text-3xl "}>*/}
                        {/*    Performance <div className={'text-sm italic text-gray-500'}> (as of 21-11-12 12:00:00 EST)</div></td>*/}
                    </tr>
                </table>

                <table className={' border-rounded  w-full content-center bg-white'}>
                    <tr className={'h-20'}>
                        <td align={"center"} className={"text-gray-700 text-lg font-bold text-3xl "}>
                            Current Positions</td>
                        {/*<td className={"text-gray-700 text-lg font-bold text-3xl "}>*/}
                        {/*    Performance <div className={'text-sm italic text-gray-500'}> (as of 21-11-12 12:00:00 EST)</div></td>*/}
                    </tr>
                    <tr >
                        <td align={"center"}>
                            <table className='rounded-xl m-2 p-2 border-2 border-gray-700 w-11/12'>
                                <thead className={'text-gray-700 text-md font-bold p-2 m-3 w-full '}>
                                    <th className={'text-left'}>Company</th>
                                    <th className={'text-right'}>Shares</th>
                                    <th className={'text-right'}>Price</th>
                                    <th className={'text-right'}>Original Cost</th>
                                    <th className={'text-right'}>Date Purchased</th>
                                    <th className={'text-right'}>Current Price</th>
                                    <th className={'text-right'}>Current Value</th>
                                    <th className={'text-right'}>(change)</th>
                                    <th className={'text-center'}>Delete Position</th>
                                </thead>
                                <Positions positions={this.state.positions}
                                           fetchPositions={()=>this.fetchPositions()}

                                />
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <CreatePosition positons={this.state.positions}
                            fetchPositions={()=>this.fetchPositions()}
            /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>);
    }
}
export default App;
