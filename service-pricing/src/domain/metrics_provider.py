import requests
from src.conf.config import Settings


class MetricsProvider:
    def trips_in_last_30m_for_driver(self, driver_username: str):
        uri = Settings().PRICING_SERVICE_TRIPS_URL
        uri += f'/metrics/{driver_username}'
        response = requests.get(uri)
        return response.json()['finished_trips']

    def rating_for_driver(self, driver_username: str):
        uri = Settings().PRICING_SERVICE_USERS_URL
        uri += f'/drivers/{driver_username}/qualy/average'
        response = requests.get(uri)
        rating = response.json()
        if (int(rating) < 0):
            return '3.5'
        return rating
