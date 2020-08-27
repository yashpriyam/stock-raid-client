import React, { useContext } from 'react';
import CustomButton from '../helpers/custom-button/custom-button.component';
import UserStocksContext from '../contexts/user-stocks.contexts';

const SellStock = (props) => {
    
    const { numberOfStocksToSell, cancelSell } = props;
    const { userStock, userWalletDetails, stockList } = useContext(UserStocksContext);
    const stockBeingSold = stockList.filter(stock => stock.stockname === userStock.stockName);
    const amountAddedToWallet = stockBeingSold[0].pershareprice * numberOfStocksToSell;
    const updatedPerSharePrice = (stockBeingSold[0].pershareprice * stockBeingSold[0].availablestocks)/(stockBeingSold[0].totalstocks - Number(numberOfStocksToSell));
    console.log(updatedPerSharePrice);
    console.log(stockBeingSold[0].pershareprice);
    console.log(stockBeingSold[0].availablestocks);
    console.log(stockBeingSold[0].totalstocks);
    console.log(Number(numberOfStocksToSell));
    console.log(stockBeingSold[0].pershareprice);
    
    
    // console.log(stockBeingSold[0].stockname, userWalletDetails.email, stockBeingSold[0].id);
    
    const sellConfirm = async (event) => {
        event.preventDefault();
        console.log('purchase handler');
        try {
            const walletUpdate = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/wallet/${userWalletDetails.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletBalance: userWalletDetails.walletBalance + amountAddedToWallet,
                })
            });
            console.log('purchase handler2');
            const walletUpdateJson = await walletUpdate.json();
            console.log(walletUpdateJson);
            // console.log(updatedPerSharePrice);
            
            const stockUpdate = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/stocks/${stockBeingSold[0].id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pershareprice: Number(updatedPerSharePrice),
                    availablestocks: Number(stockBeingSold[0].availablestocks) + Number(numberOfStocksToSell)
                })
            });
            console.log('purchase handler3');
            const stockUpdateJson = await stockUpdate.json();
            // console.log(stockUpdateJson);
            // console.log(numberOfStocksToSell);
            
            const userStocks = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/userStocks/${userStock.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stockName: stockBeingSold[0].stockname,
                    numberOfStocks: userStock.numberOfStocks - numberOfStocksToSell,
                })
            });
            console.log('pur hand 4')
            const userStocksJson = await userStocks.json();
            await cancelSell();
            console.log(userStocksJson);
            
        } catch (error) {
            const err = new Error('Transaction failed', 500);
            return err;
        }
    };
    const cancelButton = () => {
        cancelSell();
    }
    return (
        <>
        <h3>Stocks being Sold: {numberOfStocksToSell}</h3>
        <h3>Value of Stocks {amountAddedToWallet}</h3>
        <h3>Wallet Balance After Sell {userWalletDetails.walletBalance + amountAddedToWallet}</h3>
        <CustomButton onClick={sellConfirm}>CONFIRM</CustomButton>
        <CustomButton onClick={cancelButton}>CANCEL</CustomButton>
        </>
    )
}

export default SellStock;