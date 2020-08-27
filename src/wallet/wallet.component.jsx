import React, { useState, useContext } from 'react';
import CustomButton from '../helpers/custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import UserDetailContext from '../contexts/user-detail.contexts';
import AllStocksContext from '../contexts/stock-detail.contexts';
import './wallet.styles.css';

const MoneyAdder = (props) => {
    const { cancelAdding } = props;
    const { userWalletDetails } = useContext(AllStocksContext);
    const [amountToAdd, setAmountToAdd] = useState('')
    
    const handleChange = event => {
        const { value } = event.target;
        setAmountToAdd(value);
    };
    const addMoney = async () => {
        if (amountToAdd <= 0) {
            const err = new Error('Enter correct amount to add');
            return err;
        }
        try {
            const walletUpdate = await fetch(`https://stock-raid-basic-server.herokuapp.com/api/wallet/${userWalletDetails.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletBalance: userWalletDetails.walletBalance + amountToAdd >= 0 ? userWalletDetails.walletBalance + amountToAdd : 0,
                })
            });
            const walletUpdateJson = await walletUpdate.json();
            console.log(walletUpdateJson);
            
        } catch (error) {
            const err = new Error('Transaction failed', 500);
            return err;
        }
    }

    const cancelButton = () => {
        cancelAdding();
        setAmountToAdd('');
    }
    return (
        <form onSubmit={addMoney}>
            <FormInput
                type='number'
                name='money'
                label='Enter Amount'
                value={amountToAdd}
                onChange={handleChange}
                min={0}
                max={1000000}
            />
            <CustomButton type='submit'>ADD</CustomButton>
            <CustomButton onClick={cancelButton}>CANCEL</CustomButton>
        </form>
    )
}
function Wallet() {
    // const walletDetails = JSON.parse(localStorage.getItem('userWalletDetails'))
    const { userWalletDetails } = useContext(AllStocksContext);
    const { walletBalance } = userWalletDetails;
    const [moreMoneyNeeded, setMoreMoneyNeeded] = useState(false);
    const addAmount = () => setMoreMoneyNeeded(true);

    const cancelAdding = () => {
        setMoreMoneyNeeded(false);
    }
    
    return (
        <div className='wallet-container wallet'>
            <h3>Wallet Details</h3>
            <h2>${walletBalance}</h2>
            <CustomButton onClick={addAmount}>Add More Money</CustomButton>
            {moreMoneyNeeded && <MoneyAdder cancelAdding={cancelAdding} />}
        </div>
    )
}

export default Wallet;