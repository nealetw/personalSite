import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "./LOLSmash.css";
import { getLeagueChampInfo, getLeagueChamps, getLeagueVersion } from "../../api";

function LOLSmash() {
    const versionNumber = "1.0";

    const [cookies, setCookies] = useCookies(["data"]);
    const [gameVersion, setGameVersion] = useState();
    const [champs, setChamps] = useState([]);
    const [smashData, setSmashData] = useState(cookies.data ?? {});
    const [currentIndex, setIndex] = useState();
    const [endScreen, setEndScreen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [skinNumber, setSkinNumber] = useState(0);
    const [currentChamp, setCurrentChamp] = useState({});
    const [usedDropdown, setUsedDropdown] = useState(false);

    useEffect(() => {
        getLeagueVersion().then(setGameVersion);
    }, []);

    useEffect(() => {
        if (gameVersion)
            getLeagueChamps(gameVersion).then((r) => {
                var mapped = [];

                for (var i in r.data)
                    mapped.push({ ...r.data[i], smash: smashData[r.data[i].id] });
                setChamps(mapped);
                if (mapped.every((c) => c.smash !== undefined)) {
                    setEndScreen(true);
                    setIndex(0);
                } else {
                    setIndex(mapped.findIndex((c) => c.smash === undefined));
                }
            });
    }, [gameVersion]);
    useEffect(() => {
        if (gameVersion && currentIndex !== undefined)
            getLeagueChampInfo(gameVersion, champs[currentIndex]?.id).then((r) => {
                for (var i in r.data) setCurrentChamp(r.data[i]);
            });
    }, [currentIndex]);

    const getSplash = (champ) => {
        if (champ)
            return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ?.id}_${champ?.skins?.[skinNumber]?.num}.jpg`;
    };

    const handleButtonClick = (smash) => {
        const newChamps = [...champs];
        newChamps[currentIndex].smash = smash;
        setChamps(newChamps);
        const newData = { ...smashData };
        newData[currentChamp.id] = smash;
        setSmashData(newData);
        setCookies("data", newData);
        if (parseInt(currentIndex) + 1 === champs.length) {
            if (champs.every((c) => c.smash !== undefined)) setEndScreen(true);
            setIndex(0);
        } else {
            setIndex(parseInt(currentIndex) + 1);
        }
        setSkinNumber(0);
    };

    const handleDropdownChange = () => {
        const d = document.getElementById("champSelect").value;
        setSkinNumber(0);
        setIndex(parseInt(d));
        setUsedDropdown(true);
    };

    return (
        <div className="smashApp">
            <div className="cardContainer">
                <select
                    className="champSelect"
                    id="champSelect"
                    name="Champions"
                    value={currentIndex}
                    onChange={handleDropdownChange}
                >
                    {champs.map((c, i) => (
                        <option value={i}>
                            {c.name}{" "}
                            {smashData[c.id] === undefined
                                ? ""
                                : smashData?.[c.id]
                                ? "(Smash)"
                                : "(Pass)"}
                        </option>
                    ))}
                </select>
                <div className="buttonContainer">
                    <div className="champCard">
                        <div className="imageScroll">
                            <input
                                className="scrollButton"
                                type="button"
                                value="<"
                                disabled={skinNumber === 0}
                                onClick={() => setSkinNumber(skinNumber - 1)}
                            />
                            <a href={getSplash(currentChamp)} target="_blank">
                                <img
                                    alt={currentChamp.skins?.[skinNumber]?.name}
                                    className="champImage"
                                    src={getSplash(currentChamp)}
                                    height={"600"}
                                />
                            </a>
                            <input
                                className="scrollButton"
                                type="button"
                                value=">"
                                disabled={
                                    skinNumber === currentChamp?.skins?.length - 1
                                }
                                onClick={() => setSkinNumber(skinNumber + 1)}
                            />
                        </div>
                        <div className="infoBox">
                            <p className="champName">
                                {currentChamp.name}
                                <span className="skinName">
                                    {skinNumber !== 0
                                        ? ` (${currentChamp.skins?.[skinNumber]?.name})`
                                        : ""}
                                </span>
                            </p>
                            <input
                                type="checkbox"
                                value="Show Info"
                                onClick={() => setShowInfo(!showInfo)}
                            />
                            <span className="showInfoCheck">Show Info</span>
                            {showInfo ? (
                                <div className="showInfoContent">
                                    <p>{currentChamp.lore}</p>
                                    <p>
                                        Playstyle:{" "}
                                        {champs[currentIndex]?.tags.join(", ")}
                                    </p>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <input
                        type="button"
                        value="Pass"
                        className={
                            smashData[currentChamp.id]
                                ? "notSelectedButton"
                                : "passButton"
                        }
                        onClick={() => handleButtonClick(false)}
                    />
                    <input
                        type="button"
                        value="Smash"
                        className={
                            smashData[currentChamp.id] === false
                                ? "notSelectedButton"
                                : "smashButton"
                        }
                        onClick={() => handleButtonClick(true)}
                    />
                </div>
            </div>
            {endScreen ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEndScreen(false)}>
                            &times;
                        </span>
                        <h1>Congrats!</h1>
                        <p>Champs Smashed: {champs.filter((c) => c.smash).length}</p>
                        <p>Champs Passed: {champs.filter((c) => !c.smash).length}</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <span className="signature">
                a dumb thing made by{" "}
                <a className="signatureLink" href="https://nealetw.com/">
                    Tim Neale
                </a>{" "}
                (v. {versionNumber}, League v. {gameVersion})
            </span>
        </div>
    );
}

export default LOLSmash;
