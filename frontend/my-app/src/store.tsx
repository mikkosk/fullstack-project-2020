import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import tourReducer from './reducers/tourReducer'
import museumReducer from './reducers/museumReducer'

export const rootReducer = combineReducers({
    tours: tourReducer,
    museums: museumReducer
})

export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export type RootState = ReturnType<typeof rootReducer>