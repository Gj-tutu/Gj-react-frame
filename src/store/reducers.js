import { combineReducers } from 'redux'
import locationReducer from './location'
import dataReducer from './data'
import pageReducer from './page'

export const makeRootReducer = () => {
  return combineReducers({
    location: locationReducer,
    data: dataReducer,
    page: pageReducer
  })
}

export default makeRootReducer
