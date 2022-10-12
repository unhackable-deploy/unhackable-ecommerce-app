var AWS = require('aws-sdk');

async function putObjectToS3(bucket, key, data){
    var s3 = new AWS.S3();
    var params = {
        Bucket : bucket,
        Key : key,
        Body : data
    }
    await s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    }).promise();;
}

exports.handler = async (event) => {
    const rand = Math.floor(Math.random() * 1000);
    const file_name = "order_"+rand+".csv"
    const file_contents = "id\tname\tdata\n"+rand+"\tAA\ttoday"
    await putObjectToS3(process.env.BUCKET_NAME, file_name, file_contents)
    const response = {
        statusCode: 200,
        body: '{ "status": "orderPlaced" }'
    };
    return response;
};
