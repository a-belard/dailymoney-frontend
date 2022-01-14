import React from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Info.module.scss"
import Image from "../../assets/money.png"

export default function Info() {
    let trxWalletAddress = "TPwE1V1SSTyC16Hryz2WZyyZLcNYQyf8j3"
    let copyToClipboard = () => {
        window.navigator.clipboard.writeText(trxWalletAddress)
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
                <p>Dailymoney is a web application that earns you money everyday
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
            </div>
            <Navbar active={"info"} />
        </div>
    )
}
