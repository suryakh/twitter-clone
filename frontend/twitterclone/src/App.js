import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import {Route } from 'react-router-dom'
import  Login from './Components/Login'
import Router from './Routers/Router';


export class App extends Component {
  render() {
    return (
      <div className="App">
      {/* {!this.props.userInfo.loginStatus && <Login />} */}
      {!this.props.userInfo.loginStatus && <Route path="/login" exact render={(props) => <Login {...props} />} />}
      {this.props.userInfo.loginStatus && <Router />}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userReducer
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
