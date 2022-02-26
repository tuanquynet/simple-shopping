# simple-shopping
This is just a simple demo for demonstration concepts of microservices.

## Setup development environment
- Install docker. Please refer to https://docs.docker.com/engine/install/
- Install docker compose. https://docs.docker.com/compose/install/

## Technical solution
- Containerization with docker
- API and Microservices Framework: Looback Framework. Please refer to https://loopback.io/
- Database MongoDB
- Messaging Rabbitmq

## Test
- open terminal and go to project folder
- run: `bash _devtools/run-n-test.sh`

* To clean up after test
- run `bash _devtools/clean-up-test-env.sh`

## Run locally
- open terminal and go to project folder
- run: `bash _devtools/start-dev.sh`

### Check api using curl
- First steps:
  - create category: `bash _devtools/curl/01-create-category.sh`
  - create branch: `bash _devtools/curl/02-create-branch.sh`
- Manipulate products:
  - create product: `bash _devtools/curl/03-create-product.sh`
  - get product: `bash _devtools/curl/04-get-product.sh`
  - list all products: `bash _devtools/curl/06-list-product.sh`
  - search products: `bash _devtools/curl/07-search-product-by-name.sh`
  - delete products: `bash _devtools/curl/05-delete-product.sh`

## Open API Explorer
### Product API
- open browser
- enter the url: http://localhost:3000

## Clean up dev
- run `bash _devtools/clean-up-dev.sh`