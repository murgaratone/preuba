import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostsService } from './costs.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit {

  public viewMenu = false;
  public viewBasic = false;
  public viewCombos = false;
  public basicList = [{name: 'Producto', url:'product'},{name: 'Salario', url:'salary'}, {name: 'Costos Fijos', url:'fixed'}]
  public combosList =[{name: 'Lavado Básico', url:'basic-wash', id: '1'}];
  constructor(
    private router: Router,
    public costsService: CostsService
  ) { }

  async ngOnInit(): Promise<void> {
    const list = await this.costsService.getCombos();
    list.forEach(element => {
      if(element.id != '1'){
        this.combosList.push({name:element.name, url:'view-combo', id:element.id})
      }
    });

    console.log(this.combosList);
    
  }

  public goRoute(route: string, id?: string) {
    if(id){
      this.router.navigate([`/accounting/costs/${route}`, id]);
    } else{
      this.router.navigate([`/accounting/costs/${route}`]);
    }
    
    this.viewMenu=false;
    this.viewBasic=false;
    this.viewCombos=false;
  }

}
