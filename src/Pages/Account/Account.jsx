import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Account.module.scss"

export default function Account() {
    return (
        <div className={classes.account}>
            <div>
                <div>
                    <i className='fa fa-user'></i>
                </div>
                <h3>Profile</h3>
            </div>
            <Navbar active={"account"}/>
        </div>
    )
}
