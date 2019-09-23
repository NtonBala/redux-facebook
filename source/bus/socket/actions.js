// WebSocket
import { socket } from '../../init/socket';

// Actions
import { uiActions } from '../ui/actions';
import { postsActions } from '../posts/actions';

export const socketActions = { // use custom thunk middleware as logic will be very simple
    listenConnection: () => (dispatch) => {
        socket.on('connect', () => { // 'connect' event is triggered when socket detects Internet connection (time interval how socket detects Internet is configurable)
            dispatch(uiActions.setOnlineState());
        });

        socket.on('disconnect', () => { // 'disconnect' event is triggered when socket detects Internet is disconnected
            dispatch(uiActions.setOfflineState());
        });
    },

    listenPosts: () => (dispatch, getState) => {
        socket.on('create', (event) => {
            const { data: post } = JSON.parse(event);

            dispatch(postsActions.createPost(post));
        });

        socket.on('like', (event) => {
            const { data, meta } = JSON.parse(event);

            if (meta.action === 'like') {
                const liker = getState()
                    .users.find((user) => user.get('id') === data.userId)
                    .delete('avatar');

                dispatch(postsActions.likePost({
                    postId: data.postId,
                    liker,
                }));
            } else {
                dispatch(postsActions.unlikePost({
                    postId:  data.postId,
                    likerId: data.userId,
                }));
            }
        });
    },
};
