import bs4
import requests
from string import ascii_lowercase

import medicine

med_links = []


for i in ascii_lowercase:
    URL = f"https://www.drugs.com/alpha/{i}.html"
    page = requests.get(URL)
    soup = bs4.BeautifulSoup(page.content,'html.parser')
    med_names = soup.find('ul',class_ = 'ddc-list-column-2').text.split("\n")
    med_links = med_links + [str(a['href']) for a in soup.select('.ddc-list-column-2 a')]


url_09 = "https://www.drugs.com/alpha/0-9.html"
page = requests.get(url_09)
soup = bs4.BeautifulSoup(page.content,'html.parser')
med_names = soup.find('ul',class_ = 'ddc-list-column-2').text.split("\n")
med_links = med_links + [str(a['href']) for a in soup.select('.ddc-list-column-2 a')]





