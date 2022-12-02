import json
import boto3
import io, base64
SKILLS = ["Technical Skills", "Skills", "skills", "Technical skills", "TECHNICAL SKILLS", "SKILLS", "technical skills"]

def lambda_handler(event, context):
    # TODO implement
    dynamo_db = boto3.resource('dynamodb')
    dynamo = boto3.client('dynamodb')
    table = dynamo_db.Table('sequence')
    table2 = boto3.resource('dynamodb').Table('candidate_data')
    print(event)
    ev = event['body-json']
    ev = bytes(ev, 'utf-8')
    id = table.scan() # get ID
    print(id)
    id = id['Items'][0]['id']
    print(id)
    resume = base64.b64decode(ev)
    bucket = 'resume-bucket-bsb'
    file_path = 'resume' + id
    s3 = boto3.client('s3')
    s3.put_object(Bucket=bucket, Key=file_path, Body=resume)
    textract = boto3.client('textract')
    doc = textract.detect_document_text(Document={
        'S3Object': {
            'Bucket': bucket,
            'Name': '/newwwww_candidate_resume', #Change to file_path
        }
    })
    blocks = doc['Blocks']
    for i in range(len(blocks)):
        if "Text" in blocks[i] and blocks[i]['Text'] in SKILLS:
            print(blocks[i+1]['Text'])
        #     table2.update_item(Key={"id": id},
        #     UpdateExpression="set skills=:newskills",ExpressionAttributeValues={
        #     ":newSkills": blocks[i+1]['Text']
        # },
        # ReturnValues="UPDATED_NEW")
            dynamo.put_item(Table="candidate_data",Item={'id':{'N': id}, 'skills': {'S': blocks[i+1]['Text']}})

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        'body': json.dumps("Works")
    }

