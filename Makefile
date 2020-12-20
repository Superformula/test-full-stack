.PHONY: start
start:
	@docker-compose build web && docker-compose up

.POHNY: test
test:
	@docker-compose exec web pytest .
