

export default function getPageStateQuery() {
    let query: string[] = window.location.search.split('=');
    if (query.length > 1) {
        if (query[0].indexOf('page') >= 0) {
            let parseResult = parseInt(query[1]);
            if (parseResult !== NaN) {
                return parseResult;
            }
        }
    }
    
    return 0;
}