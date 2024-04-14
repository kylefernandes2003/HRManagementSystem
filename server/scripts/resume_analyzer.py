import sys
# Add the path to the directory containing the PyPDF2 module
sys.path.append('C:\\final_year_thapa\\.venv\\Lib\\site-packages')
import PyPDF2
import re
import json

def extract_info_from_resume(pdf_file):
    with open(pdf_file, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ''.join(page.extract_text() for page in reader.pages)

    email_matches = re.findall(r'[\w\.-]+@[\w\.-]+', text)
    email = email_matches[0] if email_matches else None

    phone_matches = re.findall(r'(\d{10,})', text)  # Matches phone numbers with at least 10 digits
    phone = phone_matches[0] if phone_matches else None

    name_match = re.search(r'Name:(.*?)\n', text)
    name = name_match.group(1).strip() if name_match else None

    cgpa_match = re.search(r'CGPA\s*:?(\d+(\.\d+)?)', text, re.IGNORECASE)
    cgpa = cgpa_match.group(1) if cgpa_match else None

    return {'name': name, 'email': email, 'phone': phone, 'cgpa': cgpa}

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python resume_analyzer.py <path_to_resume_pdf>")
        sys.exit(1)
    
    resume_path = sys.argv[1]
    result = extract_info_from_resume(resume_path)
    print(json.dumps(result))
