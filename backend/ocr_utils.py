import easyocr
import os
from pdf2image import convert_from_path

# Initialize EasyOCR
reader = easyocr.Reader(['en', 'hi', 'mr'])  # add Hindi/Marathi support if needed

POPPLER_PATH = r"D:\Users\poppler-25.07.0\Library\bin"

def extract_text_from_file(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()

    if ext in [".png", ".jpg", ".jpeg"]:
        # Direct OCR for images
        results = reader.readtext(file_path, detail=0)
        return "\n".join(results)

    elif ext == ".pdf":
        # Convert PDF pages → images
        pages = convert_from_path(file_path, dpi=300, poppler_path=POPPLER_PATH)
        all_text = []
        for i, page in enumerate(pages):
            temp_img = f"temp_page_{i}.png"
            page.save(temp_img, "PNG")
            results = reader.readtext(temp_img, detail=0)
            all_text.append("\n".join(results))
            os.remove(temp_img)  # cleanup
        return "\n\n".join(all_text)

    else:
        return "Unsupported file type"
    


