import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Button, Label, TextInput } from "flowbite-react";
import { HiUser, HiMail, HiKey } from "react-icons/hi";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("setFormState", event);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-background dark:bg-dark-background p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
          id="signup"
        >
          Signup
        </h3>

        {data ? (
          <p className="text-green-600 text-center">
            Signup successful!{" "}
            <Link to="/" className="text-blue-500 underline">
              Back to the main page.
            </Link>
          </p>
        ) : (
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <Label
                htmlFor="username"
                value="Your Username"
                className="text-light-text dark:text-dark-text"
              />
              <TextInput
                id="username"
                type="text"
                name="username"
                value={formState.username}
                onChange={handleChange}
                rightIcon={HiUser}
                placeholder="Your username"
                required
                shadow
                className="mt-1"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                value="Your Email"
                className="text-light-text dark:text-dark-text"
              />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                rightIcon={HiMail}
                placeholder="email@example.com"
                required
                shadow
                className="mt-1"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                value="Your Password"
                className="text-light-text dark:text-dark-text"
              />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                rightIcon={HiKey}
                required
                shadow
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary"
            >
              Register New Account
            </Button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 text-red-600 bg-red-100 dark:bg-red-900 rounded-lg">
            {error.message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-light-text dark:text-dark-text">
            Already have an account?{" "}
            <Button
              outline
              onClick={handleLoginRedirect}
              className="ml-2 bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary"
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
