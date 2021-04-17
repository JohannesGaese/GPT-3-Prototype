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

soup = bs(page.content, 'html.parser')

#Scrape Website
gesetz = soup.find_all('div', class_='article-header')
for gesetz in gesetz:
    category = str(gesetz.find('p', class_='dachzeile').getText())
    title = str(gesetz.find('h1', class_='isFirstInSlot').getText())

gesetztexte = soup.find_all('div', class_='article-text')
for gesetztext in gesetztexte:
    date = str(gesetztext.find('span', class_='value').getText())
    desc = str(gesetztext.find('p').getText())

all_data = [category.replace('\n','').strip(), title.replace('\xad', '').replace('\n', '').strip(), date.replace('\n', '').strip(), desc.replace('\n', '').strip()]

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

#getting the important pages robin
gesetzgebung_content = []

pageObj1 = pdfReader.getPage(0)
pageObj2 = pdfReader.getPage(4)
pageObj3 = pdfReader.getPage(5)

text1 = pageObj1.extractText()
text2 = pageObj2.extractText()
text3 = pageObj3.extractText()

gesetzgebung_content.append(text1)
gesetzgebung_content.append(text2)
gesetzgebung_content.append(text3)

#getting the important page lukas
artikel_lukas = []
pageObjLukas = pdfReader.getPage(31)
textLukas = pageObjLukas.extractText()
artikel_lukas.append(textLukas)

saved_pdf.close()

#turn robins list back into string
gesetzgebung_content_str = ' '.join([str(elem) for elem in gesetzgebung_content])
clean_text = re.sub('-', '', gesetzgebung_content_str)

#new list of robin where every word has its own index
def Convert(string):
    li = list(string.split(" "))
    return li

gesetzgebung_content_w_by_w = Convert(clean_text)

#turn lukas list back into string
artikel_lukas_str = ' '.join([str(elem) for elem in artikel_lukas])
clean_text_lukas = re.sub('-', '', artikel_lukas_str)

lukas_w_by_w = Convert(clean_text_lukas)

#get the introduction
referentenentwurf_start = gesetzgebung_content_w_by_w.index("\nReferentenentwurf\n")
referentenentwurf_end = gesetzgebung_content_w_by_w.index("\nA.")
introduction = gesetzgebung_content_w_by_w[referentenentwurf_start:referentenentwurf_end]

artikelliste_gesetzentwurf = []
#get the articles first part
artikelliste_first_part = gesetzgebung_content_w_by_w.index("\nInhaltsübersicht\n")
def_artikelliste_start = artikelliste_first_part - 7
this_part_end = gesetzgebung_content_w_by_w.index("\n1\n")
articles_first_part = gesetzgebung_content_w_by_w[def_artikelliste_start:this_part_end]

#print(gesetzgebung_content)

#get the articles first part
artikelliste_second_part = gesetzgebung_content_w_by_w.index("\nWeitere")
def_artikelliste_second_part = artikelliste_second_part - 2
the_other_part_end = gesetzgebung_content_w_by_w.index("\nInkrafttreten\n")
articles_second_part = gesetzgebung_content_w_by_w[artikelliste_second_part:def_artikelliste_second_part]

#part lukas
part_lukas_start = lukas_w_by_w.index("10\n")
part_lukas_start_def = part_lukas_start - 1
part_lukas_end = lukas_w_by_w.index("338c")
part_lukas_end_def = part_lukas_end + 5
part_lukas = lukas_w_by_w[part_lukas_start_def:part_lukas_end_def]
part_lukas_str = ' '.join([str(elem) for elem in part_lukas])
print(part_lukas_str)

'''
relevant variables

Main Data (is = variable):
Category = category
Title = title
Date = date
Description (on website) = desc
Array with all of the data above = all_data

PDF
Link to PDF = file_source
PDF text as string = clean_text
PDF text as list = gesetzgebung_content_w_by_w

Data Scraper Robin
Referentenentwurf (1st page) = introduction
Artikel = folgt (noch nicht fertig)

Data Lukas
Artikel von Lukas = part_lukas
'''