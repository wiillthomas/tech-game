import React from "react"

export default function StartPage( props ){
    const { setPage } = props

    return (
        <button class="button" onClick={() => setPage("game")}>Start Game</button>
    )
} 