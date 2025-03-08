import { Link } from "react-router";

function Error404() {
    return (
        <div>
            <h2>404 Page not found.</h2>
            <p>The requested URL was not found. It may have been entered incorrectly or the page may have been moved/removed.</p>
            <p>Click
                <Link to="/"> here </Link>
                to return to the home page.
            </p>
        </div>
    );
};

export default Error404;