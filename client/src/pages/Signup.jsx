import { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div>
          <h3 className="text-2xl" id="login">
            Signup
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
                    <Label htmlFor="username" value="Your Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    rightIcon={HiUser}
                    placeholder="Your username"
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    rightIcon={HiMail}
                    placeholder="email@example.com"
                    required
                    shadow
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    rightIcon={HiKey}
                    required
                    shadow
                  />
                </div>
                {/* <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="repeat-password"
                      value={formState.password}
                    />
                  </div>
                  <TextInput
                    id="repeat-password"
                    type="password"
                    onChange={handleChange}
                    rightIcon={HiKey}
                    required
                    shadow
                  />
                </div> */}
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

export default Signup;

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
