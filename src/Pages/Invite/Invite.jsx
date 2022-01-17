import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import classes from "./Invite.module.scss"
import Logo from "../../Components/Logo/Logo"
import decode from "jwt-decode"
import axiosInstance from '../../axios'
import { ClipLoader } from 'react-spinners'
import { format } from 'date-fns'
import checkToken from '../../CheckToken'

export default function Invite() {
    checkToken()
    let decoded = decode(localStorage.token)
    let id = decoded._id.toString()
    let referralink = `https://dailymoneyprovider.netlify.app/register/ ${id}`
    const [referrals, setreferrals] = useState([])
    const [isloading, setisloading] = useState(true)

    useEffect(
        () => {
            async function getReferrals(){
                let referrals = await axiosInstance.get("/referrals/"+id);
                setreferrals(referrals.data);
                setisloading(false)
            }
            getReferrals()
        }, [id]
    )

    let writeToClipboard = (e) => {
        e.target.style.backgroundColor = "#0a0"
        window.navigator.clipboard.writeText(referralink.replace(" ",""))
    }
    return (
        <div className={classes.invite}>
            <Logo />
            <div>
                <div>
                    <i className='fa fa-share-alt'></i>
                </div>
                <h3>Invitations</h3>
            </div> 
            <div className={classes.referralink}>
                <h4>Referral link</h4>
                <p>{referralink}</p>
                <button onClick={e => writeToClipboard(e)}>COPY</button>
            </div>
            <div>
                <h4>Share</h4>
                <p>⚠️ You directly get 10% of every investment of your referrals.</p>
                <div>
                    <a href={`https://t.me/share/url?url=${referralink.replace(" ","")}&text=Dailymoney. Real. Take your shot!`} target="_blank" rel='noreferrer'>
                        <i className='fab fa-telegram-plane'></i>Share
                    </a>
                    <a href={`https://wa.me/?text=${referralink.replace(" ","")}`} target="_blank" rel='noreferrer'>
                        <i className='fa fa-whatsapp'></i>Share
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${referralink.replace(" ","")},'facebook-share-dialog','width=626,height=436')`} target="_blank" rel="noreferrer">
                        <i className='fab fa-facebook'></i>Share
                    </a>
                </div>
            </div>
            <div>
                <h4>Referrals</h4>

                {isloading ? 
                    (
                        <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginTop: "50px"}}><ClipLoader size={20}/></div>
                    )
                    :
                    <div>
                        <h4>{referrals.length} referrals</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Username</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referrals.length === 0 ?
                                    (
                                        <tr>
                                            <td colSpan={3} style={{textAlign: "center", fontWeight: "700"}}>No referrals invited yet!</td>
                                        </tr>
                                    ):
                                    (
                                        referrals.map((referral, i) => (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{referral?.username || "Deleted"}</td>
                                                <td>{format(new Date(referral.createdAt), "HH:mm dd, L yyyy")}</td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <Navbar active={"invite"}/>
        </div>
    )
}
