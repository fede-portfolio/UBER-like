from pydantic.main import BaseModel
from pydantic import Field
from typing import Optional


class RuleResponse(BaseModel):
    id: str = Field(example='7344c4d7-451f-4abe-8435-b5dd1c191646')
    c_km: str = Field(example='0.0012')
    c_min_price: str = Field(example='1.15')
    c_rating: str = Field(example='3.14')
    c_trips_last_30m: str = Field(example='4.9')
    active: bool = Field(example=True)


class RuleCreateRequest(BaseModel):
    c_km: str = Field(example='0.0012')
    c_min_price: str = Field(example='1.15')
    c_rating: str = Field(example='3.14')
    c_trips_last_30m: str = Field(example='4.9')


class RuleUpdateRequest(BaseModel):
    c_km: Optional[str] = Field(example='0.0012')
    c_min_price: Optional[str] = Field(example='1.15')
    c_rating: Optional[str] = Field(example='3.14')
    c_trips_last_30m: Optional[str] = Field(example='4.9')
    active: Optional[bool] = Field(example=True)


class RuleEvaluateRequest(BaseModel):
    c_km: str = Field(example='0.0012')
    c_min_price: str = Field(example='1.15')
    c_rating: str = Field(example='3.14')
    c_trips_last_30m: str = Field(example='4.9')
    n_km: str = Field(example='2.8')
    n_rating: str = Field(example='3.5')
    n_trips_last_30m: str = Field(example='2')


class PriceResponse(BaseModel):
    price: str = Field(example='13.03')
