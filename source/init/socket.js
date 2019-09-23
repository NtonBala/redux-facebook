// Core
import io from 'socket.io-client';

// Config
import { ROOT_URL, groupId } from '../REST/config';

export const socket = io(ROOT_URL, { // create & configure socket
    path: '/redux/ws',
});

export const joinSocketChannel = () => { // initialize socket
    const token = localStorage.getItem('token');

    socket.emit('join', { groupId, token });
};
