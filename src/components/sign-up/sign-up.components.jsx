import React from "react";
import FormInput from "../form-input/form-input.components";
import CustomButton from "../custom-button/custom-button.components";
import { auth,createUserProfileDocument } from "../../firebase/firebase.utils";

import './sign-up.styles.scss'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            displayName :"",
            email :"",
            password:"",
            confirmPassword:"" 
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Password's dont match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument({user,displayName});
            
            this.setState({
                displayName :"",
                email :"",
                password:"",
                confirmPassword:"" 
            })
        
        }catch(error){
            console.log(error);
        }

    }

    handleChange = event =>{
        const {name,value}= event.target;
        this.setState({[name]:value});
    }
    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I donot have a account</h2>
                <span>Sign In with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" name="displayName" value={displayName} label="Display Name" onChange={this.handleChange} required/>
                    <FormInput  name="email" type="email" label="Email" value={email} onChange={this.handleChange} required/>
                    <FormInput type ="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        onChange={this.handleChange}
                        required
                    />


                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;