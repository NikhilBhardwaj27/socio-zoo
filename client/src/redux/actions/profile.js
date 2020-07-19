import {GET_PROFILE_REQUEST,GET_PROFILES_REQUEST, UNFOLLOW_REQUEST, FOLLOW_REQUEST} from './types'
import {CREATE_PROFILE} from './types'


export const getProfileRequest = id =>{
    return {
          type:GET_PROFILE_REQUEST,
          payload: {id}
    }
}

export const createProfile = (formData) =>{
    return {
          type:CREATE_PROFILE,
          formData
    }
}

export const getProfiles = () => {
    return {
        type:GET_PROFILES_REQUEST
    }
}

export const unFollowRequest = id => {
    return {
        type:UNFOLLOW_REQUEST,
        id
    }
}

export const followRequest = id => {
    return {
        type:FOLLOW_REQUEST,
        id
    }
}

