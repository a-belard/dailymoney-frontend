import React from 'react'
import classes from "./Navbar.module.scss"
import { useNavigate } from "react-router-dom"

export default function Navbar({active}) {
    let navigator = useNavigate()
    let navigate = (link) => {
        navigator("/" + link)
    }
    let nav = [
        {name: "Home", icon: "fa fa-home", active: "dashboard", href: "dashboard"},
        {name: "Invite", icon: "fa fa-share-alt", active: "invite", href: "referrals"},
        {name: "Notif.", icon: "fa fa-bell", active: "notifications", href: "notifications"},
        {name: "Account", icon: "fa fa-user", active: "account", href: "account"},
        {name: "Info", icon:"fa fa-info-circle", active: "info", href: "info"}
    ]
    return (
        <div className={classes.navbar}>
            {nav && nav.map((element, index) => (
                <div key={index} className={active === element.active && classes.active} onClick={e => navigate(element.href)}>
                    <div>
                        <i className={element.icon}></i>
                        <span>{element.name}</span>
                        {active === element.active && <hr/>}
                    </div>
                </div>
            ))}
        </div>
    )
}
