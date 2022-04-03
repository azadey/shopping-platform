
import { useState } from "react";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword, 
    auth
} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import './sign-in-form.style.css';

const defaultformFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [ formFields, setFormFields ] = useState(defaultformFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(auth, email, password);
            resetFormFields();

        } catch(error) {

            switch(error.code) {
                case "auth/wrong-password" :
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found" :
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
            }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>I have a account</h2>
            <span>Sign in with your email or password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>

                <div className="buttons-container">
                    <Button  type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google}  onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;