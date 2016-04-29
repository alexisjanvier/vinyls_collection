import { replace } from 'react-router-redux';

export const ALBUM_FORM_SUBMIT__FETCH = 'ALBUM_FORM_SUBMIT__FETCH';
export const ALBUM_FORM_SUBMIT__FETCH_FULFILLED = `${ALBUM_FORM_SUBMIT__FETCH}_FULFILLED`;
export const ALBUM_FORM_SUBMIT__FETCH_REJECTED = `${ALBUM_FORM_SUBMIT__FETCH}_REJECTED`;

export function albumFormSubmitFetch({ collectionId, albumTitle }) {
    return {
        type: ALBUM_FORM_SUBMIT__FETCH,
        payload: {
            options: {
                body: JSON.stringify({ collectionId, albumTitle }),
                method: 'post',
            },
            url: `${API_URL}/add-album`, // eslint-disable-line no-undef
        },
        meta: {
            fulfilledAction: replace('/'),
        },
    };
}
