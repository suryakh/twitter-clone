import React, { Component } from 'react'
import { connect } from 'react-redux'
import { followersData } from '../Redux/Actions'
import {Link} from 'react-router-dom'

export class Followers extends Component {
    componentDidMount() {
        this.props.followersData(this.props.userInfo.token,this.props.match.params.id)
    }
    render() {
        console.log(this.props.appData.followers)
        return (
            <><div className="row border pt-3">
                <h4>Followings</h4>
            </div>

                <div className="row">
                    {this.props.appData.followers.map((ele) => <div className="col-12">
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
    followersData: (token,id) => followersData(token,id)
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers)
