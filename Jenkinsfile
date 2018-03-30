#!/usr/bin/env groovy

/*
	Jenkins Pipeline
	Build and Deploy Baan, an Ionic PWA
	
	Required environment variables:
	
	THE_REPO=<git repository url>
	PROJECT_CONFIG=<path to config data on build server>
	FTP_SITE_LOCATION=<path to the publish directory>

*/

node {
	try {
		stage('scmstage'){
			git changelog: false, poll: false, url: '${THE_REPO}'    
			
		}
		stage('prime'){
			bat '''
				@echo off
				echo bat(returnStdout: true, script: 'set')
				powershell -NoProfile -ExecutionPolicy Bypass -Command "& Copy-Item $env:PROJECT_CONFIG/baan-myhomeappconfig.ts $env:WORKSPACE/myhomeappconfig.ts"
				powershell -NoProfile -ExecutionPolicy Bypass -Command "& $env:WORKSPACE/ReplaceBuildTimestamp.ps1 -Workspace '%WORKSPACE%' -BuildTimestamp '%BUILD_TIMESTAMP%' -BuildNumber '%BUILD_NUMBER%'"
				powershell -NoProfile -ExecutionPolicy Bypass -Command "& $env:WORKSPACE/ReplaceGoogleMapsApiUrl.ps1 -Workspace '%WORKSPACE%' -ProjectConfigFolder '%PROJECT_CONFIG%'"
			'''
		}
		stage('install'){
			dir('./') {
				bat '%YARN% install'
			}
		}
		stage('build'){
			dir('./'){
				bat 'npm run dist'
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
		state('revertchanges'){
			bat '''
				git checkout .
			'''
		}
		def msg = "The job ${JOB_NAME} was successful! Build Number: ${BUILD_NUMBER}"
		slackSend color: 'good', message: msg
	}
	catch (exc) {
		def msg = "The job ${JOB_NAME} failed! Exception: ${exc}"
		slackSend color: '#ff0000', message: msg
	}
	finally {
		echo 'I finished'
    }
}
