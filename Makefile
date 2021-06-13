init:
	yarn
	@make setup
	@make install
	@make login
	@#make config
setup:
	npm_config_yes=true npx shx cp -u ./apps/server/functions/.env.example ./apps/server/functions/.env
	npm_config_yes=true npx shx cp -u ./apps/client/app.example.json ./apps/client/app.json
	npm_config_yes=true npx shx cp -u ./apps/client/app.example.json ./apps/client/app.dev.json
	npm_config_yes=true npx shx cp -u ./apps/client/app.example.json ./apps/client/app.web.json
	npm_config_yes=true npx shx cp -u ./apps/server/config/firebase.example.json ./apps/server/config/firebase.dev.json
	npm_config_yes=true npx shx cp -u ./apps/server/config/firebase.example.json ./apps/server/config/firebase.prod.json
	npm_config_yes=true npx shx cp -u ./apps/server/config/firebase-service-account.example.json ./apps/server/config/firebase-service-account.dev.json
	npm_config_yes=true npx shx cp -u ./apps/server/config/firebase-service-account.example.json ./apps/server/config/firebase-service-account.prod.json
install:
	docker-compose -f infra/docker-compose.yml up -d
	docker-compose -f infra/docker-compose.yml exec firebase yarn setup
serve:
	docker-compose -f infra/docker-compose.yml exec firebase yarn serve

up:
	@make install
	@make serve
stop:
	docker-compose -f infra/docker-compose.yml stop
down:
	docker-compose -f infra/docker-compose.yml down --remove-orphans
restart:
	@make down
	@make up

login:
	docker-compose -f infra/docker-compose.yml exec firebase firebase login --no-localhost
config:
	docker-compose -f infra/docker-compose.yml exec firebase yarn config:get
export:
	docker-compose -f infra/docker-compose.yml exec firebase firebase emulators:export data

client-web:
	yarn --cwd apps/client start:web
client-dev:
	yarn --cwd apps/client start:dev
client:
	yarn --cwd apps/client start
