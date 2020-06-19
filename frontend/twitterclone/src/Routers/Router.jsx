import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route,Link } from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { Profile } from '../Components/Profile'



export class Router extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 border">
                        <div className="row">
                            <div className="col-6">
                            </div>
                            <div className="col-6">
                                <div className="col-12"><div className="row">
                                    <div className="m-3">
                                    <img style={{ height: "25px" }} src={'/twitterlogo.png'} />
                                    </div>
                                    <div></div>

                                </div></div>
                                <div className="col-12 mt-1">
                                <div className="menuBtn">
                                <Link style={{ textDecoration: 'none' }}  to="/"><pre><h4><FontAwesomeIcon icon ={faHouseUser}/>  Home</h4></pre></Link>
                                </div>
                                </div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                    <Link style={{ textDecoration: 'none' }}  to="profile"><pre><h4><FontAwesomeIcon icon ={faUserAlt}/>  Profile</h4></pre></Link>
                                </div></div>
                            </div>
                        </div>

                    </div>
                    <div className="col-4 border">
                    <>
                <Switch>
                    <Route path='/' exact render={(props) => <Home {...props} />} />
                    <Route path="/signup" exact render={(props) => <Signup {...props} />} />
                    <Route path="/profile" exact render={(props)=><Profile {...props}/>} />
                </Switch>

            </>
                    </div>
                    <div className="col-4 border"></div>
                </div>

                <Link to="/login">Login</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
