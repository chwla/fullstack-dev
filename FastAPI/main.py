from typing import Optional
from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel 

app = FastAPI()

# In-memory fake DB
my_posts = [{"title": "aa", "content": "bb", "id": 1}, 
            {"title": "bb", "content": "cc", "id": 2}]

# Utility function to find a post by id
def find_posts(id):
    for p in my_posts:
        if p["id"] == id:
            return p

# Root route
@app.get("/")
def root():
    return {"message": "Hello World"}

# Return all posts
@app.get("/posts")
def get_posts():
    return {"data": my_posts}

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
    rating: Optional[int] = None

# Create a new post with validation
@app.post("/posts")
def create_posts(new_post: Post):
    post_dict = new_post.dict()          # Convert Pydantic model to dict
    post_dict["id"] = len(my_posts) + 1  # Add a unique ID
    my_posts.append(post_dict)           # Save the new post to the list
    return {"data": post_dict}           # Return the created post

# Get a single post by ID
@app.get("/posts/{id}")
def get_post(id: int, response: Response):
    post = find_posts(id)
    if post:
        return {"post_detail": post}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Post with id: {id} was not found")


@app.delete("/posts/{id}")
def delete_post(id: int):
    for i, p in enumerate(my_posts):
        if p["id"] == id:
            my_posts.pop(i) 
            return {"message": "Post was successfully deleted"}
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Post with id {id} not found")
    
    
@app.put("/posts/{id}")
def update_post(id: int, updated_post: Post):
    for i, p in enumerate(my_posts):
        if p["id"] == id:
            post_dict = updated_post.dict()
            post_dict["id"] = id  # preserve original ID
            my_posts[i] = post_dict  # update the post
            return {"data": post_dict}
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Post with id {id} not found")
