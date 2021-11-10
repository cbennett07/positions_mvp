import {Component} from "react";

class PerformanceData extends Component {

    render() {
        let currentValue = {};
        if (this.props.localResponse.hasOwnProperty("Time Series (5min)")) {
            //split is for truncating the data and time label that is coming back in the feed.
            let closeStr = Object.entries(this.props.localResponse["Time Series (5min)"])[0][1]["4. close"]
            let timeStr = Object.entries(this.props.localResponse["Time Series (5min)"])[0].toString().split(",", 1)
            let currentTotalStr = (closeStr * this.props.numberShares) - (this.props.origPrice * this.props.numberShares)
            this.props.addToCurrentValue(currentTotalStr)
            currentValue = {
                lastClose: closeStr,
                lastTime: timeStr,
                numberShares: this.props.numberShares,
                currentTotalChange: currentTotalStr,
                currentChange: (closeStr) - (this.props.origPrice),
            };
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
                return <div className='text-green-600'>$ {returnVar} </div>
            } else {
                return <div className='text-red-600'>$ {returnVar} </div>
            }
        }

        function formatNumber(number) {
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

            return <div className='text-black'>$ {returnVar} </div>

        }

        return (
            <div
                className={'rounded-lg p-2 border-2 shadow-lg border-gray-700 bg-white block text-gray-700 text-md font-bold'}>Performance
                Data:
                <div align={'left'} className={'block text-gray-700 text-sm font-bold p-1 m-1 b-2'}>
                    Current price: {formatNumber(Number.parseFloat(currentValue.lastClose))}
                    (change) {formatNumberColor(currentValue.currentChange * 1)}<br/>
                    Current value of position: {formatNumber(currentValue.lastClose * currentValue.numberShares)}
                    (change) {formatNumberColor(currentValue.currentTotalChange * 1)}
                </div>
                <div align={'left'} className={'italic text-gray-500 text-xs'}>
                    data current as of {currentValue.lastTime} EST
                </div>
            </div>
        )
    }
}


export default PerformanceData;