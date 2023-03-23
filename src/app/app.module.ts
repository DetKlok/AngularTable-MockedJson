import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MockBackendInterceptorService } from './services/mock-backend-interceptor/mock-backend-interceptor.service';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddRowComponent } from './components/dialog-add-row/dialog-add-row.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CamelCaseTransformPipe } from './pipes/camel-case-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DialogAddRowComponent,
    ClickOutsideDirective,
    CamelCaseTransformPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
