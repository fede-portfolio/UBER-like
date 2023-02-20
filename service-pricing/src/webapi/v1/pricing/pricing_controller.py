from decimal import Decimal
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse


from src.domain.rule import Rule
from src.repositories.unit_of_work import UnitOfWork
from src.domain.metrics_provider import MetricsProvider

router = APIRouter()


@router.get(
    '',
    status_code=status.HTTP_200_OK
)
async def price_trip(
        rider_username: str = '',
        origin_address: str = '',
        origin_latitude: float = -9000.9,
        origin_longitude: float = -9000.9,
        destination_address: str = '',
        destination_latitude: float = -9000.9,
        destination_longitude: float = -9000.9,
        estimated_time: int = 0,
        distance: int = 0,
        driver_username: str = ''):

    mp = MetricsProvider()

    with UnitOfWork() as uow:
        active_rule: Rule = uow.rule_repository.active()
        n_km = Decimal(distance) / Decimal(1000)
        n_rating = mp.rating_for_driver(driver_username)
        n_trips_last_30m = mp.trips_in_last_30m_for_driver(driver_username)
        price = active_rule.price_for(
            str(n_km),
            str(n_trips_last_30m),
            str(n_rating)
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={'price': price}
    )
