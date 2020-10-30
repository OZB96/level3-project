.PHONY: roles tasks taskrun pipeline pipelineRun namespace testEnv up
up: cluster-up init logging monitoring install-cicd install-ingress namespace testEnv secret-docker roles tasks pipeline pipelineRun

run: namespace testEnv secret-docker roles tasks pipeline pipelineRun

logging:
	. ./monitoring/elf/elf.sh	

monitoring:
	. ./monitoring/grafana/pro-graf.sh

install-cicd:
	echo "cicd: install" | tee -a output.log
	kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
	kubectl apply -f https://storage.googleapis.com/tekton-releases/dashboard/latest/tekton-dashboard-release.yaml
	kubectl patch svc tekton-dashboard -n tekton-pipelines --type='json' -p '[{"op":"replace", "path":"/spec/type", "value":"NodePort"}]'
	kubectl apply -f https://raw.githubusercontent.com/tektoncd/catalog/master/task/git-clone/0.2/git-clone.yaml

delete-cicd:
	echo "cicd: delete" | tee -a output.log
	kubectl delete -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
	kubectl delete -f https://storage.googleapis.com/tekton-releases/dashboard/latest/tekton-dashboard-release.yaml

testEnv:
	kubectl config set-context --current --namespace=test

secret-docker: 		
	kubectl create secret generic omar-docker-hub-creds \
 	--from-file=.dockerconfigjson=/home/ubuntu/.docker/config.json \
 	--type=kubernetes.io/dockerconfigjson

roles:
	kubectl apply -f ./roles/ 
	kubectl apply -f ./roles/ -n production
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

delete-tasks:
	tkn t delete $$(tkn t ls -n tekton-pipelines | cut -d ' ' -f 1 | tail -n +2) -n test || true

delete-pipelines:
	tkn p delete $$(tkn p ls -n tekton-pipelines | cut -d ' ' -f 1 | tail -n +2) -n test || true

delete-taskrunners:
	tkn tr delete $$(tkn tr ls -n tekton-pipelines | cut -d ' ' -f 1 | tail -n +2) -n test || true

delete-pipelinerunners:
	tkn pr delete $$(tkn pr ls -n tekton-pipelines | cut -d ' ' -f 1 | tail -n +2) -n test || true

delete-secret:
	kubectl delete secrets omar-docker-hub-creds -n tekton-pipelines

logs:
	tkn pr logs --last

init: logs repos namespaces-cluster

logs:
	touch output.log
	rm -f output.log
	touch output.log

namespaces-cluster:
	kubectl apply -f ./namespaces

cluster-up:
	k3d cluster create labs \
            -p 80:80@loadbalancer \
            -p 443:443@loadbalancer \
            -p 30000-32767:30000-32767@server[0] \
            -v /etc/machine-id:/etc/machine-id:ro \
            -v /var/log/journal:/var/log/journal:ro \
            -v /var/run/docker.sock:/var/run/docker.sock \
            --k3s-server-arg '--no-deploy=traefik' \
            --agents 3

cluster-down:
	k3d cluster delete labs

repos:
	helm repo add stable https://kubernetes-charts.storage.googleapis.com/
	helm repo add hashicorp https://helm.releases.hashicorp.com
	helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
	helm repo add grafana https://grafana.github.io/helm-charts
	helm repo add elastic https://helm.elastic.co
	helm repo add fluent https://fluent.github.io/helm-charts
	helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
	helm repo update



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
	./run1.sh

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
