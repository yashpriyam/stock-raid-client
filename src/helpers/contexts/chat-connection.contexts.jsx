import { createContext } from 'react';


const ConnectionContext = createContext({
    connection: null,
    updateConnection: () => {}
});

export default ConnectionContext;