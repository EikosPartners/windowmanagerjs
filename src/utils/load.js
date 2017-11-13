function ajax(type, url, cb) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {

            // Successful request.
            if (request.status === 200) {
                cb(request.response);
            }
        }
    };

    request.open(type, url, true);
    request.send();
}

/**
 * Load a url into a page.
 * Taken from jquery's load function https://github.com/jquery/jquery/blob/f18ca7bfe0f5e3184bf1ed55daf1668702c5577a/src/ajax/load.js
 * @param url {String} - The url to load
 * @param params {Object} - Object of key/value pairs for parameters
 * @param id {String} - The id of the element to attach the response to
 * @param callback {Function} - Function to call after the load completes
 */
function load(url, params, id, callback) {
    let type = 'GET';

    // If params is an object, set the type to be POST.
    if (params && typeof params === 'object') {
        type = 'POST';
    }

    ajax(type, url, (response) => {
        let elem = document.getElementById(id);
        let div = document.createElement('div');

        div.innerHTML = response;

        if (!elem) {
            elem = document.getElementsByTagName('body')[0];
        }

        elem.appendChild(div);

        console.log(response);

        if (callback && typeof callback === 'function') {
            callback();
        }
    });
}

export default load;
