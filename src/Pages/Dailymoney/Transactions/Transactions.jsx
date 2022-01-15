import { Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from "./Transactions.module.scss"

export default function Transactions() {
    const [isbalances, setisbalances] = useState(false)
    const [transactions, settransactions] = useState([])
    // const [balances, setbalances] = useState([])
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        let getTransactions = async () => {
            let transactions = await axiosInstance.get("/stats")
            transactions = transactions.data.transactions
            transactions = transactions
                            .filter(transact => transact.approved === false)
                            .filter(transaction => transaction.type === "deposit")
            settransactions(transactions)
            setisloading(false)
        }
        getTransactions()
    }, [])

    let approve = async(id) => {
        let transacts = transactions.filter(transact => transact._id !== id);
        settransactions(transacts)
        await axiosInstance.patch("/transaction/" + id)
        .then(() => {},
        err => console.log(err.response))
    }
    return (
        <div className={classes.transactions}>
            <div>
                <div>
                    <i className='fa fa-hourglass-end'></i>
                </div>
                <h3>Transactions</h3>
            </div>
            <div>
                <div></div>
                <div>
                    <button className={!isbalances && classes.active} onClick={() => setisbalances(false)}>INVESTMENTS</button>
                    <button className={isbalances && classes.active} onClick={() => setisbalances(true)}>BALANCES</button>
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
                                    <span>{transact.userId.username}</span>
                                    <strong>{new Intl.NumberFormat().format(transact.amount)} $</strong>
                                    <span>Wallet address: <strong>{transact.userId.walletAddress}</strong></span>
                                    <Button 
                                        onClick={() => window.navigator.clipboard.writeText(transact.userId.walletAddress)}
                                        variant={"outlined"} 
                                        style={{width: "100px", fontWeight: "600"}}>
                                            COPY
                                    </Button>
                                </div>
                                <button onClick={() => approve(transact._id)}>APPROVE</button>
                            </div>
                        ))
                    )
                    )
                    :
                    <h4>Balances</h4>
                }
            </div>
        </div>
    )
}
