// Types
import { SHOW_NEXT_PHOTO, SHOW_SELECTED_PHOTO } from './types';

export const showNextPhotoAC = () => {
    return {
        type: SHOW_NEXT_PHOTO,
    };
};

export const showSelectedPhotoAC = (photoIndex) => {
    return {
        type:    SHOW_SELECTED_PHOTO,
        payload: photoIndex,
    };
};
