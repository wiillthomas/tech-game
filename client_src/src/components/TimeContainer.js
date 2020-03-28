import React from "react"

const TimeContainer = ( props ) => {
    const { time } = props;

    let years = Math.floor( time / 12 ) > 0 ? `Year: ${Math.floor( time / 12 )} ` : "Year: 0 "
    let months = time % 12 > 0 ? `Month: ${time % 12}` : "Month: 0"

    let formattedTime = `${years}${months}`

    return ( 
        <div>{formattedTime}</div>
     );
}
 
export default TimeContainer;