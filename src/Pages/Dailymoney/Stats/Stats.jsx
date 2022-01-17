import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from "./Stats.module.scss"

export default function Stats(props) {
    const [withdrawals, setwithdrawals] = useState([])
    const [investments, setinvestments] = useState([])
    const [isloading, setisloading] = useState(true)
    const [active, setactive] = useState("dashboard")
    const [isapproved, setisapproved] = useState(true)

    const [stats, setstats] = useState([
            {
                name: "Total withdrew",
                unit: "$",
                active: "withdrawals",
                className: classes.withdrew,
            },
            {
                name: "Total investment",
                unit: "$",
                active: "investments",
                className: classes.investment,
            },
            {
                name: "Total users",
                unit: "People",
S                className: classes.referrals
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
                        desc:""
                    },
                    {
                        name: "Total investment",
                        unit: "$",
                        active: "investments",
                        className: classes.investment,
                        desc:""
                        // desc: <p>Investment from the start</p>
                    },
                    {
                        name: "Total users",
                        unit: "People",
                        desc: "",
                        active: "users",
                        className: classes.usersx
                    }
                ]
                let stats = await axiosInstance.get("/stats")
                stats = stats.data
                setisloading(false)
                setinvestments(stats.transactions.filter(transaction => transaction.type === "deposit"))
                setwithdrawals(stats.transactions.filter(transaction => transaction.type === "withdraw"))
                let withdrewsum = 0
                let investsum = 0
                stats.transactions
                    .filter(transact => transact.approved === true)
                    .filter(transaction => transaction.type === "withdraw")
                    .forEach(transact => withdrewsum += transact.amount)
                stats.transactions
                    .filter(transact => transact.approved === true)
                    .filter(transaction => transaction.type === "deposit")
                    .forEach(transact => investsum += transact.amount)
                setstats(
                    [
                        {...tempstats[0], amount:  withdrewsum},
                        {...tempstats[1], amount: investsum},
                        {...tempstats[2], amount: stats.users}
                    ]
                )
            }
            return getstats()
        },[]
    )
    return (
        <div className={classes.adminstats}>
            {/* <div>
                <div>
                    <i className='fa fa-bars'></i>
                </div>
                <h3>Summary</h3>
            </div> */}
            {
                active === "dashboard" ?
                    (
                    <>
                        <div>
                            <div>
                                <i className='fa fa-bars'></i>
                            </div>
                            <h3>Summary</h3>
                        </div>
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
                    </>
                    )
                :
                active === "withdrawals" ?
                    (
                    <>
                        <div>
                            <div onClick={() => setactive("dashboard")}>
                                <i className='fa fa-chevron-left'></i>
                            </div>
                            <h3>Earned</h3>
                        </div>
                        <div className={classes.earned}>
                            <h4>Earned and withdrew</h4>
                            {/* <h4>Pending: <span>{new Intl.NumberFormat().format(balance)}</span> $</h4> */}
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Useranme</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawals.length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan={3} style={{textAlign: "center", fontWeight: "700"}}>No earnings yet!</td>
                                                </tr>
                                            ):
                                            (
                                                withdrawals.map((withdrawal, i) => (
                                                    <tr key={i}>
                                                        <td>{format(new Date(withdrawal.createdAt), "HH:MM EEE, L yyyy")}</td>
                                                        <td>{withdrawal.userId.username}</td>
                                                        <td>$ {new Intl.NumberFormat().format(withdrawal.amount)}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                            </table>   
                        </div>   
                    </>
                    )
                :
                active === "investments" ?
                 (
                <>
                    <div>
                        <div onClick={() => setactive("dashboard")} >
                            <i className='fa fa-chevron-left'></i>
                        </div>
                        <h3>Investment</h3>
                    </div>     
                    <div className={classes.invested}>
                            <div>
                                <h4>Investments</h4>
                                {/* <span onClick={() => setinvest(true)}><i className='fa fa-plus-circle'></i> Top up</span> */}
                            </div>
                            <div>
                                <button className={isapproved && classes.active} onClick={() => setisapproved(true)}>APPROVED</button>
                                <button className={!isapproved && classes.active} onClick={() => setisapproved(false)}>PENDING</button>
                            </div>
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Username</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investments
                                        .filter(investment => isapproved ? investment.approved === true : investment.approved === false)
                                        .length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan={3} style={{textAlign: "center", fontWeight: 700}}>{isapproved ? "No investments yet!" : "No pending investments!"}</td>
                                                </tr>
                                            ):
                                            (
                                                investments
                                                .filter(investment => isapproved ? investment.approved === true : investment.approved === false)
                                                .map((investment, i) => (
                                                    <tr key={i}>
                                                        <td>{format(new Date(investment.updatedAt), "HH:MM EEE, L yyyy")}</td>
                                                        <td>{investment.userId.username}</td>
                                                        <td>$ {new Intl.NumberFormat().format(investment.amount)}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                            </table>   
                    </div>   
                </>
                 )
                 :
                 props.setactive()
            }
        </div>
    )
}
