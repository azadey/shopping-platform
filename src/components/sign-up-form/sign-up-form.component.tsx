import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from "../../store/user/user.action";

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [ formFields, setFormFields ] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

        } catch(error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS ) {
                alert("cannot create user, email already in use");
            } else {
                console.log("user creation encountered a error", error);
            }

        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <SignUpContainer>
            <h2>I do not have a account</h2>
            <span>Sign up with your email or password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}></FormInput>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}></FormInput>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange } name="confirmPassword" value={confirmPassword}></FormInput>

                <Button  type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;