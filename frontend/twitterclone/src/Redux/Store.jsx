import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {userReducer,dataReducers } from './Reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducers = combineReducers({
    userReducer,
    dataReducers
})

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export { store}