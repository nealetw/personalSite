import React, {useEffect, useState} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie'
import { painArray, timeArray } from './SpeechBubbles';

import './Clicker.css';

function Clicker() {
  const [cookies, setCookies] = useCookies(['data']);

  const [total, setTotal] = useState(cookies?.data?.total ?? 0);
  const [lifetimeTotal, setLifetime] = useState(cookies?.data?.lifetimeTotal ?? 0);
  const [milestone, setMilestone] = useState(cookies?.data?.milestone ?? 10);
  const [owned, setOwned] = useState(cookies?.data?.owned ?? {});
  const [sessionTime, setSessionTime] = useState(cookies?.data?.sessionTime ?? 0);
  const [clicksPerSec, setClicksPerSec] = useState(0);
  const [speechText, setSpeechText] = useState('0');
  const [position, setPosition] = useState([0,0]);
  const [currentClicks, setCurrentClicks] = useState(0);
  const [upgrades, setUpgrades] = useState([
    {name:'Lillia Passive', price: 5, cps:0.2, unlockNumber: 5, image:'LilliaP.webp'},
    {name:'Arrow', price: 20, cps:1, unlockNumber: 20, image:'Arrow.webp'},
    {name:'Shotgun', price: 50, cps:3, unlockNumber: 50, image:'Shotgun.webp'},
    {name:'Landmines', price: 200, cps:6, unlockNumber: 200, image:'Mine.webp'},
    {name:'Forest Fire', price: 1000, cps:20, unlockNumber: 1000, image:'Fire.png'},
  ]);

  const handleUnlocks = () => {
    const notUnlocked = upgrades.find(t => !t.unlocked);
    if(notUnlocked?.unlockNumber <= total || notUnlocked?.unlockNumber <= lifetimeTotal/2){
      const newUp = [...upgrades];
      const index = newUp.findIndex(t => t.name === notUnlocked.name);
      if(index !== undefined){
        newUp[index] = {...newUp[index], unlocked: true};
      }
      setUpgrades(newUp);
    }
  }
  const autoClick = () => {
    setTotal(Math.round((total + clicksPerSec) * 10)/10);
    setLifetime(Math.round((lifetimeTotal + clicksPerSec) * 10)/10);
  }

  useEffect(() => {
    handleUnlocks();
    if(lifetimeTotal >= milestone){
      const speechIndex = Math.floor(Math.random() * painArray?.length);
      setSpeechText(painArray[speechIndex]);
      setMilestone(milestone * 5);
    }
    else if(sessionTime && !(sessionTime % 600)){
      const speechIndex = Math.floor(Math.random() * timeArray?.length);
      setSpeechText(timeArray[speechIndex]);
    }
    return () => {
      setCookies('data', {total, lifetimeTotal, owned, milestone, sessionTime})
    }
  }, [total])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpeechText('0');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [speechText])

  useEffect(() => {
    autoClick()
    const timeout = setTimeout(() => {
      setSessionTime(sessionTime + 1);
    }, 500);
    return () => clearTimeout(timeout);
  },[sessionTime])

  useEffect(() => {
    calculateClicks();
  }, [owned])

  const deerClick = (e) => {
    if(position[2])
      clearTimeout(position[2]);
    setTotal(total + 1);
    setLifetime(lifetimeTotal + 1);
    setCurrentClicks(currentClicks + 1);
    setPosition([e.pageX, e.pageY, setTimeout(() => {
      setCurrentClicks(0);
    }, 1000)])
  }

  const calculateClicks = () => {
    const keys = Object.keys(owned);
    let total = 0;
    keys.forEach(k => {
      const numOwned = isNaN(owned[k]) ? 0 : owned[k] ?? 0;
      const upgrade = upgrades.find(t => t.name == k);
      if(upgrade)
        total += ((numOwned * (upgrade.cps ?? upgrade.price * 0.05)) ?? 0);
    })
    if(total !== clicksPerSec){
      setClicksPerSec(Math.round(total * 10)/10);
    }
  }

  const buyUpgrade = (upgrade, newPrice) => {
    if(newPrice > total){
      return;
    }
    setTotal(Math.round((total - newPrice) * 10)/10);
    setOwned({...owned, [upgrade.name]:(owned[upgrade.name] ?? 0) + 1});
  }

  return (
    <div className="deerApp">
      <div className='deerContainer'>
        {currentClicks ? <p className='clickText' style={{
          position: "absolute",
          left: position[0],
          top: position[1]-50,
        }}>+ {currentClicks}</p> : <></>}
        <div class={speechText.length > 1 ? "speech-bubble" : "speech-bubble-hidden"}>{speechText}</div>
        <a className='deerButton' onClick={deerClick}>
          <img draggable='false' alt='Deer' className='deer' src={require('./../../images/deer.png')} />
        </a>
        <p>You've clicked the deer <br/><br/>
        <span className='clickCount'>{total}</span><br/><br/>
         times!</p>
        <br/>
        {clicksPerSec ? <p>Generating {clicksPerSec} clicks per second</p> : <p></p>}
      </div>
      <div className='upgradeContainer'>
        <ul className='upgradeList'>
          {upgrades.filter(t => t.unlocked).map(u =>{
            const newPrice = Math.round(u.price * (owned[u.name] ? 1.1 * owned[u.name] : 1));
            const upgradeCPS = ((owned[u.name] * (u.cps ?? u.price * 0.05)) ?? 0);
            return (<div className={total < newPrice ? 'upgradeDisabled' : 'upgrade'} onClick={() =>
                      buyUpgrade(u, newPrice)
                    }>
                      <img draggable='false' src={u.image ? require(`./../../images/upgradeImages/${u.image}`) : ''} className={total < newPrice ? 'disabledUpgradeImage' : 'upgradeImage'}/>

                      <div className='upgradeText'>
                        <span>{u.name} - Cost: <span className='italic'>{newPrice} clicks</span> </span>
                        {owned[u.name] ? <span>{owned[u.name]} owned <span className='italic'>{`(Generating ${upgradeCPS} clicks/sec)`}</span></span> : <></>}
                      </div>
                    </div>)
            }
          )}
        </ul>
      </div>
      <span className='signature'>a dumb thing made by <a className='signatureLink' href='https://nealetw.com/'>Tim Neale</a></span>
    </div>
  );
}

export default Clicker;
