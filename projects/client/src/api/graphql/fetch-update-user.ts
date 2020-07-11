import { APIUserModel, APINextToken } from '../api-types';

import GRAPH_API from './backend-host';

type FetchUpdateUserResult = APIUserModel;

interface FetchUpdateUserGraphResult {
    data: {
        updateUser: FetchUpdateUserResult
    }
}

export function fetchUpdateUser(user: APIUserModel) : Promise<FetchUpdateUserResult> {
    return fetch(GRAPH_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation updateUser($updateUserInput: UpdateUserInput!){
                    updateUser(input: $updateUserInput) {
                        id
                        name
                        dob
                        address
                        description
                    }
                }
            `,
            variables: JSON.stringify({
                updateUserInput: user
            }, (key, value) => value === null ? "" : value)
        })
    })
    .then((result) => result.json())
    .then((graphResult: FetchUpdateUserGraphResult) => { 
        console.log(JSON.stringify(graphResult));
        return graphResult.data.updateUser;
    });
}