export default function Section({
    header,
    headerLink,
    dateRange,
    skillList,
    buzzwords,
    contentText,
    htmlContent,
    isMobile,
    showJerry,
}) {
    const modifiedContent = contentText?.split(' ')?.map((word) =>
        skillList
            .concat(buzzwords ?? [])
            .map((t) => t.toLowerCase())
            .includes(word.toLowerCase()) ? (
            <span className="important">{word + ' '}</span>
        ) : (
            word + ' '
        )
    );
    // #TODO making this work better with not jsut single words, i cant be bothered too much right now.
    // Also it ruins any line breaks, so i just made it take the HTML text rather than a nice pretty string like i wanted
    return (
        <div className={isMobile ? 'smallSection' : 'contentSection'}>
            <div className={isMobile ? 'smallSectionTitle' : 'sectionTitle'}>
                <h2>
                    {headerLink ? (
                        <a href={headerLink} rel="noreferrer" target="_blank">
                            {header}
                        </a>
                    ) : (
                        `${header}:`
                    )}
                </h2>
                {dateRange && <h3>{dateRange}</h3>}
                {skillList && (
                    <ul className="skillsList">
                        <span className="skillsTitle">Skills Learned:</span>
                        {skillList.map((skill) => (
                            <li>{skill}</li>
                        ))}
                    </ul>
                )}
                {!isMobile && header === 'iReportSource' && showJerry ? (
                    showJerry
                ) : (
                    <></>
                )}
            </div>
            <p className={isMobile ? 'smallContentText' : 'contentText'}>
                {modifiedContent ?? htmlContent}
            </p>
        </div>
    );
}
