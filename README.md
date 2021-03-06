# Baan

PWA to demonstrate Ionic 4 and Firebase.


## Using Firebase Cloud Functions

npm install -g firebase-tools

firebase login

firebase init functions

firebase deploy --only functions
firebase deploy --only functions:countTasks (to deploy a selected function)

Resources
https://firebase.google.com/docs/functions/typescript
https://www.javascripttuts.com/using-firebase-cloud-functions-in-an-ionic-application/
https://firebase.google.com/docs/reference/functions/

## Creating a PWA

```
ng add @angular/pwa
```

https://itnext.io/turning-an-angular-6-app-into-a-progressive-web-app-9e6fc6361ba6


## Migrating from sw-toolbox to workbox (Service Worker)

Reference:
https://golb.hplar.ch/2017/11/Ionic-with-Workbox-Service-Worker.html

## Deep routing Angualar application when hosting on Apache

Use an .htaccess file with this rewrite rule:

```
<IfModule mod_rewrite.c>
  Options Indexes FollowSymLinks
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
Where RewriteBase should correspond to ```<base href='/'>``` in index.html.

## Cache-control on server

For Apache and Nginx: https://varvy.com/pagespeed/cache-control.html#htaccess


## Secure an ASP.NET Core api with Firebase

https://blog.markvincze.com/secure-an-asp-net-core-api-with-firebase/


## Angular Reactive Templates with ngIf and the Async Pipe

https://blog.angular-university.io/angular-reactive-templates/


## Customizing Ionic Apps for Web & Mobile

https://blog.ionicframework.com/customizing-ionic-apps-for-web-mobile/

## Version stamping your app with Angular CLI

https://medium.com/@amcdnl/version-stamping-your-app-with-the-angular-cli-d563284bb94d
