pipeline {
    agent {
        docker {
            image 'ri25/node-docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u 0:0'
        }
    }
    
    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
				script {
                    // Fix for "fatal: not in a git directory" due to ownership
                    sh 'git config --global --add safe.directory "*"'
                }
                checkout scm    
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Build and Test') {
            steps {
                sh 'npm run build'
            }  
        }

        stage('Create Image and Push') {
            environment {
                DOCKER_IMAGE = "ri25/todo-app:${env.BUILD_NUMBER}"
            }
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-cred') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Update Deployment.yml') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
					 dir("${env.WORKSPACE}") {
                    sh """
                        git config user.email "riddhi01.menon@gmail.com"
                        git config user.name "stableapple"
                        
                        # Update the image line in deployment.yml
                        sed -i "s|image: .*|image: ri25/todo-app:${env.BUILD_NUMBER}|g" deployment.yml
                        
                        git add deployment.yml
                        git commit -m "Update deployment image to version ${env.BUILD_NUMBER}" || echo "No changes to commit"
                        
                        # Use the token to push back to GitHub
                        git push https://${GITHUB_TOKEN}@github.com/stableapple/todo-app.git HEAD:main
                    """
                }
				}
            }
        }
    }
}
