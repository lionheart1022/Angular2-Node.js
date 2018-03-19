import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsersService, CasesService, AuthenticationService } from '../../services';
import { CreateCaseService } from '../../services/case/createCase.service';
import { exist } from '../../helpers/exist_item/exist';
import { User, UserDetail} from '../../interfaces';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  length = 0;
  showCreateCaseDialog:boolean = false;
  pageSize: number = 10;
  pageNum: number = 0;
  userform: FormGroup;
  userEditForm: FormGroup;
  caseForm: FormGroup;
  currentUser:User;
  public data: string;
  public dataCase = '1';
  cases: any = {};
  sortedCases: any = {};
  errorMessage: string;
  user: User = new User();
  users: Array<User> = [];

  @Input() renderedOnHomePage: boolean = false;

  constructor(
  	formBuilder: FormBuilder, 
  	private router: Router,
  	private route: ActivatedRoute,
  	private usersService: UsersService,
  	private casesService: CasesService,
  	private auth: AuthenticationService,
  	private CreateCaseService: CreateCaseService
  	)
  {
  	this.userEditForm = formBuilder.group({
  		username: ['', [
  			Validators.required,
  			Validators.minLength(3)
  		]],
  		password: ['', [
  			Validators.required,
  			Validators.minLength(5),
  			Validators.maxLength(15)
  		]],
  		roles: new FormArray([
  			new FormControl(),
  			new FormControl()
  		])
  	});

		this.userform = formBuilder.group({
  		username: ['', [
  			Validators.required,
  			Validators.minLength(3)
  		]],
  		password: ['', [
  			Validators.required,
  			Validators.minLength(5),
  			Validators.maxLength(15)
  		]],
  		roles: new FormArray([
  			new FormControl(),
  			new FormControl()
  		])
  	});

    // this.caseForm = formBuilder.group({
			// options: ['1', [
  	// 		Validators.required
  	// 	]]
  	// });

  	// this.caseForm.valueChanges.subscribe((form: any) => {
			// this.dataCase = form.options;
  	// });
		this.userform.valueChanges.subscribe((form: any) => {
  		this.data = `${form.username}, ${form.password}, ${form.roles}`;
  	});
		this.userEditForm.valueChanges.subscribe((form: any) => {
  		this.data = `${form.username}, ${form.password}, ${form.roles}`;
  	});
  }

  ngOnInit() {
  	this.getCasesAndFetchUsesrs();
  }

  onPage(pageIndex) {
    this.pageNum = pageIndex;

    this.usersService.getUsers({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  Save() {
  	var result, 
  		userValue = this.userform.value;
  	if (userValue.username){
  		result = this.usersService.updateUser(userValue);
  	}
  	else {
  		result = this.usersService.createUser(userValue);
  	}
  	result.subscribe(data=>this.router.navigate(['user-management']));
  }

	addUserTOTheCase(){
  	this.casesService.addUsertoCase(this.currentUser.username, this.dataCase)
			.subscribe(resp => {
				console.log(resp);
				this.users.map((user => {
					if(user.username === this.currentUser.username) {
						user['cases'].push({
							name: resp['name'],
							targets: resp['targets'],
							id: resp['id']
						});
						$('.close').click();
            this.dataCase = '';
					}
				}))
			});
  	console.log(this.dataCase);

	}

  deleteUser(user){
  	if (confirm("Are you sure you want to delete " + user.username + "?")) {
  		var index = this.users.indexOf(user);
  		this.users.splice(index, 1);

  		this.usersService.deleteUser(user.username)
  		  .subscribe(null,
  		  	err => {
  		  		alert("Could not delete user.");
  		  		this.users.splice(index, 0, user);
  		  	});
  	}
  }


  exist(item){
	return exist(item);
  }

  setCurrentUser(user:User){
	this.currentUser = user;
  }

  changeVisiblesCreateCaseDialog(){
	this.showCreateCaseDialog = false;
  }

  successAddCase(item: any) {
	this.casesService.addCases(item);
  }

  private createUsersArray(data){
	this.length = data['count'];
	delete data['count'];
	this.users = Object.keys(data).map(user => {
        data[user]['username'] = user;
        data[user]['cases'] = this.sortedCases[user];
        data[user].includes('ROLE_ADMIN') ? data[user]['isAdmin'] = 'Role admin' : data[user]['isAdmin'] = '';
        data[user].includes('ROLE_USER') ? data[user]['isUser'] = 'Role user' : data[user]['isUser'] = '';
        return data[user];
    });
  }

  private  getCasesAndFetchUsesrs(){
    this.getCases().subscribe(
    	(cases: any) => {
					this.cases = cases;
					this.sortedCases = this.sortingCasesByUserName(cases);
					this.getUsers().subscribe(
			data => {
						this.createUsersArray(data);
					 },
			err => console.error(err),
					);
    });
  }

  private getCases(){
    return this.casesService.getCases();
  }

  private getUsers(){
    return  this.usersService.getUsers({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }
  private sortingCasesByUserName(cases){
	let data = {};
	cases.map((item) => {
    item.assignedUsers.map(assignedUser => {
      if(typeof data[assignedUser] === 'undefined'){
        data[assignedUser] = [];
      }
      data[assignedUser].push(
        {
          name: item.name,
          targets: item.targets,
          id: item.id
        }
      );
		});

	});
		return data;
	}
}
