from dataclasses import dataclass
import datetime
import math
from typing import List
import uuid

from .clients import FakeMapboxClient
from .repositories import UserProfileData, UserRepository


@dataclass
class UserPage:
    total_count: int
    num_pages: int
    page_number: int  # current page number
    items: List[UserProfileData]


class UserService:
    def __init__(self, repository=None) -> None:
        self.repository = repository or UserRepository()

    def fetch_page(
        self, *, page_number: int, page_size: int, name: str = ""
    ) -> UserPage:
        total_count = self.repository.count(name=name)
        num_pages = math.ceil(total_count / page_size)
        page_number = min(page_number, num_pages)

        limit = page_size
        offset = page_size * (page_number - 1)
        return UserPage(
            total_count=total_count,
            num_pages=num_pages,
            page_number=page_number,
            items=self.repository.fetch(name=name, limit=limit, offset=offset),
        )

    def create(self, *, name: str, date_of_birth: datetime.date) -> UserProfileData:
        return self.repository.create(name=name, date_of_birth=date_of_birth)

    def update(
        self,
        id: uuid.UUID,
        name: str = None,
        date_of_birth: datetime.date = None,
        address: str = None,
        description: str = None,
    ) -> UserProfileData:
        return self.repository.update(
            id=id,
            name=name,
            date_of_birth=date_of_birth,
            address=address,
            description=description,
        )


class LocationService:
    def __init__(self, client=None) -> None:
        self.client = FakeMapboxClient()

    def get_locations(self, address: str) -> List[dict]:
        return self.client.get_locations(address)
