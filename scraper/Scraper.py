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
gesetzgebung_orbin = []
gesetzgebung_robin = []

pageObj1 = pdfReader.getPage(0)
pageObj2 = pdfReader.getPage(4)
pageObj3 = pdfReader.getPage(5)

text1 = pageObj1.extractText()
text2 = pageObj2.extractText()
text3 = pageObj3.extractText()

gesetzgebung_content.append(text1)
gesetzgebung_orbin.append(text2)
gesetzgebung_robin.append(text3)

#getting the important page lukas
artikel_lukas = []
pageObjLukas = pdfReader.getPage(31)
textLukas = pageObjLukas.extractText()
artikel_lukas.append(textLukas)

saved_pdf.close()

#turn robins lists back into string
gesetzgebung_content_str = ' '.join([str(elem) for elem in gesetzgebung_content])
clean_text = re.sub('-', '', gesetzgebung_content_str)
gesetzgebung_orbin_str = ' '.join([str(elem) for elem in gesetzgebung_orbin])
clean_text_or = re.sub('-', '', gesetzgebung_orbin_str)
gesetzgebung_robin_str = ' '.join([str(elem) for elem in gesetzgebung_robin])
clean_text_ro = re.sub('-', '', gesetzgebung_robin_str)

#new list of robin where every word has its own index
def Convert(string):
    li = list(string.split(" "))
    return li

gesetzgebung_content_w_by_w = Convert(clean_text)
gg_or = Convert(clean_text_or)
gg_ro = Convert(clean_text_ro)

#turn lukas list back into string
artikel_lukas_str = ' '.join([str(elem) for elem in artikel_lukas])
clean_text_lukas = re.sub('-', '', artikel_lukas_str)

lukas_w_by_w = Convert(clean_text_lukas)

#get the introduction
referentenentwurf_start = gesetzgebung_content_w_by_w.index("\nReferentenentwurf\n")
referentenentwurf_end = gesetzgebung_content_w_by_w.index("\nA.")
introduction = gesetzgebung_content_w_by_w[referentenentwurf_start:referentenentwurf_end]

#get the articles first part
lr1 = gg_or.index("\nInhaltsübersicht\n")
lr1_start = lr1 - 7
lr1_end = gg_or.index("Umlegung")
lr1_final = lr1_end + 6
articles_first_part = gg_or[lr1_start:lr1_final]

#get the articles second part
lr2 = gg_ro.index("\nWeitere")
lr2_start = lr2 - 2
lr2_end = gg_ro.index("\nInkrafttreten\n")
lr2_final = lr2_end + 1
articles_second_part = gg_ro[lr2_start:lr2_final]

articles_first_part_str = ' '.join([str(elem) for elem in articles_first_part])
articles_second_part_str = ' '.join([str(elem) for elem in articles_second_part])

al_ge_str = articles_first_part_str + articles_second_part_str
artikelliste_gesetzentwurf = Convert(al_ge_str)


#part lukas
part_lukas_start = lukas_w_by_w.index("10\n")
part_lukas_start_def = part_lukas_start - 1
part_lukas_end = lukas_w_by_w.index("338c")
part_lukas_end_def = part_lukas_end + 5
part_lukas = lukas_w_by_w[part_lukas_start_def:part_lukas_end_def]

'''
relevant variables

Main Data (is = variable):
Category = category
Title = title
Date = date
Description (on website) = desc
Array with all of the data above = all_data

Data Scraper Robin
Referentenentwurf (1st page) = introduction
Artikel = artikelliste_gesetzentwurf

Data Lukas
Artikel von Lukas = part_lukas
'''

#Print statements
print("Title: "+ "\n" + all_data[1] + "\n")
print("Date of Publication: "+ "\n" + all_data[2] + "\n")
print("Category: "+ "\n" + all_data[0] + "\n")

print("Hyperlink: "+ "\n" + file_source + "\n")

'''
#Add the changes into a 
vari = open("pythonvariables.js", "w")
vari.write(
"var LawCat = "
"var LawTitle = "
"var LawDate = "
"var LawDesc = "

"var LawPdfDesc = "
"var LawPdf = "

"var LawArticle = "
)
vari.close()

vari = open("pythonvariables.js", "r")
print(var.read())
'''