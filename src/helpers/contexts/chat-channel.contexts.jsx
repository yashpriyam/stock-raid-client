import { createContext } from 'react';


const ChannelContext = createContext({
    channel: null,
    updateChannel: () => {}
});

export default ChannelContext;