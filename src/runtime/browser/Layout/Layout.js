/**
 * A library for laying out windowmanager windows.
 */

import Window from '../Window.js';

/**
 * Layout namespace.
 */
class Layout {
    /**
     * Method for creating a list element to add a window to.
     */
    _createLayoutItem() {
        let layoutItem = document.createElement('li');

        layoutItem.style.display = 'inline-block';
        layoutItem.style.padding = '10px';

        this._list.appendChild(layoutItem);

        return layoutItem;
    }

    /**
     * Constructor for the layout class.
     *
     * @param {string} type - The type of layout, defaults to tiled
     * @param {string} id - The id to give to the layout container
     * @param {Object} configs - The config objects to create the windows from
     */
    constructor(type, id, configs) {
        this._windows = [];

        // // Create the div to host the windows.
        let layoutDiv = document.createElement('div');
        let layoutList = document.createElement('ul');

        layoutDiv.setAttribute('id', id || 'layout-manager-container');
        document.body.appendChild(layoutDiv);
        layoutDiv.appendChild(layoutList);

        // Keep a reference to the list for adding new windows.
        this._list = layoutList;
        // Keep a reference to the container.
        this._container = layoutDiv;

        // Create the windows.
        configs.forEach((config) => {
            // Create a list element for each window.
            let layoutItem = this._createLayoutItem();

            // Set the windows container to be the list item.
            config.container = layoutItem;

            // Create the new window and add it to our windows store.
            let newWindow = new Window(config);

            this._windows.push(newWindow);
        });
    }

    /**
     * Function to retrieve all _windows.
     */
    getWindows() {
        return this._windows;
    }

    /**
     * Function to add a window to the layout scheme.
     * @param {Object} config - The configuration object for the window
     */
    addWindow(config) {
        // Create a list element for each window.
        let layoutItem = this._createLayoutItem();

        config.container = layoutItem;

        let win = new Window(config);

        this._windows.push(win);

        return win;
    }
};

export default Layout;
