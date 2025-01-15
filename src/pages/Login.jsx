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

    signIn(mail, password)
      .then(async () => {
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
      })
      .catch((error) => {
        alert(error.message);
        return;
      });
  };
  return (
    <div className="flex flex-1 h-screen bg-white">
      <div className="w-full md:w-2/6 flex flex-col md:p-5 items-center justify-center">
        <div className="bg-welcome bg-cover bg-center bg-no-repeat flex items-end justify-center  w-full md:hidden flex-1">
          <h3 className="mb-5 text-2xl bg-red-500 text-white p-2 font-bold">
            Incident Reporting System
          </h3>
        </div>
        <div className="hidden md:block py-5 text-center">
          <h3 className="text-3xl font-bold">Welcome 👋, Admin</h3>
          <h3 className="text-xl font-normal">Login to Continue...</h3>
        </div>
        <form
          action="#"
          onSubmit={loginToAccount}
          className="w-full md:w-2/3 flex p-3 gap-2 flex-col"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="p-3 outline-none w-full bg-gray-200 rounded"
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
              className="p-3 outline-none w-full bg-gray-200 rounded"
              placeholder="********"
              required
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="p-3 bg-blue-500 text-white mt-2">
            Login
          </button>
          <div className="flex justify-between">
            <a href="#">Forgotten Password?</a>
          </div>
        </form>
      </div>
      <div className="hidden  md:flex md:flex-1 bg-center bg-welcome bg-cover bg-no-repeat">
        <div className="bg-welcome bg-cover bg-center bg-no-repeat flex items-end justify-center w-full flex-1">
          <h3 className="mb-5 tracking-wider text-2xl bg-red-500 text-white p-2 font-bold">
            Incident Reporting System
          </h3>
        </div>
      </div>
    </div>
  );
}
