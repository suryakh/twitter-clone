import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {loginUser} from '../Redux/Actions'
import '../App.css'
import Signup from './Signup'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick=()=>{
        let formData = new FormData()
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        this.props.loginUser (formData)
    }
    render() {
        if(!this.props.userInfo.loginStatus){
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4 text-center">
                            <div className="m-5">
                                <img style={{ height: "40px" }} src={'/twitterlogo.png'} />
                            </div>
                            <h3>Login to Twitter</h3>
                            <div className="text-left mt-4 col-12 inputDiv">
                                <input className="col-12" type="text" value={this.state.email} name="email" onChange={(e)=>this.handleChange(e)}/>
                                <label>Email</label>
                            </div>
                            <div className="text-left mt-4 col-12 inputDiv">
                                <input className="col-12" type="password" value={this.state.password} name="password" onChange={(e)=>this.handleChange(e)}/>
                                <label>Password</label>
                            </div>
                            <div className="mt-5">
                                <button className="col-12 btn btn-primary rounded-pill" onClick={this.handleClick}>Login</button>
                            </div>
                            <div className="m-4">
                                <Link data-toggle="modal" data-target="#sigup"><p>signup for Twitter</p></Link>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>


                <div className="modal fade" id="sigup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ borderRadius: "20px" }}>
                            <Signup />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <Redirect to ="/" />
        )
    }
}

}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer
    
})

const mapDispatchToProps = dispatch =>{
    return {
        loginUser:(data)=>dispatch(loginUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
