import {combineReducers} from 'redux'
import {messageReducer} from './message'
import {authReducer} from './auth'
import {profileReducer} from './profile'

// Root reducers
const index = combineReducers({
    auth:authReducer,
    message:messageReducer,
    profile:profileReducer
})

export default index;