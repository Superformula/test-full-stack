### **Create an AWS IAM user that have access to these services**

 1. AWS CloudFormation
 2. Amazon S3
 3. Manage - Amazon API Gateway
 4. AWS AppSync
 5. AWS Key Management Service
 6. AWS Lambda
 7. AWS Security Token Service
 8. Amazon CloudWatch Logs
 9. Amazon DynamoDB

### **Setting up AWS credential for the Docker Container**

 1. Go to the AWS folder and make a copy of config.dev and
    credential.dev.    
 2. Remove the .dev extension so the files will just be config and
    credential
 3. Put in the AWS region you want in config
 4. Put in the aws_access_key and aws_access _secret in the credential
    files.
		
###  **Getting ready to run Docker**

1. Open shell/command line on your computer
2. Navigate to the scripts folder
3. Make a copy of .env.developement and remove the .development so the file will just be .env
4. Put in the current project directory path to LOCAL_PROJECT_PATH.  (i.e lets say the current path that you are in is /test-full-stack/docker/scripts.  You want to put /test-full-stack there)
5. Now type in ./run.sh and…crosses finger everything will run smoothly.  If it does your service deployment environment is set up, yay !!!!!!!!



### Execute an interactive bash shell on the container.

1. Open shell/command line on your computer
2. Navigate to the scripts folder
3. Run ./bash_it.sh
4. You should be in the bash shell on the container and be in the app directory. 
5. Go to tc_sf_fullstack_test, this will be the directory that contains the project code within the container.