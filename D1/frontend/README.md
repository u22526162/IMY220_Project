docker build -t react-frontend .
docker run -p 3000:3000 react-frontend
docker stop react-container