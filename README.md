# Scale API

A scalable REST API service built with Node.js and deployed on AWS EKS, featuring file upload capabilities to S3 and MongoDB integration.

## Project Structure

│
├── k8s/
│ ├── scaleapi/
│ │ ├── templates/
│ │ │ ├── deployment.yaml
│ │ │ ├── service.yaml
│ │ │ └── ingress.yaml
│ │ └── values.yaml
│ └── ...

## Installation Guide

1. **Clone the repository:**

   ```bash
   git clone git@github.com:chhetri123/scale_api.git
   cd scale_api
   ```

2. **Install dependencies:**

   Make sure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your configuration:

   ```plaintext
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   MONGODB_URI=your_mongodb_uri
   AWS_S3_BUCKET=
   PORT=8080
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

## Example Usage

To upload a file, send a POST request to `/upload` with the file attached in the form-data:

```bash
curl -X POST http://localhost:3000/upload \
  -F 'file=@/path/to/your/file.jpg'
```

This will upload the file to AWS S3 and store the metadata in MongoDB.

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
