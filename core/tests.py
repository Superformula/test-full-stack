import datetime
from unittest import TestCase

from graphene.test import Client
import pytest

from core.repositories import UserRepository

from .graphql.schema import schema


# Create your tests here.
@pytest.mark.django_db
class IntegrationTest(TestCase):
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

    def test_list_users__search_by_name(self) -> None:
        UserRepository().create(
            name="Peter Pan", date_of_birth=datetime.date(2020, 12, 1)
        )
        UserRepository().create(
            name="John Joe", date_of_birth=datetime.date(2020, 12, 1)
        )
        client = Client(schema)

        # Requesting page 2 which doesn't exist so server should return the last page
        response = client.execute(
            """
query ListUsers {
  users(name: "peter") {
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
        assert response["data"]["users"]["pageInfo"]["total"] == 1
        assert response["data"]["users"]["edges"][0]["node"]["name"] == "Peter Pan"

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

    def test_update_user__success(self) -> None:
        user_id = (
            UserRepository()
            .create(name="Peter Pan", date_of_birth=datetime.date(2020, 12, 1))
            .id
        )
        client = Client(schema)

        # Requesting page 2 which doesn't exist so server should return the last page
        response = client.execute(
            f"""
mutation updateUser {{
  updateUser(id: "{user_id}", name: "New Name", dateOfBirth: "2000-01-01") {{
    user {{
      id
      name
      dateOfBirth
    }}
    ok
  }}
}}
            """
        )

        assert response["data"]["updateUser"]["ok"] is True
        user = response["data"]["updateUser"]["user"]
        assert user["name"] == "New Name"
        assert user["dateOfBirth"] == "2000-01-01"
