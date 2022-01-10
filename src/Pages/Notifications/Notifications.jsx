import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Notifications.module.scss"
import Logo from "../../Components/Logo/Logo"

export default function Notifications() {
    return (
        <div className={classes.notifications}>
            <Logo/>
            <div>
                <div>
                    <i className='fa fa-bell'></i>
                </div>
                <h3>Notifications</h3>
            </div>
            <Navbar active={"notifications"}/>
        </div>
    )
}
