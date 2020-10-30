#Those are my notes during the project period:
## Day 1:
I started learn more about  the project, and what is required from me to do and i started searching and reading the different way and solutions to deploy the application. Also I started to go through the files of the application and see the instructions on how to build each service. After that I started editing the existed dockerfiles for each service, because the original dockerfile was just for running the service, they used a bash script to build the image. Therefore, instead of using bash scripts i made the dockerfiles a multi staged dockerfile, So it can build and run the service all in the same file. I finished editing all the micro-services except user and carts.

## Day 2:
On this day, I spent much of the time editing and investigating a weird error, that exist in the cart microservice. I solved this issue by using an old version of the cart service. I tried different approaches I changed some of the plugins versions on the pom.xml, but nothing worked, so i used an older working version. Then I started creating the makefile to build and run the images (using docker so far). After that I started to edit the load-test image, I found out that it is using an old version of locust which is an application that used to test the load in an application. I first tried to look up for that specific version, but unfortunately i was not able to find it. Therefore, I started changing the code of that config file and changing the code of the bash file which run the test. At the end of the day I successfully ran all the images in docker and be able to test them using the load-test image.

## Day 3:
In this day, I started using tekton, I created the first task which is for building and pushing the images to the dockerhub. ِAlso, In this day I  started Editing the yaml files, that I found in the application repository [https://github.com/microservices-demo/microservices-demo/tree/master/deploy/kubernetes/manifests](here). I also created a tekton task that deploy application to k8s.

## Day 4:
In this day, I started creating the pipelines, First I created a pipeline that build and deploy the service. Then I found out that some services have to be deployed along with their databases. There for I created another pipeline for those services. After that I also found that some images their databases does not have data, such as orders-db, so I created another  pipeline for it, I Also created a pipeline just for the front-end, do it can deploy the application with ingress.

## Day 5:
In this day, I just started creating a pipelineRun for each service, so i can pass the right values for the pipeline parameters. At the end of this day i was able to deploy the application to k8s cluster using tekton.

## Day 6 -8:
I started editing the code of the e2e-js-test, I was able to run the test easly on the cluster, but i found some bugs in the code, so I started debugging and changing some of the code, I was able to fix most of the issues, but I spent almost two days investigating a problem related to checkout process, I used a method in CasperJS which allows me to take a screenshot and I found out the problem was that the login process inside the checkout have some problems, first I thought it is not the problem I thought that CasperJS has a problem related to maintaining the session, so I investigated more until I coped the login process from login_test file and use  it instead of using this login process, and it finally worked.

## Day 8-9:
At the end of the eighth  day, I was able to finally run the test, I then started creating a bash script that wait the pods to be ready, first I used to use the command `kubectl get pods -n test | grep Running` to get the running instances and then pipe that results to cut until i end up with ready colomn, then it check if it is eather (1/1 or 2/2) it pass otherwise it waits. It worked, but later I found that there is much simpler and more efficient solution which is using `kubectl wait` to wait for the pods to be ready. You can find both scripts in tekton, in the names run.sh and run1.sh.

## Day 10:
In this day, I created  the task that test the application, and creating the task that deploy the whole system to the production. Also I started adding the tasks to the pipelines.

## Day 11:
In this day, I found that the system is not working. It reaches the test then it fails, so it does not reach the deployment process, I communicated with the instructor on how should I processed, see the problem was my pipeline before it start testing it was running my bash script, so it waits for the other services to be ready then it is processed, it worked as I intended but the problem was the test task starts for each service started to work at the same time. Therefore, all of them failed. After I talked with the instructor, I found that each service should not wait for the others only wait for itself. I did that, and Also since this is the case, I changed my deploy to the production task, instead of deploying a single task, I made it deploy the whole project the moment the test passes.
At the end of this day I created a makefile that allows the user to run the whole thing and deleting the whole thing.

## Day 12-14:
I tried to install ELF, using diffrent ways, but at the end I used the same way I installed it in Project 2. Also Then I did the same thing and installed Prometheus and Grafana the same way. I also started playing with them

