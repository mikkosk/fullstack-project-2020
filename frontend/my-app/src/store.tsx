import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import tourReducer from './reducers/tourReducer'
import museumReducer from './reducers/museumReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'

export const rootReducer = combineReducers({
    tours: tourReducer,
    museums: museumReducer,
    users: userReducer,
    login: loginReducer,
    notification: notificationReducer
})

export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export type RootState = ReturnType<typeof rootReducer>