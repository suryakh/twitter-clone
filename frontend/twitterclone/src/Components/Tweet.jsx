import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {retweet} from '../Redux/Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'

export class tweet extends Component {
    render() {
        console.log(this.props.data)
        return (
            <>
                <div className="row tweetBox pt-2 pb-2">
                    <div className="col-2">
                        <img style={{ height: "50px", borderRadius: "50%" }} src={`http://localhost:5000/static/profiles/${this.props.data.image}`} />
                    </div>
                    <div className="col-10">
                        <div className="row">

                            <Link to={`/profile/${this.props.data.uniqueUserName}`}><h5>{this.props.data.userName}</h5></Link>
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
                            <div className="col-4" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faRetweet} /> 0 </div>
                            <div className="col-4"><FontAwesomeIcon icon={faHeart} /> 0</div>
                            <div class="dropdown-menu tweetDropDown" aria-labelledby="dropdownMenuLink">
                                <div className="col-12 p-2" onClick={()=>this.props.retweet(this.props.data.id,this.props.userInfo.token)}>Retweet</div>
                                <div className="col-12 p-2">Retweet with comment</div>
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

const mapDispatchToProps = dispatch =>{
return {
    retweet:(id,token) => dispatch(retweet(id,token))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(tweet)
