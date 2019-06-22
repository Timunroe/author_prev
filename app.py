from bottle import template

# [__VARIABLES__]

data_newsrooms = {
    'spec': {
        'site': 'thespec',
        'region': 'hamilton',
        'authors': [
            {'name': 'Andrew Dreschel', 'uid': 'bfa7bf9e-9f9e-4b10-aa9e-b1d3032af5aa', 'file_name': 'ad'},
            {'name': 'Teviah Moro', 'uid': 'f66f2aee-9643-4ef3-8691-03117aa544cd', 'file_name': 'tm'},
        ]
    },
    'rec': {
        'site': 'thespec',
        'region': 'waterlooregion',
    },
    'star': {
        'site': 'thespec',
        'region': 'hamilton',
    },
    'wires': {
        'site': 'thespec',
        'region': 'hamilton',
        'authors': [
            {'name': 'Cydney Henderson', 'guid': '0a7ff3dd-00bb-4df2-8c9e-bec454f7153f', 'file_name': 'usatoday_ch'},
        ]
    }
}


# [__HELPER FUNCTIONS__]


def author_template(data):
    # data is data_newsrooms['site']
    #  data['site'] = 'thespec', data['region'] = 'hamilton'
    tpl_file = 'author.tpl'
    for author in data['authors']:
        tpl_data = {
            'site': data['site'],
            'region': data['region'],
            'target_selector': '#div1786 > div, #div3795 > div, #div4681 > div',
            'test_selector': 'pica-results',
            'url': f'''https://api.zuza.com/search/article/default?guid={author['uid']}&pageIndex=1&location={data['region']}&sort=datedesc&pageSize=15&startindex=1&endindex=5''',
            'uid': author['uid'],
            'name': author['name'],
            'name_encode': encode_this(author['name'])
        }
        print(template('author.tpl', tpl_data=tpl_data))
        print("=========\n")
    return


def encode_this(s):
    # need to remove non-asii characters such as accented e
    return s.replace(' ', '-').replace("'", " ").lower()


# def template_reg(s):
#     return f''''''


# def addon(s):
#     return f''''''


# [__MAIN __]

# input = newsroom, template
# template function(data_newsroom[newsroom)
# loop over items in a newsroom, create .js file needed
author_template(data_newsrooms['spec'])
