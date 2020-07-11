

export default function getPageStateQuery() {
    const query: string[] = window.location.search.split('=');
    if (query.length > 1) {
        if (query[0].indexOf('page') >= 0) {
            const parseResult = parseInt(query[1]);
            if (parseResult !== NaN && parseResult > 0) {
                return parseResult;
            }
        }
    }
    
    return 1;
}