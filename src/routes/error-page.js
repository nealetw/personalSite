import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Whoops, thats not a valid page!</h1>
      <p>Or maybe my app crashed. If that happened and you care, you can come
      <br/>yell at me <a href="mailto:neale.timw@gmail.com">through my email</a>, otherwise, just go somewhere else.</p>
      <p>
        <i>Error: {error.statusText || error.message}</i>
      </p>
    </div>
  );
}