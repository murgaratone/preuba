import { HostListener, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RolAdmin, RolCleaner, RolManager, RolPartner } from '../models/role';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public loading = false;
  public style = 'default';
  public menuView;
  public menu: any[] = [];
  public preLoginRedirect = false;
  public pageSize = 10;
  public adminUser = new RolAdmin();
  public manageUser = new RolManager();
  public partnerUser = new RolPartner();
  public cleanerUser = new RolCleaner();
  public profiles = [this.adminUser, this.manageUser, this.partnerUser, this.cleanerUser]

  constructor(
    private snackBar: MatSnackBar,
    public storageService: StorageService,
    private router: Router,
  ) {
    this.menuView = this.screenWidth > 660;
    this.filterMenu();
  }

  public setLoadingPage(loading: boolean): void {
    setTimeout(() => {
      this.loading = loading;
    }, 3);

  }

  get role() {
    return this.storageService.getValue('user')?.idProfile;
  }

  public menuInitial = [
    { text: "Home", icon: "home", visible: true, url: "welcome", select: false, role: [1, 2, 3] },
    {
      text: "Usuarios", icon: "manage_accounts", visible: true, url: "users", select: false, role: [1, 2, 3],
      children: [
        { text: "Activos", icon: "", visible: true, url: "active", select: false },
        { text: "Inactivos", icon: "", visible: true, url: "inactive", select: false }
      ]
    },
    { text: "Vehículos", icon: "local_car_wash", visible: true, url: "vehicles", select: false, role: [1, 2, 3] },
    { text: "Ordenes de lavado", icon: "water_drop", visible: true, url: "wash-orders", select: false, role: [1, 2, 3] },
    {
      text: "Inventario", icon: "content_paste_go", visible: true, url: "inventory", select: false, role: [1, 2, 3],
      children: [
        { text: "Productos", icon: "", visible: true, url: "products", select: false, role: [1, 2] },
        { text: "Inventario", icon: "", visible: true, url: "stock", select: false, role: [1, 2, 3] },
        { text: "Histórico", icon: "", visible: true, url: "historical", select: false, role: [1, 2] }
      ]
    },
    { text: "Alarmas", icon: "notifications", visible: true, url: "alarms", select: false, role: [1, 2, 3] },
    { text: "Contabilidad", icon: "calculate", visible: true, url: "accounting", select: false, role: [1, 2, 3],
      children: [
        {text: "Nómina", icon: "", visible: true, url: "payroll", select: false},
        {text: "Costos", icon: "", visible: true, url: "costs", select: false}
      ]
  },
    {
      text: "Configuración", icon: "settings", visible: true, url: "settings", select: false, role: [1, 2, 3],
      children: [
        {text: "Tipo vehículo", icon: "", visible: true, url: "tipo-vehiculo", select: false},
        {text: "Marca", icon: "", visible: true, url: "marca", select: false},
        {text: "Pista", icon: "", visible: true, url: "pista", select: false}
      ]
    },
  ]

  public disableForm(form: FormGroup, disable: boolean): void {
    const keys = Object.keys(form.value);
    keys.forEach((element) => {
      disable ? form.get(element)?.disable() : form?.get(element)?.enable();
    });
  }

  public assignInitialItemMenu() {
    setTimeout(() => {
      const routeParts = this.router.url.split('/');
      let route = routeParts[1];
      this.menu.forEach(element => {
        element.select = false;
        const newElement = element.url.split('/');
        if (route === newElement[0]) {
          element.select = true
        }
      });
    }, 200);
  }

  public validationError() {
    return this.snackBar.open('Revisa que todos los campos estén correctos', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  public loginError() {
    return this.snackBar.open('Usuario y/o contraseña incorrecto', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  public emailError() {
    return this.snackBar.open('Por favor ingresa tu correo para recuperar la contraseña', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  public changeError() {
    return this.snackBar.open('Verifica las condiciones de los datos solicitados.', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  public changeMenu(item: any) {
    this.menu = this.menu.map((data) => {
      return { ...data, select: false }
    })

    this.menu.forEach((data) => {
      if (data.text == item.text) {
        data.select = true;
      }
    });
    if (this.screenWidth <= 660) {
      this.menuView = false;
    }
    this.router.navigate(['/' + item.url]);

  }

  public toggle() {
    this.menuView = !this.menuView;
  }

  filterMenu() {
    this.menu= [];
    const menuX = this.menuInitial.filter((item) => item.role?.find(x => x === this.role));
    this.menu=menuX.map((item) => {
      let menuChild: any[] = [];
      item.children?.forEach((child: any) =>{
        if(!!child.role){
          const exist = child.role?.find((x: any) => x === this.role);
          exist && menuChild.push(child);
        } else{
          menuChild.push(child);
        }
      });
      return{
        ...item,
        children:menuChild,
      }

    });
  }


  public isMobile(): boolean {
    // tslint:disable-next-line: only-arrow-functions
    return (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      ) {
        return true;
      } else {
        return false;
      }
    })(navigator.userAgent || navigator.vendor);
  }

  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get screenWidth(): any {
    return window.innerWidth || document.body.clientWidth;
  }

  get screenHeight(): any {
    return window.innerHeight || document.body.clientHeight;
  }


}
