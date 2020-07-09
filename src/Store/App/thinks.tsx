import { getUsers } from "Store/users/thinks";

/*

This app is built on an MVC architecture/pattern and the Store is intended to act as the model (the db).
Because of that, folders and reducers are intended to pair with backend data types, like `users`.

However, it's often helpful to be able to maintain/manage certain UI-specific state here as well,
due to the globally accessible nature of the Store.

There is not necessarily such a need in this project yet, but an example of a use case for this
would be to centralize initial application setup logic (data fetching and orchestration).

The function below could be imported into App.tsx and managed via a useEffect hook. It is not because
the current project is simpler to maintain if logic is implemented local to features since the featureset is small.

*/

export const setupApp = getUsers;
