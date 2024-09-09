import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {HiMail, HiKey} from 'react-icons/hi'


import Auth from '../utils/auth';

const LoginForm = (props) => {
    const [formState, setFormState] = useState({email: '', password: ''})
    const [login, {error, data}] = useMutation(LOGIN_USER)

    const handleFormChange = (e) => {
        const {name, value} = e.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

  // submit form
   const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  
  return (
      <div>
        <div>
        <h3 className="text-xl" id="login">Login</h3>
        <div>
            {data ? (
                <p>
                    Successfully logged in! {' '}
                    <Link to="/">back to the main page.</Link>
                </p>
            ) : (
    <form className="flex max-w-md flex-col gap-4">
    <div>
      <div className="mb-2 block">
        <Label 
        htmlFor="email1"
        value="Your email"
        />
      </div>
      <TextInput
      id="email1"
      type="email"
      rightIcon={HiMail}
      placeholder="name@flowbite.com"
      required
      />
    </div>
    <div>
      <div className="mb-2 block">
        <Label
        htmlFor="password1"
        value="Your password"
        />
      </div>
      <TextInput
      id="password1"
      type="password"
      rightIcon={HiKey}
      required
      />
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>
    <Button type="submit">Submit</Button>
  </form>
        )}
        {error && (
            <div className="my-3 p-3 bg-danger text-white">
                {error.message}
            </div>
        )}

      </div>
      </div>
      </div>
  )
}

export default LoginForm;
