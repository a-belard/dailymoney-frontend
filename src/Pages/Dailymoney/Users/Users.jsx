import { format } from 'date-fns'
import React, {useEffect, useState, } from 'react'
import classes from "./Users.module.scss"
import { ClipLoader } from 'react-spinners'
import axiosInstance from '../../../axios'

export default function Users() {
    const [isloading, setisloading] = useState(true)
    const [users, setusers] = useState([])

    useEffect(() => {
        let getUsers = async () => {
            let data = await axiosInstance.get("/users")
            setusers(data.data)
            setisloading(false)
        }
        getUsers()
    },[])
    return (
        <div className={classes.users}>
            <div>
                <div>
                    <i className='fa fa-users'></i>
                </div>
                <h3>Users</h3>
            </div>
            <p><strong>{!isloading && users.length}</strong> users</p>
            <div>
                {isloading ?
                 <span style={{display: "flex", justifyContent: "center"}}><ClipLoader size={20}/></span>
                 :
                 (
                    <table>
                    {/* <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Names</th>
                            <th>Registered on</th>
                            <th>Referred by</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Wallet address</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {/* {isloading ?
                            (
                                <tr>
                                    <td colSpan={10}><ClipLoader size={20}/></td>
                                </tr>
                            )
                            :
                            users.length === 0 ?
                                (
                                    <tr>
                                        <td colSpan={9} style={{textAlign: "center", fontWeight: "700"}}>No users yet!</td>
                                    </tr>
                                ):
                                (
                                    users.map((user, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.names}</td>
                                            <td>{format(new Date(user.createdAt), "HH:MM EEE, L yyyy")}</td>
                                            <td>{user.referredby ? user.referredby : "No one"}</td>
                                            <td>{user.email}</td>
                                            <td>{user.country}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.walletAddress}</td>
                                        </tr>
                                    ))
                                )
                        } */}
                        <tr>
                            <td>No</td>
                            {users.map((user, i) => <td key={i}>{i+1}</td>)}
                        </tr>
                        <tr>
                            <td>Username</td>
                            {users.map((user, i) => <td key={i}>{user.username}</td>)}
                        </tr>
                        <tr>
                            <td>Names</td>
                            {users.map((user, i) => <td key={i}>{user.names}</td>)}
                        </tr>
                        <tr>
                            <td>Gender</td>
                            {users.map((user, i) => <td key={i}>{user.gender}</td>)}
                        </tr>
                        <tr>
                            <td>Registered on</td>
                            {users.map((user, i) => <td key={i}>{format(new Date(user.createdAt), "HH:MM EEE, L yyyy")}</td>)}
                        </tr>
                        <tr>
                            <td>Email</td>
                            {users.map((user, i) => <td key={i}>{user.email}</td>)}
                        </tr>
                        <tr>
                            <td>Country</td>
                            {users.map((user, i) => <td key={i}>{user.country}</td>)}
                        </tr>
                        <tr>
                            <td>Phone</td>
                            {users.map((user, i) => <td key={i}>{user.phone}</td>)}
                        </tr>
                        <tr>
                            <td>Referred by</td>
                            {users.map((user, i) => <td key={i}>{user.referredby ? user.referredby.username : "No one"}</td>)}
                        </tr>
                        <tr>
                            <td>Wallet address</td>
                            {users.map((user, i) => <td key={i}>{user.walletAddress}</td>)}
                        </tr>
                    </tbody>
                </table> 
                 )
                }
            </div>       
        </div>
    )
}
