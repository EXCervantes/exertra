import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiUser, HiMail, HiKey } from "react-icons/hi";

import Auth from "../utils/auth";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

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

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div>
          <h3 className="text-xl" id="login">
            Login
          </h3>
          <div>
            {data ? (
              <p>
                Signup successful! <Link to="/">back to the main page.</Link>
              </p>
            ) : (
              <form
                className="flex max-w-md flex-col gap-4"
                onSubmit={handleFormSubmit}
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Your username" />
                  </div>
                  <TextInput
                    id="username"
                    type="name"
                    rightIcon={HiUser}
                    placeholder="UnassumingMan"
                    value={formState.username}
                    onChange={handleChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" />
                  </div>
                  <TextInput
                    id="email2"
                    type="email"
                    rightIcon={HiMail}
                    placeholder="email@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password2" value="Your password" />
                  </div>
                  <TextInput
                    id="password2"
                    type="password"
                    rightIcon={HiKey}
                    value={formState.password}
                    onChange={handleChange}
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password" />
                  </div>
                  <TextInput
                    id="repeat-password"
                    type="password"
                    rightIcon={HiKey}
                    value={formState.password}
                    onChange={handleChange}
                    required
                    shadow
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link
                      href="#"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      terms and conditions
                    </Link>
                  </Label>
                </div>
                <Button type="submit">Register new account</Button>
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
    </div>
  );
};

export default SignupForm;

{
  /* <div class="flex flex-col justify-center items-center">
  <p class="text-xl mb-3">Signup</p>

  <form class="form signup-form">
    <div class="form-group">
      <label for="name-signup">Name:</label>
      <input class="form-input" type="text" id="name-signup" />
    </div>
    <div class="form-group">
      <label for="email-signup">email:</label>
      <input class="form-input" type="text" id="email-signup" />
    </div>
    <div class="form-group">
      <label for="password-signup">password:</label>
      <input class="form-input" type="password" id="password-signup" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary" type="submit">signup</button>
    </div>
  </form>
</div> */
}
