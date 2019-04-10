import React from 'react';
import Thing from './things';

class ThingsPage extends React.Component {
    render() {
        return (
            <div>
                <Thing/>
                <Thing/>
                <Thing/>
                <Thing/>
            </div>
        );
    };
}

export default ThingsPage;
