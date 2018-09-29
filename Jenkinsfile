#!/usr/bin/env groovy

/*
	Jenkins Pipeline
	Build and Deploy Baan, an Ionic PWA
	
	Required environment variables:
	
	THE_REPO=<git repository url>
	PROJECT_CONFIG=<path to config data on build server>

*/

node {
	try {
		stage('scmstage'){
			git changelog: false, poll: false, url: '${THE_REPO}'    
			
		}
		stage('npm'){
			env.NODEJS_HOME = "${tool 'NodeJS'}"
			// on windows
			env.PATH="${env.NODEJS_HOME};${env.PATH}"
			bat 'npm --version'			
			bat 'npm rebuild node-sass'
		}
		stage('prime'){
			bat '''
				@echo off
				npm run getAppConfig
				npm run setBuildInfo '%BUILD_TIMESTAMP%' '%BUILD_NUMBER%' 'JenkinsWin'
				npm run setGoogleMapsApiUrl
			'''
		}
		stage('install'){
			dir('./') {
				bat '%YARN% install'
			}
		}
		stage('ioniccli'){
			dir('./') {
				bat '%YARN% add ionic'
			}
		}
		stage('build'){
			dir('./'){
				bat 'ionic build --no-interactive --confirm'
			}
		}
		stage('deploy'){
			/* Baan */
			dir('www'){
				ftpPublisher alwaysPublishFromMaster: true, continueOnError: false, failOnError: false, publishers: [
					[configName: 'BaanFirestorm', transfers: [
						[asciiMode: false, cleanRemote: false, excludes: '', flatten: false, makeEmptyDirs: true, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: "/", remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/**.*']
					], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true]
				]
			}
		}
		stage('revertchanges'){
			dir('./'){
				bat '''
					git checkout .
				'''
			}
		}
		def msg = "The job ${JOB_NAME} was successful! Build Number: ${BUILD_NUMBER}"
		echo msg
		slackSend color: 'good', message: msg
	}
	catch (exc) {
		def msg = "The job ${JOB_NAME} failed! Exception: ${exc}"
		echo msg
		slackSend color: '#ff0000', message: msg
	}
	finally {
		echo 'I finally finished'
    }
}
