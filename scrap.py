import requests as req
import csv
import codecs as cod
import execjs as js
import adhereJS
import time

import sys  
reload(sys)  
sys.setdefaultencoding('utf8') 

jsstr = adhereJS.get_js("./vendorcopy.js")  
ctx = js.compile(jsstr)  
#print(ctx.call('a.encode',31.3, 121.3)) 

csv_file=cod.open("out3.csv", "w", "UTF-8")
writer=csv.writer(csv_file)
table={}

def spider(latitude, longitude):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'
    }
    url="https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash="+ctx.call('a.encode',latitude, longitude)+"&latitude="+str(latitude)+"&longitude="+str(longitude)+"&offset=0&terminal=web"
    content=req.get(url, headers=headers)
    try:
        json_content=content.json()
        for rst in json_content:
            table[rst['id']]=rst
    except BaseException:
        print(content.status_code)
    
    
        # print(rst['id'])
        # writer.writerow([rst['latitude'], rst['longitude'], rst['id'], rst['rating'], rst['flavors'][0][u'name']])

o_latitude=31.02
o_longitude=121.43
latitude_range=80
longitude_range=48
for dla in range(latitude_range):
    for dlo in range(longitude_range):
        spider(o_latitude, o_longitude)
        time.sleep(2)
        o_latitude=o_latitude+0.4/latitude_range
        o_longitude=o_longitude+0.24/longitude_range

#spider(31.193908,121.440641)

for id in table:
    rst=table[id]
    writer.writerow([rst['name'], rst['latitude'], rst['longitude'], rst['id'], rst['rating'], rst['flavors'][0]['name'], rst['recent_order_num'], rst['float_minimum_order_amount']])

csv_file.close()
