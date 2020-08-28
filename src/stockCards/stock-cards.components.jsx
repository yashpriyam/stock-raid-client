import React, { useState, useContext } from 'react';
import AllStocksContext from '../helpers/contexts/stock-detail.contexts';
import BuyStocks from '../stockComponents/buy-stocks.components';
import FormInput from '../helpers/form-input/form-input.component';
import CustomButton from '../helpers/custom-button/custom-button.component';
import './stock-cards.styles.css';
import '../App.css'

function StockCard() {
    const { stock, userWalletDetails } = useContext(AllStocksContext);
    const { stockname, stocksymbol, pershareprice } = stock;
    const value = Number(pershareprice);
    const [numberOfStocks, setNumberOfStocks] = useState('');
    const [isPurchaseAble, setIsPurchaseAble] = useState(false);
    const [currentWalletBalance, setCurrentWalletBalance] = useState('');
    const [totalCostOfPurchase, setTotalCostOfPurchase] = useState(0);
    const handleChange = event => {
        const { value } = event.target;
        setNumberOfStocks(value);
    };
    
    const buyStockFunction = () => {
        setCurrentWalletBalance(userWalletDetails.walletBalance);
        setTotalCostOfPurchase(pershareprice * Number(numberOfStocks));
        if (currentWalletBalance < totalCostOfPurchase) {
            alert(`You dont have enough balance in your wallet to make this transaction \n\n
            add ${totalCostOfPurchase - userWalletDetails.walletBalance} more to your wallet to do this transaction`);
            return;
        } else {
            currentWalletBalance >= totalCostOfPurchase ? setIsPurchaseAble(true) : setIsPurchaseAble(false);
            return isPurchaseAble;
        }
    };
    const cancelTransaction = () => {
        setIsPurchaseAble(false);
        setNumberOfStocks('')
    }
    // console.log(userWalletDetails);
    
    return (
        <div className='card-container'>
            <h3>{stockname}</h3>
            <h4>{stocksymbol}</h4>
            <h4>${value}</h4>
            <FormInput
                type='number'
                name='stockquantity'
                label='Number of stocks'
                value={numberOfStocks}
                onChange={handleChange}
            />
            <CustomButton onClick={buyStockFunction}>BUY</CustomButton>
            {
                isPurchaseAble &&
                <BuyStocks
                    stock={stock}
                    currentWalletBalance={currentWalletBalance}
                    totalCostOfPurchase={totalCostOfPurchase}
                    numberOfStocks={numberOfStocks}
                    cancelTransaction={cancelTransaction}
                />
            }
        </div>
    )
}

export default StockCard;
