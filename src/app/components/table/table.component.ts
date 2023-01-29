import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() actions = {
    edit: false,
    view: false,
    delete: false,
    add: false,
    substract: false
  };
  @Input() disableEditItemWithStatus = false;
  @Input() totalPages = 1;
  @Input() actualPage = 1;
  @Input() height: string | undefined;
  @Input() color: string | undefined;
  @Input() colorText: string | undefined;
  @Input() positionHeader: 'right' | 'center' | 'left' = 'left';
  @Input() positionCells: 'right' | 'center' | 'left' = 'left';
  @Input() border: string | undefined;
  @Input() viewId = false;
  @Input() viewStatus = false;
  @Input() paginator = true;

  @Output('add') addEvent = new EventEmitter<any>();
  @Output('substract') substractEvent = new EventEmitter<any>();
  @Output('delete') deleteEvent = new EventEmitter<any>();  
  @Output('edit') editEvent = new EventEmitter<any>();
  @Output('view') viewEvent = new EventEmitter<any>();
  @Output('back') backEvent = new EventEmitter<any>();
  @Output('next') nextEvent = new EventEmitter<any>();

  keys: string[] = [];


  constructor(
  ) { }

  ngOnChanges() {
    if(this.data?.length > 0){
      this.initValues();
    }
  }

  ngOnInit(): void {
  }

  public initValues() {
    this.keys = Object.keys(this.data[0]);
    this.keys = this.keys.filter(item => item != 'select');
    this.keys = this.keys.filter(item => item != 'notSelect');
    this.keys = this.keys.filter(item => item != 'alarm');    
    if (!this.viewId) this.keys = this.keys.filter(item => item != 'id');
    if (!this.viewStatus) this.keys = this.keys.filter(item => item != 'status');
  }

  get viewActions() {
    return this.actions.delete || this.actions.edit || this.actions.view || this.actions.add || this.actions.substract;
  }

  public onChange(item: any) {
    this.deleteEvent?.emit(item);
  }

  public handleEdit(item: any) {
    this.editEvent?.emit(item);
  }

  public handleView(item: any) {
    this.viewEvent?.emit(item);
  }

  public handleAdd(item: any) {
    this.addEvent?.emit(item);
  }

  public handleSubstract(item: any) {
    this.substractEvent?.emit(item);
  }

  public handleBack() {
    if(this.actualPage == 1){
      return;
    }
    this.backEvent?.emit();
  }

  public handleNext() {
    if(this.actualPage >= this.totalPages){
      return;
    }
    this.nextEvent?.emit();
  }
}
