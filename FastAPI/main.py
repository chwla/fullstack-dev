from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel 
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from dotenv import load_dotenv
import os
from . import models, schemas
from .database import engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy import String


load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Root route
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get('/sqlalchemy')
def test_posts(db: Session = Depends(get_db)):
    
    posts = db.query(models.Post).all()
    return posts

# Return all posts
@app.get("/posts", response_model = List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    
    posts = db.query(models.Post).all()
    return posts

######################################################

# Example of receiving raw body without validation (not recommended)
# @app.post("/createposts")
# def create_posts2(payLoad: dict = Body(...)):
#     print(payLoad)
#     return {"new_post": f"title {payLoad['title']} content: {payLoad['content']}"}

# With Pydantic (will do validation automatically)

# Create a new post with validation
@app.post("/posts", status_code=status.HTTP_201_CREATED, response_model = schemas.Post)
def create_posts(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return post
       

# Get a single post by ID
@app.get("/posts/{id}", response_model = schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    print(post)

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
    return post

@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == id)

    if post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} not found")
        
    post.delete(synchronize_session = False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
 
@app.put("/posts/{id}", response_model = schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db)):
    
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()
    
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")

    post_query.update(updated_post.dict(), synchronize_session = False)
    db.commit()
    return post_query.first()


while True:
    try: 
        conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        cursor_factory=RealDictCursor
        )
        cursor = conn.cursor()
        print("Database connection was successful")
        break
    except Exception as error:
        print("Connecting to Database failed")
        print("Error: ", error)
        time.sleep(2)