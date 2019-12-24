import React from 'react';

import AppUtil from '../utils/AppUtil';

let appEvents = {};

class PureComponent extends React.PureComponent {

    constructor(props, context) {
        super(...arguments);

        appEvents = {};
    }

    registEvent = (eventName, callback) => {
        appEvents[eventName] = AppUtil.on(eventName, callback);
    };

    componentWillUnmount() {

        for (let eventName in appEvents) {
            if (!appEvents.hasOwnProperty(eventName)) {continue;}
            AppUtil.removeAllListeners(eventName);
            appEvents[eventName].remove();
        }
    }
}

export default PureComponent;
