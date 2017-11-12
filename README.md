# Online Training website 

> Online Training website like udemy or pluralsight using ASP.Net Core and Angular 4

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/76d4da06634540c39741c7f8afd211f6)](https://www.codacy.com/app/ngohungphuc95/online-training?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ngohungphuc/online-training&amp;utm_campaign=Badge_Grade)
[![codebeat badge](https://codebeat.co/badges/322e5383-f2a2-4d8b-a4d2-b2cda338ee59)](https://codebeat.co/projects/github-com-ngohungphuc-online-training-master)

### Technology use in this project
  -  ASP.Net Core 2.0
  -  Gzip compression
  -  JWT Authentication with refresh token
  -  SignalR Core
  -  Elasticsearch
  -  Automapper
  -  MongoDB
  -  Webpack
  -  Angular 4 CLI
  -  Redux
  -  Effect
  -  SASS
  -  [Bootstrap materialize design](https://mdbootstrap.com) 
  -  [MongoDb Driver](https://github.com/mongodb/mongo-csharp-driver)
  -  Google drive API 
  -  Video streaming
  -  Web job background task

### Ref doc

##### Angular
https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb

https://vsavkin.com/angular-router-declarative-lazy-loading-7071d1f203ee

https://www.pluralsight.com/guides/front-end-javascript/building-a-redux-application-with-angular-2-part-1

https://www.pluralsight.com/guides/front-end-javascript/building-a-redux-application-with-angular-2-part-2

http://brianflove.com/2017/04/10/angular-reactive-authentication/

https://psamsotha.github.io/angular/2016/12/31/ngrx-effects-with-angular.html

https://medium.com/@flashMasterJim/setting-up-ngrx-store-in-an-angular-2-project-e5232a7b082e

https://medium.com/@flashMasterJim/the-basics-of-ngrx-effects-effect-and-async-middleware-for-ngrx-store-in-angular-2-f25587493329

http://4dev.tech/2016/03/login-screen-and-authentication-with-angular2/

https://auth0.com/blog/managing-state-in-angular-with-ngrx-store/

http://brianflove.com/2017/09/09/updating-to-ngrx-4/

https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b

---

##### .Net
http://www.c-sharpcorner.com/article/handle-refresh-token-using-asp-net-core-2-0-and-json-web-token/

https://www.codeproject.com/Articles/608860/Understanding-and-Implementing-Password-Hashing

https://dotnetcoretutorials.com/2017/09/23/using-automapper-asp-net-core/

https://stackoverflow.com/questions/40275195/how-to-setup-automapper-in-asp-net-core

https://medium.com/@renato.groffe/asp-net-core-2-0-autentica%C3%A7%C3%A3o-em-apis-utilizando-jwt-json-web-tokens-4b1871efd

https://code.msdn.microsoft.com/How-to-achieve-a-bearer-9448db57

http://www.talkingdotnet.com/how-to-upload-file-via-swagger-in-asp-net-core-web-api/

http://www.talkingdotnet.com/how-to-enable-gzip-compression-in-asp-net-core/

http://www.talkingdotnet.com/global-exception-handling-in-aspnet-core-webapi/

http://www.talkingdotnet.com/app-use-vs-app-run-asp-net-core-middleware/

http://www.talkingdotnet.com/use-dapper-orm-with-asp-net-core/

---

##### Google drive api
https://www.daimto.com/google-drive-api-c-upload/
##### Deploy

https://blog.devcenter.co/deploy-asp-net-core-2-0-apps-on-heroku-eea8efd918b6


### Url to test authorization

Authentication http://localhost:51316/auth?grant_type=password&client_id=59ee1ba3acf7c53bf4d2504c&username=phucngo&password=070695

Refresh token http://localhost:51316/api/token/auth?grant_type=refresh_token&client_id={client_id}&refresh_token={refresh_token}