import {Component} from "react";
import axios from "axios";

class CreatePosition extends Component {
    constructor(props){
        super(props)

        this.state={
            id: 0,
            ticker: '',
            shares: 0.0,
            price: 0.0,
            purchaseDate: '',

        }
    }

    onChangeTickerName(e)
    {
        this.setState({ticker: e.target.value}, () => {});
    }
    onChangeSharesAmount(e)
    {
        this.setState({shares: e.target.value}, () => {});
    }
    onChangePrice(e)
    {
        this.setState({price: e.target.value}, () => {});
    }
    onChangePurchaseDate(e)
    {
        this.setState({purchaseDate: e.target.value}, () => {});
    }
    handleSubmitClicked()
    {
        const postVar = {
            ticker: this.state.ticker,
            shares: Number.parseFloat(this.state.shares),
            price: Number.parseFloat(this.state.price),
            purchaseDate: this.state.purchaseDate.toString(),

        }
        const emptyVar = {
            ticker: '',
            shares: 0.0,
            price: 0.0,
            purchaseDate: '',
        }
        console.log(postVar);
        axios.post("http://localhost:3001/position/", postVar)
            .then(() => this.props.fetchPositions())
            .then(()=>console.log("posted new position!"))
            .catch(()=>console.log("DID NOT POST!"))
            .finally(()=>this.setState(emptyVar));
    }


    render() {
        return (
            <div className={'rounded-lg p-2 border-2 shadow-lg border-gray-700 p-1 m-1 bg-white'} align={"left"}>
                <div className={"block text-gray-700 text-l font-bold mb-2 italic"}>Add Position<br/> <br/>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                           htmlFor={"txtTicker"}>Ticker (stock symbol): </label>
                    <input
                        className={'shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                        id={"txtTicker"}
                        type={"text"}
                        value={this.state.ticker}
                        onChange={(e) => {
                            this.onChangeTickerName(e)
                        }}
                    />
                </div>
                <div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                               htmlFor={"txtShares"}>Number of Shares: </label>
                        <input
                            className={'shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                            id={"txtShares"}
                            type={"text"}
                            value={this.state.shares}
                            onChange={(e) => {
                                this.onChangeSharesAmount(e)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                           htmlFor={"txtPrice"}>Price at purchase (in USD): </label>
                    <input
                        className={'shadow appearance-none border border-blue-500 rounded w-20 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                        size="5"
                        id={"txtPrice"}
                        type={"text"}
                        value={this.state.price}
                        onChange={(e) => {
                            this.onChangePrice(e)
                        }}

                    /></div>
                <div><label className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor={"txtPDate"}>Purchase date: (yyyy-MM-dd HH:mm:ss) </label>
                    <input
                        className={'shadow appearance-none border border-blue-500 rounded w-60 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                        size="5"
                        id={"txtPDate"}
                        type={"text"}
                        value={this.state.purchaseDate}
                        placeholder="yyyy-MM-dd HH:mm:ss"
                        onChange={(e) => {
                            this.onChangePurchaseDate(e)
                        }}

                    /></div>
                <div className="m-2">
                    <button onClick={() => (this.handleSubmitClicked())}
                            className={'bg-blue-500 rounded hover:bg-blue-700 text-white w-20 shadow-md p-1'}
                    >Submit
                    </button>

                </div>

            </div>


        )


    }
}

export default CreatePosition;