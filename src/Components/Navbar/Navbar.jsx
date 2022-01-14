import React, {useEffect} from 'react'
import classes from "./Navbar.module.scss"
import { useNavigate } from "react-router-dom"
import decode from "jwt-decode"
import axios from "../../axios"

export default function Navbar({active}) {
    let id = decode(localStorage.token)._id
    const [nOfNotifs, setnOfNotifs] = React.useState()
    let navigator = useNavigate()
    let navigate = (link) => {
        navigator("/" + link)
    }

    useEffect(() => {
        let getnotifs = () => {
            axios.get("/notifications/" + id)
            .then(data => {
                let notifs = data
                setnOfNotifs(notifs.data.filter(notif => notif.isread === false).length)
            }) 
        }
        getnotifs()
    }, [id])

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
                        {nOfNotifs > 0 && <div></div>}
                        <span>{element.name}</span>
                        {active === element.active && <hr/>}
                    </div>
                </div>
            ))}
        </div>
    )
}
