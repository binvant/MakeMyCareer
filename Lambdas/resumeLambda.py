import json
import boto3
import io, base64
SKILLS = ["Technical Skills", "Skills", "skills", "Technical skills", "TECHNICAL SKILLS", "SKILLS", "technical skills"]
SUB_SECTION = ["web technologies", "WEB TECHNOLOGIES", "Web Technologies", "Web technologies", "Databases", "databases", "DATABASES", "Other", "Tools", "Software/Technology", "PROGRAMMING", "Programming", "Languages"]

def lambda_handler(event, context):
    # TODO implement
    dynamo_db = boto3.resource('dynamodb')
    dynamo = boto3.client('dynamodb')
    table = dynamo_db.Table('sequence')
    table2 = boto3.resource('dynamodb').Table('candidate_data')
    print(event)
    ev = event['body']
    ev = ev[ev.find(',')+1:]
    print(ev)
    ev = bytes(ev, 'utf-8')
    id = table.scan() # get ID
    print(id)
    id = str(id['Items'][1]['id'])
    print(id)
    resume = base64.b64decode(ev)
    bucket = 'resume-bucket-bsb'
    file_path = 'resume' + '_'+ id
    s3 = boto3.client('s3')
    s3.put_object(Bucket=bucket, Key=file_path, Body=resume, ContentType='application/pdf')
    textract = boto3.client('textract')
    doc = textract.detect_document_text(Document={
        'S3Object': {
            'Bucket': bucket,
            'Name': file_path,
        }
    })
    blocks = doc['Blocks']
    print(blocks)
    for i in range(len(blocks)):
        if "Text" in blocks[i] and blocks[i]['Text'] in SKILLS and blocks[i]['BlockType']=='LINE':
            print(blocks[i])
            print(blocks[i+1])
            temp = dynamo.get_item(TableName="candidate_data", Key={
            'id': {'N': id}}, AttributesToGet=['name','email', 'password'])
            password = str(temp['Item']['password']['S'])
            email = str(temp['Item']['email']['S'])
            name = str(temp['Item']['name']['S'])
            dynamo.put_item(TableName="candidate_data", Item={'id':{'N': id}, 'name': {'S': name}, 'email': {'S': email}, 'password': {'S': password}, 'skills': {'S': str(blocks[i+1]['Text'])}})
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Credentials' : 'true',
        },
        'body': json.dumps("Works")
    }