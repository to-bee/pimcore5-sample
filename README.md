# Pimcore5 Docker Sample
This is a sample application which creates a pimcore5 docker container. Have fun!

The pimcore5 image is available on dockerhub: `https://hub.docker.com/r/tobee/pimcore5/`

## First steps
- Change usernames and passwords in `./env`.
- Delete the `./web/src/` folder
- Execute `./pimcore_init.sh` to download and extract latest pimcore version to `./web/src`.
- Execute: `docker-compose --project-name pimcore5sample up --build` to start the containers.
- Òpen `http://0.0.0.0/` and `http://0.0.0.0/admin` with your browser and enter the credentials according to `./env`.

## Configuration
- After building the containers, open `./env` and set `PIMCORE_INSTALL_FROM_SCRATCH=0`.
- Use the `docker-compose.yml` file to use continuous integration/gitlab-runner. This file will only rebuild the containers if the `db` container is not available. See `./build_container.sh` to get more information.
- Uncomment `volumes` in: `docker-compose.yml` to map some folders to your host system. 
- Don't forget to backup important folders and the database.

## Troubleshooting
**See available containers:**
 
`docker ps`

**Open the container's bash:**

`docker exec -it <container-id> bash`
`docker exec -it <container-id> ping google.com`

**Show log files:**

`docker logs <container-id> -f`
