/**
 * A library for laying out windowmanager windows.
 */

import Window from '../Window.js';

const ACTIVE_WINDOW_DIV_ID = 'active-window-container';
const TABBED_LAYOUT_DIV_ID = 'tabbed-layout-container';
const TAB_LIST_CONTAINER_ID = 'layout-tabs-list-container';
const TAB_LIST_ID = 'layout-tabs-list';

/**
 * Layout namespace.
 */
class Layout {
    /**
     * Constructor for the layout class.
     *
     * @param {string} type - The type of layout, defaults to tiled
     * @param {string} id - The id of the element to attach to, if none provided the layout will attach to the body
     * @param {Array.Object} configs - The config objects to create the windows from
     */
    constructor(type, id, configs) {
        this._windows = [];

        // Create the layout based on the type given.
        switch (type) {
            case 'tabbed':
                this._tabbed(configs, id);
                break;
            default:
                this._tiled(configs, id);
                break;
        }

        this._layoutType = type;
    }

    /**
     * Function to retrieve all _windows.
     */
    getWindows() {
        return this._windows;
    }

    /**
     * Method to get a window by its id.
     * 
     * @param {string} id - the id of the window to find.
     * 
     * @return Returns a window object
     */
    getWindow(id) {
        let ret;

        this.getWindows().some((window) => {
            if (window._id === id) {
                ret = window;
                return true;
            }
        });

        return ret;
    }

    /**
     * Function to add a window to the layout scheme.
     * @param {Object} config - The configuration object for the window
     * 
     * @return Returns the newly created Window
     */
    addWindow(config) {
        let newWindow;

        // Create a list element for each window.
        if (this._layoutType === 'tiled') {
            let layoutItem = this._createLayoutItem();

            config.container = layoutItem;

            newWindow = new Window(config);

            // Set up an onclose listener for the window.
            let that = this;

            newWindow.on('close', function () {
                that.removeWindow(this._id);
            });
        } else if (this._layoutType === 'tabbed') {
            // Set up the config to have the active window as its container and to be hidden on start.
            config.container = ACTIVE_WINDOW_DIV_ID;
            config.show = false;

            // Create the window.
            newWindow = new Window(config);

            // Create the tab for the window.
            this._createTabbedLayoutItem(newWindow._title, newWindow._id);
        }

        this._windows.push(newWindow);
        return newWindow;
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

                // If in tabbed view, remove the element from the tab list.
                if (this._layoutType === 'tabbed') {
                    let tabElem = document.getElementById('tab-' + window._id);

                    this._list.removeChild(tabElem);
                    this._changeActiveWindow(this._windows[0]._id);
                }

                return true;
            }
        });
    }

    /* Private methods */
    /**
     * Method for creating a tiled layout of windows.
     * @param {Array.Object} configs - The config objects to create the windows from
     * @param {string} id - The id of the element to attach to, if none provided the layout will attach to the body
     */
    _tiled(configs, id) {
        // Save the this context to be used when removing a window.
        let that = this;

        // Create the div to host the windows.
        let layoutDiv = document.createElement('div');
        let layoutList = document.createElement('ul');

        layoutDiv.setAttribute('id', 'tiled-layout-container');

        if (id) {
            let container = document.getElementById(id);

            container.appendChild(layoutDiv);
        } else {
            document.body.appendChild(layoutDiv);
        }

        layoutDiv.appendChild(layoutList);

        // Keep a reference to the list for adding new windows.
        this._list = layoutList;
        // Keep a reference to the container.
        this._container = layoutDiv;

        // Create the windows.
        configs.forEach((config) => {
            // Create a list element for each window.
            let layoutItem = this._createTiledLayoutItem();

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
     * Method for creating a tabbed layout.
     * @param {Array.Object} configs - The config objects to create the windows from
     * @param {string} id - The id of the element to attach to, if none provided the layout will attach to the body
     */
    _tabbed(configs, id) {
        // Create the outer container.
        let layoutDiv = document.createElement('div');
        // Create the tabs div.
        let tabDiv = document.createElement('div');
        // Create the window div.
        let activeWindowDiv = document.createElement('div');
        // Create the tabs ul.
        let tabList = document.createElement('ul');

        layoutDiv.setAttribute('id', TABBED_LAYOUT_DIV_ID);
        activeWindowDiv.setAttribute('id', ACTIVE_WINDOW_DIV_ID);
        tabDiv.setAttribute('id', TAB_LIST_CONTAINER_ID);
        tabList.setAttribute('id', TAB_LIST_ID);

        this._list = tabList;

        if (id) {
            let container = document.getElementById(id);

            container.appendChild(layoutDiv);
        } else {
            document.body.appendChild(layoutDiv);
        }

        layoutDiv.appendChild(tabDiv);
        layoutDiv.appendChild(activeWindowDiv);
        tabDiv.appendChild(tabList);

        // Create the windows.
        configs.forEach((config) => {
            // Set up the config to have the active window as its container and to be hidden on start.
            config.container = ACTIVE_WINDOW_DIV_ID;
            config.show = false;

            // Create the window.
            let newWindow = new Window(config);

            // Create the tab for the window.
            this._createTabbedLayoutItem(newWindow._title, newWindow._id);

            // Add the window to the internal windows store.
            this._windows.push(newWindow);
        });

        // Change the active window.
        this._activeWindowId = this._windows[0]._id;
        this._changeActiveWindow(this._windows[0]._id);
    }

    /**
     * Method for creating a list element to add a window to.
     */
    _createTiledLayoutItem() {
        let layoutItem = document.createElement('li');

        layoutItem.style.display = 'inline-block';
        layoutItem.style.padding = '10px';

        this._list.appendChild(layoutItem);

        return layoutItem;
    }

    /**
     * Method for creating a tab in the tabbed layout.
     * 
     * @param {string} title - The title of the window being created to display in the tab's text
     * @param {string} id - The id of the window being created
     */
    _createTabbedLayoutItem(title, id) {
        let layoutItem = document.createElement('li');

        layoutItem.style.display = 'inline-block';
        layoutItem.style.padding = '10px';
        layoutItem.style.border = '2px solid black';
        layoutItem.innerText = title;
        layoutItem.setAttribute('id', 'tab-' + id);

        // Set up the onclick listener to load the window into the activeWindow tab.
        layoutItem.onclick = () => {
            this._changeActiveWindow.call(this, id);
        };

        this._list.appendChild(layoutItem);

        return layoutItem;
    }

    /**
     * Method for changing the active window.
     * 
     * @param {string} id - The id of the window to show
     */
    _changeActiveWindow(id) {
        let newActiveWindow = this.getWindow(id);
        let oldActiveWindow = this.getWindow(this._activeWindowId);

        if (oldActiveWindow) oldActiveWindow.hide();

        newActiveWindow.show();

        this._activeWindowId = id;
    }
};

export default Layout;