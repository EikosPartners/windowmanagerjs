/**
 * A library for laying out windowmanager windows.
 */

import Window from '../Window.js';
import windowmanager from './global';

/**
 * Layout namespace.
 */
class Layout {
    /**
     * Constructor for the layout class.
     * 
     * @param {string} type - The type of layout: 'tile', etc. 
     * @param {Object} configs - The config objects to create the windows from
     */
    constructor(type, configs) {
        this.windows = [];

        // Create the div to host the windows.
        //windowmanager._launcher.document.createElement('div');

        // Create the windows.
        configs.forEach((config) => {
            this.windows.push(new Window(config));
        });

        // find out how to add windows to the div.

        return this.getWindows();
    }

    /**
     * Function to retrieve all windows.
     */
    getWindows() {
        return this.windows;
    }

    /**
     * Function to add a window to the layout scheme.
     * @param {Object} config 
     */
    addWindow(config) {
        let win = new Window(config); 
        this.windows.push(win);

        // Add to our layout div.

        return win;
    }
};

export default Layout;
