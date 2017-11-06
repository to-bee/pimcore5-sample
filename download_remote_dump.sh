# Download sql dump from remote server via ssh, scp
#!/bin/bash
echo "Download remote sql dump"
source ./.env
CONTAINER_NAME=${DOCKER_APP_NAME_PRAEFIX}_db_1
BACKUP_DIR_REMOTE=/tmp/backup.sql
BACKUP_DIR_LOCAL=./db/backup.sql
BACKUP_DIR_LOCAL_LAST=./db/backup-old.sql

# backup will be generated on the remote host, copied back to the local system so an sql backup will be available in your git repository before pushing changes to the server
CMD="docker exec -it $CONTAINER_NAME /usr/bin/mysqldump -u $MYSQL_USER --password=$MYSQL_PASSWORD $MYSQL_DATABASE > $BACKUP_DIR_REMOTE"
echo "Executing: $CMD"
ssh -p <ssh-port> -t <ssh-user>@<ssh-host> $CMD

mv $BACKUP_DIR_LOCAL $BACKUP_DIR_LOCAL_LAST 2> /dev/null
scp -r -P <ssh-port> <ssh-user>@<ssh-host>:$BACKUP_DIR_REMOTE $BACKUP_DIR_LOCAL
