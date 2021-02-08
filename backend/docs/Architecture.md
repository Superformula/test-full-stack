## Architecture

The architecture designed tends to simplicity, aiming for extensibility, by balancing time with the length of the task.
It applies the layer pattern given that the complexity from the code is really low, and the logic is mostly defined by the interaction with it's database (DynamoDB).

At a higher level, the layer that receives the request is `resolvers/index.js`, and then hands in the request to the module that is actually in charge of implementing and executing the logic from the operation wanted.
This is done so that if one resolver needs to perform several different other operations and having them combined for an operation that requires multiple interactions with the database can be done there. 

In addition it's provided in such a way that we can apply middlewares in that layer, as for example an authentication middleware, by providing a simple (by hand) way of applying middlewares for each of the resolvers.
Extending that behavior is as easy as calling a middleware in that code-block, and calling it with the desired arguments as all the information needed is there, as that closure contains the arguments and root values passed in by Apollo on GraphQL.

Lastly, I used a singleton pattern for the instance on the database, given that I wanted to inject the dependency for the database client so that I could easily mock it for testing without having to use a mock library or other mechanisms as I was short on time.


## Infrastructure

For the infrastructure, it was designed again for simplicity, using API Gateway + Lambda + DynamoDB being the interaction in the form of AG <-> Lambda <-> DynamoDB  and backwards with the responses.

This comes with inherent benefits when scaling as it doesn't need any effort for scaling horizontally, as AG scales on it's own (and can improve performance by using using caching), the same is the case for Lambdas (unless huge chunks of memory are needed, which is not the case) and the same goes for DynamoDB
(of course, there can be tweaks in all of them, as for example tweaking for write operations DynamoDB)

This was achieved by using Serverless framework.
