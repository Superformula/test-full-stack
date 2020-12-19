import graphene

from ..page_info import PageInfo


class User(graphene.ObjectType):
    id = graphene.ID(required=True)
    name = graphene.String()
    address = graphene.String()
    date_of_birth = graphene.Date()
    description = graphene.String()
    created_at = graphene.DateTime()
    updated_at = graphene.DateTime()


class UserEdge(graphene.ObjectType):
    node = graphene.Field(User)


class UserConnection(graphene.ObjectType):
    page_info = graphene.Field(PageInfo)
    edges = graphene.List(UserEdge)
