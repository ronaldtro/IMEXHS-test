from pathlib import Path
import json
import logging
import pandas as pd
import pydicom
import matplotlib.pyplot as plt
from datetime import datetime
from typing import Optional, List, Tuple


def fmt_size(path: Path) -> str:
    return f"{path.stat().st_size / (1024*1024):.1f} MB"


def fmt_mtime(path: Path) -> str:
    return datetime.fromtimestamp(path.stat().st_mtime).strftime('%Y-%m-%d %H:%M:%S')


class FileProcessor:

    def __init__(self, base_path: str, log_file: str = "file_processor.log"):
        self.base = Path(base_path)
        logging.basicConfig(filename=log_file,
                            level=logging.ERROR,
                            format='%(asctime)s - %(levelname)s - %(message)s')
        self.log = logging.getLogger(__name__)

    def list_folder_contents(self, folder: str, details: bool = False) -> None:
        p = self.base / folder
        if not p.is_dir():
            self.log.error(f"Folder not found: {p}")
            print(f"Error: Folder '{p}' not found.")
            return

        items = list(p.iterdir())
        print(f"Folder: {p}")
        print(f"Number of elements: {len(items)}\n")

        files = [i for i in items if i.is_file()]
        dirs = [i for i in items if i.is_dir()]

        if files:
            print("Files:")
            for f in files:
                info = f"({fmt_size(f)}, Last Modified: {fmt_mtime(f)})" if details else ""
                print(f" - {f.name} {info}".rstrip())
            print()

        if dirs:
            print("Folders:")
            for d in dirs:
                print(f" - {d.name} (Last Modified: {fmt_mtime(d)})")
            print()

    def read_csv(self,
                 filename: str,
                 report_path: Optional[str] = None,
                 summary: bool = False) -> None:
        p = self.base / filename
        try:
            df = pd.read_csv(p)
        except Exception as e:
            self.log.error(f"CSV error ({p}): {e}")
            print(f"Error reading CSV: {e}")
            return

        print("CSV Analysis:")
        print(f"Columns: {json.dumps(list(df.columns))}")
        print(f"Rows: {len(df)}\n")

        nums = df.select_dtypes(include='number')
        if not nums.empty:
            print("Numeric Columns:")
            for col in nums:
                m, s = nums[col].mean(), nums[col].std()
                print(f"  - {col}: Average = {m:.1f}, Std Dev = {s:.1f}")
            print()

        if summary:
            objs = df.select_dtypes(exclude='number')
            if not objs.empty:
                print("Non‑Numeric Summary:")
                for col in objs:
                    cnt = objs[col].value_counts()
                    print(f"  - {col}: Unique Values = {cnt.size}")
                print()

        if report_path:
            rpt = Path(report_path)
            rpt.mkdir(exist_ok=True, parents=True)
            out = rpt / (p.stem + "_report.txt")
            out.write_text("CSV Summary Report\n" +
                           "\n".join(f"{c}: Average = {df[c].mean():.1f}, Std Dev = {df[c].std():.1f}"
                                     for c in nums))
            print(f"Saved summary report to {rpt}")

    def read_dicom(self,
                   filename: str,
                   tags: Optional[List[Tuple[int, int]]] = None,
                   extract_image: bool = False) -> None:
        p = self.base / filename
        try:
            ds = pydicom.dcmread(p)
        except Exception as e:
            self.log.error(f"DICOM error ({p}): {e}")
            print(f"Error reading DICOM: {e}")
            return

        print("DICOM Analysis:")
        for attr in ("PatientName", "StudyDate", "Modality"):
            print(f"{attr.replace('Patient', 'Patient ')}: {ds.get(attr, 'Unknown')}")
        print()

        if tags:
            for tag in tags:
                val = ds.get(tag, "Not found")
                print(f"Tag {tag[0]:#06x}, {tag[1]:#06x}: {val}")
            print()

        if extract_image:
            try:
                arr = ds.pixel_array
                plt.imshow(arr, cmap='gray')
                plt.axis('off')
                out = p.with_suffix('.png')
                plt.savefig(out, bbox_inches='tight', pad_inches=0)
                plt.close()
                print(f"Extracted image saved to {out}")
            except Exception as e:
                self.log.error(f"Image extraction failed: {e}")
                print(f"Error extracting image: {e}")
