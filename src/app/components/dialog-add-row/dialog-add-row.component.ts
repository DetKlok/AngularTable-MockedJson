import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableService } from "../../services/table-service/table-service.service";

@Component({
  selector: 'app-dialog-add-row',
  templateUrl: './dialog-add-row.component.html',
  styleUrls: ['./dialog-add-row.component.scss']
})
export class DialogAddRowComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private formBuilder: FormBuilder,
    public tableService: TableService,
  ) {}

  groupObj: Object = {};
  tableRowForm: FormGroup;

  ngOnInit(): void {
    this.groupObj = Object.fromEntries(this.data.map(key => [key, '']));
    this.tableRowForm = this.formBuilder.group(this.groupObj);
  }
}
