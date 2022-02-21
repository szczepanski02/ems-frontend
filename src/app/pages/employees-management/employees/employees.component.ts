import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { IResPageableList } from 'src/app/interfaces/IResPageableList';
import { ITableEmployee } from 'src/app/interfaces/ITableEmployee';
import { EmployeesManagementService } from 'src/app/services/employee/employees-management.service';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreatorDialogComponent } from './employee-creator-dialog/employee-creator-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource = new MatTableDataSource<ITableEmployee>();
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'isActive', 'role'];
  pageIndex: number = 1;
  pageSize: number = 10;

  dataSubscription?: Subscription;

  searchingValue = '';
  searchByValue = 'username';
  filterModelChanged = new Subject<boolean>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeesManagementService: EmployeesManagementService,
    private toastMessageService: ToastMessageService,
    public dialog: MatDialog
  ) {
    this.filterModelChanged.pipe(debounceTime(300)).subscribe(() => {
      this.loadData(this.pageIndex, this.pageSize, this.searchByValue, this.searchingValue);
    });
  }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.loadData(1, 10);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  openEmployeeCreator() {
    const dialogRef = this.dialog.open(EmployeeCreatorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadData(currentPageIndex: number, currentPageSize: number, filterBy = 'username', filterValue = '' ): void {
    this.dataSubscription = this.employeesManagementService.getAllEmployees(currentPageIndex, currentPageSize, filterBy, filterValue).subscribe({
      next: (response: IResPageableList<ITableEmployee>) => {
        this.dataSource.data = response.responseObject.data;
        setTimeout(() => {
          this.paginator.pageIndex = currentPageIndex - 1;
          this.paginator.pageSize = currentPageSize;
          this.paginator.length = response.responseObject.totalItems;
        });
      },
      error: () => {
        this.toastMessageService.setMessage('Server error', 'Cannot load data... Contact with root', toastMessageType.ERROR, 5);
      }
    });
  }

  paginatorSetupChange(e: PageEvent): void {
    this.loadData(e.pageIndex + 1, e.pageSize);
    this.pageIndex = e.pageIndex + 1;
    this.pageSize = e.pageSize;
  }

  searchingValueChange(): void {
    this.filterModelChanged.next(true);
  }

}
