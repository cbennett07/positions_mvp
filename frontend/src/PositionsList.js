import Position from "./Position";

const PositionsList = (props)=>{
    let origValue=0;
    const positionsList = props.positions.map(position => {
        origValue += (position.shares * position.price);
        return <Position key={position.id}
                         position={position}
                         fetchPositions={()=>props.fetchPositions()}
                         addToCurrentValue={addToCurrentValue}
        />
    });


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



    function addToCurrentValue(numToAdd){
         // currentTotalValue+=numToAdd;
         //  console.log("added to current total " + currentTotalValue)
    }

    return(
        <div align={'left'} className={'block text-gray-700 text-xl font-bold mb-2 w-80'}>
            <div className='shadow-xl rounded-xl px-8 pt-6 pb-8 mb-0 bg-gray-500 text-white rounded-b-none '>
                Positions
                {positionsList}
            </div>
            <div className='text-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 bg-gray-900  rounded-t-none'>
                Total invested:<br /> $ {formatNumber(origValue)}<br /><br />
                Total current value:<br /> $ {positionsList.currentTotalValue}
            </div>
        </div>
    )
}

export default PositionsList;