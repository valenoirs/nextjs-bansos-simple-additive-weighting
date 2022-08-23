import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import Saw from "../components/saw";

const Home: NextPage = () => {
  const [signed, setSigned] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = (event: any) => {
    event.preventDefault();
    console.log("sign in");

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === "admin" && password === "admin") return setSigned(true);
    if (username === "lurah" && password === "lurah") return setSigned(true);
    if (username === "lingkungan1" && password === "lingkungan1")
      return setSigned(true);

    setErrorMessage("Username atau password salah.");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Additive Weighting</title>
        <meta name="description" content="valenoirs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="center">
        <div className="container mx-auto p-6">
          <div className="row-auto"></div>
          {signed ? (
            <Saw />
          ) : (
            <div className="mt-10 grid place-items-center">
              <h1 className="text-xl mb-5">Simple Additive Weighting</h1>
              <h1 className="text-l">Login </h1>
              <form className="form-control" onSubmit={handleLogin}>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <div>
                  <button
                    type="submit"
                    className="mt-5 btn btn-success w-full max-w-xs"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="text-red-400 mt-4">{errorMessage}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
