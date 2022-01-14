import React, {useState} from 'react'
import classes from "./Login.module.scss"
import Image from "../../assets/money.png"
import axiosInstance from '../../axios'
import {useNavigate} from "react-router-dom"
import Loader from '../../Components/Loader'
import checkToken from "../../CheckToken"

export default function Login() {
    checkToken()
    let navigate = useNavigate()
    const [errortext, seterrortext] = useState("")
    const [id, setid] = useState("")
    const [email, setemail] = useState("")
    const [isloading, setisloading] = useState(false)
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault()
        setisloading(true)

        await axiosInstance.post("/login", {username, password})
        .then(data => {
            setisloading(false)
            localStorage.setItem("token", data.data.token)
            navigate("/dashboard")
        }, 
        err => {
            seterrortext(err.response.data.message)
            if(err.response.data.message === "Verify your email in order to login!"){
                setemail(err.response.data.email)
                setid(err.response.data.id)
            }
            setisloading(false)
        })
    }

    let sendEmail = async () => {
        setisloading(true)
        await axiosInstance.post("/verify", {email, id, username})
        .then(data => {
            seterrortext("Verification code sent!")
            setisloading(false)
        }, 
        err => {
            setisloading(false)
            console.log(err.response)
        })
    }
    return (
        <div className={classes.login}>
            <div>
                <img src={Image} alt="" />
            </div>
                <h3>DAILYMONEY</h3>
                <h3>LOGIN</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' required onChange={(e) => {setusername(e.target.value); seterrortext("")}}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' required pattern='[a-zA-Z0-9@_!$#%]{6,}' title='Password must be 6 or more characters' onChange={(e) => {setpassword(e.target.value);seterrortext("")}}/>
                </div>
                <div>
                    <p>{errortext} {errortext === "Verify your email in order to login!" ? <span style={{color:"blue"}} onClick={() => sendEmail()}>Send again</span> : ""}</p>
                    <input type="submit" value="LOGIN"/>
                </div>
                <div>
                    <a style={{fontStyle: "italic"}} href='/login'>Forgot password?</a>
                    <a href="/register/new">No account? <strong style={{color: "blue"}}>Sign up</strong></a>
                </div>
            </form>
            {isloading ? <Loader/> : ""}
        </div>
    )
}
