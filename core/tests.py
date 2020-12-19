import datetime
from unittest import TestCase

from graphene.test import Client
import pytest

from core.repositories import UserRepository

from .graphql.schema import schema


# Create your tests here.
@pytest.mark.django_db
class IntegrationTest(TestCase):
    def test_create_user__success(self) -> None:
        client = Client(schema)
        response = client.execute(
            """
mutation createUser {
  createUser(name: "Peter", dateOfBirth: "2000-01-01") {
    user {
      name
      dateOfBirth
    }
    ok
  }
}
            """
        )

        assert response["data"]["createUser"]["ok"] is True
        user = response["data"]["createUser"]["user"]
        assert user["name"] == "Peter"
        assert user["dateOfBirth"] == "2000-01-01"

    def test_list_users__no_filters__success(self) -> None:
        users = [
            UserRepository().create(
                name=f"User {i}", date_of_birth=datetime.date(2020, 12, 1 + i)
            )
            for i in range(10)
        ]

        client = Client(schema)
        response = client.execute(
            """
query ListUsers {
  users {
    pageInfo {
      total
      numPages
      currentPage
      pageSize

    }
    edges {
      node {
        id
        name
        address
        description
        createdAt
        updatedAt
      }
    }
  }
}
            """
        )

        page_info = response["data"]["users"]["pageInfo"]
        assert page_info["total"] == len(users)
        assert page_info["pageSize"] == 5
        assert page_info["numPages"] == 2
        assert page_info["currentPage"] == 1

    def test_list_users__exceed_max_page_size(self) -> None:
        """The max page size is 20."""
        [
            UserRepository().create(
                name=f"User {i}", date_of_birth=datetime.date(2020, 12, 1 + i)
            )
            for i in range(30)
        ]
        client = Client(schema)

        # page size is 30 in the request
        response = client.execute(
            """
query ListUsers {
  users(pageSize: 30) {
    pageInfo {
      total
      numPages
      currentPage
      pageSize

    }
    edges {
      node {
        id
        name
        address
        description
        createdAt
        updatedAt
      }
    }
  }
}
            """
        )

        # Server responds with a pageSize=20 (the max)
        assert response["data"]["users"]["pageInfo"]["pageSize"] == 20

    def test_list_users__page_out_of_range(self) -> None:
        [
            UserRepository().create(
                name=f"User {i}", date_of_birth=datetime.date(2020, 12, 1 + i)
            )
            for i in range(5)
        ]
        client = Client(schema)

        # Requesting page 2 which doesn't exist so server should return the last page
        response = client.execute(
            """
query ListUsers {
  users(page: 2, pageSize: 5) {
    pageInfo {
      total
      numPages
      currentPage
      pageSize

    }
    edges {
      node {
        id
        name
        address
        description
        createdAt
        updatedAt
      }
    }
  }
}
            """
        )

        assert response["data"]["users"]["pageInfo"]["currentPage"] == 1
