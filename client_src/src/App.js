import React, { useState } from "react";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

export default function App() {
  const [ page, setPage ] = useState( "start" )
  
  if ( page == "start" ) return <StartPage setPage={setPage} />
  else if ( page == "game" ) return <GamePage />

}