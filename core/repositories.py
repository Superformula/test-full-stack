from dataclasses import dataclass
import datetime
from typing import List
import uuid

from django.contrib.auth import get_user_model
from django.db import transaction

from .models import UserProfile

UserModel = get_user_model()


@dataclass
class UserProfileData:
    id: uuid.UUID
    name: str
    date_of_birth: datetime.date
    address: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class UserRepository:
    """Data access layer. Perform basic CRUD using ORM."""

    def _convert_to_data(self, instance: UserProfile) -> UserProfileData:
        """Convert a Django model instance to UserProfileData."""
        return UserProfileData(
            id=instance.id,
            name=instance.name,
            date_of_birth=instance.date_of_birth,
            address=instance.address,
            created_at=instance.created_at,
            updated_at=instance.updated_at,
        )

    def count(self, name: str = "") -> int:
        queryset = UserProfile.objects.all()
        if name:
            queryset = queryset.filter(name__icontains=name)

        return queryset.count()

    def fetch(
        self, *, limit: int, offset: int, name: str = ""
    ) -> List[UserProfileData]:
        queryset = UserProfile.objects.all()
        if name:
            queryset = queryset.filter(name__icontains=name)

        queryset = queryset[offset:limit]
        return [self._convert_to_data(instance) for instance in queryset]

    def create(self, *, name: str, date_of_birth: datetime.date) -> UserProfileData:
        with transaction.atomic():
            username = uuid.uuid4()
            user = UserModel.objects.create_user(username=username)
            profile = UserProfile.objects.create(
                name=name, date_of_birth=date_of_birth, user=user
            )
            return self._convert_to_data(profile)
