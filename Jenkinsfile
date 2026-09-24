pipeline {
    agent any

    options {
        timeout(time: 15, unit: 'MINUTES')
        timestamps()
    }

    environment {
        CI = 'true'
        // Spring datasource and secret defaults for testing (no hardcoded credentials)
        SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/smarthome'
        SPRING_DATASOURCE_USERNAME = 'smarthome'
        SPRING_DATASOURCE_PASSWORD = 'smarthome_secret'
    }

    // Optional: If configured in Manage Jenkins -> Tools, uncomment the tools block below:
    // tools {
    //     jdk 'jdk21'
    //     nodejs 'node22'
    //     maven 'maven3'
    // }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Frontend Install') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                        } else {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Frontend Test') {
            steps {
                echo 'Running frontend automated unit tests...'
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm test'
                        } else {
                            bat 'npm test'
                        }
                    }
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Compiling TypeScript and building Vite production bundle...'
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm run build'
                        } else {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Backend Test') {
            steps {
                echo 'Running Spring Boot backend Maven tests (JUnit 5 + Mockito)...'
                dir('backend') {
                    script {
                        if (isUnix()) {
                            sh 'mvn test'
                        } else {
                            bat 'mvn test'
                        }
                    }
                }
            }
        }

        stage('Backend Build') {
            steps {
                echo 'Packaging Spring Boot backend application JAR...'
                dir('backend') {
                    script {
                        if (isUnix()) {
                            sh 'mvn package -DskipTests'
                        } else {
                            bat 'mvn package -DskipTests'
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo ' SmartHome Pipeline Build & Tests PASSED!          '
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo ' SmartHome Pipeline FAILED! Check logs above.       '
            echo '==================================================='
        }
    }
}
