start_services:
	docker-compose up db redis api

start:
	docker-compose up --scale socket-client=3 --scale socket-2-client=3

build:
	docker-compose up --build --scale socket-client=3 --scale socket-2-client=3

	