import { BACKEND_HOST_URI } from '../globals';

const GRAPH_API = `${BACKEND_HOST_URI}/graphql`

/**
 * Fortunately, we don't have any authorization - so we can make CORS requests all day long.
 */
export function fetchGetUsersPage(pageStart: any = {}, filter = "") {
    const captureVariables: string[] = [];
    let captureVariablesString = "";
    const captureParameters: string[] = [];
    let captureParametersString = "";

    if (pageStart) {
        captureVariables.push('$pageCount: Int');
        captureParameters.push('pageCount: $pageCount');
    }
    
    if (filter) {
        captureVariables.push("$filter: String");
        captureParameters.push('filter: $filter');
    }

    if (captureVariables.length > 0) {
        captureVariablesString = `(${captureVariables.join(', ')})`;
        captureParametersString = `(${captureParameters.join(', ')})`;
    }

    return fetch(GRAPH_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query getPage${captureVariablesString} {
                    getPages${captureParametersString} {
                        users {
                            id
                            name
                            address
                            dob
                            description
                        }
                        nextToken {
                            id
                        }
                    }
                }
            `,
            variables: JSON.stringify({
                pageStart: pageStart,
                filter: filter
            })
        })
    })
    .then((result) => result.json())
    .then((data) => { 
        console.log(JSON.stringify(data));
        return data;
    });
}