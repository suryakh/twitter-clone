import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {userReducer,dataReducers } from './Reducers'

const reducers = combineReducers({
    userReducer,
    dataReducers
})

const store = createStore(reducers, applyMiddleware(thunk))

export { store}