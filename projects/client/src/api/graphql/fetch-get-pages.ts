import { APIUserModel, APINextToken } from '../api-types';

import GRAPH_API from './backend-host';

/**
 * Fortunately, we don't have any authorization - so we can make CORS requests all day long.
 */
interface FetchGetPagesResult { 
    users: APIUserModel[], 
    nextToken: APINextToken
}

interface FetchGetPagesGraphResult {
    data: {
        getPages: FetchGetPagesResult
    }
}

export function fetchGetPages(pageCount: number, filter = "") : Promise<FetchGetPagesResult> {
    const captureVariables: string[] = [];
    let captureVariablesString = "";
    const captureParameters: string[] = [];
    let captureParametersString = "";

    if (pageCount) {
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
            'Content-Type': 'application/json'
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
                            createdAt
                        }
                        nextToken {
                            id
                        }
                    }
                }
            `,
            variables: JSON.stringify({
                pageCount: pageCount,
                filter: filter
            })
        })
    })
    .then((result) => result.json())
    .then((graphResult: FetchGetPagesGraphResult) => { 
        console.log(JSON.stringify(graphResult));
        return graphResult.data.getPages;
    });
}