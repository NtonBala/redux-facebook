// WebSocket
import { socket } from '../../init/socket';

// Actions
import { uiActions } from '../ui/actions';

export const socketActions = { // use custom thunk middleware as logic will be very simple
    listenConnection: () => (dispatch) => {
        socket.on('connect', () => { // 'connect' event is triggered when socket detects Internet connection (time interval how socket detects Internet is configurable)
            dispatch(uiActions.setOnlineState());
        });

        socket.on('disconnect', () => { // 'disconnect' event is triggered when socket detects Internet is disconnected
            dispatch(uiActions.setOfflineState());
        });
    },
};
