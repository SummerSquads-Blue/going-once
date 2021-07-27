import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import styles from "./Login.module.css"
import authService from '../../services/authService'
import useForm from "../../lib/useForm"
import Page from "../../components/Page"
import { Button } from "@material-ui/core"

import googleLogo from '../../Logos/googleLogo.png'
import facebookLogo from '../../Logos/facebookLogo.png'
import twitterLogo from '../../Logos/twitterLogo.png'

import "./Login.css"

export default function LoginPage({handleSignupOrLogin}) {
  const {inputs, handleChange} = useForm({
    email: "",
    pw: "",
  });
  const {email, pw} = inputs;
  const [message, setMessage] = useState('')

  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(inputs);
      handleSignupOrLogin();
      history.push("/items");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      setMessage(err.message)
    }
  };

  return (
    <Page>
      <h1 id='loginTitle'>Welcome Back!<br></br>Log In</h1>
      <div className='imgs'>
        <img src={googleLogo} id='googleSignin' />
        <img src={facebookLogo} id='facebookSignin' />
        <img src={twitterLogo} id='twitterSignin' />
      </div>
      <form className={styles.loginForm} autoComplete="off" onSubmit={(e)=>e.preventDefault()}>
        <fieldset>
          {message && <p>{message}</p>}
          <label htmlFor="email">Email</label>
          <input
            className='formText'
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className='formText'
            type="password"
            autoComplete="off"
            id="password"
            value={pw}
            name="pw"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={styles.buttons}>
            <Button 
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </div>
        </fieldset>
      </form>
      <p id='noAccount'>Don't have an account? <Link to='/signup' id='signupLink'>Sign up!</Link></p>
    </Page>
  );
}
