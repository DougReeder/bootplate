#!/bin/bash

# the folder this script is in (*/bootplate/tools)
TOOLS=$(cd `dirname $0` && pwd)

# application root
SRC="$TOOLS/.."
DEST="$SRC/deploy"

# enyo location
ENYO="$SRC/enyo"

# deploy script location
DEPLOY="$ENYO/tools/deploy.js"

# check for node, but quietly
if command -v node >/dev/null 2>&1; then
	# use node to invoke deploy with imported parameters
	echo "node $DEPLOY -T -s $SRC -o $SRC/deploy $@"
	node "$DEPLOY" -T -s "$SRC" -o "$SRC/deploy" $@
else
	echo "No node found in path"
	exit 1
fi

# copy files and package if deploying to cordova webos
while [ "$1" != "" ]; do
	case $1 in
        -w | --webos )
            cp "$SRC"/appinfo.json "$DEST"
            
            # package it up
            palm-package "$DEST"
            ;;
	esac
	shift
done
