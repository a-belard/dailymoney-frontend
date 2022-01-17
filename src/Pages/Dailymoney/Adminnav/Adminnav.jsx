import React, {useEffect} from 'react'
import classes from "../../../Components/Navbar/Navbar.module.scss"
import axios from "../../../axios"

export default function Admin({active, changePage}) {
    const [nOfNotifs, setnOfNotifs] = React.useState()
    useEffect(() => {
        let getnotifs = () => {
            axios.get("/notifications")
            .then(data => {
                let notifs = data
                setnOfNotifs(notifs.data.filter(notif => notif.isread === false).length)
            }) 
        }
        getnotifs()
    }, [])

    let nav = [
        {name: "Summary", icon: "fa fa-bars", active: "dashboard"},
        {name: "Pending", icon: "fa fa-business-time", active: "invite"},
        {name: "Notif.", icon: "fa fa-bell", active: "notifications"},
        {name: "Ref. Bal.", icon: "fa fa-star", active: "refbal"},
        {name: "Users", icon: "fa fa-users", active: "users"},      
    ]
    return (
        <div className={classes.navbar}>
            {nav && nav.map((element, index) => (
                <div key={index} className={active === element.active && classes.active} onClick={() => changePage(element.active)}>
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
