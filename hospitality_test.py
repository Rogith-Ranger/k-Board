import requests
import random
from time import sleep
import json


header = {'Authorization': 'Token c555181087b592fb11e113eb3bc38713258109b1',
'Content-type':'application/json','Accept':'application/json'}

while True:
	college_id = random.randint(1,343)
	request_dict = {}
	request_dict['id'] = college_id
	print(request_dict)
	response = requests.post("https://k-data-api.herokuapp.com/data-api/hospitality-checkin/",data = json.dumps(request_dict),headers = header)
	sleep(6)