from sqlalchemy.orm import Session
import models
import schemas

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):

    fake_hashed_password = user.password + "notreallyhashed" 
    
    db_user = models.User(
        full_name=user.full_name, 
        email=user.email, 
        password_hash=fake_hashed_password,
        role=user.role
    )
    db.add(db_user) 
    db.commit()     
    db.refresh(db_user) 
    return db_user

def get_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Room).offset(skip).limit(limit).all()

def create_room(db: Session, room: schemas.RoomCreate):
    db_room = models.Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def create_booking(db: Session, booking: schemas.BookingCreate, user_id: int):
    room = db.query(models.Room).filter(models.Room.id == booking.room_id).first()
    
    days = (booking.check_out_date - booking.check_in_date).days
    if days <= 0:
        days = 1 
        
    total = room.price_per_night * days
    
    db_booking = models.Booking(
        **booking.dict(), 
        user_id=user_id, 
        total_amount=total
    )
    
    room.status = "BOOKED"
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_user_bookings(db: Session, user_id: int):
    return db.query(models.Booking).filter(models.Booking.user_id == user_id).all()