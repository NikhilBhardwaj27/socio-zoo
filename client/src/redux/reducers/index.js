import {combineReducers} from 'redux'
import {messageReducer} from './message'
import {authReducer} from './auth'
import {profileReducer} from './profile'
import { postReducer } from './post'

// Root reducers
const index = combineReducers({
    auth:authReducer,
    message:messageReducer,
    profile:profileReducer,
    post:postReducer
})

export default index;