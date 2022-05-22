import React, { Component } from 'react';
import YouthDetails1 from './YouthDetails1';
import YouthDetails2 from './YouthDetails2';
import YouthDetails3 from './YouthDetails3';
import Confirmation from './Confirmation';

class YouthForm extends Component {

    state = {
        step: 1,
        email: '',
        fullname: '', 
        password: '',
        dob: '',
        gender: '',
        num: '',
        levelOfEducation: '',
        citizenship: '',
        address: '',
        country: '',
        postalcode:''
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        const {step, email, fullname, password, dob, gender, num, levelOfEducation, citizenship, address, country, postalcode} = this.state;
        const inputValues = {  email, fullname, password, dob, gender, num, levelOfEducation, citizenship, address, country, postalcode };
    
        switch(step) {
            case 1:
                return <YouthDetails1
                        nextStep={this.nextStep}
                        handleChange = {this.handleChange}
                        inputValues={inputValues}
                        />
            case 2:
                return <YouthDetails2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        inputValues={inputValues}
                        />
            case 3:
                return <YouthDetails3
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        inputValues={inputValues}
                        />            
            case 4:
                return <Confirmation
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputValues={inputValues}
                        />
            }
    
    
    }
}

export default YouthForm;