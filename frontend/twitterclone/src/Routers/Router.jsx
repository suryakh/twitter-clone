import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Home from '../Components/Home'
import { logout } from '../Redux/Actions'
import Signup from '../Components/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faUserAlt, faHashtag } from '@fortawesome/free-solid-svg-icons'
import Profile from '../Components/Profile'
import Explore from '../Components/Explore'



export class Router extends Component {
    render() {
        return (
            <div className="container-fluid">
            <Redirect to ="/" />
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col-6">
                            </div>
                            <div className="col-6 trial">
                                <div className="col-12"><div className="row">
                                    <div className="m-3">
                                        <img style={{ height: "25px" }} src={'/twitterlogo.png'} />
                                    </div>
                                    <div></div>

                                </div></div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                        <Link style={{ textDecoration: 'none' }} to="/home"><pre><h4><FontAwesomeIcon icon={faHouseUser} />  Home</h4></pre></Link>
                                    </div>
                                </div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                        <Link style={{ textDecoration: 'none' }} to="explore"><pre><h4><FontAwesomeIcon icon={faHashtag} />  Explore</h4></pre></Link>
                                    </div></div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                        <Link style={{ textDecoration: 'none' }} to="profile"><pre><h4><FontAwesomeIcon icon={faUserAlt} />  Profile</h4></pre></Link>
                                    </div></div>
                                <Link to="/login"><div className="col-12 logout" onClick={()=>this.props.logout()}>
                                    <div className="row mb-4" >
                                        <div className="col-3">
                                            <img style={{ height: "50px", borderRadius: "50%" }} src={'/profile.jpeg'} />
                                        </div>
                                        <div className="col-7">
                                            <div> <h5>asfdasdffasd</h5></div>
                                        </div>

                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="col-4 border">
                        <>
                            <Switch>
                                <Route path='/' exact render={(props) => <Home {...props} />} />
                                <Route path='/home' exact render={(props) => <Home {...props} />} />
                                <Route path="/signup" exact render={(props) => <Signup {...props} />} />
                                <Route path="/profile" exact render={(props) => <Profile {...props} />} />
                                <Route path="/explore" exact render={(props) => <Explore {...props} />} />

                            </Switch>

                        </>
                    </div>
                    <div className="col-4"></div>
                </div>

                <Link to="/login">Login</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch =>{
    return {
        logout:()=>dispatch(logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
