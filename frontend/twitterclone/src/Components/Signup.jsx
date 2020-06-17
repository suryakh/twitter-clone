import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Signup extends Component {
    constructor(props){
        super(props)
        this.state={
            step:1,
            Username:"",
            email:"",
            password:"",
            Profile:"",
            userBio:"",

        }
    }
    nextStep=()=>{
        console.log("fdjkads")
        this.setState({
            step:this.state.step+1
        })
    }
    prevStep=()=>{
        this.setState({
            step:this.state.step-1
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        console.log(this.state)
        switch(this.state.step){
            case 1 :
                return (<div style={{height:"700px"}}><Form1 nextStep={this.nextStep} prevStep ={this.prevStep} handleChange={this.handleChange} email={this.state.email} password={this.state.password}/>
                </div>)
            
            case 2:{
               return  (
                   <div style={{height:"700px"}}>
               <Form2 nextStep={this.nextStep} prevStep ={this.prevStep} handleChange={this.handleChange}/>
               </div>
               )}
            case 3:{
                return (<div style={{height:"700px"}}><Form3 nextStep={this.nextStep} prevStep ={this.prevStep} handleChange={this.handleChange}/>
                </div>
                )}
        }
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)


export class Form1 extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleClick=()=>{
        this.props.nextStep()
    }
    handleClickPrev = ()=>{
        this.props.prevStep()
    }
    render() {
        return (
            <>
             <div className="col-12 text-right">
                        <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button>
                        {/* <button className="btn btn-primary rounded-pill" onClick={this.handleClickPrev}>prev</button> */}
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" name="email" onChange={(e)=>this.props.handleChange(e)} type="text" value={this.props.email} />
                        <label>Email</label>
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" name= "password" onChange={(e)=>this.props.handleChange(e)} type="password" value = {this.props.password}/>
                        <label>Password</label>
                    </div>   
            </>
        )
    }
}


export class Form2 extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleClick=()=>{
        this.props.nextStep()
    }
    handleClickPrev = ()=>{
        this.props.prevStep()
    }
    render() {
        return (
            <>
             <div className="col-12 text-right">
                        <button className="btn btn-primary rounded-pill" onClick={this.handleClickPrev}>prev</button>
                        <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button>
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" type="text" />
                        <label>Email</label>
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" type="password" />
                        <label>Password</label>
                    </div>   
            </>
        )
    }
}


export class Form3 extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleClick=()=>{
        this.props.nextStep()
    }
    handleClickPrev = ()=>{
        this.props.prevStep()
    }
    render() {
        return (
            <>
             <div className="col-12 text-right">
                        {/* <button className="btn btn-primary rounded-pill" onClick={this.handleClick}>next</button> */}
                        <button className="btn btn-primary rounded-pill" onClick={this.handleClickPrev}>prev</button>
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" type="text" />
                        <label>Email</label>
                    </div>
                    <div className="text-left mt-4 col-12 inputDiv">
                        <input className="col-12" type="password" />
                        <label>Password</label>
                    </div>   
            </>
        )
    }
}

