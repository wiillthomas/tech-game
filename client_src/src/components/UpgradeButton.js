import React from "react"

function UpgradeButton(props) {
    const { name, cost, users, devResource, userGrowth, wage } = props.data
    const { handleUpgradeClick, cash } = props
        return (
            <button onClick={ () => handleUpgradeClick( cost, users, userGrowth, devResource, wage ) }>
                name: { name } <br />
                cost: { cost } <br />
                user increase: { users }<br />
            </button>
        )
}


export default UpgradeButton;
