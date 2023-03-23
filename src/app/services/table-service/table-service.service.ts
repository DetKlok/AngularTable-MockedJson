import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { InitialElState, MockResponse, ResponseData, Column } from "../../model/model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  mockData: ResponseData[];
  columns: string[] = ['Remove'];
  columnsKeyType: Column[] = [{key: 'Remove', dataType: null}];
  initialElState: InitialElState = {
    cell: '',
    value: '',
    index: -1
  };

  constructor(private http: HttpClient) {}

  getTableData(): Observable<MockResponse> {
    return this.http.get<MockResponse>('/data');
  }

  setTableData(body: ResponseData[]): Observable<ResponseData> {
    return this.http.post<ResponseData>('/data', body);
  }

  getColumns(data: ResponseData[]): string[] {
    data.forEach((el: ResponseData) => {
      Object.keys(el).forEach(key => {
        if (this.columnsKeyType.map((col) => {return col.key}).indexOf(key) === -1 && el[key] != null) {
          this.columnsKeyType.push({key: key, dataType: typeof el[key]})
        }
        if (this.columns.indexOf(key) === -1) {
          this.columns.push(key)
        }
      });

    });
    this.columns.forEach(column => {
      if (this.columnsKeyType.map((col) => {return col.key}).indexOf(column) === -1) {
        this.columnsKeyType.push({key: column, dataType: undefined});
      }
    });
    return this.columns;
  }

  getInputType(key: string): string {
    let index = this.columnsKeyType.map((col) => {return col.key}).indexOf(key);
    if (index !== -1) {
      return this.columnsKeyType[index].dataType === 'number' ? 'number' : 'string';
    }
    return 'string'
  }

  updateInitialElState(index: number, value?: string | number | boolean | null | undefined, cellName?: string ): void {
    if (index < 0) {
      this.mockData[this.initialElState.index]['editCellName'] = '';
      this.initialElState.index = -1;
    } else if (cellName) {
      this.initialElState.cell = cellName;
      this.initialElState.value = value;
      this.initialElState.index = index;
    }
  }

  addRow(el: ResponseData): void {
    this.mockData.push(el);
  }

  toggleHelpers(action: string): void {
    this.mockData.forEach((el: ResponseData) => {
      if (action === 'add') {
        el['editCellName'] = '';
        el['Remove'] = '';
      } else if (action === 'remove') {
        delete el['editCellName'];
        delete el['Remove'];
      }
    })
  }

  deleteRow(el: ResponseData): void {
    this.mockData.splice(this.mockData.indexOf(el), 1);
  }
}
