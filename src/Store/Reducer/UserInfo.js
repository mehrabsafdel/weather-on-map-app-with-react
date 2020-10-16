import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../Utility';

const initialstate = {
    userInfo: {
        email: '',
        password: ''
    },
    cities: ["tehran"],
    token : null,
    registered: false,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {

    return updateObject(state, {
        userInfo: action.authData,
        token: action.idToken,
        registered: true,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.CITY_ADDED: {
                return {
                    ...state,
                    cities: state.cities.concat(action.addedCity)
            }
        }
        case actionTypes.CITY_DELETED: {
            let prevCities = state.cities
            const updatedCities = prevCities.filter(e => e != action.deletedCity)
            return {
                ...state,
                 cities: updatedCities
            }
        }
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;