import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Profile extends Component {
    render() {
        return (
            <>
                <div className="row border pt-3">
                    <h4>Profile</h4>
                </div>
                <div className="row">
                    <div className="col-12 bg-primary" style={{ height: "200px" }}>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="profilPic">

                        </div>
                    </div>
                    <div className="col-7 ">
                        <button className="float-right btn btn-outline-primary rounded-pill mt-4">Edit Profile</button>
                    </div>
                </div>
                <div className="row">
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
