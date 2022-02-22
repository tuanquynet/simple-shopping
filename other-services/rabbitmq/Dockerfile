FROM rabbitmq:3.8

RUN rabbitmq-plugins enable --offline rabbitmq_management && rabbitmq-plugins enable --offline rabbitmq_mqtt

COPY ./ /etc/rabbitmq/

EXPOSE 15672
EXPOSE 8883
