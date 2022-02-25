FROM rabbitmq:3.8

RUN rabbitmq-plugins enable --offline rabbitmq_management

COPY ./ /etc/rabbitmq/

# Define environment variables. It should be set by CI/CD
ENV RABBITMQ_USER admin
ENV RABBITMQ_PASSWORD admin
ENV RABBITMQ_PID_FILE /var/lib/rabbitmq/mnesia/rabbitmq

ADD init.sh /init.sh

RUN ["chmod", "+x", "/init.sh"]

EXPOSE 15672

# Define default command
CMD ["/init.sh"]
