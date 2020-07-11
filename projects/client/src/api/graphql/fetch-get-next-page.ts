import { APIUserModel, APINextToken } from '../api-types';

import GRAPH_API from './backend-host';


interface FetchGetNextPageResult { 
    users: APIUserModel[], 
    nextToken: APINextToken
}

interface FetchGetNextPageGraphResult {
    data: {
        getNextPage: FetchGetNextPageResult
    }
}

export function fetchGetNextPage(nextToken: APINextToken, filter = "") : Promise<FetchGetNextPageResult> {
    const captureVariables: string[] = [];
    let captureVariablesString = "";
    const captureParameters: string[] = [];
    let captureParametersString = "";

    if (nextToken) {
        captureVariables.push('$nextToken: NextTokenInput');
        captureParameters.push('nextToken: $nextToken');
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
                query getNextPage${captureVariablesString} {
                    getNextPage${captureParametersString} {
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
                nextToken: nextToken,
                filter: filter
            })
        })
    })
    .then((result) => result.json())
    .then((graphResult: FetchGetNextPageGraphResult) => { 
        console.log(JSON.stringify(graphResult));
        return graphResult.data.getNextPage;
    });
}