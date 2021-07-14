#docker exec -it feedback-module npm test

test : 
	docker exec -it feedback-module npm test

build:
	docker exec -it feedback-module  npm run build 
	cp feedback-module/build/main.js uswds-practice/public/feedback-module.min.js
	cp -R feedback-module/build/locales uswds-practice/public/
	cp -R feedback-module/build/static  uswds-practice/public/
	cp feedback-module/build/main.css uswds-practice/public/main.css
	# cp feedback-module/build/main.js homepage/feedback-module.min.js
	# cp -R feedback-module/build/locales homepage/
	# cp -R feedback-module/build/static  homepage/
	# cp feedback-module/build/main.css homepage/main.css