import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './Reducers'

const reducers = combineReducers({
    userReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export { store}