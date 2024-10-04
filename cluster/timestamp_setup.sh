#!/bin/bash

# Set the desired area and zone
AREA="Asia"
ZONE="Ho_Chi_Minh"

# Pre-seed the tzdata configuration
echo "tzdata tzdata/Areas select $AREA" | debconf-set-selections
echo "tzdata tzdata/Zones/$AREA select $ZONE" | debconf-set-selections

# Set non-interactive frontend
export DEBIAN_FRONTEND=noninteractive

# Update and reconfigure tzdata
apt-get update
apt-get install -y tzdata
dpkg-reconfigure -f noninteractive tzdata