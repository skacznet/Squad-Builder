import * as actionTypes from './actionTypes';

export const saveSquad = (token, squadData) => {
    return {
        type: actionTypes.SB_SAVE_SQUAD,
        squadData: squadData,
        token: token
    }
}

export const editSquad = (token, squadData, squadId) => {
    return {
        type: actionTypes.SB_EDIT_SQUAD,
        squadData: squadData,
        token: token,
        squadId: squadId
    }
}

export const saveStart = () => {
    return {
        type: actionTypes.SB_SAVE_START
    }
}

export const saveSuccess = () => {
    return {
        type: actionTypes.SB_SAVE_SUCCESS
    }
}

export const saveError = (error) => {
    return {
        type: actionTypes.SB_SAVE_ERROR,
        error: error
    }
}

export const resetSaved = () => {
    return {
        type: actionTypes.SB_RESET_SAVED
    }
}

export const resetSquadBuilderError = () => {
    return {
        type: actionTypes.SB_RESET_ERROR
    }
}