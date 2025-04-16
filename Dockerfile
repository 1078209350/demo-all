#FROM harbor.c7n-2.csleasing.com.cn/csleasing-clcms-core/nginx-base:v1
FROM harbor-c7n.csleasing.com.cn/kylin/frontbase:1.21.5-22.03-lts

RUN mkdir -p /opt/web/ui
RUN mkdir -p /opt/log/nginx
RUN chown nginx -R /opt/log
ADD ui.tar /opt/web/ui/
RUN chown nginx -R /opt/web/ui/
ADD ./sbin/nginx.conf /etc/nginx/nginx.conf
ADD ./sbin/start.sh /opt/sbin/start.sh
CMD ["sh","/opt/sbin/start.sh"]
EXPOSE 80

