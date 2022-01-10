import React from 'react'
import Logo from '../../Components/Logo/Logo'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Info.module.scss"

export default function Info() {
    return (
        <div className={classes.info}>
            <Logo/>
            <div>
                <div>
                    <i className='fa fa-info'></i>
                </div>
                <h3>Support</h3>
            </div>
            <Navbar active={"info"} />
        </div>
    )
}
