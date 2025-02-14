import { modList } from "./modList";

import "./mods.css"

export default function Mods() {
    return (
        <div className="modList">
            <h1 className="modsListTitle">Mods by Tim&#8482;</h1>
            <div className="modListContainer">
                {modList.map(mod => 
                    <a href={mod.link} target='_blank'rel="noreferrer" className="modItem">
                        <h1 className="modItemTitle">{mod.title}</h1>
                        <h4 className="modItemGame">{mod.game}</h4>
                        <p className="modItemDesc">{mod.desc}</p>
                    </a>
                )}
            </div>
        </div>
    )
}