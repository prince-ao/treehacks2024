import re
CLEANR = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});') 

def cleanhtml(raw_html):
    for i in range(0,len(raw_html)):
        cleantext = re.sub(CLEANR, '', raw_html[i])
        raw_html[i] = cleantext
    return raw_html