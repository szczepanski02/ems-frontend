import { I_IPRequestWithEmployeeCredentails } from './../../../../interfaces/I_IPRequestWithEmployeeCredentials';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIPsService } from 'src/app/services/employee/employeeIPs.service';
import { SelectionModel } from '@angular/cdk/collections';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { ConfirmationDialogComponent } from 'src/app/shared/reusable-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employees-ips-requests',
  templateUrl: './employees-ips-requests.component.html',
  styleUrls: ['./employees-ips-requests.component.scss']
})
export class EmployeesIpsRequestsComponent implements OnInit {

  dataSource = new MatTableDataSource<I_IPRequestWithEmployeeCredentails>();
  dataTableCopy?: I_IPRequestWithEmployeeCredentails[];
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'ip', 'createdAt'];

  dataSubscription?: Subscription;
  acceptSubscription?: Subscription;
  deleteSubscription?: Subscription;

  searchingValue = '';
  searchByValue = 'username';
  filterModelChanged = new Subject<boolean>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly employeeIPsService: EmployeeIPsService,
    private toastMessageService: ToastMessageService,
    public dialog: MatDialog
  ) {
    this.filterModelChanged.pipe(debounceTime(300)).subscribe(() => {
      if(!this.dataTableCopy) return;
      this.dataSource.data = this.dataTableCopy;
      if(this.searchByValue === 'username') {
        this.dataSource.data = this.dataSource.data.filter(i=>!this.searchingValue||i.createdBy.username&&i.createdBy.username.toUpperCase().includes(this.searchingValue.toUpperCase()));
      } 
      if(this.searchByValue === 'firstName') {
        this.dataSource.data = this.dataSource.data.filter(i=>!this.searchingValue||i.createdBy.firstName&&i.createdBy.firstName.toUpperCase().includes(this.searchingValue.toUpperCase()));
      }
      if(this.searchByValue === 'lastName') {
        this.dataSource.data = this.dataSource.data.filter(i=>!this.searchingValue||i.createdBy.lastName&&i.createdBy.lastName.toUpperCase().includes(this.searchingValue.toUpperCase()));
      } 
    });
  }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.acceptSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

  loadData(): void {
    this.employeeIPsService.getListOfRequests().subscribe(response => {
      this.dataSource.data = response.body;
      this.dataTableCopy = response.body;
    });
  }

  searchingValueChange(): void {
    this.filterModelChanged.next(true);
  }

  handleRowClick(requestId: string, firstName: string, lastName: string) {
    this.openConfirmDeleteDialog(requestId, firstName, lastName);
  }

  openConfirmDeleteDialog(requestId: string, firstName: string, lastName: string): boolean | void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'IP Request acceptation',
        content: `Are you sure to accept IP request from ${ firstName } ${ lastName }?`,
        thButton: {
          content: 'Delete',
          color: 'warn'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.acceptSubscription = this.employeeIPsService.acceptRequest(requestId).subscribe(response => {
          this.toastMessageService.setMessage('IP Requests', response.body, toastMessageType.INFO, 5);
          this.loadData();
        });
      }
      if(result === false) {
        this.deleteSubscription = this.employeeIPsService.removeRequest(requestId).subscribe(response => {
          this.toastMessageService.setMessage('IP Requests', response.body, toastMessageType.INFO, 5);
          this.loadData();
        });
      }
    });
  }

}
