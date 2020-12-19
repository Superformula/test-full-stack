from typing import List
import uuid

from django.conf import settings


class FakeMapboxClient:
    """A fake mapbox client that returns static responses."""

    ENDPOINT = '"https://api.fakemapbox.com/access_token=YOUR_MAPBOX_ACCESS_TOKEN"'

    def __init__(self, access_token: str = None) -> None:
        self.access_token = access_token or settings.MAPBOX_ACCESS_TOKEN

    def get_locations(self, address: str) -> List[dict]:
        """The fake client returns a static list of locations based on given address."""
        return [{"id": uuid.uuid4(), "location": f"{address} {i}"} for i in range(1, 6)]
