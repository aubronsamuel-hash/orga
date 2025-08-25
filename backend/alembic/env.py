from __future__ import annotations

import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool

from alembic import context

config = context.config

fileConfig(config.config_file_name)  # type: ignore[arg-type]

target_metadata = None

def run_migrations_offline() -> None:
    dsn = os.environ.get("DB_DSN", "sqlite:///./orga_dev.db")
    url = dsn
    context.configure(
        url=url,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    section = config.get_section(config.config_ini_section) or {}
    dsn = os.environ.get("DB_DSN", "sqlite:///./orga_dev.db")
    section["sqlalchemy.url"] = dsn
    connectable = engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
