import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DatabaseStack extends cdk.Stack {

  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new dynamodb table
    const table = new dynamodb.Table(this, 'FirstDynamoDbTable', {
        tableName: 'http-crud-tutorial-items',
        partitionKey: {
            name: 'id',
            type: dynamodb.AttributeType.STRING
        }
    });

    this.table = table;

  }
}
