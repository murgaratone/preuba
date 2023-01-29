import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingsMenu: any = {};

  constructor(
    public configService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.settingsMenu = this.configService.menu.filter((item) => item.url === 'settings')[0];
    this.assignInitialSettingsMenu()
  }

  public assignInitialSettingsMenu() {
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[2];
      this.settingsMenu.children.forEach((element: any) => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true
        }
      });
      this.configService.menu.forEach((item) => {
        if (item.url === 'settings') {
          item = this.settingsMenu
        }
      })
    }, 200);
  }

  public changeMenu(item: any) {
    this.settingsMenu.children = this.settingsMenu.children.map((data: any) => {
      return { ...data, select: false }
    })

    this.settingsMenu.children.forEach((data: any) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });

    this.configService.menu.forEach((item) => {
      if (item.url === 'settings') {
        item = this.settingsMenu
      }
    });

    this.router.navigate([`/settings/${item.url}`]);

  }

}
