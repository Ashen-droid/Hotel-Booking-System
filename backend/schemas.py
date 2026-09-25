from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# ROOM SCHEMAS
class RoomBase(BaseModel):
    room_number: str
    room_type: str
    price_per_night: float
    status: Optional[str] = "AVAILABLE"

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int

    class Config:
        orm_mode = True

# USER SCHEMAS
class UserBase(BaseModel):
    full_name: str
    email: str 
    role: Optional[str] = "GUEST"

class UserCreate(UserBase):
    password: str

# Security
class User(UserBase):
    id: int
    
    class Config:
        orm_mode = True

# BOOKING SCHEMAS
class BookingBase(BaseModel):
    room_id: int
    check_in_date: datetime
    check_out_date: datetime

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    user_id: int
    total_amount: float
    status: str

    class Config:
        orm_mode = True