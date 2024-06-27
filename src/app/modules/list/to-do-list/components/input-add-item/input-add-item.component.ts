import { IListItems } from './../../../../Interface/IListItems.interface';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, viewChild } from '@angular/core';

import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);



  @ViewChild('inputText') public inputText!: ElementRef;

  @Input({ required: true }) public inputListItems: IListItems[] = [];

  @Output() public outputAddListItem = new EventEmitter<IListItems>();

  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';
      const id = this.generateCustomGuid();

      this.outputAddListItem.emit({
        id,
        checked: false,
        value
      });

      return this.inputText.nativeElement.focus();
    }

  }
  public generateCustomGuid(): string {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}
