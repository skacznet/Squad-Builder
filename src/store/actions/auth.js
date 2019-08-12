import * as actionTypes from './actionTypes';

export const authLoading = () => {
    return {
        type: actionTypes.AUTH_LOADING
    }
}

export const authStart = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_START,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
}

export const authSuccess = (token, userId, signInByFrom) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        signInByFrom: signInByFrom
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const resetError = () => {
    return {
        type: actionTypes.AUTH_RESET_ERROR
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const userLogout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_USER_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const userLogoutSucceed = () => {
    return {
        type: actionTypes.AUTH_USER_LOGOUT
    }
}

export const checkAuth = () => {
    return {
        type: actionTypes.AUTH_CHECK_AUTH
    }
}

export const refreshToken = (refreshToken, expiresIn) => {
    return {
        type: actionTypes.AUTH_REFRESH_TOKEN,
        refreshToken: refreshToken,
        expiresIn: expiresIn
    }
}