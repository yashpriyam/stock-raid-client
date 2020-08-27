import { createContext } from 'react';


const UserStocksContext = createContext({
    stockData: {},
    userWalletDetails: {},
    stockList: {}
});

export default UserStocksContext;