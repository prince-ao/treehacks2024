import bs4
import requests
import pandas
import json

import medicine


def makeLink(link):
    return 'https://www.drugs.com' + link
    
#MEDS NAME
def makeDF():
    read_more = []
    for item in med_links:
        read_more.append(makeLink(item))
    
    data = {"names":med_names, "Read More":read_more}
    df = pandas.DataFrame(data= data)
    print(df.to_string())

all_data = []


for initial in [ # "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap",
    #"aq", "ar", "as", "at", "au", "av", "ax", "ay", "az", "ba", "bc", "bd", "be", "bi", "bl", "bo", "bp",
    #"br", "bs", "bu", "by", "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm",
"cr"]: # "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", ]:
    URL = f"https://www.drugs.com/alpha/{initial}.html"
    print(URL + " whoa" )
    page = requests.get(URL)
    print(page)
    soup = bs4.BeautifulSoup(page.content,'html.parser')
    try:
        med_names = soup.find('ul',class_ = 'ddc-list-column-2').text.split("\n")
        med_links = [str(a['href']) for a in soup.select('.ddc-list-column-2 a')]
        i = 0

        for item in med_links:
            if i == 1:
                break
            i += 1
            curr_link = makeLink(item)
            med_page = requests.get(curr_link)
            med_soup = bs4.BeautifulSoup(med_page.content,'html.parser') 
            res = medicine.explore_med(med_soup)

            all_data.append({"text": json.dumps(res)})
    except:
        ...


text_file = open("data.jsonl", "w")
text_file.write(json.dumps(all_data))
text_file.close()
