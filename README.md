## Setup

1. Install the dependencies
```bash
pnpm i
```
2. Create/Modify .env file

3. Initialize the database
```bash
pnpx prisma db push --force-reset  
pnpm exec prisma db seed
```

## Run
Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

