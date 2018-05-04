import codecs as cod
import execjs as js

import sys  
reload(sys)  
sys.setdefaultencoding('utf8') 

def get_js(filename):  
    f = cod.open(filename, 'r', 'UTF-8')  
    line = f.readline()  
    htmlstr = ''  
    while line:  
        htmlstr = htmlstr + line  
        line = f.readline()  
    f.close()
    return htmlstr  
  
# jsstr = get_js("./vendorcopy.js")  
# ctx = js.compile(jsstr)  
# print(ctx.call('a.encode',31, 121))    