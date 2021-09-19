BINARY=docker

docker:
	docker build -t ghcr.io/jiramot/express-oauth2-sso-web:latest . --no-cache

push:
	docker push ghcr.io/jiramot/express-oauth2-sso-web:latest

run:
	docker run -it --rm -p 3000:3000 ghcr.io/jiramot/express-oauth2-sso-web:latest

.PHONY: docker push
