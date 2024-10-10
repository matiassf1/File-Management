# File-Management
An integration of AWS Lambda, Api Gateway, S3 and DynamoDB to handle a model with images and videos.

## Requirements

**Node:** `v18.18.0`

## Run Locally

Clone the project

```bash
 git clone https://github.com/matiassf1/File-Management.git
```

Install dependencies

```bash
  npm run prepare
  npm ci
```

Build Docker containers

```bash
  docker-compose up -d
```

Start the server

```bash
  npm run start:dev
```
