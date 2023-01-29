import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userMenu = this.configService.menu.filter((item) => item.url === 'users')[0];
    this.assignInitialUserMenu()
  }

  public assignInitialUserMenu() {
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[2];
      this.userMenu.children.forEach((element: any) => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true
        }
      });
      this.configService.menu.forEach((item) => {
        if (item.url === 'users') {
          item = this.userMenu
        }
      })
    }, 200);
  }


  public changeMenu(item: any) {
    this.userMenu.children = this.userMenu.children.map((data: any) => {
      return { ...data, select: false }
    })

    this.userMenu.children.forEach((data: any) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });

    this.configService.menu.forEach((item) => {
      if (item.url === 'users') {
        item = this.userMenu
      }
    });

    this.router.navigate([`/users/${item.url}`]);

  }

}
