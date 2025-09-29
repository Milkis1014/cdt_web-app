# cdt_web-app

## Setup

### Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Make sure **Docker Engine** and **Docker Compose** are running
- Open a terminal/command prompt

### Steps
1. **Clone the repository**
```bash
git clone https://github.com/Milkis1014/cdt_web-app.git
cd cdt_web-app
```

2. **Start the services using Docker Compose**
```bash
docker-compose up -d
```
- `-d` runs containers in the background (detached mode)
- This will start nginx, backend, Grafana, etc., as defined in `docker-compose.yml`.
  
3. **Verify the containers are running**
```bash
docker ps
```

4. **Access the services**
Frontend: http://localhost (served by Nginx)
Grafana: http://localhost/grafana/
Backend API: http://localhost/api/ (_Not yet included_)

**Stopping the Service**
```bash
docker-compose down
```
