from typing import Optional
from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def root():
    return{"message": "Hello World"}

@app.get("/posts")
def get_posts():
    return {"data": "This is your posts"}

######################################################

@app.post("/createposts")
def create_posts(payLoad: dict = Body(...)):
    print(payLoad)
    return {"new_post": f"title {payLoad['title']} content: {payLoad['content']}"}


#with pydantic (will do the validation on its own)

class Post(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None

@app.post("/create_posts")
def create_posts2(new_post: Post):
    print(new_post)
    
    return {"data": new_post}

######################################################