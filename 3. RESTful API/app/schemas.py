from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
from pydantic import RootModel

class InputImage(BaseModel):
    id: str
    data: List[str]
    deviceName: str

class BulkPayload(RootModel[Dict[str, InputImage]]):
    pass

class DeviceOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class ImageResultOut(BaseModel):
    id: str
    device: DeviceOut
    avg_before_norm: float
    avg_after_norm: float
    data_size: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True

class UpdatePayload(BaseModel):
    id: str | None = None
    device_name: str | None = None
