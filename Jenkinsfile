pipeline {
    agent any
    tools { 
        nodejs "node 20.18.0" // Definindo a versão do Node.js
    }
    stages {
        stage('Clonar Repositório') {
            steps {
                git 'https://github.com/DBor19/DanielNogueiraCiclo2Microservice.git'
            }
        }
        stage('Instalar Dependências') {
            steps {
                sh 'npm install' // Instala dependências do npm
            }
        }
        stage('Configurar Prisma') {
            steps {
                sh 'npx prisma generate' // Gera o Prisma Client
            }
        }
        stage('Buildar Imagem Docker') {
            steps {
                script {
                    def appName = 'microservico' // Nome do aplicativo para o Docker
                    def imageTag = "${appName}:${env.BUILD_ID}" // Tag da imagem baseada no BUILD_ID

                    // Construir a imagem Docker
                    sh "docker build -t ${imageTag} ."
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def appName = 'microservico'
                    def imageTag = "${appName}:${env.BUILD_ID}"

                    // Parar e remover o container existente, se houver
                    sh "docker stop ${appName} || true"
                    sh "docker rm ${appName} || true"

                    // Executar o novo container com as configurações adequadas
                    sh "docker run -d -p 3001:3001 --name ${appName} ${imageTag}"
                }
            }
        }
    }
    post {
        success {
            echo 'Deploy do Microserviço realizado com sucesso!'
        }
        failure {
            echo 'O deploy do Microserviço falhou!'
        }
    }
}
