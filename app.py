from bottle import Bottle, run, template
import functools


# [__VARIABLES__]

data = {
    'author_target': '#div1786 > div, #div3795 > div, #div4681 > div',
    'author_test': '.pica-results',
    'newsrooms': {
        'spec': {
            'site': 'thespec',
            'region': 'hamilton',
            'authors': [
                {'name': 'Andrew Dreschel', 'guid': 'bfa7bf9e-9f9e-4b10-aa9e-b1d3032af5aa', 'file_name': 'ad'},
            ]
        },
        'rec': {
            'site': 'thespec',
            'region': 'hamilton',
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
}


# [__HELPER FUNCTIONS__]


# def encode_this(s):
#     return s.replace(' ', '-').lower()


# def template_reg(s):
#     return f''''''


# def addon(s):
#     return f''''''


# [__MAIN __]

app = Bottle()

name = "Fred"

@app.route('/hello')
def hello():
    return template('test.html', name=name)


run(app, host='localhost', port=8080, debug=True, reloader=True)