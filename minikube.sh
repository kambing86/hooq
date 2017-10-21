#!/bin/bash
projectName=$1
echo "Building $projectName..."
minikube start --insecure-registry localhost:5000
kubectl config use-context minikube
echo 'apiVersion: v1
kind: ReplicationController
metadata:
  name: kube-registry-v0
  namespace: kube-system
  labels:
    k8s-app: kube-registry
    version: v0
spec:
  replicas: 1
  selector:
    k8s-app: kube-registry
    version: v0
  template:
    metadata:
      labels:
        k8s-app: kube-registry
        version: v0
    spec:
      containers:
      - name: registry
        image: registry:2
        resources:
          limits:
            cpu: 100m
            memory: 100Mi
        env:
        - name: REGISTRY_HTTP_ADDR
          value: :5000
        - name: REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY
          value: /var/lib/registry
        volumeMounts:
        - name: image-store
          mountPath: /var/lib/registry
        ports:
        - containerPort: 5000
          name: registry
          protocol: TCP
      volumes:
      - name: image-store
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: kube-registry
  namespace: kube-system
  labels:
    k8s-app: kube-registry
    kubernetes.io/name: "KubeRegistry"
spec:
  selector:
    k8s-app: kube-registry
  ports:
  - name: registry
    port: 5000
    protocol: TCP
---
apiVersion: v1
kind: Pod
metadata:
  name: kube-registry-proxy
  namespace: kube-system
spec:
  containers:
  - name: kube-registry-proxy
    image: gcr.io/google_containers/kube-registry-proxy:0.3
    resources:
      limits:
        cpu: 100m
        memory: 50Mi
    env:
    - name: REGISTRY_HOST
      value: kube-registry.kube-system.svc.cluster.local
    - name: REGISTRY_PORT
      value: "5000"
    - name: FORWARD_PORT
      value: "5000"
    ports:
    - name: registry
      containerPort: 5000
      hostPort: 5000
' | kubectl apply -f -
eval $(minikube docker-env)
docker build . -t $projectName
docker tag $projectName localhost:5000/$projectName
docker push localhost:5000/$projectName
kubectl config use-context minikube
eval $(echo "kubectl run $projectName --image=localhost:5000/$projectName $(cat .env | xargs -n 1 | while read x ; do printf ' --env='$x'' ; done) --port=8080")
kubectl expose deployment $projectName --type=NodePort
minikube service $projectName
