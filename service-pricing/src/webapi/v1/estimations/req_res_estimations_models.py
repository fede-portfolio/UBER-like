from pydantic.main import BaseModel
from pydantic import Field


class EstimationResponse(BaseModel):
    estimated_price: str = Field(example='0.0012')
