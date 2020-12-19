# Profiles

The project is created to complete a modified version of the [superformula full stack developer test](https://github.com/Superformula/test-full-stack).

# Proposal

## API backend

I use Python + Django for the backend. I chose Django here because it
takes care of some tedious plumbing work such as environment variable management, admin
console, ORM and migrations.

To implement a GraphQL API, I use a Python library called [graphene](https://graphene-python.org/). As far as I know, there is no other reputable alternatives for Python.

The GQL schema is defined in [schema.py](core/graphql/schema.py) where queries and mutations are located. In a larger project, these can be split into multiple folders but that isn't neccessary for this challenge so I will keep them all in here.

### Code Structure

`UserProfile` model is defined in [models.py](core/models.py). When a field gets changed, addedor deleted, migrations can be generated and excuted.

I created a [UserRepository](core/respositories.py) for basic CRUD with the ORM.

## Queries
List users:
```
query GetUsers {
  users(name: "abc") {
    pageInfo {
      total
    }
    edges {
      node {
        id
      }
    }
  }
}
```

### Using limit and offset for pagination

## Mutations
```
CreateUser
UpdateUser
```

## Error handling

Database failures should be retried.

## Logging and Error reporting

In a real world, I would use Sentry for error reporting and Datadog for metrics and monitors.

Application logs can be sent to Sumo Logic.

## CI/CD
We can use tools such as github hooks or CircleCI to build, test and deploy.
Linters, formatters, unit tests and integration tests can be added to the pipeline.
Approved PRs can be merged after all checks are successful. Deploys can be auto-trigggered or
manually triggered after `master` is pushed.

For my personal projects, I deploy all the frontend assets to github pages and the backend
is deployed on Heroku.


# How to start

Dependencies:
- Docker
- docker-compose

To start the backend API server, run

```
docker-compose up
```

When you navigate to `http://0.0.0.0:8000/graphql`, you should see a GraphQL playground. This
is provided by `django-graphene`. It is not as nice as the one provided
by [Apollo](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) but
OK for development.


