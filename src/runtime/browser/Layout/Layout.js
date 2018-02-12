/**
 * A library for laying out windowmanager windows.
 */

import Window from '../Window.js';
import windowmanager from '../global';

let ACTIVE_WINDOW_DIV_ID = 'active-window-container';
const TABBED_LAYOUT_DIV_ID = 'tabbed-layout-container';
const TAB_LIST_CONTAINER_ID = 'layout-tabs-list-container';
const TAB_LIST_ID = 'layout-tabs-list';
let TAB_DIV_HEIGHT = '25px'; // Can be overwritten by developer.

/**
 * A Layout class, used to create a layout of {@link Window} objects.
 *
 * <h5>Example:</h5>
 * ```javascript
 * // Create window(s).
 * let state = {
 *       width: 400,
 *       height: 400,
 *       url: 'child.html',
 *       title: 'Window X',
 *       frame: false
 *   };
 *
 * // Make an array of windows.
 * let configs = [state, state, state];
 *
 * // Create the layout.
 * let layout = new windowmanager.Layout('tabbed', 'layout-div', configs);
 * ```
 */
class Layout {
    /**
     * Constructor for the layout class.
     *
     * <h5>Example:</h5>
     * ```javascript
     * // Create the layout.
     * let layout = new windowmanager.Layout('tiled', 'layout-div', configs);
     * ```
     *
     * @param {string} type - The type of layout, defaults to tiled
     * @param {string} id - The id of the element to attach to, if none provided the layout will attach to the body
     * @param {Array.Object} configs - The config objects to create the windows from
     * @param {String} tabHeight - If in tabbed view, the height of the tab toolbar. Used to offset the active window div.
     */
    constructor(type, id, configs, tabHeight) {
        // If no type is defined let the user know that it will default to tiled.
        if (!type) {
            console.warn('Type not provided, defaulting to tiled view.');
        }

        // If no configs given, error out.
        if (!configs || configs.length === 0) {
            console.error('Must provide window configurations in constructor.');
            return;
        }

        // If configs is only one object, convert it to an array.
        if (!Array.isArray(configs)) {
            console.warn('Parameter configs should be an array of window configuration objects.');
            configs = [configs];
        }

        // Set the internal tab toolbar height if supplied.
        if (tabHeight) {
            TAB_DIV_HEIGHT = tabHeight.indexOf('px') > 0 ? tabHeight : tabHeight + 'px';
        }

        this._windows = [];

        // Give the active window div a unique id.
        ACTIVE_WINDOW_DIV_ID += '-' + type + '-' + windowmanager.Layout.getAll().length;

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

        // setAttribute('scrolling', 'no') ??? HTK
        windowmanager._layouts.set(id, this);

        window.addEventListener('resize', function (event) {
            window.document.getElementById(TABBED_LAYOUT_DIV_ID).setAttribute('width', window.outerWidth);
            windowmanager.Layout.getAllTabbed()[0]._windows.forEach(subWindow=> {
                subWindow.resizeTo(window.outerWidth, window.outerHeight);
            });

        });
    }

    /**
     * Function to retrieve all windows being managed.
     *
     * @returns {Array.Window}
     */
    getWindows() {
        return this._windows.slice();
    }

