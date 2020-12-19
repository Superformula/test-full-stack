from unittest import TestCase

from graphene.test import Client
import pytest


# Create your tests here.
@pytest.mark.django_db
class TestListUsers(TestCase):
    def test_create_user(self) -> None:
        pass
