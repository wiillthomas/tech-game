import React, { Component } from 'react';
import '../styles/index.scss';

import TimeContainer from "../components/TimeContainer"
import UpgradeButton from "../components/UpgradeButton"
import CurrencyDisplay from "../components/CurrencyDisplay"
import RandomEventsContainer from "../components/RandomEventsContainer"

import GameOverModal from "../components/modals/GameOverModal";
import HelpModal from "../components/modals/HelpModal"

import gameLoop from "../helpers/gameLoop"
import randomEvents from "../helpers/randomEvents"
import upgrades from "../helpers/upgrades"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: true,
      helpModal: false,
      gameOver: false,
      time: 1,
      cash: 10000,
      users: 0,
      userGrowth: 0,
      userChurn: 0,
      productScore: 100,
      productGrowth: 0,
      devResources: 1,
      wageBill: 100,
      events: []
    }
  }

  componentDidMount(){
    setInterval(() => {
      const { time, cash, users, wageBill, play } = this.state
      
      if ( cash <= 0 || time >= 180 ) { 
        this.setState({
          play: false,
          gameOver: true
        })

      } else if ( play ) {
        const { playChange, eventsChange, productChange, userChurn, userChange, cashChange } = gameLoop( this.state )

        this.setState({
          play: playChange,
          time: time + 1,
          events: eventsChange,
          cash: Math.round(cashChange + ( users ) - wageBill),
          productScore: Math.round(productChange),
          userChurn: userChurn,
          users: Math.round( userChange )
        })

      }
    }, 1000);
  
  }

  toggleHelp = () => {
    const { play, helpModal } = this.state

    this.setState({
      play: play ? false : true,
      helpModal: helpModal ? false : true,
    })
  }
  
  handleUpgradeClick = ( cost, addedUsers, addedUserGrowth, addedDevResource, addedWage ) => {
    const { cash, users, userGrowth, devResources, wageBill, play } = this.state;

    if ( play ) {
      this.setState({
        cash: cash - cost,
        users: users + addedUsers,
        userGrowth: userGrowth + addedUserGrowth,
        devResources: devResources + addedDevResource,
        wageBill: wageBill + addedWage,
      })
    }
  }


  render() { 
    const { cash, users, productScore, time, devResources, userGrowth, userChurn, wageBill, gameOver, events, helpModal } = this.state;
    const { handleUpgradeClick, toggleHelp } = this;

    return (
      <>
        { gameOver ? <GameOverModal users={users} /> : null }
        { helpModal ? <HelpModal toggleHelp={toggleHelp} /> : null }
        <div className="header">
          <div className={`header__cash ${ users < wageBill ? "header__cash--negative" : null }`}  >
            <CurrencyDisplay value={cash} />
          </div>
          <div className="header__help">
            <button className="button" onClick={() => toggleHelp()}>Help</button>
          </div>
          <div className="header__time"><TimeContainer time={time} /></div>
        </div>
        <div className="main">
          <div className="stats__wrapper">
            <div className="stats__container">
              <div className="stats__section">
                <div><span>👥 Users: { users }<span>MRR: ${ users }</span></span></div>
                <div>📈 Growth: +{ userGrowth } p/m</div>
                <div>📉 Churn: { userChurn > 0 ? userChurn * 100 : 0 }% p/m</div>
              </div>
              <div className="stats__section">
                <div><span className={`${ users / 200 > devResources ? "negative" : "" }`}>💻 Product Score: { productScore }/100</span></div>
                <div>🤑 Wage Bill: ${ wageBill }</div>
                <div>👨🏻‍💻 Dev Resources: { devResources }</div>
              </div>
              <div className="stats__section stats__section--help">
                <div><span className={`${ users / 200 > devResources ? "negative" : "" }`}>You currently have the resources to provide for { devResources * 200 } users.</span></div>
              </div>  
            </div>
          </div>
          <div className="upgrades__wrapper">
            <div className="upgrades__container">
              <div className="upgrades__column">
                { upgrades.sales.map( ( elem ) => <UpgradeButton data={elem} cash={cash} handleUpgradeClick={handleUpgradeClick} /> ) } <br />
              </div>
              <div className="upgrades__column">
                { upgrades.dev.map( ( elem ) => <UpgradeButton data={elem} cash={cash} handleUpgradeClick={handleUpgradeClick} /> ) }
              </div>
            </div>
          </div>
        </div>
        <RandomEventsContainer events={events} />
      </>
    );
  }
}
 


export default App;
