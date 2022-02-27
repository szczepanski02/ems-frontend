import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastMessageService } from './../../../../shared/reusable-components/toast-message/toast-message.service';
import { EmployeeIPsService } from 'src/app/services/employee/employeeIPs.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeProfileService } from 'src/app/services/employee/employee-profie.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/shared/reusable-components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile-ips-details',
  templateUrl: './profile-ips-details.component.html',
  styleUrls: ['./profile-ips-details.component.scss']
})
export class ProfileIpsDetailsComponent implements OnInit, OnDestroy {

  getListOfIpsSubscription?: Subscription;
  deleteIPSubscription?: Subscription;

  dataSource = new MatTableDataSource<string>();
  displayedColumns: string[] = ['ip', 'action'];
  
  constructor(
    private employeeIPsService: EmployeeIPsService,
    private toastMessageService: ToastMessageService,
    private employeeProfileService: EmployeeProfileService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const employeeId = this.employeeProfileService.getId();
    if(!employeeId) {
      return this.toastMessageService.setMessage(
        'Profile',
        'Cannot get your ID, please raport it to IT Support',
        toastMessageType.ERROR, 5);
    }
    this.getListOfIpsSubscription = this.employeeIPsService.getVerifiedRequestsOfAuthorizatedEmployee(employeeId)
    .subscribe(response => {
      this.dataSource.data = response.body;
    });
  }

  ngOnDestroy(): void {
    this.getListOfIpsSubscription?.unsubscribe();
    this.deleteIPSubscription?.unsubscribe();
  }

  openConfirmDeleteDialog(ip: string): boolean | void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Verified IP deletion',
        content: `Are you sure to delete verified IP ${ ip }?`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteIPSubscription = this.employeeIPsService.deleteVerificatedIPOfAuthorizatedEmployee(ip).subscribe(response => {
          this.toastMessageService.setMessage('Verified IP', response.body, toastMessageType.INFO, 5);
          this.loadData();
        });
      }
    });
  }

}