    /**
     * Method to get a window by its id.
     *
     * @param {string} id - the id of the window to find.
     *
     * @returns {Window}
     */
    getWindow(id) {
        let ret;

        if (!id) {
            console.error('No id provided for window to find.');
            return ret;
        }

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
     * @returns {Windowlo}
     */
    addWindow(config) {
        let newWindow;

        if (!config) {
            console.error('Must provide configuration object to create window from.');
            return;
        }

        // Create a list element for each window.
        if (this._layoutType === 'tiled') {
            let layoutItem = this._createTiledLayoutItem();

            config.container = layoutItem;

            newWindow = new Window(config);

            // Set up an onclose listener for the window.
            let that = this;

            newWindow.on('close', function () {
                that.removeWindow(this._id);
            });

            this._windows.push(newWindow);
        } else if (this._layoutType === 'tabbed') {
            // Set up the config to have the active window as its container and to be hidden on start.
            config.container = ACTIVE_WINDOW_DIV_ID;
            config.show = false;

            // Create the window.
            newWindow = new Window(config);
            // Create the tab for the window.
            this._createTabbedLayoutItem(newWindow._title, newWindow._id);
            newWindow.resizeTo(window.outerWidth, window.outerHeight);

            // Set up an on close listener for the window.
            let that = this;

            newWindow.on('close', function () {
                that.removeWindow(this._id);
            });

            this._windows.push(newWindow);

            // Set the newly created window to be the active window.
            this._changeActiveWindow(newWindow._id);
        }

        return newWindow;
    }

    /**
     * Function to remove a window from the layout scheme.
     * @param {String} id - The id of the window to remove.
     */
    removeWindow(id) {
        if (!id) {
            console.error('Must provide id of window to remove.');
            return;
        }

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
    /**
     * Returns a list of all {@link Layout} instances open.
     * <h5>Example:</h5>
     * ```javascript
     * // Close all windows:
     * let allWindows = windowmanager.Layout.getAll();
     * ```
     * @returns {Window[]}
     */
    static getAll() {
        return Array.from(windowmanager._layouts.values());
    }
    /**
     * Returns all tab style {@link Layout} instances open.
     * <h5>Example:</h5>
     * ```javascript
     * let allTabSets = windowmanager.Layout.getAllTabbed();
     * ```
     * @returns {Layout[]}
     */

    static getAllTabbed() {
        return Array.from(windowmanager._layouts.values().filter((item)=>{
            return item._layoutType === 'tabbed';
        })
        );
    }
    /**
     * Returns the {@link Layout} instance that has `id`.
     * <h5>Example:</h5>
     * ```javascript
     * // Get layout with ID:
     * let layout = windowmanager.Layout.getById(windowID);
     * ```
     * @param {String|Number}
     * @returns {Layout|undefined}
     */
    static getByID(id) {
        return windowmanager._layouts.get(id);
    }

    /* Private methods */
    /**
     * Method for creating a tiled layout of windows.
     * @param {Array.Object} configs - The config objects to create the windows from
     * @param {string} id - The id of the element to attach to, if none provided the layout will attach to the body
     */
    _tiled(configs, id) {
        if (!configs || !Array.isArray(configs) || configs.length === 0) {
            console.error('Must provide array of configuration objects to create windows from.');
            return;
        }

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
        if (!configs || !Array.isArray(configs) || configs.length === 0) {
            console.error('Must provide array of configuration objects to create windows from.');
            return;
        }

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

        // Set up the fixed tab bar.
        tabDiv.style.position = 'fixed';
        tabDiv.style.top = 0;
        tabDiv.style.zIndex = 1000;
        activeWindowDiv.style.marginTop = TAB_DIV_HEIGHT;

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

        let that = this;

        // Create the windows.
        configs.forEach((config) => {
            // Set up the config to have the active window as its container and to be hidden on start.
            config.container = ACTIVE_WINDOW_DIV_ID;
            config.show = false;

            // Create the window.
            let newWindow = new Window(config);

            // Set up an onclose listener for the window.
            newWindow.on('close', function () {
                that.removeWindow(this._id);
            });

            // Create the tab for the window.
            this._createTabbedLayoutItem(newWindow._title, newWindow._id);

            // Add the window to the internal windows store.
            this._windows.push(newWindow);
        });
        this._windows.forEach(subWindow=>{
            subWindow.resizeTo(window.outerWidth, window.outerHeight);
        });
        // Change the active window.
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
        if (!id) {
            console.error('Must provide id to change window to.');
            return;
        }

        if (id === this._activeWindowId) { return; }

        let newActiveWindow = this.getWindow(id);

        if (this._activeWindowId) {
            let oldActiveWindow = this.getWindow(this._activeWindowId);

            if (oldActiveWindow) {
                // Remove the active class from the old active tab.]
                let oldActiveTab = document.getElementById('tab-' + oldActiveWindow._id);

                oldActiveTab.classList.remove('active-tab');

                oldActiveWindow.hide();
            }
        }

        if (newActiveWindow) {
            // Add the active class to the tab that is active.
            let activeTab = document.getElementById('tab-' + id);

            activeTab.classList.add('active-tab');

            newActiveWindow.show();
            this._activeWindowId = id;
        }
    }
};

export default Layout;
