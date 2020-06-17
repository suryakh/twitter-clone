import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'
import Signup from './Signup'

export class Login extends Component {
    render() {
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
                                <input className="col-12" type="text" />
                                <label>Email</label>
                            </div>
                            <div className="text-left mt-4 col-12 inputDiv">
                                <input className="col-12" type="password" />
                                <label>Password</label>
                            </div>
                            <div className="mt-5">
                                <button className="col-12 btn btn-primary rounded-pill">Login</button>
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
                        <div className="modal-content">
                            <Signup />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
