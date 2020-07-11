// TODO: This is all very confusing...
function getPageStateQueryInner() {
    const query: string[] = window.location.search.split('=');
    if (query.length > 1) {
        if (query[0].indexOf('page') >= 0) {
            const parseResult = parseInt(query[1]);
            if (parseResult !== NaN && parseResult > 0) {
                return parseResult;
            }
        }
    }
    
    return -1;
}

export function getPageStateQuery() {
    let page = getPageStateQueryInner();
    if (page <= 0) {
        return 1;
    }
    else {
        return page;
    }
}

export function initializePageState() {
    let url = window.location.href;
    let qInd = url.indexOf('?');
    if (qInd >= 0) {
        let page = getPageStateQueryInner();
        if (page < 1) {
            page = 1;
        }
        url = url.substr(0, qInd) + `?page=${page}`;
    }
    else {
        url = url + `?page=${1}`;
    }
    window.history.pushState("New Page", "Code Sample", url);
}

export function incrementPageStateQuery() {
    let url = window.location.href;
    let qInd = url.indexOf('?');
    if (qInd >= 0) {
        let page = getPageStateQueryInner();
        if (page < 0) {
            page = 0;
        }
        url = url.substr(0, qInd) + `?page=${page+1}`;
    }
    else {
        url = url + `?page=${1}`;
    }
    window.history.pushState("New Page", "Code Sample", url);
}