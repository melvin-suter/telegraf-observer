#!/bin/bash

function setupRHEL {
    echo "Found RHEL, setting up .rpm repo"
 
    cat > /etc/yum.repos.d/influxdb.repo <<EOF
[influxdb]
name = InfluxData Repository - Stable
baseurl = https://repos.influxdata.com/stable/\$basearch/main
enabled = 1
gpgcheck = 1
gpgkey = https://repos.influxdata.com/influxdata-archive_compat.key
EOF
    
    echo "Installing required packages"
    dnf install -y -q telegraf jq
}


function setupTelegraf {
    echo "Installing telegraf as a service"
    curl $OBSERVER_URL/api/v1/public/config/$CONFIG_ID?key=$ENCRYPTION_KEY > /etc/telegraf/telegraf.conf
    systemctl restart telegraf

    # scripts
    echo "Deploying custom scripts"
    mkdir -p $SCRIPT_DIR
    curl $OBSERVER_URL/api/v1/public/scripts/$CONFIG_ID?key=$ENCRYPTION_KEY 2>/dev/null | jq 'keys' | jq -r -c '.[]' | while read key ; do 
        curl $OBSERVER_URL/api/v1/public/scripts/$CONFIG_ID?key=$ENCRYPTION_KEY 2>/dev/null | jq -r -c ".\"$key\"" > $SCRIPT_DIR/$key
    done
    chmod +x -R $SCRIPT_DIR

    echo "Deploying cronjob"
    cat > /etc/cron.daily/telegraf-observer <<EOF
export TELEGRAF_VERSION=$TELEGRAF_VERSION
export OBSERVER_URL=$OBSERVER_URL
export CONFIG_ID=$CONFIG_ID
export SCRIPT_DIR=$SCRIPT_DIR
export ENCRYPTION_KEY=$ENCRYPTION_KEY  
curl "http://localhost:4200/assets/deploy/linux.sh" | bash 
EOF

}


echo "Starting telegraf setup"

if(grep ID_LIKE /etc/os-release | grep -i rhel >/dev/null 2>&1) ; then
    setupRHEL
fi

setupTelegraf


