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

        // Need to save a copy of 'this' context to use when a window is closed.
        let that = this;

        // Create the windows.
        configs.forEach((config) => {
            // Create a list element for each window.
            let layoutItem = this._createLayoutItem();

            // Set the windows container to be the list item.
            config.container = layoutItem;

            // Create the new window.
            let newWindow = new Window(config);

            // Set up an onclose listener for the window.
            newWindow.on('close', function () {
                that.removeWindow(this._id);
            });

            // Add to our windows store.
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

    /**
     * Function to remove a window from the layout scheme.
     * @param {String} id - The id of the window to remove.
     */
    removeWindow(id) {
        this._windows.some((window, idx) => {
            if (window._id === id) {
                this._windows.splice(idx, 1);

                // Call close on the window to ensure its removed from the DOM.
                // If the window was removed via removeWindow programatically,
                // it may not have been removed from the DOM yet.
                window.close();

                return true;
            }
        });
    }

    /* Private methods */

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
};

export default Layout;
