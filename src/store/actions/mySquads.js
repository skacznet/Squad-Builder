import * as actionTypes from './actionTypes';

export const loadSquads = (token, userId) => {
    return {
        type: actionTypes.MS_LOAD_SQUADS,
        token: token,
        userId: userId
    }
}

export const startLoadingSquads = () => {
    return {
        type: actionTypes.MS_LOAD_SQUADS_START
    }
}

export const squadsLoaded = (squadsData) => {
    return {
        type: actionTypes.MS_LOAD_SQUADS_SUCCESS,
        squadsData: squadsData
    }
}

export const squadsLoadingFailed = () => {
    return {
        type: actionTypes.MS_LOAD_SQUADS_ERROR
    }
}

export const deleteSquad = (token, userId, squadId) => {
    return {
        type: actionTypes.MS_DELETE_SQUAD,
        token: token,
        userId: userId,
        squadId: squadId
    }
}

export const startDeletingSquad = () => {
    return {
        type: actionTypes.MS_DELETE_SQUAD_START
    }
}

export const squadDeletingFailed = (error) => {
    return {
        type: actionTypes.MS_DELETE_SQUAD_ERROR,
        error: error
    }
}

export const squadDeleted = () => {
    return {
        type: actionTypes.MS_DELETE_SQUAD_SUCCESS
    }
}

export const resetNotifications = () => {
    return {
        type: actionTypes.MS_RESET_NOTIFICATIONS
    }
}

export const saveSuccessNotification = () => {
    return {
        type: actionTypes.MS_SAVED_NOTIFICATION
    }
}