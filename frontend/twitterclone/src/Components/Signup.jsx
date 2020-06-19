import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signupUser } from '../Redux/Actions'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            name: "",
            email: "",
            password: "",
            Profile: "",
            image: "",
            userBio: "",

        }
    }
    nextStep = () => {
        console.log("fdjkads")
        this.setState({
            step: this.state.step + 1
        })
    }
    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
                Profile: e.target.files[0]
            })
        }
    }
    handleSubmit = () => {
        let formData = new FormData()
        formData.append("image", this.state.Profile)
        formData.append("userName", this.state.name)
        formData.append("email", this.state.email)
        formData.append("password", this.state.password)
        formData.append('userBio', this.state.userBio)

        this.setState({
            step: 1,
            name: "",
            email: "",
            password: "",
            Profile: "",
            image: "",
            userBio: "",
        })
        this.props.signupUser(formData)
    }

    render() {
        console.log(this.state.Profile)
        switch (this.state.step) {
            case 1:
                return (<div className="p-4" style={{ height: "700px"}}><Form1 nextStep={this.nextStep} prevStep={this.prevStep} handleChange={this.handleChange} email={this.state.email} name={this.state.name} />
                </div>)

            case 2: {
                return (
                    <div className="p-4" style={{ height: "700px"}}>
                        <Form2 nextStep={this.nextStep} prevStep={this.prevStep} handleChange={this.handleChange} password={this.state.password} />
                    </div>
                )
            }
            case 3: {
                return (<div className="p-4" style={{ height: "700px" }}><Form3 nextStep={this.nextStep} prevStep={this.prevStep} handleFile={this.handleFile} image={this.state.image} />
                </div>
                )
            }
            case 4: {
                return (<div className="p-4" style={{ height: "700px",borderRadius:"50%" }}><Form4 nextStep={this.nextStep} prevStep={this.prevStep} userBio={this.state.userBio} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch=> {
    return {
        signupUser: (data) => dispatch(signupUser(data))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Signup)


export class Form1 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleClick = () => {
        this.props.nextStep()
    }
    handleClickPrev = () => {
        this.props.prevStep()
    }
    render() {
        return (
            <>
                <div className="col-12 text-right">
                    <div className="row">
                        <div className="col-7">
                            <img style={{ height: "30px" }} src={'/twitterlogo.png'} />
                        </div>
                        <div className="col-5">
                            <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button>
                        </div>
                    </div>
                </div>
                <div className="col-12"> <h3>Create your account</h3></div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="name" onChange={(e) => this.props.handleChange(e)} type="text" value={this.props.name} />
                    <label>Name</label>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="email" onChange={(e) => this.props.handleChange(e)} type="text" value={this.props.email} />
                    <label>Email</label>
                </div>
            </>
        )
    }
}


export class Form2 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleClick = () => {
        this.props.nextStep()
    }
    handleClickPrev = () => {
        this.props.prevStep()
    }
    render() {
        return (
            <>
                <div className="col-12 text-right">
                    <div className="row">
                        <div className="col-7">
                            <img style={{ height: "30px" }} src={'/twitterlogo.png'} />
                        </div>
                        <div className="col-5">
                            <button className="btn btn-primary rounded-pill mr-2" onClick={this.handleClickPrev}>prev</button>
                            <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h3>You'll need a password</h3>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="password" onChange={(e) => this.props.handleChange(e)} type="password" value={this.props.password} />
                    <label>Password</label>
                </div>
            </>
        )
    }
}


export class Form3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
        }
    }
    handleClick = () => {
        this.props.nextStep()
    }
    handleClickPrev = () => {
        this.props.prevStep()
    }
    render() {
        return (
            <>
                <div className="col-12 text-right">
                    <div className="row">
                        <div className="col-7">
                            <img style={{ height: "30px" }} src={'/twitterlogo.png'} />
                        </div>
                        <div className="col-5">
                            <button className="btn btn-primary rounded-pill mr-2" onClick={this.handleClickPrev}>prev</button>
                            <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Pick a profile picture</h3>
                    <div className="text-center">
                        <img className="rounded-circle" style={{ height: "250px", width: "250px" }} id="imagePreview" src={this.props.image || '/profile.jpeg'} />
                    </div>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <label htmlFor="fileUpload"><div className="text-center">Update Profile picture</div></label>
                    <input id="fileUpload" className="btn btn-primary" type="file" onChange={this.props.handleFile} />
                </div>
            </>
        )
    }
}

export class Form4 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleClick = () => {
        this.props.nextStep()
    }
    handleClickPrev = () => {
        this.props.prevStep()
    }
    render() {
        return (
            <>
                <div className="col-12 text-right">
                    <div className="row">
                        <div className="col-7">
                            <img style={{ height: "30px" }} src={'/twitterlogo.png'} />
                        </div>
                        <div className="col-5">
                            <button className="btn btn-primary rounded-pill mr-2" onClick={this.handleClickPrev}>prev</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Describe yourself</h3>
                </div>
                <div className="text-left mt-4 col-12 inputDiv">
                    <input className="col-12" name="userBio" onChange={(e) => this.props.handleChange(e)} type="text" value={this.props.userBio} type="text" />
                    <label>Your Bio</label>
                </div>
                <div className="col-12 text-center mt-5 border">
                    <button className="btn btn-primary rounded-pill" data-dismiss="modal" onClick={this.props.handleSubmit}>Confirm</button>
                </div>
            </>
        )
    }
}

