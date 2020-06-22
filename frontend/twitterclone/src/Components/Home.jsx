import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'


export class Home extends Component {
    render() {
        console.log(this.props.userInfo)
        return (
            <>
                <div className="row border pt-3">
                    <h4>Home</h4>
                </div>
                <div className="row tweetDiv pt-4">
                    <div className="col-1 p-1">
                        <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.userInfo.profile}`} />
                    </div>
                    <div className="col-11">
                        <input type="text" placeholder="What's happening?" />
                        <div className="col-12">
                            <div className="row">
                                <div className="mt-4 col-10"><FontAwesomeIcon icon={faImage} /> </div>
                                <div className="mt-4 col-2"> <button className="btn btn-primary rounded-pill">Tweet</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)