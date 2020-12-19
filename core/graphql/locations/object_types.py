import graphene


class Location(graphene.ObjectType):
    id = graphene.ID(required=True)
    location = graphene.String()
