echo %ci_config_ftp_server%
docker build -t baan --pull --build-arg ci_config_ftp_server="'%ci_config_ftp_server%'" --build-arg ci_config_ftp_user=%ci_config_ftp_user% --build-arg=ci_config_ftp_password=%ci_config_ftp_password% --build-arg build_timestamp="date()" --build-arg build_number=34 --build-arg build_server="xxxxxx" .