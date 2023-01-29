import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public inventoryMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.inventoryMenu = this.configService.menu.filter((item) => item.url === 'inventory')[0];
    this.assignInitialInventoryMenu()
  }

  public assignInitialInventoryMenu() {
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[2];
      this.inventoryMenu.children.forEach((element: any) => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true
        }
      });
      this.configService.menu.forEach((item) => {
        if (item.url === 'inventory') {
          item = this.inventoryMenu
        }
      })
    }, 200);
  }

  public changeMenu(item: any) {
    this.inventoryMenu.children = this.inventoryMenu.children.map((data: any) => {
      return { ...data, select: false }
    })

    this.inventoryMenu.children.forEach((data: any) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });

    this.configService.menu.forEach((item) => {
      if (item.url === 'inventory') {
        item = this.inventoryMenu
      }
    });

    this.router.navigate([`/inventory/${item.url}`]);
  }

}
