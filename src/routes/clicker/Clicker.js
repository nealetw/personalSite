import React, {useEffect, useState} from 'react';
import { painArray, timeArray } from './SpeechBubbles';

import './Clicker.css';

function Clicker() {
  const [total, setTotal] = useState(0)
  const [lifetimeTotal, setLifetime] = useState(0)
  const [milestone, setMilestone] = useState(10)
  const [upgrades, setUpgrades] = useState([
    {name:'Lillia Passive', price: 5, cps:0.2, unlockNumber: 5, image:'LilliaP.webp'},
    {name:'Arrow', price: 20, cps:1, unlockNumber: 5, image:'Arrow.webp'},
    {name:'Shotgun', price: 50, cps:3, unlockNumber: 5, image:'Shotgun.webp'},
    {name:'Forest Fire', price: 1000, cps:20, unlockNumber: 5, image:'Fire.png'},
  ])
  const [clicksPerSec, setClicksPerSec] = useState(0)
  const [owned, setOwned] = useState({})
  const [sessionTime, setSessionTime] = useState(0)
  const [speechText, setSpeechText] = useState('0')

  const handleUnlocks = () => {
    const notUnlocked = upgrades.find(t => !t.unlocked);
    if(notUnlocked?.unlockNumber <= total){
      const newUp = [...upgrades]
      const index = newUp.findIndex(t => t.name === notUnlocked.name)
      if(index !== undefined){
        newUp[index] = {...newUp[index], unlocked: true}
      }
      setUpgrades(newUp)
    }
  }
  const autoClick = () => {
    setTotal(Math.round((total + clicksPerSec) * 10)/10);
    setLifetime(Math.round((lifetimeTotal + clicksPerSec) * 10)/10);
    setSessionTime(sessionTime + 1);
  }

  useEffect(() => {
    handleUnlocks();
    if(lifetimeTotal >= milestone){
      const speechIndex = Math.floor(Math.random() * painArray?.length)
      setSpeechText(painArray[speechIndex])
      setMilestone(milestone * 5)
    }
    else if(sessionTime && !(sessionTime % 60)){
      const speechIndex = Math.floor(Math.random() * timeArray?.length)
      setSpeechText(timeArray[speechIndex])
    }
  }, [total])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpeechText('0')
    }, 5000);
    return () => clearTimeout(timeout);
  }, [speechText])

  useEffect(() => {
    const timeout = setTimeout(() => {
      autoClick()
    }, 1000);
    return () => clearTimeout(timeout);
  },[sessionTime, autoClick])

  useEffect(() => {
    calculateClicks()
  }, [owned])

  const deerClick = () => {
    setTotal(total + 1)
    setLifetime(lifetimeTotal + 1)
  }

  const calculateClicks = () => {
    const keys = Object.keys(owned)
    let total = 0
    keys.forEach(k => {
      const numOwned = isNaN(owned[k]) ? 0 : owned[k] ?? 0;
      const upgrade = upgrades.find(t => t.name == k)
      if(upgrade)
        total += ((numOwned * (upgrade.cps ?? upgrade.price * 0.05)) ?? 0)
    })
    if(total !== clicksPerSec){
      setClicksPerSec(Math.round(total * 10)/10)
    }
  }

  const buyUpgrade = (upgrade, newPrice) => {
    if(newPrice > total){
      return
    }
    setTotal(Math.round((total - newPrice) * 10)/10)
    setOwned({...owned, [upgrade.name]:(owned[upgrade.name] ?? 0) + 1})
  }

  return (
    <div className="deerApp">
      <div className='deerContainer'>
        <div class={speechText.length > 1 ? "speech-bubble" : "speech-bubble-hidden"}>{speechText}</div>
        <a className='deerButton' onClick={deerClick}>
          <img draggable='false' alt='Deer' className='deer' src={require('./../../images/deer.png')} />
        </a>
        <p>You've clicked the deer {total} times!</p>
        <br/>
        {clicksPerSec ? <p>Generating {clicksPerSec} clicks per second</p> : <p></p>}
      </div>
      <div className='upgradeContainer'>
        <ul className='upgradeList'>
          {upgrades.filter(t => t.unlocked).map(u =>{
            const newPrice = Math.round(u.price * (owned[u.name] ? 1.1 * owned[u.name] : 1))
            return (<div className={total < newPrice ? 'upgradeDisabled' : 'upgrade'} onClick={() =>
                      buyUpgrade(u, newPrice)
                    }>
                      <img draggable='false' src={u.image ? require(`./../../images/upgradeImages/${u.image}`) : ''} className={total < newPrice ? 'disabledUpgradeImage' : 'upgradeImage'}/>
                      <span>{u.name} - {newPrice} {owned[u.name] ? `(${owned[u.name]} owned)` : ''}</span>
                    </div>)
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default Clicker;
