import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Signup from '../Components/Signup'



export class Router extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path='/' exact render={(props) => <Home {...props} />} />
                    <Route path="/login" exact render={(props) => <Login {...props} />} />
                    <Route path="/signup" exact render={(props) => <Signup {...props} />} />
                </Switch>

            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
