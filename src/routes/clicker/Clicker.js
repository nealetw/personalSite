import React, {useEffect, useState} from 'react';

import './Clicker.css';

function Clicker() {
  const [total, setTotal] = useState(0)
  const [upgrades, setUpgrades] = useState([{name:'Arrow', price: 5, cps:0.2}])
  const [clicksPerSec, setClicksPerSec] = useState(0)
  const [owned, setOwned] = useState({})
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {

  }, [total])

  const autoClick = () => {
    setTotal(Math.round((total + clicksPerSec) * 10)/10);
    setSessionTime(sessionTime + 1);
  }
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
  }

  const calculateClicks = () => {
    const keys = Object.keys(owned)
    let total = 0
    keys.forEach(k => {
      const numOwned = isNaN(owned[k]) ? 0 : owned[k] ?? 0;
      const upgrade = upgrades.find(t => t.name == k)
      if(upgrade)
        total += ((numOwned * upgrade.cps) ?? 0)
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
  console.log(total)

  return (
    <div className="deerApp">
      <div className='deerContainer'>
        <a className='deerButton' onClick={deerClick}>
          <img alt='Deer' className='deer' src={require('./../../images/deer.png')} />
        </a>
        <p>You've clicked the deer {total} times!</p>
        <br/>
        {clicksPerSec ? <p>Generating {clicksPerSec} clicks per second</p> : <></>}
      </div>
      <div className='upgradeContainer'>
        <ul className='upgradeList'>
          {upgrades.map(u =>{
            const newPrice = Math.round(u.price * (owned[u.name] ? 1.1 * owned[u.name] : 1))
            return (<button className='upgrade' onClick={() =>
                      buyUpgrade(u, newPrice)
                    }>
                      {u.name} - {newPrice} {owned[u.name] ? `(${owned[u.name]} owned)` : ''}
                    </button>)
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default Clicker;
