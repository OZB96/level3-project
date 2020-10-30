# DevOps Bootcamp Level 3 Final Project

## About The Project
The aim of the project is to build and deploy the sockshop [Weaveworks Shock Shop demo](https://github.com/microservices-demo).

## The Project Steps:
### Step 1
Editing The Dockerfiles, so they become stand alone dockerfiles for each service, so it can build and run the service using only docker build command.
### Step 2
Creating The deplotment yaml files, so the project be ready to be deployed yo a k8s environment.
### Step 3
Creating Tekton tasks to build, push the image to the dockerhub, then deploy the application to a testing enviroment.
### Step 4
Creating an end to end test Task that tests the application.
### Step 5
Creating a task to deploy the application to a production environment.
### Step 6
Create a tekton pipeline that uses the created tasks to build, deploy to test, test, and deploy to production.
### Step 7
Create Tekton pipelineRuns for each service.

## How To Run The Application:
### Deploy The Application using Docker:
In The main path Run the command `make up` to build and run the application.
Run `make down` to stops and remove the application.
`make build` to only build the application and `make run` to only run the application.
#### Test The Application in Docker:
Run `make test` in the main path to run the load-test, which is a test that will put heavy load on diffrent url paths of the appplication.

### Deploy the application to k8s Environment:
in the main path of the project run `make deploy` to deploy the application to a k8s environment.

### Deploy The Applcaiton Using Tekton CI-CD Pipelines to Two Environments, Tesing K8S Environment and Production K8S Environment:
All you need to do is go inside tekton folder and run `make run`, note: tekton and nginx ingress need to be already installed on the running machine. In case you want to install them, first you need to create the namespaces for them and add the repos to do that run `make init`,and then to install tekton run `make install-cicd` or to install nginx ingress run `make install-ingress`.
In case you want to deploy the application in k3d, all you have to do is run `make up` which will create the cluster and install the tools and then run all of the pipelines.
Note: for Tekton pipelines to to work, docker needs to be already loged in, use `docker login -u username`, and then enter your password and thats it.

## About the project folder
each service has its own folder that contains its source code and its Dockerfile, in case the service requires a database, you can find the database dockerfile inside the path ./serviceName/docker/serviceName-db/Dockerfile<br/>
[YAML](https://github.com/OZB96/level3-project/tree/master/YAML) folder contains all the deployment and the services yaml files to deploy the application to k8s cluster.

### Inside Tekton Folder
both bash scripts run.sh and run1.sh are used to make the test waits until the all of the pods ready, and below are the important folder of the system.<br/>
[tasks](https://github.com/OZB96/level3-project/tree/master/tekton/tasks), contains the Tekton task files.<br/>
[Pipelines](https://github.com/OZB96/level3-project/tree/master/tekton/pipelines), contains the Tekton pipeline files.<br/>
[Pipelinerun](https://github.com/OZB96/level3-project/tree/master/tekton/pipelinerun), contains the Tekton pipelinerun files.<br/>
[roles](https://github.com/OZB96/level3-project/tree/master/tekton/roles), cintains the clusterRole to give the permission to tekton to be  able deploy.<br/>
[montioring](https://github.com/OZB96/level3-project/tree/master/tekton/monitoring), contains the bash files for installing elf and grafana.<br/>

Note: The Kanaban board and my notes during the project are below.
[Kanaban Board](https://github.com/OZB96/level3-project/blob/master/docs/tasks.md).
[My notes](https://github.com/OZB96/level3-project/blob/master/docs/dairy.md).
