export PACKAGE_VERSION=`cat /opt/web/ui/index.html | grep -oE "<meta name=\"package-version\" content=\"([0-9]+|\.)+\">" | grep -oE "([0-9]+|\.)+" -o`


if [ "$AFS_GATEWAY_NET_NAME" ]; then
  sed -i "s/gateway_ip/$AFS_GATEWAY_NET_NAME/g" /etc/nginx/nginx.conf
else
  echo "环境变量找不到网关网络名(AFS_GATEWAY_NET_NAME),退出"
  exit 1
fi

if [ "$AFS_GATEWAY_NET_PORT" ]; then
  sed -i "s/gateway_port/$AFS_GATEWAY_NET_PORT/g" /etc/nginx/nginx.conf
else
  echo "环境变量找不到网关端口(AFS_GATEWAY_NET_PORT),退出"
  exit 1
fi

if [ "$NGINX_ACCESS_LOG" ]; then
  sed -i "s|nginx_access_log|$NGINX_ACCESS_LOG|g" /etc/nginx/nginx.conf
else
  echo "环境变量找不到nginx 访问日志 (NGINX_ACCESS_LOG),退出"
  exit 1
fi


if [ "$NGINX_ERROR_LOG" ]; then
  sed -i "s|nginx_error_log|$NGINX_ERROR_LOG|g" /etc/nginx/nginx.conf
else
  echo "环境变量找不到nginx 错误日志 (NGINX_ERROR_LOG),退出"
  exit 1
fi
sed -i "s|package_version|$PACKAGE_VERSION|g" /etc/nginx/nginx.conf

nginx -g 'daemon off;'
