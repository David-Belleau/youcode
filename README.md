# YouCode

## Description 

YouCode lets you create online code courses.<br/>

# Stack 

- Tailwind CSS
- Shadcn
- Typescript
- Zod
- Vitest
- React JS
- React query 
- Zustand
- Next JS
- Prisma
- PostgreSQL

# Getting started

## Prerequisites

- PostgreSQL - <a href='https://www.postgresql.org/download'>Download and install PostgreSQL</a>

## Clone the project

```
git clone https://github.com/David-Belleau/youcode.git 
cd youcode
```

## Install the dependencies

```
pnpm install
```

## Add the environment variables

Create an .env file in the project root and add this

```
DATABASE_URL="postgresql://yourName:password@localhost:5432/dataBaseName?schema=public"
```

"yourName" and "password" are the data you used when installing PostgreSQL. <br/>
"dataBaseName" is the name of the database you choose.

```
GITHUB_ID=''
GITHUB_SECRET=''
```

Here's a <a href='https://authjs.dev/getting-started/providers/oauth-tutorial#2-configuring-oauth-provider
'>tutorial</a> on how to retrieve these IDs from GitHub.

```
NEXTAUTH_SECRET='app' // for exemple
NEXTAUTH_URL='http://localhost:3000' // for exemple
```

## Start the project

```
pnpm run dev
```

# License

YouCode is MIT licensed.