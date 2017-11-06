# This script will download and extract pimcore
#!/bin/bash
SRC_ROOT="./web/src"
PIMCORE_DOWNLOAD="./pimcore-stable.zip"
if [ ! -d $SRC_ROOT ]; then
    if [ ! -f $PIMCORE_DOWNLOAD ]; then
        wget https://pimcore.com/download-5/pimcore-stable.zip
    fi
    mkdir -p $SRC_ROOT
    unzip $PIMCORE_DOWNLOAD -d $SRC_ROOT
    rm $PIMCORE_DOWNLOAD

#    unzip ./pimcore-stable.zip web/* -d $SRC_ROOT
#    unzip ./pimcore-stable.zip app/* -d $SRC_ROOT
else
    echo "! Please delete $SRC_ROOT first to reinitialize"
fi
