import json
import requests
from bs4 import BeautifulSoup

def read_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
    

def parse_link(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        bill_content = soup.find(id='bill_all')
        return bill_content.get_text() if bill_content else "No content found"
    except Exception as e:
        return f"Error parsing link: {str(e)}"