import { Component, AfterViewInit } from "@angular/core";
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent  implements AfterViewInit {
    shortcuts: ShortcutInput[] = [];
    constructor(
        private router: Router  ) {}
    ngAfterViewInit() {
      this.shortcuts.push(
        {
          key: ["cmd + d"],
          label: "Dashboard",
          description: "Cmd + d",
          command: (e) => this.router.navigate(['/internal/dashboard']),
          preventDefault: true
        },
        {
          key: ["cmd + r"],
          label: "Reports",
          description: "Cmd + r",
          command: (e) => this.router.navigate(['/internal/reports/list']),
          preventDefault: true
        },
        {
          key: ["cmd + s"],
          label: "Setup and Configure",
          description: "Cmd + s",
          command: (e) => this.router.navigate(['/internal/setup/list']),
          preventDefault: true
        },
        {
          key: ["cmd + h"],
          label: "Help",
          description: "Cmd + h",
          command: (e) => this.router.navigate(['/internal/help']),
          preventDefault: true
        }
      );
    }
}
