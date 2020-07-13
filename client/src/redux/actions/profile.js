import {GET_PROFILE_REQUEST} from './types'


export const getProfileRequest = id =>{
    return {
          type:GET_PROFILE_REQUEST,
          payload: {id}
    }
}
