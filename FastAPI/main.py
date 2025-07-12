from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from pydantic import BaseModel 
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from dotenv import load_dotenv
import os
from . import models
from .database import engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy import String


load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Utility function to find a post by id
def find_posts(id):
    for p in my_posts:
        if p["id"] == id:
            return p

# Root route
@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get('/sqlalchemy')
def test_posts(db: Session = Depends(get_db)):
    
    posts = db.query(models.Post).all()
    return{"data": posts}

# Return all posts
@app.get("/posts")
def get_posts():
    cursor.execute("""SELECT * FROM posts """)
    posts = cursor.fetchall()
    return {"data": posts}

######################################################

# Example of receiving raw body without validation (not recommended)
# @app.post("/createposts")
# def create_posts2(payLoad: dict = Body(...)):
#     print(payLoad)
#     return {"new_post": f"title {payLoad['title']} content: {payLoad['content']}"}

# With Pydantic (will do validation automatically)
class Post(BaseModel):
    title: str
    content: str
    published: bool = True

# Create a new post with validation
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(new_post: Post):
    cursor.execute(
        """
        INSERT INTO posts (title, content, published)
        VALUES (%s, %s, %s)
        RETURNING *;
        """,
        (new_post.title, new_post.content, new_post.published)
    )
    post = cursor.fetchone()
    conn.commit()
    return {"data": post}
       

# Get a single post by ID
@app.get("/posts/{id}")
def get_post(id: int, response: Response):
    cursor.execute("""SELECT * FROM posts WHERE id = %s """, (str(id),))
    post = cursor.fetchone()
    if post:
        return {"post_detail": post}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Post with id: {id} was not found")


@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    try:
        cursor.execute("DELETE FROM posts WHERE id = %s RETURNING *", (str(id),))
        deleted_post = cursor.fetchone()
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    if deleted_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} not found")

    return Response(status_code=status.HTTP_204_NO_CONTENT)
 
@app.put("/posts/{id}")
def update_post(id: int, post: Post):
    try: 
        cursor.execute("""UPDATE posts SET title = %s, content = %s, published= %s WHERE id =%s  RETURNING *""", (post.title, post.content, post.published, str(id),))
        
        updated_post = cursor.fetchone()
        conn.commit()
    except Exception as e:
       raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    if updated_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")

    return {"data", updated_post}


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