import { Component, OnInit } from '@angular/core';
import { AuditTrailService } from '../../services';
import { AuditTrail, AuditTrailResponse, AuditTrailFilter } from '../../interfaces';
import { debug } from 'util';
import { User } from '../../interfaces';
import { UsersService } from '../../services';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
  audittrail: AuditTrail[] = [];
  length: number = 0;
  pageSize: number = 10;
  pageNum: number = 1;
  selectedUser: string = 'all users';
  currentAudit:AuditTrail;
  user: User = new User();
  users: Array<User> = [];
  t_users: Array<User> = [];
  loading: boolean = true;
  constructor(
    private AuditTrailService: AuditTrailService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getAuditTrailByUsername(
      this.selectedUser, 
      this.pageNum, 
      this.pageSize
    );
    
    this.getTotalPage().subscribe(
      data => {
        var total_page = Math.round(data['count'] / 10);
        for (var i=0; i<=total_page; i++) {
          this.getUsers(i).subscribe(
            data => {
              this.createUsersArray(data);
            },
            err => console.error(err),
          );
        }
      },
      err => console.log(err)
    )
  }

  showList() {
    $('#dropdown__list').toggle();
    $('#dropdown__list li').on('click', function() {
      $('#dropdown__list').hide().siblings('')
    })
  }

  getUsers(pageNum){
    return this.usersService.getUsers({
      pageNum: pageNum,
      pageSize: 10,
    });
  }

  getTotalPage() {
    return this.usersService.getUsers({
      pageNum: 1,
      pageSize: 10,
    });
  }

  onPage(pageIndex) {
    this.pageNum = pageIndex;
    var dateRange = document.getElementById('datepicker') as HTMLInputElement;

    if (dateRange.value) {
      var dateFrom = new Date(dateRange.value.split('-')[0].trim()).getTime();
      var dateTo = new Date(dateRange.value.split('-')[1].trim()).getTime();

      this.getAuditTrailByPeriod(
        dateFrom,
        dateTo,
        this.selectedUser,
        this.pageNum - 1,
        this.pageSize
      )
    }

    else {
      this.getAuditTrailByUsername(
        this.selectedUser, this.pageNum - 1, this.pageSize
      );
    }
  }

  private createUsersArray(data){
    delete data['count'];
    this.users = Object.keys(data).map(user => {
      data[user]['username'] = user;
      data[user].includes('ROLE_ADMIN') ? data[user]['isAdmin'] = 'Role admin' : data[user]['isAdmin'] = '';
      data[user].includes('ROLE_USER') ? data[user]['isUser'] = 'Role user' : data[user]['isUser'] = '';
      return data[user];
    });
    this.t_users.push.apply(this.t_users, this.users);
  }

  search() {
    var dateRange = document.getElementById('datepicker') as HTMLInputElement;

    if (dateRange.value) {
      var dateFrom = new Date(dateRange.value.split('-')[0].trim()).getTime();
      var dateTo = new Date(dateRange.value.split('-')[1].trim()).getTime();

      this.getAuditTrailByPeriod(
        dateFrom,
        dateTo,
        this.selectedUser,
        0,
        this.pageSize
      )
    }

    else {
      this.getAuditTrailByUsername(
        this.selectedUser, this.pageNum -1, this.pageSize
      );
    }
  }

  setCurrentAudit(audit) {
    this.currentAudit = audit;
  }

  private getAuditTrailByUsername(username, pagenum, pagesize) {
    this.AuditTrailService.getAuditByUsername(username, pagenum, pagesize)
      .subscribe(
        (data: AuditTrailResponse) => {
          this.loading = false;
          this.audittrail = data.content.map(audit => {
            let date = new Date(audit['datePerformed']);
            audit['datePerformed'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            var seconds = date.getSeconds().toString();
            if (Number(hours) < 10) {
              hours   = "0" + hours;
            }
            if (Number(minutes) < 10) {
              minutes = "0" + minutes;
            }
            if (Number(seconds) < 10) {
              seconds = "0" + seconds;
            }
            audit['timePerformed'] = hours + ':' + minutes + ':' + seconds;
            return audit;
          });
          this.length = data.totalElements;
        },
        err => console.error(err),
      );
  }

  private getAuditTrailByPeriod(datefrom, dateto, username, pagenum, pagesize) {
    this.AuditTrailService.getAuditByPeriod(datefrom, dateto, username, pagenum, pagesize)
      .subscribe(
        (data: AuditTrailResponse) => {
          this.audittrail = data.content.map(audit => {
            let date = new Date(audit['datePerformed']);
            audit['datePerformed'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            var seconds = date.getSeconds().toString();
            if (Number(hours) < 10) {
              hours   = "0" + hours;
            }
            if (Number(minutes) < 10) {
              minutes = "0" + minutes;
            }
            if (Number(seconds) < 10) {
              seconds = "0" + seconds;
            }
            audit['timePerformed'] = hours + ':' + minutes + ':' + seconds;
            return audit;
          });
          this.length = data.totalElements;
        },
        err => console.error(err),
      );
  }

}
