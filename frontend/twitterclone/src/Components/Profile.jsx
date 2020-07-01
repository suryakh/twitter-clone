import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userDetails } from '../Redux/Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLoginUserTweets } from '../Redux/Actions'
import { faImage, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import Tweet from '../Components/Tweet'
import Editprofile  from './Editprofile'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            reqMonth: "",
            reqYear: ""
        }
    }
    componentDidMount() {
        this.props.userDetails(this.props.match.params.id, this.props.userInfo.token)
        this.props.getLoginUserTweets(this.props.match.params.id)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            // console.log(prevProps.match.params.id,"fsdfafsdf",this.props.match.params.id)
            this.props.userDetails(this.props.match.params.id, this.props.userInfo.token)
        }
    }
    render() {
        console.log(this.props.appdata.uniqueUserName)
        return (
            <>
                <div className="row border pt-3">
                    <div className="col-12">
                        <h4>{this.props.appdata.userProfile.userName}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 bg-primary" style={{ height: "200px" }}>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="profilPic">
                            <img className="img-fluid rounded-circle" src={`http://localhost:5000/static/profiles/${this.props.appdata.userProfile.image}`} />
                        </div>
                        <div>
                            <h3>{this.props.appdata.userProfile.userName}</h3>
                            <p className="m-1">@{this.props.appdata.userProfile.uniqueUserName}</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="col-7 ">
                        {this.props.userInfo.uniqueName === this.props.appdata.userProfile.uniqueUserName ? <button className="float-right btn btn-outline-primary rounded-pill mt-4" data-toggle="modal" data-target="#exampleModal" >Edit Profile</button> : <button className="float-right btn btn-outline-primary rounded-pill mt-4">follow</button>}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
        <img style={{ height: "30px" }} src={'/birthday.png'} />Born on  {this.props.appdata.userProfile.dateOfBirth ? <p>{this.props.appdata.userProfile.dateOfBirth}</p> : <p>--:--:----</p>}

                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-3" style={{ fontSize: "25px" }}><FontAwesomeIcon icon={faCalendarAlt} /></div> <div><p> joined {this.props.appdata.userProfile.joinTime}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 float-left">
                                <Link to={`/${this.props.appdata.userProfile.uniqueUserName}/followers`}><h6>{`${this.props.appdata.userProfile.follows} followers`}</h6></Link>
                            </div>
                            <div className="col-5 float-left">
                                <Link to={`/${this.props.appdata.userProfile.uniqueUserName}/following`}><h6>{`${this.props.appdata.userProfile.following} following`}</h6></Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row m-5">
                    <div className="col-12 float-left">
                        <p> Tweets & Retweets</p>
                    </div>
                </div>
                <div className="row">
                    {this.props.appdata.profileLineTweets.map((ele) => <div className="col-12"><Tweet data={ele} /></div>)}
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Editprofile />
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer,
    appdata: state.dataReducers
})

const mapDispatchToProps = dispatch => {
    return {
        userDetails: (id, token) => dispatch(userDetails(id, token)),
        getLoginUserTweets: (id) => dispatch(getLoginUserTweets(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
