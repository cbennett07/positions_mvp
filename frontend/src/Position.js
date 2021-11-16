import {Component} from "react";
import axios from "axios";
import PerformanceData from "./PerformanceData";

class Position extends Component {
    constructor(props){
        super(props)
        this.state={
            position: this.props.position,
            id: this.props.positionId,
            ticker: this.props.position.ticker,
            shares: this.props.position.shares,
            price: this.props.position.price,
            purchaseDate: this.props.position.purchaseDate,
            localResponse: {},
            companyName: '',

        };
    }

    componentDidMount() {
        this.fetchCurrentValue();
    }

     fetchCurrentValue(){
         // GET CURRENT STOCK VALUE
         // will retrieve response from API and put into localResponse in state
        let reqURL =    "https://www.alphavantage.co/query" +
                        "?function=TIME_SERIES_INTRADAY&symbol=" + this.state.ticker +
                        "&interval=5min&apikey=RNLIQB6QILDNRPVZ";
        axios.get(reqURL,()=>{})
            //.then(response=>console.log(response.data))
            .then(response=>{this.setState({localResponse : response.data})})
            //add currentValue to table for recall
            .then(()=>this.addToCurrentValueTable())
            .finally(()=>{this.props.fetchPositions()});

         // GET COMPANY INFO
         // will retrieve and set company name in state
         console.log("making call to API");
         let infoURL =      "https://www.alphavantage.co/query" +
                            "?function=OVERVIEW&symbol=" + this.state.ticker +
                            "&apikey=RNLIQB6QILDNRPVZ";
         axios.get(infoURL,()=>{})
             .then(response=>{this.setState({companyName : response.data["Name"]})})
             .finally(()=>{console.log("found " + this.state.companyName)});
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


    formatNumber(number)
    {
        number = number.toFixed(2) + '';
        let x = number.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : ',';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

/// SUBMIT CLICKED
    handleSubmitUpdateClicked(){
        const patchVar = {
            ticker: this.state.ticker,
            shares:  this.state.shares,
            price: this.state.price,
            purchaseDate:  this.state.purchaseDate,
        }
        console.log(patchVar);
        console.log("started update...");
        axios.patch("http://localhost:3001/position/" + this.state.id, patchVar)
            .then(this.props.fetchPositions(),()=>{console.log("got positions.")})
            .catch((()=>console.log("patch did not work")));

    }
/// DELETE CLICKED

    handleDeleteClicked(){
        console.log("trying to delete position: " + this.state.ticker);
        axios.delete("http://localhost:3001/position/" + this.state.id, ()=>{})
            //.then(this.props.fetchPositions())
            .catch((()=>console.log("delete did not work")))
            .finally(this.props.fetchPositions());

    }
    addToCurrentValueTable(){
        let closeStr = Object.entries(this.state.localResponse["Time Series (5min)"])[0][1]["4. close"]
        let postVar={
            positionId: this.props.positionId,
            ticker: this.props.position.ticker,
            currentValue: (closeStr * this.state.shares)
        }
        //post currentValue, ticker, and positionId to my CurrentValue db
        axios.post("http://localhost:3001/currentValue/", postVar)
            .then(()=>console.log("posted new currentValue: " + postVar.currentValue))
            .catch(()=>console.log("DID NOT POST!"));

    }

    render() {
        return (
                <div className={'flex-column rounded-2xl w-80 p-2 border-2 shadow-2xl border-gray-700 p-1 m-1 bg-white'} >
                   <div className='block text-gray-700 text-sm font-bold mb-2'>
                       Company:<br />
                       <div className={"underline text-xl"}>{this.state.companyName}</div>
                   </div>

                    <div className={'flex-column'}>
                        <label  className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor={"txtId" + this.state.id} >Ticker: </label>
                        <input className={'text-lg shadow appearance-none border border-blue-500 rounded w-20 py-2 px-3 shadow-2xl text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                               id={"txtId" + this.state.id}
                               type={"text"} value={this.state.ticker}
                               onChange={(e)=>{this.onChangeTickerName(e)}}
                        />
                    </div>
                    <div>
                        <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                               htmlFor={"txtSh" + this.state.id} >Number of Shares (00.00): </label>
                        <input className={'text-lg shadow appearance-none border border-blue-500 rounded w-20 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                               type={"text"}
                               id={"txtSh" + this.state.id}
                               onChange={(e) => {this.onChangeSharesAmount(e)}}
                               value={this.state.shares}
                        /></div>

                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                               htmlFor={"txtPrice" + this.state.id} >Price ($0.00 in USD): </label>
                        <input className={'text-lg shadow appearance-none border border-blue-500 rounded w-20 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                               size="5"
                               id={"txtPrice" + this.state.id}
                               type={"text"}
                               value={this.state.price}
                               onChange={(e)=>{this.onChangePrice(e)}}

                        /></div>
                    <div><label className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor={"txtDate" + this.state.id} >Purchase date: (yyyy-MM-dd HH:mm:ss)</label>
                        <input  className={'text-lg shadow appearance-none border border-blue-500 rounded w-60 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'}
                                size="5"
                                id={"txtDate" + this.state.id}
                                type={"text"}
                                value={this.state.purchaseDate}
                                onChange={(e)=>{this.onChangePurchaseDate(e)}}

                        /></div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'
                                >Purchase price: $ {this.formatNumber(this.state.shares*this.state.price)}
                                </label>
                            </div>
                            <div>
                                <PerformanceData localResponse={this.state.localResponse}
                                                 numberShares={this.state.shares}
                                                 origPositionTotal={this.state.shares*this.state.price}
                                                 origPrice={this.state.price}
                                                 addToCurrentValue={this.props.addToCurrentValue}
                                                 currentValueId={this.state.id}
                                                 ticker={this.state.ticker}
                                />
                            </div>
                    <div className="m-2">   &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={()=>(this.handleSubmitUpdateClicked())}
                                className={'bg-blue-500 rounded hover:bg-blue-700 text-white text-lg w-20 shadow-md p-1'}
                        >Update</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={()=>(this.handleDeleteClicked())}
                                className={'bg-blue-500 rounded hover:bg-red-700 text-white text-lg w-20 shadow-md p-1'}
                        >Delete</button>
                    </div>
                </div>

        )
    }
}

export default Position;