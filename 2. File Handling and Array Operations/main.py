
from src.file_processor import FileProcessor

processor = FileProcessor(base_path="./data", log_file="./logs/errors.log")

processor.list_folder_contents("test_folder", details=True)

processor.read_csv(
    filename="sample-02-csv.csv",
    report_path="./reports",
    summary=True
)

processor.read_dicom(
    filename="sample-02-dicom-2.dcm",
    # filename="image6.dcm",
    tags=[(0x0010, 0x0010), (0x0008, 0x0060)],
    extract_image=True
)