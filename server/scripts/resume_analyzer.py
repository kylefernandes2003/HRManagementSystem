import sys
# Add the path to the directory containing the PyPDF2 module
sys.path.append('C:\\final_year_thapa\\.venv\\Lib\\site-packages')
import PyPDF2
import re
import json

def extract_info_from_resume(pdf_file):
    with open(pdf_file, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ''
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    matches = re.findall(r'[\w\.-]+@[\w\.-]+', text)
    email = matches[0] if matches else None
    phone = re.search(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})', text)
    phone = phone.group() if phone else None
    name = re.search(r'Name:(.*?)\n', text)
    name = name.group(1).strip() if name else None
    return {'name': name, 'email': email, 'phone': phone}

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python resume_analyzer.py <path_to_resume_pdf>")
        sys.exit(1)
    
    resume_path = sys.argv[1]
    # original_filename = sys.argv[2]
    
    # print("Analyzing resume:", original_filename)
    result = extract_info_from_resume(resume_path)
    print(json.dumps(result))
