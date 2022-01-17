import { Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from "../Transactions/Transactions.module.scss"

export default function RefBal() {

    const [balances, setbalances] = useState([])
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        let getBalances = async () => {
            let balances = await axiosInstance.get("users")
            balances = balances.data
            console.log(balances)
            balances = balances.filter(user => user.verified === true)
            balances = balances.filter(user => user.balance !== 0)
            setbalances(balances)
            setisloading(false)
        }
        getBalances()
    }, [])

    let pay = async(userId, amount) => {
        let transact = {userId, amount, type:"withdraw"}
        let bals = balances.filter(bal => bal._id !== userId)
        setbalances(bals)
        await axiosInstance.post("/transactions",transact)
        .then(() => {},
        err => console.log(err))
    }

    return (
        <div className={classes.transactions}>
            <div>
                <div>
                    <i className='fa fa-star'></i>
                </div>
                <h3>Referral Balances</h3>
            </div>
            <div>
                <div></div>
                <div></div>
                 {isloading ?
                            <span style={
                                {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "50px"
                                }
                            }>
                                <strong><ClipLoader size={20}/></strong>
                            </span>
                 :
                 balances.length === 0 ?
                        <span style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "50px"
                            }
                        }>
                            <strong>No pending referral balances!</strong>
                        </span>
                    :
                    (
                        balances && balances.map(balance => (
                            <div className={classes.transacts}>
                                <div>
                                    <span>{balance.username}</span>
                                    <strong>{new Intl.NumberFormat().format(balance.balance)} $</strong>
                                    <span>Wallet address: <strong>{balance.walletAddress}</strong></span>
                                    <Button 
                                        onClick={() => window.navigator.clipboard.writeText(balance.walletAddress)}
                                        variant={"outlined"} 
                                        style={{width: "100px", fontWeight: "600"}}>
                                            COPY
                                    </Button>
                                </div>
                                <button onClick={(e) => {pay(balance._id, balance.balance); e.target.disabled = true}}>APPROVE</button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}
