FROM nginx:1.19.2

RUN rm /etc/nginx/conf.d/default.conf

ARG config_use_certs
COPY $config_use_certs /etc/nginx/conf.d/

EXPOSE 443

