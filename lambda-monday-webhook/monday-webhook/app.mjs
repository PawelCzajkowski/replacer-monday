/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"

export const lambdaHandler = async (event) => {
  const s3Client = new S3Client({region: "eu-north-1"});
  const bucketName = "monday-webhooks";

  let body = JSON.parse(event.body);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: body.type + "-" + body.data.timestamp + ".txt",
      Body: JSON.stringify(body)
    })
  );

    return {
      statusCode: 200,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }
    };
  };
  