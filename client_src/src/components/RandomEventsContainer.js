import React, { useState } from "react";

export default function RandomEventsContainer( props ) {
    const { events } = props;
    return (
        <div className="random-events__container">
            { events.map( ( elem ) => <div>{ elem.name }</div> ) }
        </div>
    )
}