import React, { Component } from 'react'
import { connect } from 'react-redux'
import {updateProfile } from '../Redux/Actions'

export class Editprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: this.props.appdata.userProfile.userName,
            Email: this.props.appdata.userProfile.email,
            Bio: this.props.appdata.userProfile.userBio,
            DateOfBirth: this.props.appdata.userProfile.dateOfBirth,
            Profile: "",
            image:`http://localhost:5000/static/profiles/${this.props.appdata.userProfile.image}`
        }
    }
    componentDidMount() {
        // console.log(this.props.appdata.userProfile)

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            let fr = new FileReader()
            fr.onload = (e) => {
                this.setState({ image: e.target.result })
            }
            fr.readAsDataURL(e.target.files[0])
            this.setState({
                Profile: e.target.files[0]
            })
        }
    }
    handleClick = () => {
        let formData = new FormData()
        formData.append("image", this.state.Profile)
        formData.append("userName", this.state.Name)
        formData.append("email", this.state.Email)
        formData.append("dateOfBirth", this.state.DateOfBirth)
        formData.append('userBio', this.state.Bio)
        this.props.updateProfile(formData,this.props.userInfo.token)
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <div className="row">
                    <div className="col-12 bg-primary" style={{ height: "200px" }}>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="profilPic">
                            <img className="img-fluid rounded-circle" src={this.state.image} />
                        </div>
                        <div className="text-left mt-4 col-12 inputDiv">
                            <label htmlFor="fileUpload"><div className="text-center">Update Profile picture</div></label>
                            <input id="fileUpload" className="btn btn-primary" type="file" onChange={this.handleFile} />
                        </div>
                        <div>
                            <h3>{this.props.appdata.userProfile.userName}</h3>
                            <p className="m-1">@{this.props.appdata.userProfile.uniqueUserName}</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="Name" onChange={(e) => this.handleChange(e)} type="text" value={this.state.Name} />
                    <label>Name</label>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="Email" onChange={(e) => this.handleChange(e)} type="text" value={this.state.Email} />
                    <label>Email</label>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="Bio" onChange={(e) => this.handleChange(e)} type="text" value={this.state.Bio} />
                    <label>Bio</label>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="DateOfBirth" onChange={(e) => this.handleChange(e)} type="date" value={this.state.DateOfBirth} />
                    <label>Date of Birth</label>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Save changes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer,
    appdata: state.dataReducers
})

const mapDispatchToProps = dispatch =>{
    return {
        updateProfile:(data,token)=>dispatch(updateProfile(data,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editprofile)
