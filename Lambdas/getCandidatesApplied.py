import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    dynamo = boto3.client('dynamodb')
    #table = dynamo.Table('candidateJobApplication')
    candidates = dynamo.get_item(TableName="candidateJobApplication", Key={'jobId': {'S': str(event['queryStringParameters']['jobId'])}})
    res = []
    print(candidates)
    for i in candidates['Item']['candidateId']['S'].split(","):
        userData = dynamo.get_item(TableName="candidate_data", Key={'id': {'N': i}})
        print(userData)
        res.append(userData)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
        'body': json.dumps(res)
    }
