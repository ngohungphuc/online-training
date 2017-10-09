import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';


export class PreloadSelectedModulesList implements PreloadingStrategy {
    /**
     *
     * The preload method takes two parameters:
     *  a route and the function that actually does the preloading.
     *  In it we check if the preload property is set to true.
     * And if it is, we call the load function.
     * @param {Route} route
     * @param {Function} load
     * @returns {Observable<any>}
     * @memberof PreloadSelectedModulesList
     */
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preload ? load() : Observable.of(null);
    }
}