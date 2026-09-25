from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="GUEST") 
    
    bookings = relationship("Booking", back_populates="user")

class Room(Base):
    __tablename__ = "rooms"
    
    id = Column(Integer, primary_key=True, index=True)
    room_number = Column(String, unique=True, index=True)
    room_type = Column(String) # SINGLE, DOUBLE, SUITE
    price_per_night = Column(Float)
    status = Column(String, default="AVAILABLE") # AVAILABLE, BOOKED, MAINTENANCE
    
    
    bookings = relationship("Booking", back_populates="room")

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # Users table to link 
    room_id = Column(Integer, ForeignKey("rooms.id")) # Rooms table to link 
    check_in_date = Column(DateTime, default=datetime.datetime.utcnow)
    check_out_date = Column(DateTime)
    total_amount = Column(Float)
    status = Column(String, default="PENDING") # PENDING, CONFIRMED, CANCELLED
    
    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")