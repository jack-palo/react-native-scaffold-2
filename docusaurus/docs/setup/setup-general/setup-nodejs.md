---
sidebar_position: 6
title: Node JS
---

## Install NVM

// check version
node -v

// list locally installed versions of node
nvm ls

// install latest LTS version of node (Long Term Support)
nvm install --lts

// Always default to the latest available node version on a shell
nvm alias default node

- :exclamation: Don't install NVM using Homebrew <sub>(installation is not supported)</sub>

  - https://github.com/nvm-sh/nvm?tab=readme-ov-file#listing-versions

    - > nvm ls-remote
    - > nvm install node
    - > nvm use node --version
    - > node --version

  - :question: should we install Node using Docker?
    - [Node the Docker Way](https://medium.com/@mark.birbeck/dont-install-node-until-you-ve-read-this-or-how-to-run-node-the-docker-way-21237f932841)
    - https://hub.docker.com/_/node/
    - > docker pull node:(version)-alpine
    - > docker run -it --rm node:(version)-alpine
