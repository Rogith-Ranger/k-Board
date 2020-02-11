import requests
import random
from time import sleep
import json

header = {'Authorization': 'Token c555181087b592fb11e113eb3bc38713258109b1',
'Content-type':'application/json','Accept':'application/json'}

while True:
	event_id = random.randint(1,35)
	request_dict = {}
	request_dict['id'] = event_id
	response = requests.post("https://k-data-api.herokuapp.com/data-api/event-checkin/",data = json.dumps(request_dict),headers = header)
	print(response)
	sleep(6)