FROM centos:7
MAINTAINER ultrafrog <ufrog.net@gmail.com>

ENV BASE_DIR="/home/sentinel" \
    TIME_ZONE="Asia/Shanghai"

ARG SENTINEL_VERSION=1.8.5

WORKDIR $BASE_DIR
RUN set -x \
    && yum -y update \
    && yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel wget \
    && wget https://github.com/alibaba/Sentinel/releases/download/${SENTINEL_VERSION}/sentinel-dashboard-${SENTINEL_VERSION}.jar \
    && cp sentinel-dashboard-${SENTINEL_VERSION}.jar sentinel-dashboard.jar \
    && yum autoremove -y wget \
    && ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime && echo $TIME_ZONE > /etc/timezone \
    && yum clean all

EXPOSE 8080
ENTRYPOINT java -jar sentinel-dashboard.jar