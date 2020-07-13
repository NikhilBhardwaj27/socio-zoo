import {SET_MESSAGE,REMOVE_MESSAGE} from './types'
import { v4 as uuidv4 } from 'uuid';


export const setMessage = (text,messageType)  =>{
    
    const id = uuidv4()
    return {
          type:SET_MESSAGE,
          payload: {text,messageType,id}
    }
}