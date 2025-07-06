<a name="readme-top"></a>

<div align="center">

## RESTful API for managing medical image processing 

</div>

<div align="center">

### STACK
[![Python][python-badge]][badge-empty-url]

</div>

## INIT

FastAPI-based RESTful API for managing medical image processing, stores results in PostgreSQL, and exposes CRUD endpoints with flexible filtering.

### Features
- High performance with FastAPI and ASGI  
- Data validation and serialization via Pydantic  
- ORM support using SQLAlchemy  
- Schema migrations managed by Alembic  
- Persistent storage in PostgreSQL  
- Modular architecture, clear separation of routes, models, schemas, and CRUD logic  
- Filtering on created/updated dates, averages, data size (`gt`, `lt` query params)  
- API docs (Swagger UI & ReDoc)  
- Logging of requests, responses, and errors  
- CORS enabled for frontend integration

## INIT CONF

```bash
    git clone https://github.com/ronaldtro/IMEXHS-test.git
```

Run in console 
```bash
    pip install -r requirements.txt
```
    
Configure .env 
```bash
    DATABASE_URL=postgresql://medicaldb_0xva_user:dywLYWYL3YYSa5U22QvDZgqDNKYadU66@dpg-d1jlq163jp1c73ee84rg-a.oregon-postgres.render.com/medicaldb_0xva
```

Configure alembic.ini    
```bash
    sqlalchemy.url = postgresql+psycopg2://medicaldb_0xva_user:dywLYWYL3YYSa5U22QvDZgqDNKYadU66@dpg-d1jlq163jp1c73ee84rg-a.oregon-postgres.render.com/medicaldb_0xva
```

Run in console
```bash
    alembic upgrade head
```
Run in console (Execute)    
```bash
    uvicorn app.main:app --reload
```
## Local url
API
```bash
    http://127.0.0.1:8000
```
Swagger UI
```bash
    http://127.0.0.1:8000/docs
```
ReDoc
```bash
    http://127.0.0.1:8000/redoc
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### By
[![ronaldtro](https://avatars.githubusercontent.com/u/72902488?s=64&amp;v=4)](http://github.com/ronaldtro)

[python-badge]: https://img.shields.io/badge/Python-blue?logo=python&logoColor=white
[badge-empty-url]: #!
