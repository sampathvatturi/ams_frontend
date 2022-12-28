import { Injectable,EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject,Subject } from 'rxjs';

@Injectable()
export class HeaderService {
    
    // Theme Config
    isMenuFolded: boolean = false
    isSideNavDark: boolean = false;
    headerColor: string = 'default';
    headerTitle: string = '';
    emitheaderTitle: EventEmitter<string> = new EventEmitter<string>();
    _headerTitleChange:Subject<string> = new Subject<string>();
    constructor()  {
        this._headerTitleChange.subscribe((value) => {
            console.log("this.headerTitle :: "+this.headerTitle)
            this.headerTitle = value
        });
    }

    set_headerTitle(headerTitle: string) {
        this._headerTitleChange.next(headerTitle);
        // this.headerTitle = headerTitle
        console.log("Setting the header tilte to "+headerTitle)
        // this.headerTitle=headerTitle;
        // console.log(this._headerTitle)
        console.log("In set_headerTitle ::"+this._headerTitleChange)
      }
      
    //   getObservable() {
    //     return this._headerTitle.asObservable();
    //   }

    // private currentHeaderTitle = new BehaviorSubject(this.headerTitle);
    // selectHeaderTitle   = this.currentHeaderTitle.asObservable();



    getHeaderTitle() {
        return this.headerTitle;
    }

    setHeaderTitle(title: string) {
        // console.log("setting current header  :: "+title)
        this._headerTitleChange.next(title)
        this.headerTitle=title;
        // console.log("this.currentHeaderTitle :: "+JSON.stringify(this.currentHeaderTitle))
        // console.log("this.headerTitle ::"+this.headerTitle)
        console.log("Emiting data from setHeaderTitle :: "+this.headerTitle)
        this.emitheaderTitle.emit(this.headerTitle)

    }

    private isMenuFoldedActived = new BehaviorSubject<boolean>(this.isMenuFolded);
    isMenuFoldedChanges: Observable<boolean> = this.isMenuFoldedActived.asObservable();

    private currentHeaderColor = new BehaviorSubject(this.headerTitle);
    selectedHeaderTitle = this.currentHeaderColor.asObservable();


    toggleFold(isFolded: boolean) {
        
        this.isMenuFoldedActived.next(isFolded);
        console.log("In header service toggleFold ::"+isFolded)
    }


    changeHeaderTitle(color: string) {
        this.currentHeaderColor.next(color)
    }


}