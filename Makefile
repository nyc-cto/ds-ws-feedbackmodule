#docker exec -it feedback-module npm test

test : 
	docker exec -it feedback-module npm test

build:
	docker exec -it feedback-module  npm run build 
	cp feedback-module/build/main.js homepage/feedback-module.min.js
	cp -R feedback-module/build/locales homepage/
	cp -R feedback-module/build/static  homepage/
	cp feedback-module/build/main.css homepage/main.css

