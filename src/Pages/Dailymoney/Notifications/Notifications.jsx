import { format } from 'date-fns/esm'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'
import classes from '../../../Pages/Notifications/Notifications.module.scss'

export default function Notifications() {
    const [isloading, setisloading] = useState(true)
    const [notifications, setnotifications] = useState([])
    const [isread, setisread] = useState(false)
    useEffect(() => {
        let getNotifications = async () => {
            await axiosInstance.get("/notifications")
            .then((data) => {
                setnotifications(data.data)
                setisloading(false)
            })
        }
        getNotifications()
    }, [])

    let readNotification = (_id) => {
        let notifs = [...notifications]
        let notif = notifications.find(notif => notif._id === _id)
        let index = notifications.findIndex(notification => notification._id === notif._id)
        notif.isread = true
        notifs[index] = notif
        setnotifications(notifs)
        axiosInstance.patch("/notification/" + _id)
    }

    let deleteNotification = (_id) => {
        let notifs = notifications.filter(notif => notif._id !== _id)
        setnotifications(notifs)
        axiosInstance.delete("/notification/" + _id)
    }
    return (
        <div className={classes.notifications}>
            <div>
                <div>
                    <i className='fa fa-bell'></i>
                </div>
                <h3>Notifications</h3>
            </div>
            <div>
                <button className={!isread && classes.active} onClick={() => setisread(false)}>not read</button>
                <button className={isread && classes.active} onClick={() => setisread(true)}>Read</button>
            </div>
            {notifications.length > 0 ? notifications.filter(notification => notification.isread === isread).map((notification, index) => (
                <div key={index} className={classes.notifs + " " + (notification.type === "indigo" ? classes.indigo : notification.type === "green" ? classes.green : notification.type === "blue" ? classes.blue : classes.dodgerblue)}>
                    <p>
                        { notification.content}
                        <br />
                        <span>{format(new Date(notification.createdAt), "HH:mm dd, L yyyy")}</span>
                        </p>
                    <div>
                        <button style={isread ? {display: "none"} : {}} onClick={() => readNotification(notification._id)}>
                            <i className='fas fa-check'></i>
                        </button>
                        <button onClick={() => deleteNotification(notification._id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            ))
            :
            isloading ?
                    <div style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "50px"
                            }}>
                                <ClipLoader size={20}/>
                            </div> 
                            : 
                            <div style={{
                                            width: "100%", 
                                            textAlign: "center", 
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: "50px" 
                                        }}>
                                <h5>No notifications to show!</h5>
                            </div>
        }

        </div>
    )
}
