from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=200)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class RecipeCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    description: str = Field(default="", max_length=1200)
    cook_time: str = Field(default="", max_length=60)
    servings: int = Field(default=1, ge=1, le=1000)
    image_url: str | None = Field(default=None, max_length=500)
    tags: list[str] = Field(default_factory=list)
    ingredients: list[str] = Field(min_length=1)
    instructions: list[str] = Field(min_length=1)


class RecipePublic(BaseModel):
    id: int
    title: str
    description: str
    cook_time: str
    servings: int
    image_url: str | None = None
    tags: list[str]
    ingredients: list[str]
    instructions: list[str]
    rating: float
    created_at: datetime

