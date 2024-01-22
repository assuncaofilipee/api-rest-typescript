container_name := api-rest-typescript

env:
	cp .env.sample .env
up:
	docker-compose up --build
down:
	docker-compose down --volume --remove-orphans
logs:
	docker-compose logs -f $(container_name)
test:
	docker exec -it $(container_name) yarn test