
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **.env file**: The application uses environment variables, so you'll need to create a `.env` file with the following values:

```env
DATABASE_URL=your_database_url
AUTH_SECRET=your_auth_secret
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### .env File Example

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority
AUTH_SECRET=my-secret-auth-token
CLOUD_NAME=my-cloudinary-name
API_KEY=my-cloudinary-api-key
API_SECRET=my-cloudinary-api-secret
```

## Running the Application with Docker

### Step 1: Build the Docker Image

To build the Docker image for the AnonBox application, run the following command:

```bash
docker build -t anonbox .
```

This command creates a Docker image tagged as `anonbox` using the current directory (`.`) as the build context.

### Step 2: Run the Docker Container

To run the Docker container with your environment variables, use the `--env-file` option to load the `.env` file:

```bash
docker run -p 3000:3000 --env-file .env anonbox
```

This will:
- Start the AnonBox application on port `3000`.
- Pass the environment variables from the `.env` file into the container.

### Step 3: Access the Application

Once the container is running, you can access the application in your web browser at:

```
http://localhost:3000
```
