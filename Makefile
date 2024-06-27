# Makefile for React Native project

.PHONY: run run-android run-ios server

run: run-android run-ios

android:
	cd app && npm run android

run-ios:
	npm run ios --simulator='iPhone 15 Pro'

server:
	. env/bin/activate && cd api && python manage.py runserver

migrate_changes:
	. env/bin/activate && cd api && python manage.py makemigrations && python manage.py migrate

redis:
	redis-server