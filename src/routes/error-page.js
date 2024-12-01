import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            {error ? (
                <>
                    <h1>Whoops, the app crashed!</h1>
                    <p>
                        <i>Error: {error.statusText || error.message}</i>
                    </p>
                    <p>
                        If thats something you can do consistently, and you care
                        at all, you can come yell at me
                        <br />
                        <a href="mailto:neale.timw@gmail.com">
                            through my email
                        </a>
                        , otherwise, hopefully it won't keep happening
                    </p>
                </>
            ) : (
                <>
                    <h1>Whoops, thats not a valid page!</h1>
                    <p>
                        <a href="/map">Try going back to the site map</a> to
                        find a valid page to go to,
                        <br /> or maybe you typed the address wrong... either
                        way go somewhere else.
                    </p>
                </>
            )}
        </div>
    );
}
