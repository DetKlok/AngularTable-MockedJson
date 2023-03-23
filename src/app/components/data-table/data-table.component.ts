import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRowComponent } from '../dialog-add-row/dialog-add-row.component';
import { TableService } from '../../services/table-service/table-service.service'
import { ResponseData, InitialElState } from "../../model/model";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit{
  constructor(
    private http: HttpClient,
    public tableService: TableService,
    public dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource<ResponseData>([]);
  displayedColumns: string[] = this.tableService.columns;

  ngAfterViewInit(): void {
    this.tableService.getTableData().subscribe(res => {
      this.tableService.mockData = res.result;
      this.displayedColumns = this.tableService.getColumns(this.tableService.mockData);
      this.setTableData(this.tableService.mockData);
    });
  }

  trackByFn(index: number, item: ResponseData): string | number | boolean | null | undefined {
    return item['animalId'];
  }

  deleteRow(el: ResponseData):void {
    this.tableService.deleteRow(el);
    this.setTableData(this.tableService.mockData);
    this.cancelEditing();
    this.saveChanges();
  }

  enterEditMode(el: ResponseData, cellName: string, index: number): void {
    this.cancelEditing();
    el['editCellName'] = cellName;
    this.tableService.updateInitialElState(index, el[cellName], cellName);
  }

  cancelEditing(): void {
    if (this.tableService.initialElState.index >= 0) {
      this.tableService.mockData[this.tableService.initialElState.index][this.tableService.initialElState.cell] = this.tableService.initialElState.value;
      this.setTableData(this.tableService.mockData);
      this.tableService.updateInitialElState( -1);
    }
  }

  confirmChanges(): void {
    this.tableService.updateInitialElState( -1);
    this.saveChanges();
  }

  saveChanges(): void {
    this.tableService.toggleHelpers('remove');
    this.tableService.setTableData(this.tableService.mockData).subscribe(res => console.log(res)); //Mock post req
  }

  addRow(el: ResponseData): void {
    this.tableService.addRow(el);
    this.setTableData(this.tableService.mockData);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddRowComponent, {
      data: this.tableService.columns
    });

    dialogRef.afterClosed().subscribe((result: ResponseData) => {
      if (result) {
        this.addRow(result);
        this.saveChanges();
      }
    });
  }

  setTableData(data: ResponseData[]): void {
    this.dataSource.data = data;
    this.tableService.toggleHelpers('add');
  }
}
