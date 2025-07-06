from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from . import schemas, crud, database
import logging

router = APIRouter()

logger = logging.getLogger(__name__)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/api/elements/")
def create_elements(payload: schemas.BulkPayload, db: Session = Depends(get_db)):
    results = []
    for key, image in payload.root.items():

        if crud.get_result(db, image.id):
            raise HTTPException(
                status_code=409,
                detail=f"Element with id '{image.id}' already exists."
            )
        try:
            result = crud.create_result(db, image)
            results.append(result)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
    return {"created": len(results)}


@router.get("/api/elements/", response_model=list[schemas.ImageResultOut])
def list_elements(
    db: Session = Depends(get_db),
    avg_before_norm_gt: float = None,
    avg_before_norm_lt: float = None,
    created_date_gt: str = None,
    data_size_gt: int = None,
):

    filters = {
        "avg_before_norm": {"gt": avg_before_norm_gt, "lt": avg_before_norm_lt},
        "created_date": {"gt": created_date_gt},
        "data_size": {"gt": data_size_gt}
    }
    return crud.get_all_results(db, filters)


@router.get("/api/elements/{id}/", response_model=schemas.ImageResultOut)
def get_element(id: str, db: Session = Depends(get_db)):

    result = crud.get_result(db, id)
    if not result:
        raise HTTPException(status_code=404, detail="Not found")
    return result


@router.put("/api/elements/{id}/")
def update_element(id: str, payload: schemas.UpdatePayload, db: Session = Depends(get_db)):

    updated = crud.update_result(db, id, payload.id, payload.device_name)
    if not updated:
        raise HTTPException(status_code=404, detail="Not found")
    return {"status": "updated"}


@router.delete("/api/elements/{id}/")
def delete_element(id: str, db: Session = Depends(get_db)):

    deleted = crud.delete_result(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Not found")
    return {"status": "deleted"}
