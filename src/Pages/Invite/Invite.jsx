import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Invite.module.scss"
import Logo from "../../Components/Logo/Logo"

export default function Invite() {
    return (
        <div className={classes.invite}>
            <Logo />
            <div>
                <div>
                    <i className='fa fa-share-alt'></i>
                </div>
                <h3>Invitations</h3>
            </div>
            <Navbar active={"invite"}/>
        </div>
    )
}
