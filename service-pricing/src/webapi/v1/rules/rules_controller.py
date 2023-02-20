from typing import List
from fastapi import APIRouter, status

from src.webapi.v1.rules.req_res_rules_models import (
    RuleResponse,
    RuleCreateRequest,
    RuleUpdateRequest,
    RuleEvaluateRequest,
    PriceResponse
)

from src.service_layer import messagebus
from src.domain.rule import Rule
from src.domain.commands import (
    RuleGetCommand,
    RuleGetAllCommand,
    RuleCreateCommand,
    RuleUpdateCommand,
    RuleEvaluateCommand
)
from src.repositories.unit_of_work import UnitOfWork
from src.view.rule_presenter import RulePresenter

router = APIRouter()


@router.get(
    '/{rule_id}',
    status_code=status.HTTP_200_OK,
    response_model=RuleResponse
)
async def get_rule(rule_id: str):
    cmd = RuleGetCommand(id=rule_id)
    # FIXME: Tendría que instanciarse una única vez por fuera?
    uow = UnitOfWork()
    rule: Rule = messagebus.handle(cmd, uow)[0]
    return RulePresenter.present(rule)


@router.get(
    '',
    status_code=status.HTTP_200_OK,
    response_model=List[RuleResponse]
)
async def get_all_rules():
    cmd = RuleGetAllCommand()
    uow = UnitOfWork()
    rules: List[Rule] = messagebus.handle(cmd, uow)[0]
    return [RulePresenter.present(rule) for rule in rules]


@router.post(
    '',
    status_code=status.HTTP_201_CREATED,
    response_model=RuleResponse
)
async def create_rule(body: RuleCreateRequest):
    cmd = RuleCreateCommand(
        c_km=body.c_km,
        c_trips_last_30m=body.c_trips_last_30m,
        c_rating=body.c_rating,
        c_min_price=body.c_min_price,
    )
    uow = UnitOfWork()
    rule: Rule = messagebus.handle(cmd, uow)[0]
    return RulePresenter.present(rule)


@router.patch(
    '/{id}',
    status_code=status.HTTP_202_ACCEPTED,
    response_model=RuleResponse
)
async def update_rule(id: str, req: RuleUpdateRequest):
    cmd = RuleUpdateCommand(
        id=id,
        c_km=req.c_km,
        c_trips_last_30m=req.c_trips_last_30m,
        c_rating=req.c_rating,
        c_min_price=req.c_min_price,
        active=req.active
    )
    uow = UnitOfWork()
    rule = messagebus.handle(cmd, uow)[0]
    return RulePresenter.present(rule)


@router.post(
    '/trial',
    status_code=status.HTTP_201_CREATED,
    response_model=PriceResponse
)
async def evaluate_rule(body: RuleEvaluateRequest):
    cmd = RuleEvaluateCommand(
        c_km=body.c_km,
        c_trips_last_30m=body.c_trips_last_30m,
        c_rating=body.c_rating,
        c_min_price=body.c_min_price,
        n_km=body.n_km,
        n_rating=body.n_rating,
        n_trips_last_30m=body.n_trips_last_30m
    )
    uow = UnitOfWork()
    price = messagebus.handle(cmd, uow)[0]
    return PriceResponse(price=price)
