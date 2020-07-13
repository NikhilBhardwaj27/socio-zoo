import {REGISTRATION_REQUEST,LOGIN_REQUEST} from './types'


export const registerRequest = (username,email,password) =>{
    return {
          type:REGISTRATION_REQUEST,
          payload: {username,email,password}
    }
}
export const loginRequest = (email,password) =>{
    return {
          type:LOGIN_REQUEST,
          payload: {email,password}
    }
}
