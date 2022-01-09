import React from 'react'
import classes from "./Landing.module.scss"
import Image from "../../assets/money.png"

export default function Landing() {
    return (
        <div className={classes.landing}>
            <div>
                <img src={Image} alt="" />
            </div>
            <h2>DAILYMONEY</h2>
            <h4>Brief</h4>
            <p>
                Welcome to dailymoney. <br />
                Invest in us and you get 3% of your investment <br />
                calculated on a daily basis.
            </p>
            <h4>Get Started</h4>
            <a href="/login">
                LOGIN <i className='fas fa-chevron-right'></i>
            </a>
            <div>
                <hr /> or <hr />
            </div>
            <a href="/register/new">
                SIGN UP <i className='fas fa-chevron-right'></i>
            </a>
        </div>
    )
}
