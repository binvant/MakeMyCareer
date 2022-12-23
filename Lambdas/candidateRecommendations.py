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
    print(event['queryStringParameters'])
    job_id = str(event['queryStringParameters']['job_id'])
    job_skills = client.get_item(TableName='jobPostings',Key={'JobID': {'S': job_id}}, AttributesToGet=['skills'])
    print(job_skills['Item']['skills']['S'])
    candidate_recommendation_list = {}
    res = dump_table_data('candidate_data')
    print(res)
    for i in range(len(res)):
        if 'skills' in res[i].keys():
            for j in res[i]['skills']['S'].replace(':', ',').split(','):
                if j in job_skills['Item']['skills']['S']:
                    print(res[i]['id']['N'])
                    candidate_recommendation_list[res[i]['id']['N']] = res[i]
    print(candidate_recommendation_list)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS'
        },
        'body': json.dumps(candidate_recommendation_list)
    }
