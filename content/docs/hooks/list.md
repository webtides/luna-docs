---
title: "List of available hooks"
---
# List of available hooks

 - `MOON_INITIALIZE`: Called right before the global moon object is initialized. Here you can modify
    the object
    - `moon`: The global moon object.

 - `HOOKS_LOADED`: Will be called right after all hooks have been loaded.

 - `COMPONENTS_LOADED`: Called after all available components habe been loaded.  
    Parameters:
    - `components`: An array of all available components

 - `ROUTES_BEFORE_REGISTER`: Called before the page and api routes will be registered.  
    Parameters:
    - `router`: The express app instance.

 - `MIDDLEWARE_REGISTER`: Here you can register additional express middleware.  
    Parameters:
    - `app`: The express app instance.

 - `ROUTES_AFTER_REGISTER`: Called after the page and api routes have been registered.  
   Parameters:
    - `router`: The express app instance.

 - `SERVER_STARTED`: Called after the express server has started. Here would be a good place to
 put your startup logic.  
    Parameters:
    - `app`: The express app instance.

 - `REQUEST_RECEIVED`: Will be called on every request, before passing the request to the route,
 but after the middleware registered in the `MIDDLEWARE_REGISTER` hook.
    Parameters:
    - `request`: The express request object.
    - `response`: The express response object.

