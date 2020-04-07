import React from "react"

export default function StartPage( props ){
    const { setPage } = props

    return (
        <div className="start-page__wrapper">
            <div className="start-page__container">
                <h1>TECH GIANT</h1>
                <div className="start-page__text">
                    <h3>Goal: To get the highest total number of users in 15 years.</h3>
                    <p>Instructions:</p>
                    <ul>
                        <li>If your cash falls below 0 - you lose!</li>
                        <li>Use the buttons on the right to buy upgrades &amp; hire staff.</li>
                        <li>Each user increases your Montly Recurring Revenue, which gives more cash to buy upgrades.</li>
                        <li>More users require more development resources. Make sure to balance sales &amp; marketing with hiring developers &amp; improving infrastructure!</li>
                        <li>If there are not enough development resources to support the userbase, the product will begin to suffer! Your churn rate will rise &amp; your users will drop. </li>
                        <li>Upgrade your infrastructure, or hire more developers, to increase your product score &amp; stop users from leaving!</li>
                        <li>Random events may occour that affect your cash &amp; user base!</li>
                    </ul>
                </div>                
                <button className="button" onClick={() => setPage("game")}>Start Game</button>
            </div>
        </div>
    )
} 