install with VirtualBox
```bash
#!/bin/bash
brew cask install minishift
minishift config set vm-driver virtualbox
minishift start
```