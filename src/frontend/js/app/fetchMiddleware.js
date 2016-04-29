function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }

    return Promise.reject(new Error(response.statusText));
}

function json(response) {
    if (response.status === 201 || response.status === 204) {
        return Promise.resolve(null);
    }

    return response.json();
}

export default (fetch) => ({ dispatch, getState }) => next => async (action) => {
    const { meta, payload, type } = action;

    if (type.match(/__FETCH$/)) {
        dispatch({
            payload,
            type: `${type}_CREATED`,
        });
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const { url, options } = payload;
        console.log('OK JE FETCH avec ' + type);

        try {
            console.log('TRY');
            const data = await fetch(url, {
                ...options,
                headers,
                credentials: 'include',
            }).then(status).then(json);
            dispatch({
                payload: data,
                type: `${type}_FULFILLED`,
            });
            if (meta && meta.fulfilledAction) {
                dispatch(meta.fulfilledAction);
            }
        } catch (error) {
            console.log('CATCH');
            dispatch({
                payload: error,
                type: `${type}_REJECTED`,
            });
            if (meta && meta.rejectedAction) {
                dispatch(meta.rejectedAction);
            }
        }
    } else {
        next(action);
    }
};
