FROM rabbitmq:3.8

RUN rabbitmq-plugins enable --offline rabbitmq_management

COPY ./ /etc/rabbitmq/

EXPOSE 15672
