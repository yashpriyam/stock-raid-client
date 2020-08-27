import { createContext } from 'react';


const AllStocksContext = createContext({
    stock: {},
    userWalletDetails: {}
});

export default AllStocksContext;