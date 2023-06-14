import * as api from '../api'
import { AUTH } from '../constants/actionTypes'


export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data })
    
    const dotenv = import.meta.env
    navigate(dotenv.VITE_VERCEL_HOME_PAGE || '/')
  } catch (error) {}
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

      dispatch({ type: AUTH, data })
      
    const dotenv = import.meta.env
    navigate(dotenv.VITE_VERCEL_HOME_PAGE || '/')
  } catch (error) {}
}
