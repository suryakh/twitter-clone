import React, { Component } from 'react'
import { connect } from 'react-redux'
import { followingProfiles } from '../Redux/Actions'
import {Link} from 'react-router-dom'

export class Followingprofiles extends Component {
    componentDidMount() {
        this.props.followingProfiles(this.props.userInfo.token,this.props.match.params.id)
    }
    render() {
        console.log(this.props.appData.followingUsers)
        return (
            <><div className="row border pt-3">
                <h4>Followings</h4>
            </div>

                <div className="row">
                    {this.props.appData.followingUsers.map((ele) => <div className="col-12">
                        <div className="row" >
                            <div className="col-3 ">
                                <img style={{ height: "50px", borderRadius: "50%" }} src={`https://twittercloneflask.herokuapp.com/static/profiles/${ele.image}`} />
                            </div>
                            <div className="col-6">
                                <div> <Link to={`/profile/${ele.uniqueUserName}`}><h5>{ele.userName}</h5></Link>
                                    <h6>{`@${ele.uniqueUserName}`}</h6>
                                </div>
                            </div>
                            <div className="col-3">
                                {/* <button className="btn btn-primary rounded-pill" onClick={() => this.props.follow(ele.id, this.props.userInfo.token)}>unfollow</button> */}
                            </div>
                        </div>
                    </div>)}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer,
    appData: state.dataReducers
})

const mapDispatchToProps = {
    followingProfiles: (token,id) => followingProfiles(token,id)
}

export default connect(mapStateToProps, mapDispatchToProps)(Followingprofiles)
