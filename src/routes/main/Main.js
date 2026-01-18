import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMAGE_LINKS, PERSONAL_SECTIONS, WORK_SECTIONS } from './constants';
import Section from '../../components/PortfolioSection/Section';

import './Main.css';

function Main() {
    const location = useLocation()?.pathname?.replace('/', '');
    const navigate = useNavigate();

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    const [selectedTab, setTab] = useState(
        location?.length ? location : 'home' ?? 'home'
    );
    const [content, setContent] = useState(<></>);
    const [miniGame, setMiniGame] = useState([false, false, false, false]);
    const [modalOpen, setModalOpen] = useState(false);
    const [winModal, setWinModal] = useState(false);
    const [isMobile, setIsMobile] = useState(getWindowDimensions().width < 800);
    const [age, setAge] = useState(Date.now() - new Date('1998-11-06'));
    const [timer, setTimer] = useState();

    useEffect(() => {
        function handleResize() {
            setIsMobile(getWindowDimensions().width < 800);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onJerryClick = (index) => {
        if (index === undefined) return;

        const values = [...miniGame];
        const tab = selectedTab;
        values[index] = true;
        setMiniGame(values);
        setTab(0);
        setTab(tab);

        if (values.every((t) => t)) setWinModal(true);
        else setModalOpen(true);
    };

    const resumeDownload = () => {
        fetch('TimNeale_Resume.pdf').then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'TimNeale_Resume.pdf';
                alink.click();
            });
        });
    };

    const infoText = (
        <div className="infoSection">
            <h1>Hi, I'm Tim</h1>
            <h2>
                I'm a {(age / 1000 / 60 / 60 / 24 / 365).toFixed(7)} year old <br/>
                front-end developer based in Cincinnati, OH.
            </h2>
            <h3>
                I know <span className="important">Javascript</span>,{' '}
                <span className="important">Typescript</span>,{' '}
                <span className="important">Python</span>,{' '}
                <span className="important">Java</span>. <br/> 
                I specialize in pretty much anything
                that goes into <span className="important">React</span>{' '}
                development. <br/>
                Even this site was made with{' '}
                <span className="important">React</span>!
            </h3>
            <br />
            <br />
            <h3>
                Click the tabs above to go see my{' '}
                <span className="hiddenLink" onClick={() => setTab(1)}>
                    work experience
                </span>{' '}
                and{' '}
                <span className="hiddenLink" onClick={() => setTab(2)}>
                    personal projects
                </span>
                .
            </h3>
            <h3>
                Or you can just get my resume or contact information directly
                below!
            </h3>
            {IMAGE_LINKS.map((imageLink) => (
                <a
                    onClick={
                        !imageLink.link?.length ? resumeDownload : () => {}
                    }
                    rel="noreferrer"
                    target="_blank"
                    className="imageLink"
                    href={!imageLink.link?.length ? resumeDownload : imageLink.link}
                >
                    <img
                        className={imageLink.invert ? `invertImage` : 'image'}
                        alt={imageLink.alt}
                        src={require(`./../../images/${imageLink.imageName}`)}
                    />
                </a>
            ))}

            {!isMobile && miniGame[0] && !miniGame[2] ? (
                <img
                    alt="Jerry"
                    onClick={() => onJerryClick(2)}
                    className={'jerry2'}
                    src={require('./../../images/jerry.png')}
                />
            ) : (
                <></>
            )}
        </div>
    );

    useEffect(() => {
        if (selectedTab === 0 || selectedTab === 'home') {
            setTimer(
                setTimeout(() => {
                    setAge(Date.now() - new Date('1998-11-06'));
                }, 1000)
            );
            setContent(infoText);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age, selectedTab]);

    useEffect(() => {
        switch (selectedTab) {
            case 0:
            case 'home':
                setContent(infoText);
                break;
            case 1:
            case 'work':
                setContent(
                    <>
                        <h1 className="title">Previous Work</h1>
                        {WORK_SECTIONS.map((sectionData) => (
                            <Section
                                header={sectionData.title}
                                dateRange={sectionData.dates}
                                skillList={sectionData.skills}
                                contentText={sectionData.content}
                                htmlContent={sectionData.htmlContent}
                                isMobile={isMobile}
                                showJerry={
                                    miniGame[0] && (
                                        <img
                                            alt="Jerry"
                                            onClick={() =>
                                                miniGame[1]
                                                    ? {}
                                                    : onJerryClick(1)
                                            }
                                            className={
                                                miniGame[1]
                                                    ? 'jerry1Revealed'
                                                    : 'jerry1'
                                            }
                                            src={require('./../../images/jerry.png')}
                                        />
                                    )
                                }
                            />
                        ))}
                    </>
                );
                break;
            case 2:
            case 'personal':
                setContent(
                    <>
                        <h1 className="title">Personal Projects</h1>
                        {!isMobile && miniGame[0] && !miniGame[3] ? (
                            <img
                                alt="Jerry"
                                onClick={() => onJerryClick(3)}
                                className={'jerry3'}
                                src={require('./../../images/jerry.png')}
                            />
                        ) : (
                            <></>
                        )}
                        <h3>
                            My personal projects range from school projects that
                            were graded, to things that I wanted to develop for
                            actual use, to things that I just wanted to develop
                            for fun. Most of them can be found over on{' '}
                            <a
                                href="https://github.com/nealetw"
                                rel="noreferrer"
                                target="_blank"
                            >
                                my Github page
                            </a>
                            , though some may be out of date and being
                            maintained on private repositorties instead.
                        </h3>
                        {PERSONAL_SECTIONS.map((sectionData) => (
                            <Section
                                header={sectionData.title}
                                headerLink={sectionData.link}
                                contentText={sectionData.content}
                                htmlContent={sectionData.htmlContent}
                                isMobile={isMobile}
                            />
                        ))}
                    </>
                );
                break;

            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab]);

    const miniGameLength = miniGame.filter((t) => !t).length;

    return (
        <div className="App">
            <div className="App-header">
                {isMobile ? (
                    <span className="smolSiteName">TN</span>
                ) : (
                    <span className="siteName">Tim Neale</span>
                )}
                <ul
                    className={
                        miniGame.every((t) => t)
                            ? 'CompletedHeader'
                            : 'ListHeader'
                    }
                >
                    <li
                        onClick={() => {
                            setTab('home');
                            navigate('/home');
                        }}
                    >
                        Home
                    </li>
                    <li
                        onClick={() => {
                            setTab('work');
                            navigate('/work');
                        }}
                    >
                        Work
                    </li>
                    <li
                        onClick={() => {
                            setTab('personal');
                            navigate('/personal');
                        }}
                    >
                        Personal
                    </li>
                </ul>
                {!isMobile ? (
                    <img
                        alt="Jerry"
                        onClick={() => (miniGame[0] ? {} : onJerryClick(0))}
                        className={miniGame[0] ? 'jerry0Revealed' : 'jerry0'}
                        src={require('./../../images/jerry.png')}
                    />
                ) : (
                    <></>
                )}
                {!isMobile && miniGame[1] ? (
                    <img
                        alt="Jerry"
                        className="jerry1Revealed"
                        src={require('./../../images/jerry.png')}
                    />
                ) : (
                    <></>
                )}
                {!isMobile && miniGame[2] ? (
                    <img
                        alt="Jerry"
                        className="jerry2Revealed"
                        src={require('./../../images/jerry.png')}
                    />
                ) : (
                    <></>
                )}
                {!isMobile && miniGame[3] ? (
                    <img
                        alt="Jerry"
                        className="jerry3Revealed"
                        src={require('./../../images/jerry.png')}
                    />
                ) : (
                    <></>
                )}
                <div className="content">{content}</div>
            </div>
            <footer>
                <p>
                    <a href="/map">Full site map</a> (Come here for all my other
                    projects!)
                </p>
                <p>All Rights Reserved {new Date().getFullYear()}</p>
                <p>
                    <a href="mailto:neale.timw@gmail.com">
                        neale.timw@gmail.com
                    </a>
                </p>
            </footer>

            {modalOpen ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => setModalOpen(false)}
                        >
                            &times;
                        </span>
                        <p>
                            You found a Jerry! Clicking him reveals there{' '}
                            {miniGameLength > 1 ? 'are' : 'is'} {miniGameLength}{' '}
                            other Jerry{miniGameLength > 1 ? 's' : ''} around
                            the site...
                        </p>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {winModal ? (
                <div id="modal" class="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => setWinModal(false)}
                        >
                            &times;
                        </span>
                        <p>Congrats! You found all the Jerrys!</p>
                        <img
                            alt="Jerry"
                            className="completedJerrys"
                            src={require('./../../images/blob.gif')}
                        />
                        <p>
                            If you like clicking deer that much, try my stupid{' '}
                            <a href="/clicker">deer clicking game</a>!
                        </p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Main;
