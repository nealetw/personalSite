import React, {useEffect, useState} from 'react';

import './App.css';

function App() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const [selectedTab, setTab] = useState(0);
  const [content, setContent] = useState(<></>)
  const [miniGame, setMiniGame] = useState([false, false, false, false])
  const [modalOpen, setModalOpen] = useState(false)
  const [winModal, setWinModal] = useState(false)
  const [isMobile, setIsMobile] = useState(getWindowDimensions().width < 800)
  const [age, setAge] = useState((Date.now() - new Date('1998-11-06')))


  useEffect(() => {
    function handleResize() {
      setIsMobile(getWindowDimensions().width < 800);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onJerryClick = (index) => {
    if(index === undefined)
      return;

    const values = [...miniGame]
    const tab = selectedTab
    values[index] = true
    setMiniGame(values)
    setTab(0)
    setTab(tab)

    if(values.every(t => t))
      setWinModal(true);
    else
      setModalOpen(true)
  }

  const resumeDownload = () => {
    fetch("TimNeale_Resume.pdf").then((response) => {
        response.blob().then((blob) => {
            const fileURL =
                window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "TimNeale_Resume.pdf";
            alink.click();
        });
    });
  };

  const infoText = (
    <div className='infoSection'>
      <h1>Hi, I'm Tim</h1>
      <h2>I'm a {(age/1000/60/60/24/365).toFixed(7)} year old developer who started programming in high school.</h2>
      <h3>I know <span className='important'>Javascript</span>, <span className='important'>Java</span>, <span className='important'>Python</span>, <span className='important'>Typescript</span>, and pretty much anything that goes into <span className='important'>React</span> development. Even this site was made with <span className='important'>React</span>!</h3>
      <br/><br/>
      <h3>Click the tabs above to go see my <span className='hiddenLink' onClick={() => setTab(1)}>work experience</span> and <span className='hiddenLink' onClick={() => setTab(2)}>personal projects</span>.</h3>
      <h3>Or you can just get my resume or contact information directly below!</h3>
      <a onClick={resumeDownload} className='imageLink'>
        <img  className='invertImage' alt='Download Resume' src={require('.//images/resume.png')}/>
      </a>
      <a href='mailto:neale.timw@gmail.com' className='imageLink'>
        <img className='invertImage' alt='Email Me!' src={require('.//images/mail.png')}/>
      </a>
      <a href='https://github.com/nealetw' rel="noreferrer" target="_blank" className='imageLink'>
        <img className='image' alt='Github Profile' src={require('.//images/github.png')}/>
      </a>
      <a href='https://www.linkedin.com/in/timwneale/' rel="noreferrer" target="_blank" className='imageLink'>
        <img className='image' alt='LinkedIn Profile' src={require('.//images/linkedin.png')}/>
      </a>
      {!isMobile && miniGame[0] && !miniGame[2] ?
      <img onClick={() => onJerryClick(2)} className={'jerry2'} src={require('.//images/jerry.png')} />
      : <></>}
  </div>
  );

  useEffect(() => {
    if(selectedTab === 0){
      setTimeout(() => setAge(Date.now() - new Date('1998-11-06')), 1000)
      setContent(infoText)
    }
  }, [age, selectedTab])


  useEffect(() => {

    switch (selectedTab) {
      case 0:
        setContent(infoText)
        break;
        case 1:
          setContent(<>
            <h1 className='title'>Previous Work</h1>
            <div className={isMobile ? 'smallSection' : 'contentSection'}>
              <div className={isMobile ? 'smallSectionTitle' :  'sectionTitle'}>
                <h2>iReportSource:</h2>
                <h3>May 2021 - June 2024</h3>
                <ul className='skillsList'>
                  <span className='skillsTitle'>Skills Learned:</span>
                  <li>React</li>
                  <li>React-Native</li>
                  <li>Javascript</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>Mongoose</li>
                  <li>Typescript</li>
                  <li>HTML</li>
                  <li>SCSS/Sass</li>
                  <li>GitLab</li>
                </ul>
                {!isMobile && miniGame[0] ?
                <img onClick={() => miniGame[1] ? {} : onJerryClick(1)} className={miniGame[1] ? 'jerry1Revealed' : 'jerry1'} src={require('.//images/jerry.png')} />
                : <></>}
              </div>
              <p className={isMobile ? 'smallContentText' : 'contentText'}>
                Starting here as a co-op student in my junior year of college, I had little experience with <span className='important'>Javascript</span>. I learned it well while learning the already established code-base, and went to be offered a full time position after graduation.
                <br/>Worked directly with the company's CTO and CEO on features and their specifications for development, and used <span className='important'>GitLab</span> to track progress and version control.
                <br/>Helped launch and maintain many features on <a href="https://ireportapp.com/" rel="noreferrer" target="_blank">the iReport App</a> on both web and mobile applications, including total overhaul on the Training Management System, as requested by customers.
                <br/>This <span className='important'>fast-paced environment</span> had us developing features, testing them, and deploying them as they were done in batches. This also had us <span className='important'>fixing bugs reported by customers</span> directly.
                <br/>
                <br/>I learned a lot about <span className='important'>code optimizatiom</span> from this job opportunity as well, as our customer base grew and the needs of those customers grew with it, we had to deal with ever growing datasets, and account for a lot of data when trying to handle calculations in the backend.
                <br/>Learning <span className='important'>Typescript</span>, as well as <span className='important'>Mongoose schemas</span> to link with our <span className='important'>MongoDB</span>, I went into this workplace with a lot of unknowns, but now I would consider myself a near expert in a lot of the software we used.

              </p>
            </div>
            <div className={isMobile ? 'smallSection' :  'contentSection'}>
              <div className={isMobile ? 'smallSectionTitle' :  'sectionTitle'}>
                <h2>Matco Tools:</h2>
                <h3>Oct 2018 - April 2020</h3>
                <ul className='skillsList'>
                <span className='skillsTitle'>Skills Learned:</span>
                <li>Java</li>
                <li>Ajax</li>
                <li>SQL Scripting</li>
                <li>Oracle SQL</li>
                <li>Express</li>
                <li>Red Hat Studio</li>
                <li>Eclipse</li>
                <li>HTML/XHTML</li>
                <li>CSS</li>
              </ul>
              </div>
              <p className={isMobile ? 'smallContentText' : 'contentText'}>
                My first co-op, starting in my sophomore year of college, I stayed here for 3 separate co-op terms, and relocated to Stow, OH each term.
                <br/>I went into this position with only <span className='important'>Java</span> knowledge, but learned the culture well, and learned web development with <span className='important'>Red Hat Studio</span>, a modified version of <span className='important'>Eclipse</span>.
                <br/>Working in a small development team for a larger company, adding and modifying pages on <a href='https://www.matcotools.com/' rel="noreferrer" target="_blank">Matcotools.com</a> to be more accurate and <span className='important'>meet marketing standards</span>.
                <br/>Overhauled portions of their <a href='https://www.matcotools.com/toolboxconfigurator' rel="noreferrer" target="_blank">Toolbox configurator</a> to fit new features and color options from engineering specifications.
                <br/>
                <br/>A lot of this experience was learning coding in an actual industry rather than in a classroom or on personal projects.
                <br/>Being given deadlines and actual marketing specifications, coming to terms that some things seem wrong but thats what customers want, it was genuinely a great learning experience.
              </p>

            </div>
          </>
          )
          break;
          case 2:
            setContent(<>
              <h1 className='title'>Personal Projects</h1>
              {!isMobile && miniGame[0] && !miniGame[3] ?
              <img onClick={() => onJerryClick(3)} className={'jerry3'} src={require('.//images/jerry.png')} />
              : <></>}
              <h3>My personal projects range from school projects that were graded, to things that I wanted to develop for actual use, to things that I just wanted to develop for fun. Most of them can be found over on <a href='https://github.com/nealetw' rel="noreferrer" target="_blank">my Github page</a>, though some may be out of date and being maintained on private repositorties instead.</h3>
              <div className={isMobile ? 'smallSection': 'contentSection' }>
                <div className={isMobile ? 'smallSectionTitle' :  'sectionTitle'}>
                  <h2><a href='https://github.com/nealetw/discordBot' rel="noreferrer" target="_blank">Discord Bots</a></h2>
                </div>
                <p className={isMobile ? 'smallContentText' : 'contentText'}>
                  I use <a href='https://discord.com/' rel="noreferrer" target="_blank">Discord</a> a lot, and they have <a href='https://discord.js.org/docs/packages/discord.js/14.15.3' rel="noreferrer" target="_blank">an extensive development API</a> that I basically used to learn <span className='important'>Javascript</span>.
                  <br/>The link to the left goes to one of my first iterations, though its a bit depricated. I've worked on a newer one that is privately maintained, with a newer version of DiscordJs, as an update broke the entire bot (Woo!).
                  <br/><a href='https://github.com/nealetw/group-python-discordbot' rel="noreferrer" target="_blank">Here's a slightly newer one</a> I did for a group project in <span className='important'>Python</span> instead (using their <a href='https://discordpy.readthedocs.io/en/stable/' rel="noreferrer" target="_blank">discord.py</a> libraries)!
                </p>
              </div>

              <div className={isMobile ? 'smallSection': 'contentSection' }>
                <div className={isMobile ? 'smallSectionTitle' :  'sectionTitle'}>
                  <h2><a href='https://github.com/nealetw/Senior_Design_Project_Hackney_Neale' rel="noreferrer" target="_blank">Cat GAN</a></h2>
                </div>
                <p className={isMobile ? 'smallContentText' : 'contentText'}>
                  My senior capstone at University of Cincinnati, my partner and I researched and trained a <span className='important'>Generative Adverserial Network</span> to create pictures of cat faces in <span className='important'>Python</span>.
                  <br/>We used primarily <span className='important'>TensorFlow</span> and our local computers at home to train it, but near the end of the project, we did get some time to train it remotely using a <span className='important'>research computer at OSU</span>. The results were still rough, but our dataset was fairly small compared to what other GANs have used before,
                  <br/>Much of the challenge with this project was settling on a technology, as we went through many neural network libraries to try to find what would fit our use case. This included almost a month of trying to fit <span className='important'>PyTorch</span> to our use case.
                  </p>
              </div>


              <div className={isMobile ? 'smallSection': 'contentSection' }>
                <div className={isMobile ? 'smallSectionTitle' :  'sectionTitle'}>
                  <h2><a href='https://github.com/nealetw/roboticsCodeCopy' rel="noreferrer" target="_blank">High School FRC</a></h2>
                </div>
                <p className={isMobile ? 'smallContentText' : 'contentText'}>
                  Some of my first group code, this is a copy of the <span className='important'>Java</span> code I contributed to for team ScotBot 4284 (Oak Hills High School) competing in <span className='important'>First Robotics Competition</span> in 2017.
                  <br/>This was written while I was learning <span className='important'>Java</span> in an Advanced Placement class, and I consider it some of my first actual development.
                  <br/>This also included <span className='important'>hardware integration</span> and <span className='important'>communicating across multiple teams</span>communicating across multiple teams to make sure things worked as intended.
                  <br/>With a lot of late nights, and <span className='important'>debugging</span> even during competition, we did end up going to the world-wide competition!
                  </p>
              </div>
            </>
            )
            break;

      default:
        break;
    }

  }, [selectedTab])

  const miniGameLength = miniGame.filter(t => !t).length

  return (
    <div className="App">
      <div className="App-header">
        {isMobile ? <span className='smolSiteName'>TN</span> : <span className='siteName'>Tim Neale</span>}
        <ul className={miniGame.every(t => t) ? 'CompletedHeader' : "ListHeader"}>
          <li onClick={() => setTab(0)}>Home</li>
          <li onClick={() => setTab(1)}>Work</li>
          <li onClick={() => setTab(2)}>Personal</li>
        </ul>
        {!isMobile ? <img onClick={() => miniGame[0] ? {} : onJerryClick(0)} className={miniGame[0] ? 'jerry0Revealed' : 'jerry0'} src={require('.//images/jerry.png')} /> : <></>}
        {!isMobile && miniGame[1] ? <img className='jerry1Revealed' src={require('.//images/jerry.png')} /> : <></>}
        {!isMobile && miniGame[2] ? <img className='jerry2Revealed' src={require('.//images/jerry.png')} /> : <></>}
        {!isMobile && miniGame[3] ? <img className='jerry3Revealed' src={require('.//images/jerry.png')} /> : <></>}
        <div className='content'>
          {content}
        </div>
      </div>
      <footer>
        <p>Created By: Tim Neale</p>
        <p>All Rights Reserved {new Date().getFullYear()}</p>
        <p><a href="mailto:neale.timw@gmail.com">neale.timw@gmail.com</a></p>
      </footer>

      {modalOpen ?
        <div id="modal" class="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <p>You found a Jerry! Clicking him reveals there { miniGameLength > 1 ? 'are' : 'is'} {miniGameLength} other Jerry{miniGameLength > 1 ? 's' : ''} around the site...</p>
          </div>
        </div> :
      <></>}
      {winModal ?
        <div id="modal" class="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setWinModal(false)}>&times;</span>
            <p>Congrats! You found all the Jerrys!</p>
            <img className='completedJerrys' src={require('.//images/blob.gif')} />
          </div>
        </div> :
      <></>}

    </div>
  );
}

export default App;
