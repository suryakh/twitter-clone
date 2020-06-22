import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userDetails } from '../Redux/Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

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
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.match.params.id !== this.props.match.params.id){
            // console.log(prevProps.match.params.id,"fsdfafsdf",this.props.match.params.id)
        this.props.userDetails(this.props.match.params.id, this.props.userInfo.token)
        }
    }
    render() {
        
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
                            <h5>@{this.props.appdata.userProfile.uniqueUserName}</h5>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="col-7 ">
                        {this.props.appdata.profileEdit ? <button className="float-right btn btn-outline-primary rounded-pill mt-4">Edit Profile</button> :<button className="float-right btn btn-outline-primary rounded-pill mt-4">follow</button>}
                    </div>
                </div>
                <div className="row border">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <img style={{ height: "30px" }} src={'/birthday.png'} />Born on  {this.props.appdata.userProfile.dateOfBirth ? <h6>dateof birth</h6> : <h6>--:--:----</h6>}

                                </div>
                            </div>
                            <div className="col-6 border">
                                <div className="row">
                                    <div className="col-3" style={{ fontSize: "25px" }}><FontAwesomeIcon icon={faCalendarAlt} /></div> <div><p> joined {this.props.appdata.userProfile. joinTime}</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 float-left">
                                <h6>0 followers</h6>
                            </div>
                            <div className="col-5 float-left">
                                <h6>0 following</h6>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
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
        userDetails: (id, token) => dispatch(userDetails(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
