import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import {Route, Redirect } from 'react-router-dom'
import  Login from './Components/Login'
import Router from './Routers/Router';


export class App extends Component {
  render() {
    console.log(this.props.userInfo.loginStatus)
    if(this.props.userInfo.loginStatus){
          return (
      <div className="App">
      {this.props.userInfo.loginStatus && <Route path="/login" exact render={(props) => <Login {...props} />} />}
      {this.props.userInfo.loginStatus && <Router />}
    </div>
    )
    }
    else {
      return (
        <>
        <Redirect to ="/login" />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      </>
      )
    }

  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userReducer
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
