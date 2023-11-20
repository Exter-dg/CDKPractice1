import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

import { Construct } from 'constructs';
import { join } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface LambdaProps extends cdk.StackProps {
  tableName: string
}

export class LambdaStack extends cdk.Stack {

    public readonly lambdaFunc: lambda.Function;
    public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    // Define a lambda resource (function)
    const crudLambdaFunc = new NodejsFunction(this, 'CrudLambdaFunction', {
        runtime: lambda.Runtime.NODEJS_18_X,
        // Get code from lambda directory,
        entry: (join(__dirname, "..", "lambda", "crud.ts")),
        // File.function_name
        handler: 'handler',
        functionName: 'http-crud-tutorial-function',
        environment: {
          TABLE_NAME: props.tableName
        }
    });

    this.lambdaIntegration = new LambdaIntegration(crudLambdaFunc);

    this.lambdaFunc = crudLambdaFunc;

  }
}
