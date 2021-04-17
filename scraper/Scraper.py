#pip install beautifulsoup4
#pip install wget

import requests
from bs4 import BeautifulSoup as bs
import re
import urllib
import urllib.request
import PyPDF2

#Open Website
URL = 'https://www.bundesfinanzministerium.de/Content/DE/Gesetzestexte/Gesetze_Gesetzesvorhaben/Abteilungen/Abteilung_VII/19_Legislaturperiode/2021-03-24-Schwarmfinanzierung-BegleitG/0-Gesetz.html'
page = requests.get(URL)
print("hallo")
soup = bs(page.content, 'html.parser')

#Scrape Website
gesetze = soup.find_all('div', class_='article-header')
for gesetz in gesetze:
    category = str(gesetz.find('p', class_='dachzeile').getText())
    title = str(gesetz.find('h1', class_='isFirstInSlot').getText())

gesetztexte = soup.find_all('div', class_='article-text')
for gesetztext in gesetztexte:
    date = str(gesetztext.find('span', class_='value').getText())
    desc = str(gesetztext.find('p').getText())

all_data = [category.replace('\n','').strip(), title.replace('\xad', '').replace('\n', '').strip(), date.replace('\n', '').strip(), desc.replace('\n', '').strip()]
print(all_data)

gesetztexte = soup.find_all('div', class_='article-text')
for gesetztext in gesetztexte:
    date = str(gesetztext.find('span', class_='value').getText())
    desc = str(gesetztext.find('p').getText())

#look for PDF file link
list_of_links = []
file_link = soup.find('div', {'class': 'bmf-akkordeon'})

for a in file_link.findAll('a', href=True):
    list_of_links.append(a['href'])
    regex = re.compile('\/[A-Z][a-z]+\/[A-Z]{2}\/Gesetzestexte\/Gesetze_Gesetzesvorhaben\/.*')
    possible_links = [i for i in list_of_links if regex.match(i)]

#open/create pdf file
file_source = str('https://www.bundesfinanzministerium.de/' + possible_links[0])
filename = 'gesetzesaenderung' + all_data[2] + '.pdf'

#download file
#overwrites file if there's already an existing one
get_the_pdf = requests.get(file_source)
open(filename, 'wb').write(get_the_pdf.content)

#get PDF content
saved_pdf = open(filename, 'rb')
pdfReader = PyPDF2.PdfFileReader(saved_pdf)

#getting all the pages
num_pages = pdfReader.numPages
count = 0
gesetzgebung_content = []

while count < num_pages:
    texts = " "
    pageObj = pdfReader.getPage(count)
    count += 1
    texts = pageObj.extractText()
    clean_text = re.sub('-', '', texts)
    gesetzgebung_content.append(clean_text)

#turn list back into string
gesetzgebung_content_str = ' '.join([str(elem) for elem in gesetzgebung_content])


#new list where every word has its own index
def Convert(string):
    li = list(string.split(" "))
    return li

gesetzgebung_content_w_by_w = Convert(gesetzgebung_content_str)

#print(gesetzgebung_content_w_by_w[1311:1800])

#get the introduction
referentenentwurf_start = gesetzgebung_content_w_by_w.index("\nReferentenentwurf\n")
referentenentwurf_end = gesetzgebung_content_w_by_w.index("\nA.")
print("hallo")
introduction = gesetzgebung_content_w_by_w[referentenentwurf_start:referentenentwurf_end]
introduction_str = ' '.join([str(elem) for elem in introduction])
print(introduction_str)
'''
#get the articles
artikelliste_start = gesetzgebung_content_w_by_w.index("\nInhaltsübersicht\n")
this_part_end = gesetzgebung_content_w_by_w.index("\n2019/1238\n")
def_artikelliste_start = artikelliste_start - 7
robin_lukas_first = gesetzgebung_content_w_by_w[def_artikelliste_start:this_part_end]
robin_lukas_str = ' '.join([str(elem) for elem in robin_lukas_first])

robin_lukas = Convert(robin_lukas_str)

#page1 robins scraper
page1_robin_start = robin_lukas[0]
page1_robin_end = robin_lukas.index('\nDieses')
page1_robin = robin_lukas[page1_robin_start:page1_robin_end]
print(page1_robin)
'''

'''
#page2 robins scraper
page2_robin_start = robin_lukas.index()
page2_robin_end = robin_lukas.index()
page2_robin = robin_lukas.index()

#part lukas
part_lukas_start = robin_lukas.index()
part_lukas_end = robin_lukas.index()
part_lukas = robin_lukas.index()

print(artikelliste_end)
'''
'''
relevant variables

Main Data (is = variable):
Category = category
Title = title
Date = date
Description (on website) = desc
Array with main data = all_data


PDF
Link to PDF = file_source
PDF text as string = gesetzgebung_content_str
PDF text as list = gesetzgebung_content_w_by_w


Data Scraper Robin
Referentenentwurf (1st page) = introduction
erste Seite Artikel = artikelliste_page1
'''