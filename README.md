# ng starter #

Light-weight starter project for web clients based on dotnet core mvc and angular


## Getting started ##
 
**Development**

Set the ASPNETCORE_ENVIRONMENT on your machine. On windows this can be done with the following 
command.
```
setx ASPNETCORE_ENVIRONMENT "Development"
```
 
Install needed npm packages
```
npm install
```

Bundle vendor assets so they can be referenced in incremental builds
```
npm run webpack-vendor
```
  
Run the application
```
npm start
```

Run unit tests
```
npm run test:watch
```

Run playground
```
npm run test:watch
```

**Production**

Call dotnet core's publish command. It will install the needed npm packages, run unit tests and 
needed build steps.
```
dotnet publish
```