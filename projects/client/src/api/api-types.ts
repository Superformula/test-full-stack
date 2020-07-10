export interface APINextToken {
    id: string;
}

/**
 * TODO: Is there a clean way to share types between the server and
 * client?
 */
export interface APIUserModel {
    // I'm going to minimally require that the client ALWAYS
    // requests the id and the name...
    id: string; 
    name: string;
    dob?: string;
    address?: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
}
