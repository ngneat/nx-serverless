<br />
<p align="center">
 <img width="25%" height="25%" src="./logo.png">
</p>

<h1 align="center">Nx Serverless</h1>

> The Ultimate Monorepo Starter for Node.js Serverless Applications

✅ &nbsp;First-Class Typescript Support<br>
✅ &nbsp;DynamoDB Single Table Design<br>
✅ &nbsp;Shared API Gateway<br>
✅ &nbsp;Environments Configuration<br>
✅ &nbsp;CORS<br>
✅ &nbsp;JWT Auth Middleware<br>
✅ &nbsp;Http Params Validation<br>
✅ &nbsp;Typed Proxy Handlers<br>
✅ &nbsp;Auto Generators<br>
✅ &nbsp;Localstack<br>
✅ &nbsp;ESLint<br>
✅ &nbsp;Jest

<hr />

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![](https://img.shields.io/badge/monorepo-Nx-blue)](https://nx.dev/)
![esbuild](https://badges.aleen42.com/src/esbuild.svg)
![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/eslint-config-prettier/peer/eslint)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sudokar/nx-serverless/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/sudokar/nx-serverless)
![Maintained](https://img.shields.io/maintenance/yes/2022.svg)


## Prerequisites

- Docker
- Node.js

## Getting Started

- Run git clone https://github.com/ngneat/nx-serverless.git your-app-name
- Run `npm install`
- Run `npm run localstack`
- Update the `environment` files based on your configuration
- Run `npm run serve`

## About the App

The application contains three services:

#### Auth Service:

The auth service is responsible for authentication. It exposes one route for signing up:

```bash
curl --request POST 'http://localhost:3001/dev/auth/sign-up' \
--data-raw '{
    "email": "netanel@gmail.com",
    "name": "Netanel Basal"
}'
```

The request returns a JWT, which is used for accessing protected routes.

#### Users Service:

The users service is responsible for managing users. It exposes one route:

```bash
curl 'http://localhost:3003/dev/user' --header 'Authorization: token TOKEN'
```

The request returns the logged-in user.

#### Todos Service:

The todos service is responsible for managing todos. A user has many todos. It exposes CRUD routes:

```bash
// Get user todos
curl 'http://localhost:3005/dev/todos' --header 'Authorization: token TOKEN'

// Get a single todo
curl 'http://localhost:3005/dev/todos/:id' --header 'Authorization: token TOKEN'

// Create a todo
curl --request POST 'http://localhost:3005/dev/todos' \
--header 'Authorization: token TOKEN'
--data-raw '{
    "title": "Learn Serverless"
}'

// Update a todo
curl  --request PUT 'http://localhost:3005/dev/todos/:id' \
--header 'Authorization: token TOKEN' \
--data-raw '{
    "completed": true
}'
```

## DynamoDB GUI
[Download](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html) NoSQL Workbench for DynamoDB and connect to `http://localhost:4566`.

<p align="center">
 <img width="100%" height="100%" src="./dynamo.png">
</p>

## Commands

```bash
nx serve <service-name>
nx deploy <service-name>
nx remove <service-name>
nx build <service-name>
nx lint <service-name>
nx test <service-name>

// Use different enviroment
NODE_ENV=prod nx deploy <service-name> 
NODE_ENV=stg nx deploy <service-name> 

// Run only affected
nx affected:test
nx affected:deploy
```

## Generators

```bash
// Generate a service
npx nx workspace-generator service tags

// Generate handler
npx nx workspace-generator handler --name=create-tag --project=tags

// Generate http handler
npx nx workspace-generator http-handler --name=create-tag --project=tags

// Generate a model
npx nx workspace-generator model --name=tag --project=tags
```

<img src="demo.gif">

## CI/CD pipeline with github actions
### Github actions? 
GitHub Actions makes it easy to automate all your software workflows. Build, test, and deploy your code right from GitHub. Make code reviews, branch management,and run workflows when other events happen in your repository

### Getting started with github actions

[https://docs.github.com/actions](https://docs.github.com/actions)

The pipeline has been configured to run everytime a push/pull_request is made to the main branch

### Steps
- Checkout: The `checkout` action is used to checkout the source code.

- Node setup: The `setup-node` action is used to optionally download and cache distribution of the requested Node.js version.

- lint and test: The `lint` and `test` runs only on affected projects.

- Configure AWS credentials: The `configure-aws-credentials` Configure AWS credential and region environment variables for use in github Actions.

- Deploy to staging/prod: The `staging` and `prod` runs only when the branch name is prefixed with the name of the environment and deploy to the right environment.

## Further help

- Visit [Serverless Documentation](https://www.serverless.com/framework/docs/) to learn more about Serverless framework
- Visit [Nx Documentation](https://nx.dev) to learn more about Nx dev toolkit
- Visit [LocalStack](https://localstack.cloud/) to learn more about it
## Contribution

Found an issue? feel free to raise an issue with information to reproduce.

Pull requests are welcome to improve.

## License

MIT

This project is a fork of [nx-serverless](https://github.com/sudokar/nx-serverless)

<a href="https://www.flaticon.com/free-icons/monster" title="monster icons">Monster icons created by Smashicons - Flaticon</a>
