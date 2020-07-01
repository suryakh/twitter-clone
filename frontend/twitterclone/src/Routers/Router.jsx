import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Home from '../Components/Home'
import { logout, getUnFollowedUsers ,follow } from '../Redux/Actions'
import Signup from '../Components/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faUserAlt, faHashtag } from '@fortawesome/free-solid-svg-icons'
import Profile from '../Components/Profile'
import Explore from '../Components/Explore'
import Followingprofiles from '../Components/Followingprofiles'
import Followers from '../Components/Followers'



export class Router extends Component {
    componentDidMount() {
        this.props.getUnFollowedUsers(this.props.userInfo.token)
    }
    render() {
        return (
            <div className="container-fluid">
                <Redirect to="/" />
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
                                        <Link style={{ textDecoration: 'none' }} to="/explore"><pre><h4><FontAwesomeIcon icon={faHashtag} />  Explore</h4></pre></Link>
                                    </div></div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                        <Link style={{ textDecoration: 'none' }} to={`/profile/${this.props.userInfo.uniqueName}`}><pre><h4><FontAwesomeIcon icon={faUserAlt} />  Profile</h4></pre></Link>
                                    </div></div>
                                <div className="col-12 dropdown">
                                    <div className="row mb-4 dropbtn" >
                                        <div className="col-3 ">
                                            <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.userInfo.profile}`} />
                                        </div>
                                        <div className="col-7">
                                            <div> <h5>{this.props.userInfo.userName}</h5>
                                                <h6>{`@${this.props.userInfo.uniqueName}`}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row dropdown-content shadow">
                                        <div className="col-12">
                                            <Link to="/login"><div onClick={() => this.props.logout()}><h5>{`Logout@${this.props.userInfo.uniqueName}`}</h5></div></Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="col-5 border">
                        <>
                            <Switch>
                                <Route path='/' exact render={(props) => <Home {...props} />} />
                                <Route path='/home' exact render={(props) => <Home {...props} />} />
                                <Route path="/signup" exact render={(props) => <Signup {...props} />} />
                                <Route path="/profile/:id" exact render={(props) => <Profile {...props} />} />
                                <Route path="/explore" exact render={(props) => <Explore {...props} />} />
                                <Route path="/:id/following" exact render={(props) => <Followingprofiles {...props} />} />
                                <Route path="/:id/followers" exact render={(props) => <Followers {...props} />} />

                            </Switch>

                        </>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-6 p-4 m-4">
                                <h4>who to follow</h4>
                                <div className="row">
                                    {this.props.appData.unfollowers.map((ele) => <div className="col-12">
                                        <div className="row" >
                                            <div className="col-3 ">
                                                <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${ele.image}`} />
                                            </div>
                                            <div className="col-6">
                                                <div> <Link to={`/profile/${ele.uniqueUserName}`}><h5>{ele.userName}</h5></Link>
                                                    <h6>{`@${ele.uniqueUserName}`}</h6>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <button className="btn btn-primary rounded-pill" onClick={()=>this.props.follow(ele.id,this.props.userInfo.token)}>follow</button>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer,
    appData: state.dataReducers
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        getUnFollowedUsers: (token) => dispatch(getUnFollowedUsers(token)),
        follow:(id,token)=>dispatch(follow(id,token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
