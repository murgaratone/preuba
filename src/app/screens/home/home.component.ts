import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigurationService } from 'app/shared/services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
  }

  constructor(
    public configService: ConfigurationService
  ) { }

  ngOnInit(): void {
    this.configService.assignInitialItemMenu();
  }

}
