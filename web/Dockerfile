FROM tobee/pimcore5

WORKDIR /var/www/html/

#ADD . /app/

COPY docker-php-entrypoint /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-php-entrypoint

# will call docker-php-entrypoint php -a
ENTRYPOINT ["docker-php-entrypoint"]
#CMD ["php", "-a"]
CMD apachectl -D FOREGROUND