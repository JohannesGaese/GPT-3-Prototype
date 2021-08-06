import requests


def get_href(page, key_words = []):
    response = requests.get(page)
    if response.status_code == 200:
        content = response.content.decode('iso-8859-1')
    else:
        return False

    hrefs = link_parser(content, key_words)

    return(hrefs)


def link_parser(content, key_words = []):
    links = []

    link = ''
    in_href = False

    # find all hrefs

    for index, char in enumerate(content):
        if not in_href:
            if char == '<' and content[index+1 : index+7] == 'a href':
                in_href = True
        
        if in_href:
            link += char

            if char == '<' and content[index+1 : index+4] == '/a>':
                in_href = False
                links.append(link)
                del link
                link = ''

    # format '<a href="./Teilliste_7.html" class="alphabet">7<' to {'7': "./Teilliste_7.html"}
    dic = {}

    for link in links:
        name = link[link.find('>') + 1 : link[1:].find('<') + 1]

        u_start = link.find('href')
        u_end = link[u_start:].find(' ')

        url = link[u_start + 6 : u_end + u_start - 1]

        if url.endswith('.html'):

            if  'single' in key_words:
                if len(name) == 1:
                    dic[name] = url

            else:
                dic[name] = url


    return(dic)


def main():
    sub_sites = get_href('https://www.gesetze-im-internet.de/aktuell.html', key_words= ['single'])
    for site in sub_sites:
        print(site + ': ' + sub_sites[site])

    
if __name__ == "__main__":
    main()








