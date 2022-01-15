import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Account.module.scss"
import axiosInstance from '../../axios'
import decode from "jwt-decode"
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import countries from '../Signup/countries'
import checkToken from '../../CheckToken'

export default function Account() {
    checkToken()
    const navigate = useNavigate()
    const [userinfo, setuserinfo] = useState({})
    const [referralUsername, setreferralUsername] = useState("")
    const [isloading, setisloading] = useState(true)
    const [isediting, setisediting] = useState(false)
    const [errortext, seterrortext] = useState("")
    const decoded = decode(localStorage.token)

    // let [referer, setreferer] = useState("")
    let [phonecode, setphonecode] = useState("")
    let [names, setnames] = useState("")
    let [username, setusername] = useState("")
    let [email, setemail] = useState("")
    let [country, setcountry] = useState("")
    let [walletAddress, setwalletAddress] = useState("")
    // let [password, setpassword] = useState("")
    let [gender, setgender] = useState("")
    let [phone, setphone] = useState("")

    useEffect(
        () => {
            async function getInfo(){
                let userinfo = await axiosInstance.get("/user/" + decoded._id)
                userinfo = userinfo.data
                setreferralUsername(userinfo.referralUsername)
                userinfo = userinfo.user
                setuserinfo(userinfo)
                setisloading(false)
                setphonecode(userinfo.phone.split(")")[0].slice(1))
                setusername(userinfo.username)
                setnames(userinfo.names)
                setcountry(userinfo.country)
                setphone(userinfo.phone.split(")")[1])
                setwalletAddress(userinfo.walletAddress)
                setgender(userinfo.gender)
                setemail(userinfo.email)
            }
            getInfo()
    },[decoded._id])

    function logout(){
        localStorage.removeItem("token")
        navigate("/login")
    }

    let submitHandler = async (e) => {
        e.preventDefault()
        let newuserInfo = {names, username, gender, country, phone: `(${phonecode})${phone}`, walletAddress, email}
        newuserInfo = {...userinfo, names, username, gender, country, phone: `(${phonecode})${phone}`, walletAddress, email}
        await axiosInstance.patch("/user/" + userinfo._id, newuserInfo)
        .then((data) => {
            setuserinfo(newuserInfo)
            setisediting(false)    
        }, 
        err => {
            seterrortext(err.response.data.message)
        })
    }
    return (
        <div className={classes.account}>
            {!isediting ? 
            (
                <>
                    <div className={classes.top}>
                        <div>
                            <i className='fa fa-user'></i>
                        </div>
                        <h3>Account</h3>
                        <div onClick={() => setisediting(true)}>
                            <i className='fa fa-pencil'></i>
                        </div>
                    </div>
                {isloading ? <div className={classes.loader} style={{display: "flex", justifyContent:"center", alignItems:"center", marginTop: "50px"}}><ClipLoader size={20}/></div> :
                    <div className={classes.userinfo}>
                        <p>Names</p><p>{userinfo.names}</p>
                        <p>Username</p><p>{userinfo.username}</p>
                        <p>Email</p><p>{userinfo.email}</p>
                        <p>Gender</p><p>{userinfo.gender}</p>
                        <p>Country</p><p>{userinfo.country}</p>
                        <p>Phone number</p><p>{userinfo.phone}</p>
                        <p>Trx wallet address</p><p>{userinfo.walletAddress}</p>
                        {userinfo.referredby && <><p>Referred by</p><p>{referralUsername}</p></>}
                        <div>
                            <button>DELETE ACCOUNT</button>
                            <button onClick={() => logout()}>LOG OUT <i className='fa fa-sign-out-alt'></i></button>
                        </div>
                    </div>
                }
                </>
            )
        :
            <>
                    <div className={classes.top}>
                        <div onClick={() => setisediting(false)}>
                            <i className='fa fa-chevron-left'></i>
                        </div>
                        <h3>Back</h3>
                    </div>
                    <form onSubmit={e => submitHandler(e)}>
                        <div>
                            <label htmlFor="names">Names</label>
                            <input type="text" id='names' required defaultValue={userinfo.names} onChange={(e) => setnames(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' required defaultValue={userinfo.username} onChange={(e) => {setusername(e.target.value); seterrortext("")}}/>
                        </div>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <input type="email" id='Email' required defaultValue={userinfo.email} onChange={(e) => {setemail(e.target.value);seterrortext("")}}/>
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country" onChange={(e) => {setcountry(e.target.value); setphonecode(countries.find(country => country.name === e.target.value).code.replace(" ",""))}}>
                                <option value={userinfo.country}>{userinfo.country}</option>
                                {countries && countries.filter(country => country.name !== userinfo.country).map((country, index) => <option key={index} value={country.name}>{country.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone number</label>
                            <input type="tel" required defaultValue={userinfo.phone.split(")")[1]} pattern='[0-9]{6,}' id='phone' title='Phone number must be 6 or more characters' onChange={(e) => setphone(e.target.value)}/>
                            <section>{phonecode}<span>|</span></section>
                        </div>
                        <div>
                            <label>Gender</label>
                            <div>
                                <div>
                                    <input type="radio" name="gender" defaultChecked={userinfo.gender === "Male" ? "checked" : ""} value="Male" id="male" onChange={(e) => setgender(e.target.value)}/>
                                    <label htmlFor='male'>Male</label>
                                </div>
                                <div>
                                    <input type="radio" name="gender" value="Female" id="female" defaultChecked={userinfo.gender === "Female" ? "checked" : ""} onChange={(e) => setgender(e.target.value)}/>
                                    <label htmlFor='female'>Female</label>
                                </div>
                                <div>
                                    <input type="radio" name="gender" value="Other" id="other" defaultChecked={userinfo.gender === "Other" ? "checked" : ""} onChange={(e) => setgender(e.target.value)}/>
                                    <label htmlFor='other'>Other</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="trx">Trx wallet address</label>
                            <input type="text" id='trx' required defaultValue={userinfo.walletAddress} onChange={(e) => setwalletAddress(e.target.value)}/>
                        </div>
                        <div>
                            <p>{errortext}</p>
                            <input type="submit" value="SAVE"/>  
                        </div>
                    </form>
            </>
        
        }
            <Navbar active={"account"}/>
        </div>
    )
}
