import { AUTH, LOGOUT } from '../constants/actionTypes'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return state
        case LOGOUT:
            return state
        default:
            return state
    }
}
