from fastapi import FastAPI
from . import routes, models, database
import logging

logging.basicConfig(level=logging.INFO)

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Medical Image API")
app.include_router(routes.router)