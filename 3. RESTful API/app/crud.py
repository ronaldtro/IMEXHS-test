from sqlalchemy.orm import Session
from . import models, utils

def get_or_create_device(db: Session, name: str):
    device = db.query(models.Device).filter_by(name=name).first()
    if not device:
        device = models.Device(name=name)
        db.add(device)
        db.commit()
        db.refresh(device)
    return device

def create_result(db: Session, image_obj):
    raw_data = utils.flatten_and_parse(image_obj.data)
    norm_data = utils.normalize_data(raw_data)

    result = models.MedicalImageResult(
        id=image_obj.id,
        device_id=get_or_create_device(db, image_obj.deviceName).id,
        avg_before_norm=utils.average(raw_data),
        avg_after_norm=utils.average(norm_data),
        data_size=len(raw_data),
    )

    db.add(result)
    db.commit()
    db.refresh(result)
    return result

def get_all_results(db: Session, filters: dict = {}):
    query = db.query(models.MedicalImageResult)

    for field, value in filters.items():
        col = getattr(models.MedicalImageResult, field, None)
        if col and isinstance(value, dict):
            if "gt" in value and value["gt"] is not None:
                query = query.filter(col > value["gt"])
            if "lt" in value and value["lt"] is not None:
                query = query.filter(col < value["lt"])
    return query.all()

def get_result(db: Session, result_id: str):
    return db.query(models.MedicalImageResult).filter_by(id=result_id).first()

def update_result(db: Session, result_id: str, new_id: str = None, new_device: str = None):
    result = get_result(db, result_id)
    if not result:
        return None
    if new_id:
        result.id = new_id
    if new_device:
        result.device_id = get_or_create_device(db, new_device).id
    db.commit()
    return result

def delete_result(db: Session, result_id: str):
    result = get_result(db, result_id)
    if not result:
        return None
    db.delete(result)
    db.commit()
    return True
