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

import jwt from "jsonwebtoken"


const secretKey = '';
const corsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}

export const lambdaHandler = async (event) => {
    try {
        return authenticateToken(event);
    } catch (err) {
        console.log(err);
        return {
            headers: corsHeaders,
            statusCode: 502,
            body: JSON.stringify({ message: err })
        };
    }
};

function authenticateToken(req) {
    try {
        // Extract the token from the Authorization header
        let authHeader;
        req.headers['authorization'] == undefined ? authHeader = req.headers['Authorization'] : authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return {
                headers: corsHeaders,
                statusCode: 401,
                body: JSON.stringify({ message: 'No token provided' })
            }
        }

        // Verify and decode the token
        let decoded = jwt.verify(token, secretKey);
        return checkExpirationDate(decoded);
    } catch (error) {
        return {
            headers: corsHeaders,
            statusCode: 403,
            body: JSON.stringify({ message: error.message })
        }
    }
}

function checkExpirationDate(token) {
    let subscription = token.dat.subscription;
    let renewalDate = new Date(subscription.renewal_date);
    let today = new Date();

    if (!subscription.is_trial && renewalDate < today) {
        return {
            headers: corsHeaders,
            statusCode: 402,
            body: JSON.stringify({ message: 'Subscription expired' })
        }
    }

    return {
        headers: corsHeaders,
        statusCode: 200,
        body: JSON.stringify({
            message: 'You are authorized to access this protected resource',
        })
    }
}
