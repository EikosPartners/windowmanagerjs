/**
 * A library for laying out windowmanager windows.
 */

import Window from '../Window.js';

/**
 * Layout namespace.
 */
class Layout {
    /**
     * Constructor for the layout class.
     *
     * @param {string} type - The type of layout: 'tile', etc. 
     * @param {string} id - The id to give to the layout container
     * @param {Object} configs - The config objects to create the windows from
     */
    constructor(type, id, configs) {
        this.windows = [];

        // // Create the div to host the windows.
        let layoutDiv = document.createElement('div');
        let layoutList = document.createElement('ul');

        layoutDiv.setAttribute('id', id || 'layout-manager-container');
        document.body.appendChild(layoutDiv);
        layoutDiv.appendChild(layoutList);

        // Create the windows.
        configs.forEach((config) => {
            // Create a list element for each window.
            let layoutItem = document.createElement('li');

            layoutItem.style.display = 'inline-block';
            layoutItem.style.padding = '0 10px 0 10px';

            layoutList.appendChild(layoutItem);

            // Set the windows container to be the list item.
            config.container = layoutItem;

            // Create the new window and add it to our windows store.
            let newWindow = new Window(config);

            this.windows.push(newWindow);
        });

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
     * @param {Object} config - The configuration object for the window
     */
    addWindow(config) {
        let win = new Window(config);

        this.windows.push(win);

        // Add to our layout div.

        return win;
    }
};

export default Layout;
