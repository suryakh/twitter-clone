import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { postTheTweet, getAllTweets } from '../Redux/Actions'
import { Redirect } from 'react-router-dom'
import Tweet from './Tweet'


export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: "",
            image: "",
            postImage: "",
            imageStatus: false
        }
    }
    componentDidMount() {
        this.props.getAllTweets(this.props.userInfo.token)
    }
    handleChange = (e) => {
        this.setState({
            tweet: e.target.value
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
                postImage: e.target.files[0],
                imageStatus: true
            })
        }
    }
    handleClick = () => {
        let formdata = new FormData()
        formdata.append("tweetContent", this.state.tweet)
        formdata.append("post", this.state.postImage)
        this.props.postTheTweet(this.props.userInfo.token, formdata)
        // this.props.getAllTweets(this.props.userInfo.token)
        this.setState({
            tweet: "",
            image: "",
            postImage: "",
            imageStatus: false
        })
    }
    render() {
        console.log(this.props.appdata.homeLineTweets)
        return (
            <>
                <div className="row border pt-3">
                    <h4>Home</h4>
                </div>
                <div className="row tweetDiv pt-4">
                    <div className="col-1 p-1">
                        <img style={{ height: "50px", borderRadius: "50%" }} src={`https://twittercloneflask.herokuapp.com/static/profiles/${this.props.userInfo.profile}`} />
                    </div>
                    <div className="col-11">
                        <input type="text" placeholder="What's happening?" value={this.state.tweet} onChange={(e) => this.handleChange(e)} />
                    <div className="col-12">
                        {this.state.imageStatus && <div className="row m-1"><div className="col-2">
                            <img style={{ height: "80px" }} src={this.state.image} />
                        </div></div>}
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="mt-4 col-10" ><label className="filiUploadLabel" htmlFor="fileUpload"><div><FontAwesomeIcon icon={faImage} /> </div></label>
                                <div><input id="fileUpload" type="file" onChange={this.handleFile} /></div></div>
                            <div className="mt-4 col-2"> <button className="btn btn-primary rounded-pill" onClick={() => this.handleClick()}>Tweet</button></div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="row">
                    {this.props.appdata.homeLineTweets.map((ele) => <div className="col-12"><Tweet data={ele}/></div>)}
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
        postTheTweet: (token, data) => dispatch(postTheTweet(token, data)),
        getAllTweets: (token) => dispatch(getAllTweets(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)