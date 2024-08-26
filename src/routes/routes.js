import ErrorPage from "./error-page";
import LOLSmash from "./LOLSmash/LOLSmash";
import Main from "./main/Main";
import Clicker from "./clicker/Clicker";
import SiteMap from "./sitemap/sitemap";
//import Board from "./board/Board";

export const siteRoutes = [
    {
        name:`Tim Neale's Portfolio`,
        description:`Tim Neale's Amazing Website`,
        color:['#294854', 'lightgrey'],
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name:`Tim Neale's Portfolio`,
        description:`Tim Neale's Amazing Website`,
        path: "/home",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name:`Tim Neale's Portfolio`,
        description:`Tim Neale's Amazing Website`,
        path: "/work",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name:`Tim Neale's Portfolio`,
        description:`Tim Neale's Amazing Website`,
        path: "/personal",
        element: <Main />,
        errorElement: <ErrorPage />,
    },
    {
        name:'Deer Clicker',
        description:`Click the deer. Do it.`,
        color:['black', '#d4a36b'],
        image:require('../images/deer.png'),
        path: "/clicker",
        element: <Clicker />,
        errorElement: <ErrorPage />,
    },
    {
        name:'League Smash or Pass',
        description:`You know why you're here.`,
        color:['#c8aa6e','#071523' ],
        image:require('../images/league.webp'),
        path: "/smash",
        element: <LOLSmash />,
        errorElement: <ErrorPage />,
    },
    {
        name:`Tim Neale's Portfolio`,
        description:`Tim Neale's Personal Projects, ranging from somewhat productive things, to slightly stupid or degenerate things.`,
        path: "/map",
        element: <SiteMap />,
        errorElement: <ErrorPage />,
    },
    // {
    //     path: "/board",
    //     element: <Board />,
    //     errorElement: <ErrorPage />,
    // },
]