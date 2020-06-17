import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Home extends Component {
    render() {
        console.log(this.props.userInfo)
        return (
            <div>
                Home
                <Link to ="/login">Login</Link>
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
