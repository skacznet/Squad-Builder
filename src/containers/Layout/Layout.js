import React from 'react';
import Topbar from '../../components/Nav/Topbar/Topbar';

const layout = props => {
    return (
        <>
            <nav>
                <Topbar />
            </nav>
            <main>
                {props.children}
            </main>
        </>
    );
}

export default layout;