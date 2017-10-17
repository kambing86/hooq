install with VirtualBox
```bash
brew cask install minikube
brew install kubectl
minikube start --insecure-registry localhost:5000
kubectl apply -f local-registry.yml
```

`local-registry.yml`
```yaml
apiVersion: v1
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

```

original script from https://mtpereira.com/local-development-k8s.html
```bash
# Setup minikube
brew update && brew install xhyve docker-machine-driver-xhyve kubernetes-cli minikube
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve

# Setup minikube
minikube start --vm-driver xhyve --insecure-registry localhost:5000

# Using minikube's Docker daemon from our localhost
eval $(minikube docker-env)

# Running a local private Docker registry
kubectl apply -f local-registry.yml
```
