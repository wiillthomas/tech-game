import React from "react"

const TimeContainer = ( props ) => {
    const { time } = props;

    let years = Math.floor( time / 12 ) > 0 ? `Y: ${Math.floor( time / 12 )} ` : "Y: 0 "
    let months = time % 12 > 0 ? `M: ${time % 12}` : "M: 0"

    let formattedTime = `${years}${months}`

    return ( 
        <div>{formattedTime}</div>
     );
}
 
export default TimeContainer;