import React from "react";

export default ( props ) => {
    const { toggleHelp } = props;

    return (
        <div className="modal__background">
            <div className="modal__container modal__container--help">
                <button className="button" onClick={() => toggleHelp() }>x</button>
                <div className="help-image">

                </div>
            </div> 
        </div>
    )
}