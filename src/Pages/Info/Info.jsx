import React, { useState } from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Info.module.scss"
import Image from "../../assets/money.png"
import { FormControl, TextField } from '@mui/material'
import decode from "jwt-decode"
import axiosInstance from '../../axios'
import checkToken from '../../CheckToken'

export default function Info() {
    checkToken()
    let decoded = decode(localStorage.token)
    const [email, setemail] = useState(decoded.email)
    const [message, setmessage] = useState("");
    const [sent, setsent] = useState(false)
    let trxWalletAddress = "TPwE1V1SSTyC16Hryz2WZyyZLcNYQyf8j3"
    let copyToClipboard = () => {
        window.navigator.clipboard.writeText(trxWalletAddress)
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        setsent(true)
        await axiosInstance.post("/message", {email, message})
    }
    return (
        <div className={classes.info}>
            <Logo/>
            <div>
                <div>
                    <i className='fa fa-info'></i>
                </div>
                <h3>Support</h3>
            </div>
            <div>
                <img src={Image} alt="" />
            </div>
            <div>
                <p>Daily money provider started in 2015 with the aim of 
                    promoting cryptocurrency coins. By the beginning 
                    of 2022, New contract between Daily money provider 
                    and Tron company was signed by the purpose of 
                    increasing the value of Tron. It's always good 
                    to diversify one's crypto investment portfolio 
                    with cryptocurrencies having a daily growing market cap. 
                    TRON is among such reliable cryptocurrencies that has an 
                    investment appeal especially for those looking for inexpensive 
                    trading options in the crypto market. TRON is basically a 
                    blockchain-based decentralized digital platform having its own 
                    cryptocurrency, Tronix (TRX) . It was developed by Justin Sun in 2017. 
                    The platform mainly hosts entertainment applications and facilitates 
                    cost-effective sharing of digital content. The platform grew rather fast, 
                    reaching 50 million user accounts by August 2021 and gained a global outreach.
                    <br />
                    <br />
                    <ul>
                        <li>You get 3% of your investment everyday.</li>
                        <li>You receive 10% from every investments of your referrals</li>
                    </ul>                
                </p>
                <br />
                <br />
                <h4>Dailymoney Trx wallet address</h4>
                <p>If you need to invest money, you will pass it to this Trx wallet address.</p>
                <div>
                    TPwE1V1SSTyC16Hryz2WZyyZLcNYQyf8j3
                    <button onClick={(e) => {copyToClipboard(); e.currentTarget.style.backgroundColor = "#0a0"}}>Copy</button>
                </div>
                <br />
            </div>
                <form onSubmit={e => handleSubmit(e)}>
                    <h4>Any Message or Question?</h4>
                    <p>You can email us here..</p>
                    <div>
                        <FormControl fullWidth>
                            <TextField type={"email"} required label="Email" defaultValue={decoded.email} variant={"outlined"} onChange={e => setemail(e.target.value)}></TextField>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl fullWidth>
                            <TextField type={"text"} required rows={4} multiline label="Message or Question" variant={"outlined"} onChange={e => setmessage(e.target.value)}></TextField>
                        </FormControl>
                        <input type="submit" disabled={sent} value={!sent ? "SEND" : "SENT✅"}/>
                    </div>
                </form>
            <Navbar active={"info"} />
        </div>
    )
}
