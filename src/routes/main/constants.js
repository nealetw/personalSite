export const IMAGE_LINKS = [
    { imageName: 'resume.png', link: '', alt: 'Download Resume', invert: true },
    {
        imageName: 'mail.png',
        link: 'mailto:neale.timw@gmail.com',
        alt: 'Email me!',
        invert: true,
    },
    {
        imageName: 'github.png',
        link: 'https://github.com/nealetw',
        alt: 'Github Profile',
    },
    {
        imageName: 'linkedin.png',
        link: 'https://www.linkedin.com/in/timwneale/',
        alt: 'LinkedIn Profile',
    },
];

export const WORK_SECTIONS = [
    {
        title: 'Construct Connect',
        dates: 'Sep 2024 - Present',
        skills: [
            'React',
            'Typescript',
            'NextJS',
            'Python',
            'React Testing Library',
            'Jira',
            'Agile',
            'HTML/XHTML',
            'SCSS',
        ],
        content: `My current position as a Web Developer 1. I'm
                        specifically working in front-end development
                        with React. This has been my first experience
                        with proper Agile, as well as first time working with other, more
                        insulated development teams. Collaboration
                        across teams and having to communicate through
                        Jira tickets for each sprint, mocking future backend
                        endpoints and data to make the front-end
                        function before the entire feature is ready.
                        Putting features or parts of features behind
                        LaunchDarkly flags is also a new skill here, but a very
                        interesting and cool technology to work with. \n
                        This position also has stepped up my unit test
                        game, as its required writing a new unit test
                        with React Testing Library
                        and Jest to validate the functionality of components created
                        or modified. This was shown with a huge
                        NextJS upgrade just as I started, and >1000 tests
                        had to be verified or fixed with the updated
                        React version.`,
    },
    {
        title: 'iReportSource',
        dates: 'May 2021 - June 2024',
        skills: [
            'React',
            'React-Native',
            'Javascript',
            'Express',
            'MongoDB',
            'Mongoose',
            'Typescript',
            'HTML',
            'SCSS',
            'GitLab',
        ],
        buzzwords: [],
        htmlContent: (
            <p>
                Starting here as a co-op student in my junior year of college, I
                had little experience with{' '}
                <span className="important">Javascript</span>. I learned it well
                while learning the already established code-base, and went to be
                offered a full time position after graduation.
                <br />
                Worked directly with the company's CTO and CEO on features and
                their specifications for development, and used{' '}
                <span className="important">GitLab</span> to track progress and
                version control.
                <br />
                Helped launch and maintain many features on{' '}
                <a
                    href="https://ireportapp.com/"
                    rel="noreferrer"
                    target="_blank"
                >
                    the iReport App
                </a>{' '}
                on both web and mobile applications, including total overhaul on
                the Training Management System, as requested by customers.
                <br />
                This <span className="important">
                    fast-paced environment
                </span>{' '}
                had us developing features, testing them, and deploying them as
                they were done in batches. This also had us{' '}
                <span className="important">
                    fixing bugs reported by customers
                </span>{' '}
                directly.
                <br />
                <br />I learned a lot about{' '}
                <span className="important">code optimizatiom</span> from this
                job opportunity as well, as our customer base grew and the needs
                of those customers grew with it, we had to deal with ever
                growing datasets, and account for a lot of data when trying to
                handle calculations in the backend.
                <br />
                Learning <span className="important">Typescript</span>, as well
                as <span className="important">Mongoose schemas</span> to link
                with our <span className="important">MongoDB</span>, I went into
                this workplace with a lot of unknowns, but now I would consider
                myself a near expert in a lot of the software we used.
            </p>
        ),
    },
    {
        title: 'Matco Tools',
        dates: 'Oct 2018 - April 2020',
        skills: [
            'Java',
            'Ajax',
            'SQL Scripting',
            'Oracle SQL',
            'Express',
            'Red Hat Studio',
            'Eclipse',
            'HTML/XHTML',
            'CSS',
        ],
        buzzwords: [],
        htmlContent: (
            <p>
                My first co-op, starting in my sophomore year of college, I
                stayed here for 3 separate co-op terms, and relocated to Stow,
                OH each term.
                <br />I went into this position with only{' '}
                <span className="important">Java</span> knowledge, but learned
                the culture well, and learned web development with{' '}
                <span className="important">Red Hat Studio</span>, a modified
                version of <span className="important">Eclipse</span>.
                <br />
                Working in a small development team for a larger company, adding
                and modifying pages on{' '}
                <a
                    href="https://www.matcotools.com/"
                    rel="noreferrer"
                    target="_blank"
                >
                    Matcotools.com
                </a>{' '}
                to be more accurate and{' '}
                <span className="important">meet marketing standards</span>
                .
                <br />
                Overhauled portions of their{' '}
                <a
                    href="https://www.matcotools.com/toolboxconfigurator"
                    rel="noreferrer"
                    target="_blank"
                >
                    Toolbox configurator
                </a>{' '}
                to fit new features and color options from engineering
                specifications.
                <br />
                <br />A lot of this experience was learning coding in an actual
                industry rather than in a classroom or on personal projects.
                <br />
                Being given deadlines and actual marketing specifications,
                coming to terms that some things seem wrong but thats what
                customers want, it was genuinely a great learning experience.
            </p>
        ),
    },
];
export const PERSONAL_SECTIONS = [
    {
        title: 'Discord Bots',
        link: 'https://github.com/nealetw/discordBot',
        htmlContent: (
            <p>
                I use{' '}
                <a href="https://discord.com/" rel="noreferrer" target="_blank">
                    Discord
                </a>{' '}
                a lot, and they have{' '}
                <a
                    href="https://discord.js.org/docs/packages/discord.js/14.15.3"
                    rel="noreferrer"
                    target="_blank"
                >
                    an extensive development API
                </a>{' '}
                that I basically used to learn{' '}
                <span className="important">Javascript</span>.
                <br />
                The link to the left goes to one of my first iterations, though
                its a bit depricated. I've worked on a newer one that is
                privately maintained, with a newer version of DiscordJs, as an
                update broke the entire bot (Woo!).
                <br />
                <a
                    href="https://github.com/nealetw/group-python-discordbot"
                    rel="noreferrer"
                    target="_blank"
                >
                    Here's a slightly newer one
                </a>{' '}
                I did for a group project in{' '}
                <span className="important">Python</span> instead (using their{' '}
                <a
                    href="https://discordpy.readthedocs.io/en/stable/"
                    rel="noreferrer"
                    target="_blank"
                >
                    discord.py
                </a>{' '}
                libraries)!
            </p>
        ),
    },
    {
        title: 'Cat GAN',
        link: 'https://github.com/nealetw/Senior_Design_Project_Hackney_Neale',
        htmlContent: (
            <p>
                My senior capstone at University of Cincinnati, my partner and I
                researched and trained a{' '}
                <span className="important">
                    Generative Adverserial Network
                </span>{' '}
                to create pictures of cat faces in{' '}
                <span className="important">Python</span>.
                <br />
                We used primarily <span className="important">
                    TensorFlow
                </span>{' '}
                and our local computers at home to train it, but near the end of
                the project, we did get some time to train it remotely using a{' '}
                <span className="important">research computer at OSU</span>
                . The results were still rough, but our dataset was fairly small
                compared to what other GANs have used before,
                <br />
                Much of the challenge with this project was settling on a
                technology, as we went through many neural network libraries to
                try to find what would fit our use case. This included almost a
                month of trying to fit{' '}
                <span className="important">PyTorch</span> to our use case.
            </p>
        ),
    },
    {
        title: 'High School FRC',
        link: 'https://github.com/nealetw/roboticsCodeCopy',
        htmlContent: (
            <p>
                Some of my first group code, this is a copy of the{' '}
                <span className="important">Java</span> code I contributed to
                for team ScotBot 4284 (Oak Hills High School) competing in{' '}
                <span className="important">First Robotics Competition</span> in
                2017.
                <br />
                This was written while I was learning{' '}
                <span className="important">Java</span> in an Advanced Placement
                class, and I consider it some of my first actual development.
                <br />
                This also included{' '}
                <span className="important">hardware integration</span> and{' '}
                <span className="important">
                    communicating across multiple teams
                </span>
                communicating across multiple teams to make sure things worked
                as intended.
                <br />
                With a lot of late nights, and{' '}
                <span className="important">debugging</span> even during
                competition, we did end up going to the world-wide competition!
            </p>
        ),
    },
    {
        title: 'This site!',
        link: 'https://github.com/nealetw/personalSite',
        htmlContent: (
            <p>
                With my free time, and a need to show off my work/portfolio, I
                deployed this <span className="important">React</span> website
                in a few days. Its hosted on an{' '}
                <span className="important">AWS EC2 instance</span>, and I keep
                it up to date with{' '}
                <span className="important">Github + SSH</span>
                <br />
                Over time, I've wanted to add more and more things, and my
                friend told me to add a game similar to{' '}
                <a
                    href="https://orteil.dashnet.org/cookieclicker/"
                    rel="noreferrer"
                    target="_blank"
                >
                    Cookie Clicker
                </a>
                . Seeing it as a challenge to push the limits of my knowledge, I{' '}
                <a href="/clicker" rel="noreferrer" target="_blank">
                    made one from scratch here
                </a>
                . It was actually a lot of fun!
                <br />
                I've since been updating this site with a lot of different
                things, mostly just a bunch of random fun little projects I've
                come up with. Theres a link to a site map in the footer, or you
                can{' '}
                <a href="/map" rel="noreferrer" target="_blank">
                    click here
                </a>{' '}
                instead!
            </p>
        ),
    },
];
