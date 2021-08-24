start_services:
	docker-compose up db redis api

start:
	docker-compose up --scale socket-client=5

build:
	docker-compose up --build --scale socket-client=5

	