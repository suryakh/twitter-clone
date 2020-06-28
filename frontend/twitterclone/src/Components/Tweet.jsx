import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { retweet,likeTweet } from '../Redux/Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

library.add(faHeart, faHeartRegular)

export class tweet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            retweetContentStatus: false,
            comment: "",
        }
    }
    retweetWithcomment = (data) => {
        this.setState({
            retweetContentStatus: true
        })
    }
    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    render() {
        if (!this.props.data.retweeted) {
            return (
                <>
                    <div className="row border tweetBox pt-2 pb-2">
                        <div className="col-2">
                            <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.data.image}`} />
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <div>
                                    <Link to={`/profile/${this.props.data.uniqueUserName}`}><h5>{this.props.data.userName}</h5> </Link>
                                </div>
                                <div className="ml-1">
                                    <h6>{` @${this.props.data.uniqueUserName}`}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <p>{this.props.data.content}</p>
                            </div>
                            {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 border postImage">
                                <div className="col-12">
                                    <img className="image-fluid" style={{ width: "80%" }} src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                                </div>
                            </div>}
                            <div className="row">
                                <div className="col-4"><FontAwesomeIcon icon={faComment} /> 0 </div>
                                <div className="col-4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faRetweet} /> {this.props.data.reTweets} </div>
            <div className="col-4">{this.props.data.liked ? <FontAwesomeIcon  style={{color:"red"}} icon={faHeart} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)} /> : <FontAwesomeIcon  icon={faHeartRegular} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)}/> } {this.props.data.likes}</div>
                                <div class="dropdown-menu tweetDropDown" aria-labelledby="dropdownMenuLink">
                                    <div className="col-12 p-2" onClick={() => this.props.retweet(this.props.data.id, this.state.comment, this.props.userInfo.token)}>Retweet</div>
                                    <div className="col-12 p-2" data-toggle="modal" data-target={`#exampleModal${this.props.data.id}`} onClick={() => this.retweetWithcomment(this.props.data)}>Retweet with comment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={`exampleModal${this.props.data.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="row m-1 p-1" style={{ borderBottom: "1px solid black" }}>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row border">
                                        <div className="col-1 p-1">
                                            <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.userInfo.profile}`} />
                                        </div>
                                        <div className="retweetDiv col-11">
                                            <input placeholder="comments" onChange={(e) => this.handleChange(e)} />
                                            <div className="col-12 m-2 border">
                                                <div className="row mt-2 mb-2">
                                                    <p>{this.props.data.content}</p>
                                                </div>
                                                {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 border postImage">
                                                    <div className="col-12">
                                                        <img className="img-fluid" src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.props.retweet(this.props.data.id, this.state.comment, this.props.userInfo.token)}>retweet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else if (this.props.data.retweetContent) {
            return (
                <>
                    <div className="row border tweetBox">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-2">
                                    <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.data.retweetedUserImage}`} />
                                </div>
                                <div className="col-10">
                                    <div className="row">
                                        <div>
                                            <Link to={`/profile/${this.props.data.retweeteduser}`}><h5>{this.props.data.retwetedUserName}</h5></Link>
                                        </div>
                                        <div className="ml-1">
                                            <h6>{`@${this.props.data.retweeteduser} retweeted`}</h6>
                                        </div>
                                        <div className="col-12"><p>{this.props.data.retweetContent}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row tweetBox ml-3">
                                <div className="col-1"></div>
                                <div className="col-8">
                                    <div className="row border retweetedTweet pt-4 mb-4" >
                                        <div className="col-2">
                                            <img style={{ height: "30px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.data.image}`} />
                                        </div>
                                        <div className="col-10">
                                            <div className="row">
                                                <div >
                                                    <Link to={`/profile/${this.props.data.uniqueUserName}`}><h5>{this.props.data.userName}</h5></Link>
                                                </div>
                                                <div className="ml-1">
                                                    <h6>{`@${this.props.data.uniqueUserName}`}</h6>
                                                </div>
                                            </div>
                                            <div className="row mt-2 mb-2">
                                                <p>{this.props.data.content}</p>
                                            </div>
                                            {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 postImage">
                                                <div className="col-6">
                                                    <img className="img-fluid" src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                                                </div>
                                            </div>}
                                            <div className="row">
                                                <div className="col-4"><FontAwesomeIcon icon={faComment} /> 0 </div>
                                                <div className="col-4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faRetweet} /> {this.props.data.reTweets} </div>
                                                <div className="col-4">{this.props.data.liked ? <FontAwesomeIcon  style={{color:"red"}} icon={faHeart} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)} /> : <FontAwesomeIcon  icon={faHeartRegular} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)}/> } {this.props.data.likes}</div>
                                                <div class="dropdown-menu tweetDropDown" aria-labelledby="dropdownMenuLink">
                                                    <div className="col-12 p-2" onClick={() => this.props.retweet(this.props.data.id, this.state.comment, this.props.userInfo.token)}>Retweet</div>
                                                    <div className="col-12 p-2" data-toggle="modal" data-target={`#exampleModal${this.props.data.id}`} onClick={() => this.retweetWithcomment(this.props.data)}>Retweet with comment</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <div className="border row tweetBox">
                    <div className="col-8 ml-4 p-2">
                        <p><FontAwesomeIcon icon={faRetweet} /> {this.props.data.retweeteduser} retweeted</p>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2">
                                <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.data.image}`} />
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <Link to={`/profile/${this.props.data.uniqueUserName}`}><h5>{this.props.data.userName} </h5></Link>
                                    <h6>{`@${this.props.data.uniqueUserName}`}</h6>
                                </div>
                                <div className="row mt-2 mb-2">
                                    <p>{this.props.data.content}</p>
                                </div>
                                {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 border postImage">
                                    <div className="col-12">
                                        <img className="image-fluid" src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                                    </div>
                                </div>}
                                <div className="row">
                                    <div className="col-4"><FontAwesomeIcon icon={faComment} /> 0 </div>
                                    <div className="col-4" role="button" id="dropdownMenuLink" data-toggle="dropdown" style={this.props.data.retweeteduser === this.props.userInfo.uniqueName ? {color:"blue"} :{ color:"black"}} aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faRetweet} /> {this.props.data.reTweets} </div>
                                    <div className="col-4">
                                    {this.props.data.liked ? <FontAwesomeIcon  style={{color:"red"}} icon={faHeart} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)} /> : <FontAwesomeIcon  icon={faHeartRegular} onClick={()=>this.props.likeTweet(this.props.data.id,this.props.userInfo.token)}/> }  {this.props.data.likes}</div>
                                    <div class="dropdown-menu tweetDropDown" aria-labelledby="dropdownMenuLink">
                                        <div className="col-12 p-2" onClick={() => this.props.retweet(this.props.data.id, this.state.comment, this.props.userInfo.token)}>Retweet</div>
                                        <div className="col-12 p-2" data-toggle="modal" data-target={`#exampleModal${this.props.data.id}`} onClick={() => this.retweetWithcomment(this.props.data)}>Retweet with comment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id={`exampleModal${this.props.data.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="row m-1 p-1" style={{ borderBottom: "1px solid black" }}>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row border">
                                        <div className="col-1 p-1">
                                            <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.userInfo.profile}`} />
                                        </div>
                                        <div className="retweetDiv col-11">
                                            <input placeholder="comments" onChange={(e) => this.handleChange(e)} />
                                            <div className="col-12 m-2 border">
                                                <div className="row mt-2 mb-2">
                                                    <p>{this.props.data.content}</p>
                                                </div>
                                                {this.props.data.postImage && <div className="row mt-3 mr-2 mb-3 border postImage">
                                                    <div className="col-12">
                                                        <img className="img-fluid" src={`http://localhost:5000/static/posts/${this.props.data.postImage}`} />
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.props.retweet(this.props.data.id, this.state.comment, this.props.userInfo.token)}>retweet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.userReducer
})

const mapDispatchToProps = dispatch => {
    return {
        retweet: (id, comment, token) => dispatch(retweet(id, comment, token)),
        likeTweet:(id,token) =>dispatch(likeTweet(id,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(tweet)
