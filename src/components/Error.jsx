import React from 'react';
import errorimg from '../assets/error.png'

const Error = () => {
    return (
        <div>
            <div>
                <h1>Oops <br />Something went wrong</h1>
                <p>Sorry, the page could not found.</p>
                <button>Go back home</button>
            </div>
            <div><img src={errorimg} alt="" /></div>
        </div>
    );
};

export default Error;