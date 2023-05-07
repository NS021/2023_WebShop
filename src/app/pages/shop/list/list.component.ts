import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() shopObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;

  constructor() { }

  ngOnChanges(): void {
    if (this.shopObjectInput){
    this.chosenImage = this.shopObjectInput[0];
    this.reload();
    }
  }

  ngOnInit(): void {
  }

  reload() {
    this.imageObjectEmitter.emit(this.chosenImage);
  }
}
