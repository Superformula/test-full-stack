import graphene

from core.services import UserService

from .page_info import PageInfo
from .users.mutations import CreateUser, UpdateUser
from .users.object_types import UserConnection, UserEdge

MAX_PAGE_SIZE = 20


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
    update_user = UpdateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
