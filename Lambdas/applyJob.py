import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    print(event)
    dynamo = boto3.client('dynamodb')
    dynamoDB = boto3.resource('dynamodb')
    body = json.loads(event['body'])
    candidates = dynamo.get_item(TableName="candidateJobApplication", Key={'jobId': {'S': body['jobId']}})
    if 'Item' in candidates.keys():
        print(candidates)
        finalCandidates = str(candidates['Item']['candidateId']['S']) + ',' +body['candidateId']
        dynamo.put_item(TableName='candidateJobApplication', Item={'jobId':{'S': body['jobId']}, 
        'candidateId': {'S': finalCandidates}})
    else:
        dynamo.put_item(TableName='candidateJobApplication', Item={'jobId':{'S': body['jobId']}, 
        'candidateId': {'S': body['candidateId']}})
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps('Hello from Lambda!')
    }
