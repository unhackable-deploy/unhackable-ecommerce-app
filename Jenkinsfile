pipeline {
  agent { label 'agent' }
  stages {
    stage('deploy ecomm') {
      steps {
        sh 'detc create --plan https://raw.githubusercontent.com/lacework-demo/unhackable-ecommerce-app/main/deploy/ecommerce-eks.yaml --apply --trace'
      }
    }
  }
}

