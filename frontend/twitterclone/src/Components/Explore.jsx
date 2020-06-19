import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Explore extends Component {
    render() {
        return (
            <>
                <div className="row border pt-3">
                    <h4>Explore</h4>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
