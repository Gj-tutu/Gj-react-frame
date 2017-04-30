import { combineReducers } from 'redux'
import locationReducer from './location'
import dataReducer from './data'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    data: dataReducer
  })
}

export default makeRootReducer
