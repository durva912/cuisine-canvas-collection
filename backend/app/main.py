from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .db import Base, engine
from .init_db import ensure_database_exists
from .routers.auth import router as auth_router
from .routers.recipes import router as recipes_router


def create_app() -> FastAPI:
    app = FastAPI(title="CuisineCanvas API", version="0.1.0")

    configured_origins = {o.strip() for o in settings.cors_origins.split(",") if o.strip()}
    # Keep common local frontend ports allowed during development.
    configured_origins.update(
        {
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:8080",
            "http://127.0.0.1:8080",
        }
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=sorted(configured_origins),
        allow_origin_regex=r"^http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+$",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health():
        return {"ok": True}

    app.include_router(auth_router)
    app.include_router(recipes_router)

    @app.on_event("startup")
    def _startup():
        ensure_database_exists()
        Base.metadata.create_all(bind=engine)

    return app


app = create_app()

