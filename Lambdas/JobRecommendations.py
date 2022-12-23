import json
import boto3
client = boto3.client('dynamodb')

def dump_table_data(table_name):
    results = []
    last_evaluated_key = None
    while True:
        if last_evaluated_key:
            response = client.scan(
                TableName=table_name,
                ExclusiveStartKey=last_evaluated_key
            )
        else: 
            response = client.scan(TableName=table_name)
        last_evaluated_key = response.get('LastEvaluatedKey')
        
        results.extend(response['Items'])
        
        if not last_evaluated_key:
            break
    return results

def lambda_handler(event, context):
    # TODO implement
    
    dynamo = boto3.client('dynamodb')
    #candidate_id = event['queryStringParameters']
    candidate_id = str(event['queryStringParameters']['candidate_id'])
    candidate_skills = dynamo.get_item(TableName='candidate_data',Key={'id': {'N': candidate_id}}, AttributesToGet=['skills'])
    job_recommendation_list = {}
    res = dump_table_data('jobPostings')
    for i in range(len(res)):
        for j in res[i]['skills']['S'].split(','):
            if j in candidate_skills['Item']['skills']['S']:
                job_recommendation_list[res[i]['JobID']['S']] = res[i]
    print(job_recommendation_list)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps(job_recommendation_list)
    }
