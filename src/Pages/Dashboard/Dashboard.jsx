import React from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Dashboard.module.scss"

export default function Dashboard() {
    return (
        <div className={classes.dashboard}>
            <Logo/>
            <div>
                <div>
                    <i className='fa fa-home'></i>
                </div>
                <h3>Dashboard</h3>
            </div>
            <Navbar active={"dashboard"}/>
        </div>
    )
}
