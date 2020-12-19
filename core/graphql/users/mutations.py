from datetime import date
import uuid

import graphene

from core.services import UserService

from .object_types import User


class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        date_of_birth = graphene.Date()

    ok = graphene.Boolean()
    user = graphene.Field(User)

    def mutate(root, info, name: str, date_of_birth: date) -> dict:
        return {
            "user": UserService().create(name=name, date_of_birth=date_of_birth),
            "ok": True,
        }


class UpdateUser(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=False)
        date_of_birth = graphene.Date(required=False)
        address = graphene.String(required=False)
        description = graphene.String(required=False)

    ok = graphene.Boolean()
    user = graphene.Field(User)

    def mutate(
        root,
        info,
        id: str,
        name: str = None,
        date_of_birth: graphene.Date = None,
        address: str = None,
        description: str = None,
    ) -> dict:
        return {
            "user": UserService().update(
                id=uuid.UUID(id),
                name=name,
                date_of_birth=date_of_birth,
                address=address,
                description=description,
            ),
            "ok": True,
        }
