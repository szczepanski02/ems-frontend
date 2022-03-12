import { EmployeeProfileService } from './../../../services/employee/employee-profie.service';
import { IEmployee } from './../../../interfaces/IEmployee';
import { EmployeeAuthorityDialogComponent } from './employee-authority-dialog/employee-authority-dialog.component';
import { Router } from '@angular/router';
import { ISuccessResponse } from 'src/app/interfaces/ISuccessResponse';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ITableEmployee } from 'src/app/interfaces/ITableEmployee';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreatorDialogComponent } from './employee-creator-dialog/employee-creator-dialog.component';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { IPageableList } from 'src/app/interfaces/IResPageableList';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.scss']
})
export class EmployeesManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource = new MatTableDataSource<ITableEmployee>();
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'isActive', 'ipVerification','authority', 'actions'];
  pageIndex: number = 1;
  pageSize: number = 10;
  isRoot = this.employeeProfileService.getAuthority();

  dataSubscription?: Subscription;

  searchingValue = '';
  searchByValue = 'username';
  filterModelChanged = new Subject<boolean>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private employeeProfileService: EmployeeProfileService,
    private toastMessageService: ToastMessageService,
    public dialog: MatDialog,
    private router: Router
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
    this.dialog.open(EmployeeCreatorDialogComponent);
  }

  loadData(currentPageIndex: number, currentPageSize: number, filterBy = 'username', filterValue = '' ): void {
    this.dataSubscription = this.employeeService.getAllEmployees(currentPageIndex, currentPageSize, filterBy, filterValue).subscribe({
      next: (response: ISuccessResponse<IPageableList<ITableEmployee>>) => {
        this.dataSource.data = response.body.data;
        setTimeout(() => {
          this.paginator.pageIndex = currentPageIndex - 1;
          this.paginator.pageSize = currentPageSize;
          this.paginator.length = response.body.totalItems;
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

  handleEmployeeEditClick(username: string): void {
    this.router.navigate(['/employees/management/edit/', username]);
  }

  handleEmployeeAuthorityEditClick(username: string) {
    const dialogRef = this.dialog.open(EmployeeAuthorityDialogComponent, {
      data: {
        username
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData(this.pageIndex, this.pageSize, this.searchByValue, this.searchingValue);
    });
  }
  
}
