import { Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from "./Transactions.module.scss"

export default function Transactions() {
    const [isbalances, setisbalances] = useState(false)
    const [transactions, settransactions] = useState([])
    const [balances, setbalances] = useState([])
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        let getTransactionsAndBalances = async () => {
            let transactions =  await axiosInstance.get("/stats")
            let adminCount = await axiosInstance.get("/admin")
            adminCount = adminCount.data
            let users = await axiosInstance.get("/users")
            users = users.data
            users = users.filter(user => user.verified === true)
            await users.forEach(user => {
                if(user.balanceCount < adminCount){
                    let diff = adminCount - user.balanceCount
                    user.totBalance = diff * ((3/100) * user.activeInvestment)
                }
                else {
                    user.totBalance = 0
                }
            })
            users = users.filter(user => user.totBalance > 0)
            setbalances(users)
            transactions = transactions.data.transactions
            transactions = transactions
                            .filter(transact => transact.approved === false)
                            .filter(transaction => transaction.type === "deposit")
            settransactions(transactions)
            setisloading(false)
        }
        getTransactionsAndBalances()
    }, [])

    let approve = async(id) => {
        let transacts = transactions.filter(transact => transact._id !== id);
        settransactions(transacts)
        await axiosInstance.patch("/transaction/" + id)
        .then(() => {},
        err => console.log(err.response))
    }

    let pay = async(userId, amount) => {
        let transact = {userId, amount, type:"withdraw"}
        let bals = balances.filter(bal => bal._id !== userId)
        setbalances(bals)
        await axiosInstance.post("/transactions",transact)
        .then(() => {},
        err => console.log(err))
    }

    let updateAdmin = async() => {
        await axiosInstance.patch("/admin")
        let adminCount = await axiosInstance.get("/admin")
            adminCount = adminCount.data
            let users = await axiosInstance.get("/users")
            users = users.data
            users = users.filter(user => user.verified === true)
            await users.forEach(user => {
                if(user.balanceCount < adminCount){
                    let diff = adminCount - user.balanceCount
                    user.totBalance = diff * ((3/100) * user.activeInvestment)
                }
                else {
                    user.totBalance = 0
                }
            })
            users = users.filter(user => user.totBalance > 0)
            setbalances(users)
    }
    return (
        <div className={classes.transactions}>
            <div>
                <div>
                    <i className='fa fa-hourglass-end'></i>
                </div>
                <h3>Pending transactions</h3>
            </div>
            <div>
                <div></div>
                <div>
                    <button className={!isbalances && classes.active} onClick={() => setisbalances(false)}>INVESTMENTS</button>
                    <button className={isbalances && classes.active} onClick={() => setisbalances(true)}>3% BALANCES</button>
                </div>
                {
                    isloading ? 
                    <span style={
                        {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "50px"
                        }
                    }>
                        <ClipLoader size={20}/>
                    </span>
                    :
                    !isbalances ?
                    (
                        transactions.length === 0 ?
                        <span style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "50px"
                            }
                        }>
                            <strong>No pending investments!</strong>
                        </span>
                    :
                    (
                        transactions && transactions.map(transact => (
                            <div className={classes.transacts}>
                                <div>
                                    <span>{transact.userId?.username || "⚠️Deleted!"}</span>
                                    <strong>{new Intl.NumberFormat().format(transact.amount)} $</strong>
                                    <span>Wallet address: <strong>{transact.userId?.walletAddress || "⚠️Deleted!"}</strong></span>
                                    <Button 
                                        onClick={() => window.navigator.clipboard.writeText(transact.userId?.walletAddress || "⚠️Deleted!")}
                                        variant={"outlined"} 
                                        style={{width: "100px", fontWeight: "600"}}>
                                            COPY
                                    </Button>
                                </div>
                                <button onClick={(e) => {approve(transact._id); e.target.disabled = true}}>APPROVE</button>
                            </div>
                        ))
                    )
                    )
                    :
                    (
                        balances.length === 0 ?
                        <>
                        <span style={
                            {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "50px",
                                flexDirection: "column",
                                textAlign: 'center'
                            }
                        }>
                            <strong>No more pending balances! Activate new day balances.</strong>
                            <button onClick={() => updateAdmin()}
                            style={{marginTop: "20px",
                                            padding: "10px 20px",
                                            border: "none",
                                            color: "white",
                                            background: "blue",
                                            fontWeight: "700",
                                            borderRadius: "7px"}}>Activate</button>
                        </span>
                        </>
                    :
                    (
                        balances && balances.map(balance => (
                            <div className={classes.transacts}>
                                <div>
                                    <span>{balance.username}</span>
                                    <strong>{new Intl.NumberFormat().format(balance.totBalance)} $</strong>
                                    <span>Wallet address: <strong>{balance.walletAddress}</strong></span>
                                    <Button 
                                        onClick={() => window.navigator.clipboard.writeText(balance.walletAddress)}
                                        variant={"outlined"} 
                                        style={{width: "100px", fontWeight: "600"}}>
                                            COPY
                                    </Button>
                                </div>
                                <button onClick={() => pay(balance._id, balance.totBalance)}>APPROVE</button>
                            </div>
                        ))
                    )
                    )
                }
            </div>
        </div>
    )
}
