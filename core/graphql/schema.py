import graphene

from core.repositories import UserRepository


class User(graphene.ObjectType):
    id = graphene.ID(required=True)
    name = graphene.String()
    address = graphene.String()
    description = graphene.String()
    created_at = graphene.DateTime()
    updated_at = graphene.DateTime()


class UserEdge(graphene.ObjectType):
    node = graphene.Field(User)


class PageInfo(graphene.ObjectType):
    total = graphene.Int()
    num_pages = graphene.Int()
    current_page = graphene.Int()


class UserConnection(graphene.ObjectType):
    page_info = graphene.Field(PageInfo)
    edges = graphene.List(UserEdge)


class Query(graphene.ObjectType):
    users = graphene.Field(
        UserConnection,
        page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=20),
        name=graphene.String(default_value=""),
    )

    def resolve_users(root, info, *, page: int, page_size: int, name: str):
        limit = page_size
        offset = page_size * (page - 1)
        return UserRepository().fetch(name=name, limit=limit, offset=offset)


schema = graphene.Schema(query=Query)
