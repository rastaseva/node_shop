# 1. Prerequisites
## 1.1 Configure Git

```bash
# Perform the next commands in the termanal/cmd
git config --global user.name "Name Surname"
git config --global user.email name_surname@epam.com

# Also for Windows based OSes it's important to set the next config:
git config --global core.autocrlf true
# For Linux or MacOS set the next config:
git config --global core.autocrlf input

# For convenience it's also useful to set this config
git config --global push.default current

# For Windows OSes it's useful to set Notepad as default editor
# as Vim and Nano has issues on Windows
git config --global core.editor notepad
```

**P.S.** Usually such Git configuration is common for most projects but If you have some other projects not connected to EPAM or with another configuration you may set all these settings with flag `--local` instead of `--global` to avoid configuration conflicts with other projects. In this case it's necessary to clone the repository first and navigate to it.

## 1.2 Generate SSH key and put its public part into GitLab

```bash
# Run the command and follow the instructions:
ssh-keygen
...
...
...
# Copy public key (id_rsa.pub) into GitLab -> Settings -> SSH Keys
cat ~/.ssh/id_rsa.pub
```


## 1.3 Install NVM

For Unix systems execute:

```bash
# Download NVM installation script:
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Reload terminal:
source ~/.bashrc
nvm --version
```
For Windows systems follow the instructions provided in [NVM for Windows](https://github.com/coreybutler/nvm-windows)

# 2. Install the Client application

- Install NodeJS using NVM

```bash
nvm install v16.13.0
nvm use 16.13.0
```

- Clone repository and install the dependencies

```bash
# Create some project folder and navigate into it:
mkdir epam
cd epam

# Clone Client repository:
git clone <YOUR_REPO_URL>

# Switch to "develop" branch and install all the dependencies:
git checkout develop
npm install
```

In case of failure with `node-gyp` installation (that means Python or Visual C++ build tools are not installed in the system) open PowerShell as administrator and do the following:

```bash
npm install --global --production windows-build-tools
npm install --global node-gyp
```

In some cases it can be necessary to set `PYTHON` environment variable manually.

**P.S.** In case of some issues with `node-gyp` installation follow the [official instructions](https://github.com/nodejs/node-gyp#on-windows).

# 3. The list of available commands

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in a browser.

### `npm run debug`

Runs the app in the debug mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in a browser.


### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run test:ci`

Runs all the tests all over the project and genrates code coverage report. Puts the report into the `/coverage` directory.

### `npm run lint`

Runs project linters (eslint, prettier) and generates the report. Doesn't perform autofixing. This script is used on CI as a quality gate. For autofixing run the command `npm run lint:fix`

### `npm run build`

Builds the app for production to the `dist` folder.