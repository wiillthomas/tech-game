import React from "react"
import CurrencyDisplay from "./CurrencyDisplay"
import NumberDisplay from "./NumberDisplay"

function UpgradeButton(props) {
    const { name, cost, users, devResource, userGrowth, wage } = props.data
    const { handleUpgradeClick, cash } = props

    let disabled = cost > cash ? true : false;

        return (
            <div className={`button ${ disabled ? "button--disabled" : null } upgrade`} onClick={ () => handleUpgradeClick( cost, users, userGrowth, devResource, wage ) }>
                <div className="name"><b>{ name }</b></div>
                <div><b>💵cost</b> -<CurrencyDisplay value={cost} /></div>
                <div><b>👥users</b> +<NumberDisplay value={ users } /></div>
                <div><b>📈growth</b> +<NumberDisplay value={ userGrowth } /> </div>
                <div><b>👨🏻‍💻dev</b> +<NumberDisplay value={ devResource } /></div>
                <div><b>🤑wage</b> -<CurrencyDisplay value={wage} /></div>
            </div>
        )
}


export default UpgradeButton;
