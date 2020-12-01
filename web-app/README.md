# Front-end Context
The front-end code was developed using Angular (with SCSS).

## Demo of the Front-end
[WebApp](http://sf-aws-web-app.s3-website.us-east-1.amazonaws.com/#/home)

## Use of Angular
To tie together with the backend, I am using Angular that shares similar concepts with NestJS. Angular is a great tool to create a scalable application and to apply good practices for the front-end and general elements of OOP.

## Technologies being used
- [Angular](https://angular.io/)
- [Sentry](https://sentry.io/)
- [AGM (Maps for Angular)](https://github.com/SebastianM/angular-google-maps)
- [RxJS](https://angular.io/guide/rx-library)

## How the resources are being deployed
Built files with `ng build --prod` are being deployed and sync to an AWS S3 bucket using the `npm run deploy` command.

# Architecture
Angular has a very streamlined way to organize its code, based on modules that can import and export dependencies, we can have a better organization of the dependency injection of our code.

## File structure
```
app
│   app.component.html
│   app.component.scss
│   app.component.ts
│   app.module.ts
│   app-routing.module.ts
│   graphql.module.ts
└───common
└───data
└───layout
└───modules
|   └───components
|   └───pages
└───core
|   │   core.module.ts
style
└───abstracts
└───base
└───components
└───layout
└───themes
└───vendor
|   styles.scss
```

## Pages
The pages are rendered with lazy-loading. A page must contain a route path on its module, and each page will be only requested to be downloaded once the user interacts with it.
````
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [MyPageComponent],
})
export class MyPageModule { }
````

And it's required to import it on the `app-routing.module.ts` to create the actual route. Note that each route contains a `data.title` property that is responsible to update the title of the application in run time.

This approach was chosen to increase the scalability of the code. Of course, for now, we only have one route and we don't get any difference, but in the future, that might increase the performance and *save user data*.

*Saving user data: why this is important? When creating an application we need to think not only about usability but also about inclusion. What will happen if a user with a slow internet tries to access my application? If we don't put efforts into reducing our bundle size, we'll be restraining users from accessing the content of our app.*

## Components
Components are small pieces of code that can be utilized on other components or pages. The rule of the thumb applied to the application is that a component must have a single job, for example, rendering a search box. Components must be declared and exported on its respective module, and imported when it needs to be used.

## Services & Core
The application contains a specific `core` folder that is responsible to hold all business and structural logic and data mutation and management.

For example:
- Services
- Interceptors
- Guards
- Caching
- Application configuration

The required features must be declared and exported on the main core module `core.module.ts` to have the dependency injected on the main angular module.

## Data
Structural folder to hold typed objects, interfaces, enums, and others.

## Caching
Caching is a functionality added on `core/cache` that is responsible to identify similar requests, and if required, retrieve the response in-memory instead of calling the API, unless it's excluded on `core/cache/interceptors/http-cache.interceptor.ts`.

This is part of the effort to keep the application scalable and extensible. Large applications could request too much data without the need, increasing the infrastructure cost.

# Error handling & Logging 
The application contains an interceptor (`core/error/interceptors/http-error.interceptor.ts`) responsible to catch all HTTP (backend) related errors and retry. If the interceptor didn't succeed in the second (or X) attempt, the error is automatically caught by our Error Handler (`core/error/error.ts/`) that logs the error to Sentry.

# Design and user experience
The application has its layout constructed with `SCSS` on the 7-1 SASS concept. The structural change only change was that the files related to specific pages are inside angular components. The scss files are imported into the main style.ts that is configured to be rendered inside the `angular.json`.

Besides creating global styles (for buttons, avatar, card), the application also contains a grid system that works with breakpoints based on the viewport.

To start a grid, we need a container `.grid`, followed by `col-{view-port}-{number}` where view-port can be: `desk`, `tab` or `mob`, and the columns can go from 1 to 12. That way, we can specify how the grid should render its content based on devices.

````
<div class="grid">
  <div class="col-desk-12 col-tab-6 col-mob-3">
  </div>
</div>
````

## Utilities
The application contains globally utility classes created from mixins, that helps in the creation of the design pixel-by-pixel. Here are the utilities available:
- margin (1-20)
- padding (1-20)
- width (1-12)
- height (1-12)

and also helper classes to avoid code repetition, for example:
- ellipsis
- uppercase
- left, center, and right text-align

# Layout
This application contains functionality to work with several themes and layout types. This folder is responsible for all-related layout code, not only to make it possible to have several layouts, but also to be able to change this configuration in run time, and save the preferences on the user local storage and/or profile preferences database.

This is also part of the efforts of making the application more extensible, when we grow, it's common to have needs we didn't anticipate at the beginning of the development, such as different layout types, themes, or functionalities of inclusion (eg. color-blind theme). It's a good practice to make the most for our environment to be scalable to avoid rework in the future.

# Installation & Deploy
## Prerequisites
Angular CLI is a required tool to run and deploy this application. To install it run the following code: `npm install -g @angular/cli`

## Deployment

```bash
# build libraries on production mode
$ ng build --prod

# deploy to AWS S3
$ npm run deploy
```
