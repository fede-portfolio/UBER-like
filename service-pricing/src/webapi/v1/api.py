from fastapi import APIRouter

from src.webapi.v1 import (
    healthcheck
)

from src.webapi.v1.estimations import estimations_controller
from src.webapi.v1.rules import rules_controller
from src.webapi.v1.pricing import pricing_controller


api_router = APIRouter()

api_router.include_router(healthcheck.router,
                          prefix="/healthcheck",
                          tags=["healthcheck"])

api_router.include_router(estimations_controller.router,
                          prefix='/estimations',
                          tags=['estimations'])

api_router.include_router(pricing_controller.router,
                          prefix='/pricing',
                          tags=['pricing'])

api_router.include_router(rules_controller.router,
                          prefix='/rules',
                          tags=['rules'])
