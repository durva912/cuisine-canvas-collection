from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Recipe
from ..schemas import RecipeCreateRequest, RecipePublic

router = APIRouter(prefix="/recipes", tags=["recipes"])


@router.get("", response_model=list[RecipePublic])
def list_recipes(db: Session = Depends(get_db)):
    return db.query(Recipe).order_by(Recipe.created_at.desc()).all()


@router.post("", response_model=RecipePublic, status_code=status.HTTP_201_CREATED)
def create_recipe(payload: RecipeCreateRequest, db: Session = Depends(get_db)):
    recipe = Recipe(
        title=payload.title.strip(),
        description=payload.description.strip(),
        cook_time=payload.cook_time.strip(),
        servings=payload.servings,
        image_url=payload.image_url,
        tags=[t.strip() for t in payload.tags if t.strip()],
        ingredients=[i.strip() for i in payload.ingredients if i.strip()],
        instructions=[step.strip() for step in payload.instructions if step.strip()],
    )
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe
