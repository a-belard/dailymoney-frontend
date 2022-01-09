import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios'
import classes from "./Signup.module.scss"

export default function Signup(props) {
    let params = useParams()
    const [referer, setreferer] = useState("")
    useEffect(
        () => {
            if(params.referer !== "new" && params.referer.length === 24){
                var getUser = async () => {
                    await axiosInstance.get("/username/"+params.referer)
                    .then(data => setreferer(data.data))
                }
                getUser()
            }
        },
    [params.referer])
    return (
        <div className={classes.signup}>
            <h3>DAILYMONEY</h3>
            <h3>SIGN UP</h3>
            <form>
                {params.referer !== "new" && params.referer.length === 24?
                                <div>
                                    <label htmlFor="referred">Referred by</label>
                                    <input type="text" id='referred' required readOnly value={referer} disabled/>
                                </div>
                                :
                                ""
                }
                <div>
                    <label htmlFor="names">Names</label>
                    <input type="text" id='names' required/>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' required/>
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" id='Email' required/>
                </div>
                <div>
                    <label htmlFor="trx">Trx wallet address</label>
                    <input type="text" id='trx' required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' required pattern='{6,}'/>
                </div>
                <div>
                    <form action="?" method="POST">
                        <div class="g-recaptcha" data-sitekey="6LeScP4dAAAAAGu0lLoVo50ivpG3gPysS5_rY6pA"></div>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div>
                    <span>By clicking SIGN UP, you agree to our <strong>Terms, Privacy</strong> and <strong>Policies</strong>.</span>
                    <br />
                    <input type="submit" value="SIGN UP"/>
                </div>
            </form>
        </div>
    )
}
