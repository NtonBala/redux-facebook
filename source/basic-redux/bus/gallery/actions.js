// Types
import {
    SHOW_NEXT_PHOTO,
    SHOW_SELECTED_PHOTO,
    SHOW_PREVIOUS_PHOTO
} from './types';

export const showNextPhotoAC = () => {
    return {
        type: SHOW_NEXT_PHOTO,
    };
};

export const showPrevPhotoAC = () => {
    return {
        type: SHOW_PREVIOUS_PHOTO,
    };
};

export const showSelectedPhotoAC = (photoIndex) => {
    return {
        type:    SHOW_SELECTED_PHOTO,
        payload: photoIndex,
    };
};
