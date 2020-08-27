import React, { useContext } from 'react';
import CustomButton from '../helpers/custom-button/custom-button.component';
import UserDetailContext from '../helpers/contexts/user-detail.contexts';


const BuyStocks = (props) => {
    const { currentWalletBalance, totalCostOfPurchase, stock, numberOfStocks, cancelTransaction } = props;
    const updatedPerSharePrice = (stock.pershareprice * stock.availablestocks)/(stock.totalstocks - Number(numberOfStocks));
    const { userDetails } = useContext(UserDetailContext);
    console.log(userDetails);
    
    // console.log(userDetails, stock);
    const purchaseHandler = async (event) => {
        event.preventDefault();
        console.log('purchase handler');
        try {
            const walletUpdate = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/wallet/${userDetails.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletBalance: currentWalletBalance - totalCostOfPurchase,
                })
            });
            console.log('purchase handler2');
            const walletUpdateJson = await walletUpdate.json();
            console.log(walletUpdateJson);
            // console.log(updatedPerSharePrice);
            
            const stockUpdate = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/stocks/${stock.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pershareprice: (updatedPerSharePrice).toFixed(2),
                    availablestocks: stock.availablestocks - numberOfStocks
                })
            });
            console.log('purchase handler3');
            const stockUpdateJson = await stockUpdate.json();
            console.log(stockUpdateJson);

            const userStocks = await fetch('https://stock-raid-basic-server.herokuapp.com/api/userStocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userDetails.email,
                    stockName: stock.stockname,
                    numberOfStocks,
                    totalCostOfPurchase
                })
            });
            const userStocksJson = await userStocks.json();
            console.log(userStocksJson);
            await cancelTransaction();
            
        } catch (error) {
            const err = new Error('Transaction failed', 500);
            return err;
        }
    }
    const cancelButton = () => {
        cancelTransaction();
    };
    return (
        <>
        <div>
            <h2>{`Your current wallet balance: ${currentWalletBalance.toFixed(2)}`}</h2>
            <h2>{`Cost of this Purchase: $${totalCostOfPurchase.toFixed(2)}`}</h2> 
            <h2>{`Wallet Balance after this transaction: $${(currentWalletBalance - totalCostOfPurchase).toFixed(2)}`}</h2> 
            <h3>Click <h4>CONFIRM</h4> if you you wish to continue</h3>
        </div>
        <CustomButton onClick={purchaseHandler}>CONFIRM</CustomButton>
        <CustomButton onClick={cancelButton}>CANCEL</CustomButton>
        </>
    )
}

export default BuyStocks;