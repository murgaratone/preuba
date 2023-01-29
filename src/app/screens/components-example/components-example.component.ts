import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-components-example',
  templateUrl: './components-example.component.html',
  styleUrls: ['./components-example.component.scss']
})
export class ComponentsExampleComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm | undefined;

  public form: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      lastName: ['Orjuela', [Validators.required]],
    }, {
    });
  }

}
