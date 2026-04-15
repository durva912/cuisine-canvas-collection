from __future__ import annotations

from urllib.parse import urlparse

import psycopg
from psycopg import sql

from .config import settings


def _db_name_from_url(database_url: str) -> str:
    parsed = urlparse(database_url.replace("postgresql+psycopg://", "postgresql://", 1))
    return (parsed.path or "").lstrip("/") or "postgres"


def _server_admin_url(database_url: str) -> str:
    parsed = urlparse(database_url.replace("postgresql+psycopg://", "postgresql://", 1))
    admin_path = "/postgres"
    return parsed._replace(path=admin_path).geturl()


def ensure_database_exists() -> None:
    """
    Ensure the target DB exists.

    This avoids requiring `createdb`/`psql` on PATH for local dev.
    """
    target_db = _db_name_from_url(settings.database_url)
    admin_url = _server_admin_url(settings.database_url)

    with psycopg.connect(admin_url, autocommit=True) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (target_db,))
            exists = cur.fetchone() is not None
            if not exists:
                cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_db)))

