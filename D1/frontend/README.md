docker build -t react-app .
docker run -p 8080:8080 -v $(pwd):/app -v /app/node_modules --name react-container react-app
docker stop react-container