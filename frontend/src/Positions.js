import Position from "./Position";
import axios from "axios";
import {useEffect, useState} from "react";

const Positions = (props)=>{

    const [currentValues,setCurrentValues] = useState([]);

    //called on load, and when deps changes
    useEffect(()=>{
        setCurrentValues([]);
        Promise.all(props.positions.map(position => {
            return fetchCurrentValue(position.ticker)

        })).then(setCurrentValues)
        },[props.positions]
    )
    let originalCost=0;
    let origValue=0;
    let origPrice=0;

    let counter = 0;
    let altBG = "";

    let totalValue=0;
    let changeInValue=0;
    let totalChangeInValue=0;
    let totalCurrentValue=0;
    const singlePosition = props.positions.map((position, index) => {

        let currentValue=currentValues[index]||{}
        originalCost=0;
        changeInValue=0;
        counter+=1;
        origPrice = position.price;
        origValue += (position.shares * position.price);
        if(counter % 2){altBG="bg-gray-100"}else{altBG="bg-gray-200"}
        originalCost+=position.shares*position.price;
        totalCurrentValue += currentValue.currentValue*position.shares
        totalValue = currentValue.currentValue*position.shares
        changeInValue = totalValue-originalCost;
        totalChangeInValue += changeInValue;

        //DELETE FOR EACH ROW
        function handleDeleteClicked(){
            console.log("trying to delete position: " + position.ticker);
            axios.delete("http://localhost:3001/position/" + position.id, ()=>{})
                .then(props.fetchPositions())
                .catch((()=>console.log("delete did not work")))
                .finally(()=>props.fetchPositions());

        }

        return (
            <tr className={'text-md  border-l h-12'}>
                            <td className={altBG + ' text-left  m-2'}>{currentValue.companyName} ({position.ticker})</td>
                            <td className={altBG + ' text-center  m-2'}>{position.shares}</td>
                            <td className={altBG + ' text-right  m-2'} >$ {formatNumber(position.price*1)}</td>
                            <td className={altBG + ' text-right  m-2'} >$ {formatNumber(position.shares*position.price*1)}</td>
                            <td className={altBG + ' text-right  m-2'} >{position.purchaseDate}</td>
                            <td className={altBG + ' text-right  m-2'}>$ {formatNumber(currentValue.currentValue*1) }<div className={"text-sm text-gray-400"}>{currentValue.currPriceTime}</div></td>
                            <td className={altBG + ' text-right  m-2'}>$ {formatNumber(currentValue.currentValue*position.shares)} </td>
                            <td className={altBG + ' text-right  m-2'}> {formatNumberColor(changeInValue*1)}</td>
                            <td className={altBG + ' text-center  m-2'}>
                                <button onClick={() => (handleDeleteClicked())}
                                        className={'bg-blue-500 rounded hover:bg-red-700 text-white w-20 h-8 shadow-md p-1'}
                                >Delete
                                </button>
                            </td>
                        </tr>

                  )

    });

    async function fetchCurrentValue(myTicker){
        // GET CURRENT STOCK VALUE
        // will retrieve response from API and put into localResponse in state
        let reqURL =    "https://www.alphavantage.co/query" +
            "?function=TIME_SERIES_INTRADAY&symbol=" + myTicker +
            "&interval=5min&apikey=AGNZXEEGASUNVVFY";
        const response= await axios.get(reqURL)
        console.log(reqURL);
        let currValue={
            companyName:"",
            currentValue:0,
            currPriceTime: "",

        };
        //backup API key: RNLIQB6QILDNRPVZ
        let localResponse=response.data;
        if (localResponse.hasOwnProperty("Time Series (5min)")) {
            currValue.currentValue = Object.entries(localResponse["Time Series (5min)"])[0][1]["4. close"]
            currValue.currPriceTime = Object.entries(localResponse["Time Series (5min)"])[0].toString().split(",", 1)
        }

        // GET COMPANY INFO
        //will retrieve and set company name in state
        let infoURL =      "https://www.alphavantage.co/query" +
                            "?function=OVERVIEW&symbol=" + myTicker +
                            "&apikey=STZ20CML83M374XI";

        const responseTwo= await axios.get(infoURL)

        currValue.companyName = responseTwo.data["Name"];
        console.log("found " + currValue.companyName);

        return currValue;

    }

    function formatNumber(number)
    {

        number = number.toFixed(2) + '';
        let x = number.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function formatNumberColor(number) {
        number = number.toFixed(2) + '';
        let x = number.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : ',';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        let returnVar;
        returnVar = x1 + x2;

        if (number >= 0) {
            return <div className='text-green-700 font-bold'>$ {returnVar} </div>
        } else {
            return <div className='text-red-700 font-bold'>$ {returnVar} </div>
        }
    }

    return(

        <tbody className='border-2 border-gray-700 table-auto'>
                {singlePosition}
                <tr className={'bg-white text-md  border-l'}>&nbsp;</tr>
                <tr className={'bg-gray-300 text-md  border-l'}>
                    <td className={' text-left  m-2'}>Total: </td>
                    <td className={' text-center  m-2'}>&nbsp;</td>
                    <td className={' text-right  m-2 italic'} >Cost Basis-></td>
                    <td className={' text-right border-2 border-gray-600 m-2'} >$ {formatNumber(origValue)}</td>
                    <td className={' text-right  m-2'} >&nbsp;</td>
                    <td className={'text-right m-2 italic'}>Market Value-></td>
                    <td className={'text-right border-2 border-gray-600 m-2'}>$ {formatNumber(totalCurrentValue) }</td>
                    <td className={'text-right'}>{formatNumberColor(totalChangeInValue)}</td>
                    <td className={'text-center'}>
                        &nbsp;
                    </td>
                </tr>
        </tbody>
    )
}

export default Positions;