import React from "react";
import style from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
const Login = () => {
  const { data, isPending, signIn } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    signIn(email, password);
    e.target.reset();
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.finance}>
        <img src="./images/logo-large.svg" alt="Financy logo" />
        <div>
          <h4>Keep track of your money and save for your future</h4>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
  <div className={style.financed}>
  <img src="./images/logo-large.svg" alt="Financy logo" />
  </div>
     
      <div className={style.loginInputs}>
        <h2 className={style.loginTitle}>Login</h2>

        <form className={style.loginInp} onSubmit={handleSubmit}>
          <div className={style.loginInpStyle}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </div>

          <div className={style.loginInpStyle}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required />
          </div>

          {!isPending && (
            <button type="submit" className={style.loginBtn}>
              Login
            </button>
          )}
          {isPending && (
            <button type="submit" className={style.loginBtn}>
              Loading...
            </button>
          )}
        </form>

        <div className={style.loginToNext}>
          <p>Need to create an account?</p>
          <Link to="/register" className={style.signupLink}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
