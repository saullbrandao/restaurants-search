import { combineReducers } from 'redux'
import { restaurantsReducer } from '../modules/restaurants'

export const rootReducer = combineReducers({
  restaurantsReducer,
})
