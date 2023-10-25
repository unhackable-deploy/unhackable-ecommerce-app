# Unhackable eCommerce web app

This app is a very simple ecommerce web site for Unhackable Inc. 

> Note: This application is for demonstration purposes only

> :warning: ** The ecommerce web app is running a vunerable verion of Log4j ** :warning:

## Run locally
Execute the app locally vai `docker-compose`; from the root of the project:

```
docker-compose up
```



## Deployment

Deployment is handled via the `detc` tool; execute the plan corresponding to your environment (see deploy folder).

## Buidling Conatiners

    docker build -t detcaccounts/ecommerce-website -f docker/Dockerfile_ecommerce .
    docker build -t detcaccounts/ecommerce-order -f docker/Dockerfile_order-service .
    docker build -t detcaccounts/ecommerce-inventory -f docker/Dockerfile_datalayer .
    docker build -t detcaccounts/ecommerce-login -f docker/Dockerfile_datalayer .
