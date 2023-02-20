from decimal import Decimal
from fastapi import APIRouter, status

from src.webapi.v1.estimations.req_res_estimations_models import (
    EstimationResponse
)

from src.domain.rule import Rule
from src.repositories.unit_of_work import UnitOfWork

DEFAULT_RATING = '3.5'
DEFAULT_TRIPS_LAST_30M = '0'
router = APIRouter()


@router.get(
    '',
    status_code=status.HTTP_200_OK,
    response_model=EstimationResponse
)
async def estimate_trip(
        rider_username: str = '',
        origin_address: str = '',
        origin_latitude: float = -9000.9,
        origin_longitude: float = -9000.9,
        destination_address: str = '',
        destination_latitude: float = -9000.9,
        destination_longitude: float = -9000.9,
        estimated_time: int = 0,
        distance: int = 0):

    with UnitOfWork() as uow:
        active_rule: Rule = uow.rule_repository.active()
        n_km = Decimal(distance) / Decimal(1000)
        n_rating = Decimal(DEFAULT_RATING)
        print(n_km, n_rating)
        price = active_rule.price_for(
            str(n_km),
            DEFAULT_TRIPS_LAST_30M,
            str(n_rating)
        )

    return EstimationResponse(
        estimated_price=price
    )
