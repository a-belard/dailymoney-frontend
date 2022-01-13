import React , {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios'
import Loader from '../../Components/Loader'
import countries from './countries'
import classes from "./Signup.module.scss"

export default function Signup(props) {
    let params = useParams()
    let navigate = useNavigate()
    let referredby = params.referer
    let [errortext, seterrortext] = useState("")
    let [isloading, setisloading] = useState(true)

    let [referer, setreferer] = useState("")
    let [phonecode, setphonecode] = useState("")
    let [names, setnames] = useState("")
    let [username, setusername] = useState("")
    let [email, setemail] = useState("")
    let [country, setcountry] = useState("")
    let [walletAddress, setwalletAddress] = useState("")
    let [password, setpassword] = useState("")
    let [gender, setgender] = useState("")
    let [phone, setphone] = useState("")

    useEffect(
        () => {
            if(params.referer !== "new" && params.referer.length === 24){
                var getUser = async () => {
                    await axiosInstance.get("/username/"+params.referer)
                    .then(data => {
                        setreferer(data.data)
                        setisloading(false)
                    })
                }
                return getUser()
            }
            else {
                setisloading(false)
            }
        },
    [params.referer])

    let handleSubmit = async (e) => {
        e.preventDefault()
        setisloading(true)
        let newUser = {
            names, email, walletAddress, phone: "(" + phonecode.replace(" ","")+ ")" + phone, password, gender, referredby, country, username
        }
        await axiosInstance.post("/user", newUser)
        .then(data => {
            setisloading(false)
            navigate("/checkemail/" + data.data._id)
        },
        err => {
            seterrortext(err.response.data.message)
            console.log(err.response)
            setisloading(false)
        })
    }

    return (
        <div className={classes.signup}>
            {isloading ? <Loader/> : ""}
            <h3>DAILYMONEY</h3>
            <h3>SIGN UP</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                {params.referer !== "new" && params.referer.length === 24?
                                <div>
                                    <label htmlFor="referred">Referred by</label>
                                    <input type="text" id='referred' required readOnly value={referer} disabled/>
                                </div>
                                :
                                ""
                }
                <div>
                    <label htmlFor="names">Names</label>
                    <input type="text" id='names' required onChange={(e) => setnames(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' required onChange={(e) => {setusername(e.target.value); seterrortext("")}}/>
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" id='Email' required onChange={(e) => {setemail(e.target.value);seterrortext("")}}/>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country" onChange={(e) => {setcountry(e.target.value); setphonecode(countries.find(country => country.name === e.target.value).code.replace(" ",""))}}>
                        <option value="">Select..</option>
                        {countries && countries.map((country, index) => <option key={index} value={country.name}>{country.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="phone">Phone number</label>
                    <input type="tel" required pattern='[0-9]{6,}' id='phone' title='Phone number must be 6 or more characters' onChange={(e) => setphone(e.target.value)}/>
                    <section>{phonecode}<span>|</span></section>
                </div>
                <div>
                    <label>Gender</label>
                    <div>
                        <div>
                            <input type="radio" name="gender" value="Male" id="male" onChange={(e) => setgender(e.target.value)}/>
                            <label htmlFor='male'>Male</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="Female" id="female" onChange={(e) => setgender(e.target.value)}/>
                            <label htmlFor='female'>Female</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="Other" id="other" onChange={(e) => setgender(e.target.value)}/>
                            <label htmlFor='other'>Other</label>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="trx">Trx wallet address</label>
                    <span><strong>Invalid wallet address may lead to loss of your earnings.</strong></span>
                    <input type="text" id='trx' required onChange={(e) => setwalletAddress(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' required pattern='[a-zA-Z0-9]{6,}' title='Password must be 6 or more characters' onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <div>
                    <span>By clicking SIGN UP, you agree to our <strong>Terms, Privacy</strong> and <strong>Policies</strong>.</span>
                    <br />
                    <p>{errortext}</p>
                    <input type="submit" value="SIGN UP"/>
                </div>
                <a href="/login">Already a user? <strong style={{color: "blue"}}>Login</strong></a>
            </form>
        </div>
    )
}
