import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiKey } from "react-icons/hi";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h3
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
          id="login"
        >
          Login
        </h3>

        {data ? (
          <p className="text-green-600 text-center">
            Successfully logged in!{" "}
            <Link to="/" className="text-blue-500 underline">
              Back to the main page.
            </Link>
          </p>
        ) : (
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFormChange}
                rightIcon={HiMail}
                placeholder="email@example.com"
                required
                shadow
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleFormChange}
                rightIcon={HiKey}
                required
                shadow
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 text-red-600 text-center bg-red-100 rounded-lg">
            Email or password incorrect. Please check your login details.
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Button
              outline
              onClick={handleSignupRedirect}
              className="ml-2 text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
