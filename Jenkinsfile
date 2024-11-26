pipeline {
    agent any
    tools { 
        nodejs "node 20.18.0"
    }
    stages {
        stage('Clonar Repositório') {
            steps {
                git 'https://github.com/DBor19/DanielNogueiraCiclo2Gateway.git'
            }
        }
        stage('Instalar Dependências') {
            steps {
                sh 'npm install'
            }
        }
        stage('Buildar Imagem Docker') {
            steps {
                sh 'docker build -t api-gateway .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop api-gateway || true'
                sh 'docker rm api-gateway || true'
                sh 'docker run -d -p 3000:3000 --name api-gateway api-gateway'
            }
        }
    }
    post {
        success {
            echo 'Deploy da API Gateway realizado com sucesso!'
        }
        failure {
            echo 'O deploy da API Gateway falhou!'
        }
    }
}
