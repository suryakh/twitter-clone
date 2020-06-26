import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Retweet extends Component {
    constructor(props){
        super(props)
        this.state ={
            tweet:{}
        }
    }
    componentDidMount(){
        this.setState({
            tweet:this.props.appdata.homeLineTweets.find((ele)=>ele.id === this.props.data)
        })
    }

    componentDidUpdate(prevData,presentData){
        console.log(presentData)
    }
    render() {
        // console.log(this.state.tweet)
        return (
            <div className="row border">
                <div className="col-1 p-1">
                    <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.userInfo.profile}`} />
                </div>
                <div className="retweetDiv col-11">
                    <input placeholder="comments" />
                    <div className="col-12 m-2 border">
                    <div className="row mt-2 mb-2">
                            <p>{this.props.data.content}</p>
                        </div>
                        {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 border postImage">
                            <div className="col-12">
                                <img className="image-fluid" src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer,
    appdata: state.dataReducers
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Retweet)
