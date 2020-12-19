from datetime import date

import graphene

from core.services import UserService

MAX_PAGE_SIZE = 20


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


class PageInfo(graphene.ObjectType):
    total = graphene.Int()
    page_size = graphene.Int()
    num_pages = graphene.Int()
    current_page = graphene.Int()


class UserConnection(graphene.ObjectType):
    page_info = graphene.Field(PageInfo)
    edges = graphene.List(UserEdge)


class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        date_of_birth = graphene.Date()

    ok = graphene.Boolean()
    user = graphene.Field(lambda: User)

    def mutate(root, info, name: str, date_of_birth: date) -> dict:
        return {
            "user": UserService().create(name=name, date_of_birth=date_of_birth),
            "ok": True,
        }


class Query(graphene.ObjectType):
    users = graphene.Field(
        UserConnection,
        page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=5),
        name=graphene.String(default_value=""),
    )

    def resolve_users(
        root, info, *, page: int, page_size: int, name: str
    ) -> UserConnection:
        page_size = min(page_size, MAX_PAGE_SIZE)
        user_page = UserService().fetch_page(
            name=name, page_number=page, page_size=page_size
        )
        return UserConnection(
            page_info=PageInfo(
                current_page=user_page.page_number,
                num_pages=user_page.num_pages,
                total=user_page.total_count,
                page_size=page_size,
            ),
            edges=[UserEdge(node=node) for node in user_page.items],
        )


class Mutations(graphene.ObjectType):
    create_user = CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
