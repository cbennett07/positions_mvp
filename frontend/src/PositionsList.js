import Position from "./Position";
import axios from "axios";

const PositionsList = (props)=>{
    let currentTotalValue=0;
    let origValue=0;
    let currValue=0;
    let positionIdArray=[];
    const positionsList = props.positions.map(position => {
        origValue += (position.shares * position.price);
        return <Position key={position.id}
                         positionId={position.id}
                         position={position}
                         fetchPositions={()=>props.fetchPositions()}
                         addToCurrentValue={addToCurrentValue}
        />

    });
    function componentDidMount(){

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

    function getCurrentTotalValue(){
        console.log("in the get..." + currentTotalValue);
        return currentTotalValue;
    }

    function addToCurrentValue(numToAdd){
         currentTotalValue+=numToAdd;
         console.log("added to current total " + currentTotalValue)
    }

    return(
        <div className={'flex-none block text-gray-700 text-xl font-bold mb-2 w-100'}>
            <div className=' subpixel-antialiased rounded-2xl px-8 pt-6 pb-8 mb-0 text-5xl italic bg-green-800 text-white rounded-b-none '>
                Stock Tracker Lite
            </div>
            <div className='  px-8 pt-6 pb-8 mb-0 bg-green-800 text-2xl text-white rounded-t-none '>
                Positions
                {positionsList}
            </div>
            <div className=' text-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 bg-gray-900  rounded-t-none'>
                Total invested:<br /> $ {formatNumber(origValue)}<br /><br />
                Total current value:<br /> $ {()=>sumUpValuesForPositionId()}/{currentTotalValue}
            </div>
        </div>
    )
}

export default PositionsList;