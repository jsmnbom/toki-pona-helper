.PHONY: clean build deploy

clean:
	rm -rf dist/*

build:
	npm run build

deploy:
	cd dist && \
	git add --all && \
	git commit -m "Build output as of $(git log '--format=format:%H' master -1)" && \
	git push origin gh-pages
