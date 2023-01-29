import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {

  public accountingMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountingMenu = this.configService.menu.filter((item) => item.url === 'accounting')[0];
    this.assignInitialAccountingMenu()
  }

  public assignInitialAccountingMenu (){
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[2];
      this.accountingMenu.children.forEach((element: any) => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true
        }
      });
      this.configService.menu.forEach((item) => {
        if (item.url === 'accounting') {
          item = this.accountingMenu
        }
      })
    }, 200);
  }

  public changeMenu(item: any) {
    this.accountingMenu.children = this.accountingMenu.children.map((data: any) => {
      return { ...data, select: false }
    })

    this.accountingMenu.children.forEach((data: any) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });

    this.configService.menu.forEach((item) => {
      if (item.url === 'accounting') {
        item = this.accountingMenu
      }
    });

    this.router.navigate([`/accounting/${item.url}`]);

  }

}
