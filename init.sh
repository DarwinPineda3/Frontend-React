#!/bin/bash

# Base directory (views folder)
BASE_DIR="./src/views"

# Function to create directory and file with a default div component
create_file() {
    local dir=$1
    local file=$2
    local file_path="$BASE_DIR/$dir/$file.tsx"
    
    mkdir -p "$BASE_DIR/$dir"
    
    # Check if the file already exists, if not create it
    if [ ! -f "$file_path" ]; then
        echo "Creating $file_path"
        echo "import React from 'react';

const $file = () => {
    return (
        <div>$file</div>
    );
};

export default $file;" > "$file_path"
    else
        echo "$file_path already exists, skipping..."
    fi
}

# Home (already in template)
# Vulnerabilities
create_file "vulnerabilities" "Network"
create_file "vulnerabilities" "Web"
create_file "vulnerabilities" "Cloud"
create_file "vulnerabilities" "Summary"
create_file "vulnerabilities" "Management"

# Monitoring
create_file "monitoring" "SOC"
create_file "monitoring" "SIEM"

# Observability
create_file "observability" "Network"
create_file "observability" "Cloud"
create_file "observability" "ObservedAssets"
create_file "observability" "InstallationGuide"

# Support
create_file "support" "Tickets"
create_file "support" "Solutions"

# Configuration
create_file "configuration" "ScheduledScans"

# Audit
create_file "audit" "Log"

echo "All specified files and directories have been created with default content in English."
