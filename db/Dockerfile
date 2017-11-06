FROM mariadb:latest

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

#COPY backup.sql /tmp/
#RUN chmod +x /tmp/backup.sql

WORKDIR /app
ADD . /app/

# will call docker-entrypoint.sh mysqld
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 3306
CMD ["mysqld"]