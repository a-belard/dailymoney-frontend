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
    })
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
                    <button className={isbalances && classes.active} onClick={() => setisbalances(false)}>BALANCES</button>
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
                        transactions.map(transact => (
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
                                <button>APPROVE</button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}
