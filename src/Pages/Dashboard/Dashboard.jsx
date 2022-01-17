import React, {useEffect, useState} from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Dashboard.module.scss"
import decode from "jwt-decode"
import axios from "../../axios"
import { ClipLoader } from 'react-spinners'
import { Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import InvestModal from '../../Components/InvestModal/InvestModal'
import checkToken from '../../CheckToken'

export default function Dashboard() {
    checkToken()
    let decoded = decode(localStorage.token)
    const [withdrawals, setwithdrawals] = useState([])
    const [investments, setinvestments] = useState([])
    const [balance, setbalance] = useState(0)
    const [isloading, setisloading] = useState(true)
    const [active, setactive] = useState("dashboard")
    const [invest, setinvest] = useState(false)
    const [isapproved, setisapproved] = useState(true)

    function handleClose(){
        setinvest(false)
    }

    const [stats, setstats] = useState([
            {
                name: "Earning investment",
                unit: "$",
                desc: <p>Earning 3% daily"</p>,
                active: "earning",
                className: classes.earning
            },
            {
                name: "Total withdrew",
                unit: "$",
                active: "withdrawals",
                className: classes.withdrew,
                desc: <p>Accumulated amount + 10% of every referral investments</p>
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
                className: classes.referrals
            }
        ]
    )

    function diff_hours(dt2, dt1) 
    {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    }

    useEffect(
        () => {
            let getstats = async () => {
                let tempstats = [
                    {
                        name: "Earning investment",
                        unit: "$",
                        desc: <p>Earning 3% daily</p>,
                        active: "earning",
                        className: classes.earning
                    },
                    {
                        name: "Total earned",
                        unit: "$",
                        active: "withdrawals",
                        className: classes.withdrew,
                        desc: <p>Accumulated amount + 10% of every referral investments</p>
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
                let stats = await axios.get("/stats/" + decoded._id)
                stats = stats.data
                setisloading(false)
                setinvestments(stats.transactions.filter(transaction => transaction.type === "deposit"))
                setwithdrawals(stats.transactions.filter(transaction => transaction.type === "withdraw"))
                let diffhours = 0;
                if(new Date(stats.userstats.endTime) < new Date()){
                    diffhours = diff_hours(new Date(), new Date(stats.userstats.endTime))
                }
                let nOfTimes = Math.ceil(diffhours/24)
                setbalance((nOfTimes * ((3 / 100) * stats.userstats.activeInvestment)) + stats.userstats.balance)
                setstats(
                    [
                        {...tempstats[0], amount: stats.userstats.activeInvestment},
                        {...tempstats[1], amount: stats.userstats.totWithdrew},
                        {...tempstats[2], amount: stats.userstats.totDeposited},
                        {...tempstats[3], amount: stats.userstats.referrals.length}
                    ]
                )
            }
            return getstats()
        },[decoded._id]
    )

    return (
        <div className={classes.dashboard}>
            <Logo/>
            {
                active === "dashboard" ?
                    (
                    <>
                        <div>
                            <div>
                                <i className='fa fa-home'></i>
                            </div>
                            <h3>Dashboard</h3>
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
                            <h4>Pending: <span>{new Intl.NumberFormat().format(balance)}</span> $</h4>
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
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
                                                        <td>{format(new Date(withdrawal.createdAt), "HH:mm dd, L yyyy")}</td>
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
                                <span onClick={() => setinvest(true)}><i className='fa fa-plus-circle'></i> Top up</span>
                            </div>
                            <div>
                                <button className={isapproved && classes.active} onClick={() => setisapproved(true)}>APPROVED</button>
                                <button className={!isapproved && classes.active} onClick={() => setisapproved(false)}>PENDING</button>
                            </div>
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investments.length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan={3} style={{textAlign: "center", fontWeight: 700}}>No investments yet!</td>
                                                </tr>
                                            ):
                                            (
                                                investments.filter(investment => isapproved ? investment.approved === true : investment.approved === false).map((investment, i) => (
                                                    <tr key={i}>
                                                        <td>{format(new Date(investment.createdAt), "HH:mm dd, L yyyy")}</td>
                                                        <td>$ {new Intl.NumberFormat().format(investment.amount)}</td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                            </table>   
                    </div>   
                    <InvestModal invest={invest} handleClose={handleClose} id={decoded._id}/>              
                </>
                 )
                 :
                 (<Navigate to={"/referrals"}/>)
            }
            <Navbar active={"dashboard"}/>
        </div>
    )
}
