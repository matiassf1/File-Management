#!/bin/sh

# LOCALSTACK DYNAMODB DOCUMENTATION RESOURCE: https://docs.localstack.cloud/user-guide/aws/dynamodb/

# Function to handle failures and exit the script
fail() {
    echo "$2"
    exit $1
}

# Function to execute a command and display its output
execute() {
    OUTPUT=$( "$@" 2>&1 )   # Capture the output and errors
    echo "$OUTPUT"          # Display the output
    if [ $? -ne 0 ]; then   # Check if there was an error
        fail 1 "Error: $OUTPUT"
    fi
}

# Seed the 'sponsors' table with default sponsors
echo "Seeding the 'sponsors' table with default sponsors..."

execute aws dynamodb put-item \
    --table-name sponsors \
    --item '{
        "id": {"S": "1"},
        "name": {"S": "Sponsor 1"},
        "tier": {"S": "platinum"},
        "hyperlink": {"S": "https://www.sponsor1.com"},
        "imagePath": {"S": "https://www.sponsor1.com/image.png"}
    }' \
    --endpoint-url http://localhost:4566

execute aws dynamodb put-item \
    --table-name sponsors \
    --item '{
        "id": {"S": "2"},
        "name": {"S": "Sponsor 2"},
        "tier": {"S": "premium"},
        "hyperlink": {"S": "https://www.sponsor2.com"},
        "imagePath": {"S": "https://www.sponsor2.com/image.png"}
    }' \
    --endpoint-url http://localhost:4566

echo "Sponsors seeded successfully."