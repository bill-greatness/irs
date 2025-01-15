import { useState } from "react";
import { signIn } from "../firebase/auth";
import { searchQuery } from "../firebase/firestore";

export default function Login() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // billgreatness@outlook.com - pwd test123
  const loginToAccount = (e) => {
    e.preventDefault();
    // use firebase to login
    // get full user data.

    signIn(mail, password).then(async () => {
      searchQuery({
        path: "users",
        type: "email",
        searchString: mail,
        getData: (user) => {
          // store user data in local storage or use it as needed.
          localStorage.setItem("USER", JSON.stringify(user[0]));
          localStorage.setItem("LOGIN_STATUS", "success");
          window.location.href = "/";
        },
      });
      /*

      ; // redirect to dashboard after successful login */
    });
  };
  return (
    <div className="flex flex-1 h-screen bg-green-500">
      <div className="w-2/6 flex  p-5 items-center justify-center">
        <form
          action="#"
          onSubmit={loginToAccount}
          className="w-2/3 flex p-3 gap-2 flex-col"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="p-3 outline-none w-full bg-gray-200"
              placeholder="Enter Email Address"
              type="email"
              required
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="p-3 outline-none w-full bg-gray-200"
              placeholder="********"
              required
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="p-3 bg-white mt-2">
            Login
          </button>
          <div className="flex justify-between">
            <a href="#">Forgotten Password?</a>
          </div>
        </form>
      </div>
      <div className="flex-1 bg-welcome bg-cover bg-no-repeat"></div>
    </div>
  );
}
