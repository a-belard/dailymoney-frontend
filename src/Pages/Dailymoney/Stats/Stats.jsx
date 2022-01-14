import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from "./Stats.module.scss"

export default function Stats() {
    const [withdrawals, setwithdrawals] = useState([])
    const [investments, setinvestments] = useState([])
    const [isloading, setisloading] = useState(true)
    const [active, setactive] = useState("dashboard")
    const [invest, setinvest] = useState(false)
    const [isapproved, setisapproved] = useState(true)

    function handleClose(){
        setinvest(false)
    }
    const [stats, setstats] = useState([
            {
                name: "Total withdrew",
                unit: "Trx",
                active: "withdrawals",
                className: classes.withdrew,
                desc: <p>Accumulated amount  + 10% from referrals first investments</p>
            },
            {
                name: "Total investment",
                unit: "Trx",
                active: "investments",
                className: classes.investment,
                desc: <p>Investment from the start</p>
            },
            {
                name: "Total referrals",
                unit: "People",
                desc: "",
                className: classes.referrals
            }
        ]
    )

    useEffect(
        () => {
            let getstats = async () => {
                let tempstats = [
                    {
                        name: "Total earned",
                        unit: "$",
                        active: "withdrawals",
                        className: classes.withdrew,
                        desc: <p>Accumulated amount  + 10% from referrals first investments</p>
                    },
                    {
                        name: "Total investment",
                        unit: "$",
                        active: "investments",
                        className: classes.investment,
                        desc: <p>Investment from the start</p>
                    },
                    {
                        name: "Total referrals",
                        unit: "People",
                        desc: "",
                        active: "referrals",
                        className: classes.referrals
                    }
                ]
                let stats = await axiosInstance.get("/stats")
                stats = stats.data
                setisloading(false)
                setinvestments(stats.transactions.filter(transaction => transaction.type === "deposit"))
                setwithdrawals(stats.transactions.filter(transaction => transaction.type === "withdraw"))
                setstats(
                    [
                        {...tempstats[0], amount: stats.totWithdrew},
                        {...tempstats[1], amount: stats.totDeposited},
                        {...tempstats[2], amount: stats.referrals.length}
                    ]
                )
            }
            return getstats()
        },[]
    )
    return (
        <div className={classes.adminstats}>
            <div>
                <div>
                    <i className='fa fa-bars'></i>
                </div>
                <h3>Summary</h3>
                <div className={classes.stats}>
                                {stats && stats.map(stat => (
                                    <div className={stat.className}>
                                        <h4>{stat.name}</h4>
                                        <div>
                                            <section>
                                                {
                                                    !isloading ? 
                                                    (
                                                        <strong>{new Intl.NumberFormat().format(stat.amount)}</strong>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <ClipLoader size={20} color='white'/>
                                                        </div>
                                                    )
                                                } {stat.unit}
                                            </section>
                                            {stat.desc}
                                            <div onClick={() => setactive(stat.active)}>
                                                All
                                                <span><i className='fa fa-chevron-right'></i></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
            </div>
        </div>
    )
}
