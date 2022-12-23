import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef,NzModalService } from 'ng-zorro-antd/modal';
// import { Globals } from '../../services/global.service';
export const environment = {
    // origin: 'http://demo.dreamstep.info/apiv1',
    // origin: 'http://localhost:4901/apiv1'
    // origin: 'http://wms.dreamstep.info:9002/apiv1'
    origin: 'http://localhost:8080'

};

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private router: Router
    ) { console.log("HttpConfigInterceptor loaded")}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("In intercept")
        const token: string = localStorage.getItem('x-access-token') || '';

        let url1 = req.url.indexOf("http") > -1 ? req.url : environment.origin + req.url;
        req = req.clone({ url: url1 });
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        req = req.clone({ withCredentials: true });

        if (token) {
            req = req.clone({ headers: req.headers.set('x-access-token', token) });

            req = req.clone({ headers: req.headers.set('Cache-Control', 'no-cache') });
            req = req.clone({ headers: req.headers.set('Pragma', 'no-cache') });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.headers.get('x-access-token')) {
                        localStorage.setItem('x-access-token', event.headers.get('x-access-token'));
                    }
                    // console.log(event)
                    if (event.status == 200)
                        if (event.body.status == 404) {
                            this.accessDenied(event.body.message);
                        }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status == 406 || error.status == 403) {
                    localStorage.clear();
                    console.log(this.router.url)
                    if (!(this.router.url === '/internal' || this.router.url === '/')) {
                        this.sessionError(error.error.message);
                        this.router.navigate(['/'], { replaceUrl: true });
                    }

                }
                return throwError(error);
            }));
    }


    public accessDenied(message) {
      //  this.message.create('error', `${message}`);
    }
    public sessionError(message) {
        // const modal: NzModalRef = this.modal.error({
        //     nzTitle: `Please login again.`,
        //     nzContent: `${message}`,
        //     nzMaskClosable: false,
        //     nzClosable: false,
        //     nzFooter: [
        //         {
        //             label: 'Ok',
        //             shape: 'round',
        //             onClick: () => {
        //                 modal.destroy()
        //             }
        //         }
        //     ]
        // });
    }
}