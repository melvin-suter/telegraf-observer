Param
(
    [string]$TELEGRAF_VERSION=1.29.5
    [string]$OBSERVER_URL=https://telegraf-observer.domain.tld
    [string]$CONFIG_ID=0
    [string]$ENCRYPTION_KEY=""
    [string]$SCRIPT_DIR="C:\_scripts\telegraf"
)


wget https://dl.influxdata.com/telegraf/releases/telegraf-${TELEGRAF_VERSION}_windows_amd64.zip -UseBasicParsing -OutFile telegraf-${TELEGRAF_VERSION}_windows_amd64.zip
Expand-Archive .\telegraf-${TELEGRAF_VERSION}_windows_amd64.zip -DestinationPath 'C:\Program Files\InfluxData\telegraf'

& C:\"Program Files"\Telegraf\telegraf.exe --service install
& C:\"Program Files"\Telegraf\telegraf.exe --config $OBSERVER_URL/api/v1/public/config/$CONFIG_ID?key=$ENCRYPTION_KEY

$scriptsData = Invoke-RestMethod -Uri $OBSERVER_URL/api/v1/public/scripts/$CONFIG_ID?key=$ENCRYPTION_KEY

New-Item -ItemType Directory $SCRIPT_DIR
$scriptsData.PSObject.Properties | ForEach-Object {
    $_.value | Out-File -FilPath $SCRIPT_DIR\$_.key
}

& net start telegraf