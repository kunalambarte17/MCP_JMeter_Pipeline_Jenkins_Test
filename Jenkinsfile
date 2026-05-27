pipeline {

    agent any

    stages {

        stage('Install Dependencies') {

            steps {

                bat 'cd mcp-server && npm install'
            }
        }

        stage('Run MCP JMeter Test') {

            steps {

                bat 'cd mcp-server && node server.js 50'
            }
        }

        stage('Publish Report') {

            steps {

                archiveArtifacts artifacts: 'mcp-server/reports/**'
            }
        }
    }
}