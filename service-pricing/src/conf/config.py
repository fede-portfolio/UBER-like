from pydantic import BaseSettings
from os import environ as env


class Settings(BaseSettings):
    DATABASE_URI: str
    API_V1_STR: str = env.get("API_VERSION_PREFIX")
    PRICING_SERVICE_TRIPS_URL: str = env.get('PRICING_SERVICE_TRIPS_URL')
    PRICING_SERVICE_USERS_URL: str = env.get('PRICING_SERVICE_USERS_URL')
