# TestFullStack

## Back end

## Setup

### Environment
This project is set up to use `dotenv` for managing environment variable via a '.env' file in the root of [root dir]/lambdaapi.  Any key/value pair in this file will override the environment provided by the host OS.  This is convenient for local development as project don't need to pollute the global environment.  Of course standard environment variables may also be used.

In order to execute requests against the Lamda API, the following environment variables need to be set:

| Tables        | Are           |
| ------------- |:-------------:|
| MAPBOX_API_TOKEN  | This is a token (generated or public) needed to use mapbox.com API for geocoding |

### TODO
* Add authentication and authorization to the GQL handler

### Limitations
* Since there is no unique identifier in the provided schema, it is not possible to have a useful constraint to prevent duplicate or near duplicate users from being created.  i.e. would normally use a unique username or email address for a uniqueness constraint. 

## Front end
