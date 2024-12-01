import React from 'react';
import { siteRoutes } from '../routes';

import './sitemap.css';

function SiteMap() {
    return (
        <div className="siteMapContainer">
            <h1>Welcome to Tim Neale's Site</h1>
            <h3>
                This is the site map, linking all of my personal projects
                together. Find my portfolio below, and then some other weird
                things I've made. Don't judge, I get enough judgement already.
            </h3>
            <div className="buttonsContainer">
                {siteRoutes
                    .filter(
                        (a, i) =>
                            siteRoutes.findIndex((b) => b.name === a.name) ===
                                i && !a.hidden
                    )
                    .map((route) => {
                        return (
                            <a
                                href={route.path}
                                style={{
                                    color: route.color?.[0],
                                    backgroundColor: route.color?.[1],
                                    justifyContent: route.image
                                        ? 'space-evenly'
                                        : 'center',
                                }}
                                className="routeButton"
                            >
                                {route.image ? (
                                    <img
                                        src={route.image}
                                        alt={route.image}
                                        className="buttonImage"
                                    />
                                ) : (
                                    <></>
                                )}
                                <span type="button">{route.name}</span>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
}

export default SiteMap;
