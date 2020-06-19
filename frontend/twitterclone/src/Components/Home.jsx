import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'


export class Home extends Component {
    render() {
        console.log(this.props.userInfo)
        return (
            <div className="container-fluid">
                Home
                {/* <div className="row">
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
                                <pre><h4><FontAwesomeIcon icon ={faHouseUser}/>  Home</h4></pre>
                                </div>
                                </div>
                                <div className="col-12 mt-1">
                                    <div className="menuBtn">
                                    <pre><h4><FontAwesomeIcon icon ={faUserAlt}/>  Profile</h4></pre>
                                </div></div>
                            </div>
                        </div>

                    </div>
                    <div className="col-4 border">
                    </div>
                    <div className="col-4 border"></div>
                </div>

                <Link to="/login">Login</Link> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)