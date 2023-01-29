import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmsService } from 'app/screens/home/alarms/services/alarms.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  public notifications: number = 0;

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService,
    private router: Router,
    private alarmsService: AlarmsService
  ) { }

  async ngOnInit(): Promise<void> {
    const alarms = await this.alarmsService.getNotifications();
    this.notifications= alarms?.length;
  }

  goAlarms(){
    this.router.navigate([`alarms`]);
  }


  logOut() {
    this.storageService.cleanUser();
    this.router.navigate([`login`]);
  }
}
