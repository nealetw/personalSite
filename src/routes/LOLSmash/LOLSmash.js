import React, { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import { useCookies } from "react-cookie";
import { getLeagueChampInfo, getLeagueChamps, getLeagueVersion } from "../../api";
import customTags from "./customTags.json";

import "./LOLSmash.css";

function LOLSmash() {
    const versionNumber = "1.1.1";

    const [cookies, setCookies] = useCookies(["data"]);
    const [gameVersion, setGameVersion] = useState();
    const [champs, setChamps] = useState([]);
    const [smashData, setSmashData] = useState(cookies.data ?? {});
    const [currentIndex, setIndex] = useState();
    const [endScreen, setEndScreen] = useState(false);
    const [clearModal, setClearModal] = useState(false);
    const [stats, setStats] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const [skinNumber, setSkinNumber] = useState(0);
    const [currentChamp, setCurrentChamp] = useState({});
    const [usedDropdown, setUsedDropdown] = useState(false);

    useEffect(() => {
        document.title = "League Smash or Pass"
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

    const calculateStats = () => {
        const tags = [];
        for (var i of Object.keys(smashData)) {
            if (smashData[i]) {
                tags.push(customTags[i]);
            }
        }
        const counted = _.countBy(tags.join(",").split(","));
        const otherTags = Object.entries(counted)
            .filter(
                (c) => c[0] !== "Male" && c[0] !== "Female" && c[0] !== "Nonbinary"
            )
            .sort((a, b) => b[1] - a[1]);
        setStats({ ...counted, total: tags.length, customTags: otherTags });
    };

    useEffect(() => {
        if (endScreen && champs) {
            calculateStats();
        }
    }, [endScreen, champs]);

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

    const clearSelections = () => {
        getLeagueChamps(gameVersion).then((r) => {
            var mapped = [];
            for (var i in r.data)
                mapped.push({ ...r.data[i], smash: smashData[r.data[i].id] });

            setChamps(mapped);
            setCookies("data", {});
            setSmashData({})
            setIndex(0);
            setSkinNumber(0);
            setClearModal(false)
        });
    };

    const convertToCSV = (data) => {
        const smashes = data.filter((c) => c[1]).map((c) => c[0]);
        const passes = data.filter((c) => !c[1]).map((c) => c[0]);
        return ["Smashes:", ...smashes, "\n", "Passes:", ...passes].join("\n");
    };

    const downloadCSV = () => {
        const csvData = new Blob([convertToCSV(Object.entries(smashData))], {
            type: "text/csv",
        });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement("a");
        link.href = csvURL;
        link.download = `MyLeagueSmashes-${moment().format("MM-DD-YY")}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    {champs.map((c, i) => {
                        const smashedOrPassed =
                            smashData[c.id] === undefined
                                ? undefined
                                : smashData?.[c.id];
                        return (
                            <option
                                value={i}
                                style={{
                                    backgroundColor:
                                        smashedOrPassed === true
                                            ? "lightgreen"
                                            : smashedOrPassed === undefined
                                            ? ""
                                            : "lightcoral",
                                }}
                            >
                                {c.name}{" "}
                                {smashedOrPassed === true
                                    ? "(Smashed)"
                                    : smashedOrPassed === undefined
                                    ? ""
                                    : "(Passed)"}
                            </option>
                        );
                    })}
                </select>
                <input
                 style={{marginLeft:'15px'}}
                    type="button"
                    value="Clear All Selections"
                    onClick={() => setClearModal(true)}
                />
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
                        <p>
                            Champions Smashed: {champs.filter((c) => c.smash).length}
                        </p>
                        <p>
                            Champions Passed: {champs.filter((c) => !c.smash).length}
                        </p>
                        <p className="statsText">Stats!</p>
                        <p>
                            Smashes by Gender: {stats["Male"]} males,{" "}
                            {stats["Female"]} females, {stats["Nonbinary"]} nonbinary
                        </p>
                        {stats.customTags?.map((tag) => (
                            <p>
                                {tag[0]}: {tag[1]} smashes
                            </p>
                        ))}
                        <input
                            type="button"
                            value="Download List"
                            onClick={() => downloadCSV()}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
            {clearModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setClearModal(false)}>
                            &times;
                        </span>
                        <p>
                            Are you sure you want to clear all selections for your
                            smash or pass? This cant be undone, and includes clearing
                            your saved progress if you left and came back.
                        </p>
                        <input
                            type="button"
                            value="Clear All"
                            onClick={() => clearSelections()}
                            style={{marginRight:'15px'}}
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={() => setClearModal(false)}
                        />
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
