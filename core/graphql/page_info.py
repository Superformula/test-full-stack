import graphene


class PageInfo(graphene.ObjectType):
    total = graphene.Int()
    page_size = graphene.Int()
    num_pages = graphene.Int()
    current_page = graphene.Int()
