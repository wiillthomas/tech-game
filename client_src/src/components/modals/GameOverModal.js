import React, { useEffect, useState } from "react";

export default ( props ) => {
    const { handleReset, users } = props
    const [ leaderboard, setLeaderboard ] = useState(null)
    const [ formName, setFormName ] = useState("")

    useEffect(() => {
        try {
            fetch("http://localhost:9000/api/leaderboard")
                .then(( res ) => {
                    return res.json()
                })
                .then(( data ) => {
                    setLeaderboard(data)

                })
        } catch ( err ) {
            console.log( err )
        }
    }, [users] )

    function handleSubmit( e ){
        e.preventDefault()

        fetch("http://localhost:9000/api/leaderboard", {
            method: "post",
            body: {
                name: formName,
                users
            }
        })
        .then( ( response ) => {
            return response.json()
        } )
        .then( ( data ) => {
            console.log( data )
        } )

    }

    return (
        <div className="modal__background">
            <div className="modal__container modal__container--game-over">
                {leaderboard}
                <div className="submit-container">
                    <form onSubmit={( e ) => { handleSubmit( e ) }}>
                        <input required value={formName} onChange={(e) => { setFormName(e.currentTarget.value) } }/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <button onClick={() => handleReset()}>Try Again</button>
            </div> 
        </div>
    )
}