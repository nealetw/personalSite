import ErrorPage from './error-page';
import LOLSmash from './LOLSmash/LOLSmash';
import Main from './main/Main';
import Clicker from './clicker/Clicker';
import SiteMap from './sitemap/sitemap';
import Board from './board/Board';
import Chatbot from './Chatbot/chatbot';
import Daily from './daily/daily';

// {
//     name:'Name that will be on site preview and tab,
//     description:`Pretty much just on site preview`,
//     color:['Color of text on site map square', 'background color of site map square'],
//     path: "/",
//     element: <Main />,
//     errorElement: <ErrorPage />,
// },

export const siteRoutes = [
    {
        name: `Tim Neale's Portfolio`,
        description: `Tim Neale's Amazing Website`,
        color: ['#294854', 'lightgrey'],
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name: `Tim Neale's Portfolio`,
        description: `Tim Neale's Amazing Website`,
        path: '/home',
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name: `Tim Neale's Portfolio`,
        description: `Tim Neale's Amazing Website`,
        path: '/work',
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name: `Tim Neale's Portfolio`,
        description: `Tim Neale's Amazing Website`,
        path: '/personal',
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name: 'Deer Clicker',
        description: `Click the deer. Do it.`,
        color: ['black', '#d4a36b'],
        image: require('../images/deer.png'),
        path: '/clicker',
        element: <Clicker />,
        errorElement: <ErrorPage />,
    },
    {
        name: 'League Smash or Pass',
        description: `You know why you're here.`,
        color: ['#c8aa6e', '#071523'],
        image: require('../images/league.webp'),
        path: '/smash',
        element: <LOLSmash />,
        errorElement: <ErrorPage />,
    },
    {
        name: `Tim Neale's Portfolio`,
        description: `Tim Neale's Personal Projects, ranging from somewhat productive things, to slightly stupid or degenerate things.`,
        path: '/map',
        element: <SiteMap />,
        errorElement: <ErrorPage />,
    },
    {
        name: `Tim's dumb Chatbot`,
        description: `Chatbot, basically just a custom wrapper for ChatGPT to try out its API and stuff.`,
        path: '/chatbot',
        color: ['grey', 'skyblue'],
        image: require('../images/chatbubble.png'),
        element: <Chatbot />,
        errorElement: <ErrorPage />,
    },
    // {
    //     name: `Daily Word Game`,
    //     description: `A daily game where you fill the board with words that fit the cross sections!`,
    //     path: '/daily',
    //     color: ['black', 'white'],
    //     image: require('../images/chatbubble.png'),
    //     element: <Daily />,
    //     errorElement: <ErrorPage />,
    // },
    {
        name: `Some kind of forum`,
        description: `A forum page I made just to try out making a backend. Its not great.`,
        color: ['black', 'white'],
        path: '/board',
        element: <Board />,
        errorElement: <ErrorPage />,
    },
];
