import React, {useEffect, userEffect, useState} from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Dashboard.module.scss"
import decode from "jwt-decode"

export default function Dashboard() {
    let decoded = decode(localStorage.token)
    const [userinfo, setuserinfo] = useState({})
    const [withdrawals, setwithdrawals] = useState([])
    const [investments, setinvestments] = useState([])
    const [isloading, setisloading] = useState(true)
    const [active, setactive] = useState("dashboard")

    useEffect(
        () => {
            
        }
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
                    </>
                    )
                :
                active === "withdrawals" ?
                    (
                    <>
                        <div>
                            <div>
                                <i className='fa fa-chevron-left'></i>
                            </div>
                            <h3>Earned</h3>
                        </div>
                    </>
                    )
                :
                 (
                <>
                    <div>
                        <div>
                            <i className='fa fa-chevron-left'></i>
                        </div>
                        <h3>Investment</h3>
                    </div>        
                </>
                 )
            }
            <Navbar active={"dashboard"}/>
        </div>
    )
}
