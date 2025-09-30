import React from "react";
import style from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
const Register = () => {
  const {data, isPending, register} = useRegister()
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target)
       const name = formData.get('name')
       const email = formData.get('email')
       const password = formData.get('password')
       register(name,email,password);
       e.target.reset()
   
  };

  return (
    <div className={style.registerContainer}>
 
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

 
    

     
      <div className={style.registerInputs}>
        <h2 className={style.registerTitle}>Sign Up</h2>

        <form className={style.registerInp} onSubmit={handleSubmit}>
          <div className={style.registerInpStyle}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required />
          </div>

          <div className={style.registerInpStyle}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </div>

          <div className={style.registerInpStyle}>
            <label htmlFor="password">Create Password</label>
            <input
              id="password"
              type="password"
              name="password"
              minLength={8}
              required
            />
            <p className={style.helperText}>
              Passwords must be at least 8 characters
            </p>
          </div>

         {!isPending && <button type="submit" className={style.registerBtn}>
            Register
          </button>}
         {isPending && <button type="submit" disabled className={style.registerBtn}>
            Loading...
          </button>}
        </form>

       
        <div className={style.registerToNext}>
          <p>Already have an account?</p>
          <Link to="/login" className={style.loginLink}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
