.PHONY: roles tasks taskrun pipeline pipelineRun namespace testEnv up
up: testEnv secret-docker roles tasks pipeline pipelineRun checkStatus test

testEnv:
	kubectl config set-context --current --namespace=tekton-pipelines

secret-docker: 		
	kubectl create secret generic omar-docker-hub-creds \
 	--from-file=.dockerconfigjson=/home/ubuntu/.docker/config.json \
 	--type=kubernetes.io/dockerconfigjson

roles:
	kubectl apply -f ./roles/ 

tasks:
	kubectl create -f ./tasks/

taskrun: 
	kubectl create -f ./taskrun/

pipeline:
	kubectl create -f ./pipelines/

pipelineRun:
	kubectl create -f ./pipelinerun/

namespace:
	kubectl create namespace test
	kubectl create namespace production

down: delete-namespaces

delete-namespaces:	
	kubectl config set-context --current --namespace=default
	kubectl delete namespace test
	kubectl	delete namespace production

logs:
	tkn pr logs --last

install-ingress:
	echo "Ingress: install" | tee -a output.log
	kubectl apply -n ingress-nginx -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml | tee -a output.log
	kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

delete-ingress:
	echo "Ingress: delete" | tee -a output.log
	kubectl delete -n ingress -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml | tee -a output.log 2>/dev/null | true

checkStatus:
	#./run.sh
	echo "waiting for the pods to be readey"
	sleep 120
	kubectl wait --namespace test --for=condition=ready pods -l name=rabbitmq --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=front-end --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=user-db --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=user --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=shipping --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=payment --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=orders-db --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=orders --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=catalogue-db --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=catalogue --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=carts-db --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=carts --timeout=900s
	kubectl wait --namespace test --for=condition=ready pods -l name=queue-master --timeout=900s


test:
	kubectl create secret generic omar-docker-hub-creds \
        --from-file=.dockerconfigjson=/home/ubuntu/.docker/config.json \
        --type=kubernetes.io/dockerconfigjson -n test
	kubectl apply -f tests/roles -n test
	kubectl create -f tests/task-run-test.yaml -n test
	kubectl create -f tests/task-build-push.yaml -n test
	kubectl create -f tests/pipeline-run-test.yaml -n test
	kubectl create -f tests/pipeline-run-test-without-yaml.yaml -n test

deploy:
	kubectl create namespace production

test-run:
	kubectl create -f tests/pipeline-run-test-without-yaml.yaml -n test
