from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hotel Booking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    return crud.create_user(db=db, user=user)

@app.post("/rooms/", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db=db, room=room)

@app.get("/rooms/", response_model=List[schemas.Room])
def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    rooms = crud.get_rooms(db, skip=skip, limit=limit)
    return rooms

@app.get("/bookings/", response_model=List[schemas.Booking])
def read_all_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_all_bookings(db=db, skip=skip, limit=limit)

@app.post("/bookings/{user_id}/", response_model=schemas.Booking)
def create_booking_for_user(user_id: int, booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_booking(db=db, booking=booking, user_id=user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/bookings/{user_id}/", response_model=List[schemas.Booking])
def get_bookings_for_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_bookings(db=db, user_id=user_id)

@app.put("/bookings/{booking_id}/cancel", response_model=schemas.Booking)
def cancel_user_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = crud.cancel_booking(db=db, booking_id=booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking eka hoyaganna baha")
    return booking

@app.post("/login/", response_model=schemas.User)
def login_user(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.authenticate_user(
        db, 
        email=user_credentials.email, 
        password=user_credentials.password
    )
    if not user:
        raise HTTPException(status_code=401, detail="Email eka hari Password eka hari waradi!")
    return user