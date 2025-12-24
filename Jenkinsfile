pipeline{
	agent{
	     docker{
		image: 'node:16-slim'
		args 'args -v /var/run/docker.sock:/var/run/docker.sock -u 0:0'

	}
      }
      options{
	skipDefaultCheckout()
	}
      stages{
	stage('Checkout'){
		checkout scm
}
}



}
