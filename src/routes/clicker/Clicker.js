import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Tooltip } from 'react-tooltip';
import { painArray, timeArray } from './SpeechBubbles';
import SiteSignature from '../../components/SiteSignature/signature';

import './Clicker.css';

function Clicker() {
    const versionNumber = '1.0';
    useEffect(() => {
        document.title = 'Deer Clicker';
    }, []);

    const [cookies, setCookies] = useCookies(['data']);

    const [total, setTotal] = useState(cookies?.data?.total ?? 0);
    const [lifetimeTotal, setLifetime] = useState(
        cookies?.data?.lifetimeTotal ?? 0
    );
    const [milestone, setMilestone] = useState(cookies?.data?.milestone ?? 10);
    const [owned, setOwned] = useState(cookies?.data?.owned ?? {});
    const [deerLevel, setDeerLevel] = useState(cookies?.data?.deerLevel ?? 0);
    const [sessionTime, setSessionTime] = useState(
        cookies?.data?.sessionTime ?? 0
    );
    const [clicksPerSec, setClicksPerSec] = useState(0);
    const [speechText, setSpeechText] = useState('0');
    const [position, setPosition] = useState([0, 0]);
    const [currentClicks, setCurrentClicks] = useState(0);
    const [winModal, setWinModal] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [upgrades, setUpgrades] = useState([
        {
            name: 'Lillia Passive',
            price: 5,
            cps: 0.2,
            unlockNumber: 5,
            image: 'LilliaP.webp',
            desc: 'Lillia passive does like, zero damage, but it should hurt the deer a little bit',
        },
        {
            name: 'Arrow',
            price: 20,
            cps: 1,
            unlockNumber: 20,
            image: 'Arrow.webp',
            desc: 'Upgrade to bow and arrow, the most primitive deer hunting tool!',
        },
        {
            name: 'Shotgun',
            price: 100,
            cps: 4,
            unlockNumber: 60,
            image: 'Shotgun.webp',
            desc: 'A shotgun its the true tool of hunting deer, modern technology!',
        },
        {
            name: 'Bear Trap',
            price: 250,
            cps: 6,
            unlockNumber: 200,
            image: 'Trap.png',
            desc: 'Okay maybe a trap would do better. A bear trap should keep it in place long enough...',
        },
        {
            name: 'Landmines',
            price: 1000,
            cps: 12,
            unlockNumber: 550,
            image: 'Mine.webp',
            desc: `Fuck it, traps aren't enough, just blow it up with mines`,
        },
        {
            name: 'Forest Fire',
            price: 7500,
            cps: 20,
            unlockNumber: 3000,
            image: 'Fire.png',
            desc: 'This deer just wont die, burn down the whole forest',
        },
        {
            name: 'Orbital Cannon',
            price: 13500,
            cps: 35,
            unlockNumber: 10000,
            image: 'Orbital.webp',
            desc: `We take to space in hopes gravity will do the work against this deer.`,
        },
        {
            name: 'Global Warming',
            price: 30000,
            cps: 60,
            unlockNumber: 25000,
            image: 'earth.png',
            desc: `...destroying the whole forest wasn't enough, now we cook the planet alive.`,
        },
        {
            name: 'Moon Throw',
            price: 85000,
            cps: 110,
            unlockNumber: 85000,
            image: 'MoonThrow.jpg',
            desc: `Strap some rockets on the moon, direct it toward the planet, and wait..`,
        },
        {
            name: 'Black Hole',
            price: 1000000,
            cps: 2000,
            unlockNumber: 800000,
            image: 'Blackhole.webp',
            desc: `Aurelion Sol can surely execute the deer, how many stacks does he have?`,
        },
        {
            name: 'Death',
            price: 100000000,
            cps: 10000000,
            unlockNumber: 100000000,
            image: 'Skull.png',
            desc: `This kills the deer.`,
        },
    ]);
    const [deerUpgrades, setDeerUpgrades] = useState([
        {
            name: 'Deer',
            price: 0,
            unlockNumber: 0,
            image: 'ReindeerIcon.png',
            desc: 'Base Deer',
            bought: false,
            clickMult: 1,
            passMult: 1,
            deerPic: 'deer.png',
        },
        {
            name: 'Reindeer',
            price: 10000,
            unlockNumber: 10000,
            image: 'ReindeerIcon.png',
            desc: 'Upgrade to a reindeer, with a massive rack.',
            bought: false,
            clickMult: 10,
            passMult: 2,
            deerPic: 'reindeer.png',
        },
        {
            name: 'Moose',
            price: 50000,
            unlockNumber: 50000,
            image: 'mooseIcon.png',
            desc: 'Upgrade to a horse, but dont it wont be beat dead.',
            bought: false,
            clickMult: 100,
            passMult: 4,
            deerPic: 'Moose.png',
        },
        {
            name: 'Horse',
            price: 300000,
            unlockNumber: 300000,
            image: 'horse.png',
            desc: 'Upgrade to a horse, but dont it wont be beat dead.',
            bought: false,
            clickMult: 1000,
            passMult: 8,
            deerPic: 'horse.png',
        },
        {
            name: 'Lillia',
            price: 800000,
            unlockNumber: 800000,
            image: 'lilliaIcon.webp',
            desc: 'Upgrade the deer to Lillia, the best deer',
            bought: false,
            clickMult: 10000,
            passMult: 16,
            deerPic: 'Lillia.png',
        },
    ]);

    const handleUnlocks = () => {
        const notUnlocked = upgrades.find((t) => !t.unlocked);
        if (
            notUnlocked?.unlockNumber <= total ||
            notUnlocked?.unlockNumber <= lifetimeTotal / 4
        ) {
            const newUp = [...upgrades];
            const index = newUp.findIndex((t) => t.name === notUnlocked.name);
            if (index !== undefined) {
                newUp[index] = { ...newUp[index], unlocked: true };
            }
            setUpgrades(newUp);
        }
        const deerUnlocks = deerUpgrades.find((t) => !t?.unlocked);
        if (
            deerUnlocks?.unlockNumber <= total ||
            deerUnlocks?.unlockNumber <= lifetimeTotal / 4
        ) {
            const newUp = [...deerUpgrades];
            const index = newUp.findIndex((t) => t.name === deerUnlocks?.name);
            if (index !== undefined) {
                newUp[index] = { ...newUp[index], unlocked: true };
            }
            setDeerUpgrades(newUp);
        }
    };
    const autoClick = () => {
        if (!clicksPerSec) return;
        const mult = deerUpgrades[deerLevel]?.passMult ?? 1;
        const tot = Math.round((total + (clicksPerSec * mult) / 2) * 10) / 10;
        setTotal(tot);
        setLifetime(
            Math.round((lifetimeTotal + (clicksPerSec * mult) / 2) * 10) / 10
        );
    };

    useEffect(() => {
        handleUnlocks();
        if (lifetimeTotal >= milestone) {
            const speechIndex = Math.floor(Math.random() * painArray?.length);
            setSpeechText(painArray[speechIndex]);
            setMilestone(milestone * 5);
        } else if (sessionTime && !(sessionTime % 600)) {
            const speechIndex = Math.floor(Math.random() * timeArray?.length);
            setSpeechText(timeArray[speechIndex]);
        }
        return () => {
            setCookies('data', {
                total,
                lifetimeTotal,
                owned,
                milestone,
                sessionTime,
                deerLevel,
            });
        };
    }, [total]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSpeechText('0');
        }, 5000);
        return () => clearTimeout(timeout);
    }, [speechText]);

    useEffect(() => {
        autoClick();
        const timeout = setTimeout(() => {
            setSessionTime(sessionTime + 1);
        }, 500);
        return () => clearTimeout(timeout);
    }, [sessionTime]);

    useEffect(() => {
        calculateClicks();
    }, [owned]);

    const deerClick = (e) => {
        const level = deerUpgrades[deerLevel];
        if (position[2]) clearTimeout(position[2]);
        setTotal(total + level.clickMult);
        setLifetime(lifetimeTotal + level.clickMult);
        setCurrentClicks(currentClicks + level.clickMult);
        setPosition([
            e.pageX,
            e.pageY,
            setTimeout(() => {
                setCurrentClicks(0);
            }, 1000),
        ]);
    };

    const calculateClicks = () => {
        const keys = Object.keys(owned);
        let total = 0;
        keys.forEach((k) => {
            const numOwned = isNaN(owned[k]) ? 0 : owned[k] ?? 0;
            const upgrade = upgrades.find((t) => t.name == k);
            if (upgrade)
                total += numOwned * (upgrade.cps ?? upgrade.price * 0.05) ?? 0;
        });
        if (total !== clicksPerSec) {
            setClicksPerSec(Math.round(total * 10) / 10);
        }
    };

    const buyUpgrade = (upgrade, newPrice, deerUpgrade = false) => {
        if (newPrice > total) {
            return;
        }
        if (deerUpgrade) {
            const newUp = [...deerUpgrades];
            const index = newUp.findIndex((t) => t.name === upgrade.name);
            if (deerLevel >= index) return;
            if (index !== undefined) {
                newUp[index] = { ...newUp[index], bought: true };
                setDeerUpgrades(newUp);
                setTotal(Math.round((total - newPrice) * 10) / 10);
                setDeerLevel(index);
            }
        } else {
            setTotal(Math.round((total - newPrice) * 10) / 10);
            setOwned({
                ...owned,
                [upgrade.name]: (owned[upgrade.name] ?? 0) + 1,
            });
        }
        if (
            upgrade.name === 'Death' &&
            deerLevel + 1 === deerUpgrades.length &&
            !hasWon
        ) {
            setHasWon(true);
            setWinModal(true);
        }
    };

    return (
        <div className="deerApp">
            <div className="deerContainer">
                {currentClicks ? (
                    <p
                        className="clickText"
                        style={{
                            position: 'absolute',
                            left: position[0],
                            top: position[1] - 50,
                        }}
                    >
                        {' '}
                        + {currentClicks}
                    </p>
                ) : (
                    <></>
                )}
                <div
                    class={
                        speechText.length > 1
                            ? 'speech-bubble'
                            : 'speech-bubble-hidden'
                    }
                >
                    {speechText}
                </div>
                <a className="deerButton" onClick={deerClick}>
                    <img
                        draggable="false"
                        alt={deerUpgrades[deerLevel].name ?? 'Deer'}
                        className="deer"
                        src={require(`./../../images/${
                            deerUpgrades[deerLevel].deerPic ?? 'deer.png'
                        }`)}
                    />
                </a>
                <p>
                    You've clicked the{' '}
                    {deerLevel !== undefined
                        ? deerUpgrades[deerLevel]?.name
                        : 'deer'}{' '}
                    <br />
                    <br />
                    <span className="clickCount">{total}</span>
                    <br />
                    <br />
                    times!
                </p>
                <br />
                {clicksPerSec ? (
                    <p>
                        Generating{' '}
                        {clicksPerSec *
                            (deerUpgrades[deerLevel]?.passMult ?? 1)}{' '}
                        clicks per second
                    </p>
                ) : (
                    <p></p>
                )}
                {deerUpgrades.some((u) => u.unlocked || u.bought) ? (
                    <div className="deerUpgradeContainer">
                        {deerUpgrades
                            .filter((t, i) => t.unlocked && i !== 0)
                            .map((u, i) => {
                                const disabled = u.bought || i !== deerLevel;
                                return (
                                    <>
                                        <Tooltip
                                            id="upgrade-desc"
                                            anchorSelect="#upgradeDiv"
                                            hidden={disabled}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <span>{u.desc ?? ''}</span>
                                                <span>
                                                    Mouse Multiplier:{' '}
                                                    {u.clickMult}
                                                </span>
                                                <span>
                                                    Passive Multiplier:{' '}
                                                    {u.passMult}
                                                </span>
                                                <span>Cost: {u.price}</span>
                                            </div>
                                        </Tooltip>
                                        <div
                                            className={
                                                disabled || total < u.price
                                                    ? 'deerUpgradeDisabled'
                                                    : 'deerUpgrade'
                                            }
                                            data-tooltip-id="upgrade-desc"
                                            data-tooltip-place="bottom-start"
                                            id="upgradeDiv"
                                            onClick={() =>
                                                buyUpgrade(u, u.price, true)
                                            }
                                        >
                                            <img
                                                draggable="false"
                                                src={
                                                    u.image
                                                        ? require(`./../../images/upgradeImages/${u.image}`)
                                                        : ''
                                                }
                                                className={
                                                    disabled || total < u.price
                                                        ? 'disabledDeerUpgradeImage'
                                                        : 'deerUpgradeImage'
                                                }
                                            />
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="upgradeContainer">
                <ul className="upgradeList">
                    {upgrades
                        .filter((t) => t.unlocked)
                        .map((u) => {
                            const newPrice = Math.round(
                                u.price *
                                    (owned[u.name] ? 1.1 * owned[u.name] : 1)
                            );
                            const upgradeCPS =
                                Math.round(
                                    (owned[u.name] *
                                        (u.cps ?? u.price * 0.05) ?? 0) * 10
                                ) / 10;
                            return (
                                <>
                                    <Tooltip
                                        id="upgrade-desc"
                                        anchorSelect="#upgradeDiv"
                                        delayShow={1500}
                                        hidden={total < newPrice}
                                    />
                                    <div
                                        className={
                                            total < newPrice
                                                ? 'upgradeDisabled'
                                                : 'upgrade'
                                        }
                                        data-tooltip-id="upgrade-desc"
                                        data-tooltip-content={u.desc ?? ''}
                                        data-tooltip-place="left-start"
                                        id="upgradeDiv"
                                        onClick={() => buyUpgrade(u, newPrice)}
                                    >
                                        <img
                                            draggable="false"
                                            src={
                                                u.image
                                                    ? require(`./../../images/upgradeImages/${u.image}`)
                                                    : ''
                                            }
                                            className={
                                                total < newPrice
                                                    ? 'disabledUpgradeImage'
                                                    : 'upgradeImage'
                                            }
                                        />

                                        <div className="upgradeText">
                                            <span>
                                                {u.name} - Cost:{' '}
                                                <span className="italic">
                                                    {newPrice} clicks
                                                </span>{' '}
                                            </span>
                                            {owned[u.name] ? (
                                                <span>
                                                    {owned[u.name]} owned{' '}
                                                    <span className="italic">{`(Generating ${upgradeCPS} clicks/sec)`}</span>
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                </ul>
            </div>
            <SiteSignature pageVersion={versionNumber} />
            {winModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => setWinModal(false)}
                        >
                            &times;
                        </span>
                        <p>
                            You've killed the deer with your millions of clicks.
                        </p>
                        <p>
                            You've bought all the upgrades, not employing death
                            itself.
                        </p>
                        <p>I hope you're happy with yourself.</p>
                        <p>
                            (no really congrats, you've won this dumb game,
                            theres nothing past this point)
                        </p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Clicker;
