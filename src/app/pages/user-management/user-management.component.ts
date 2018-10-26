import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsersService, CasesService, AuthenticationService } from '../../services';
import { CreateCaseService } from '../../services/case/createCase.service';
import { exist } from '../../helpers/exist_item/exist';
import { User, UserDetail} from '../../interfaces';
import {Subject} from "rxjs/Rx";
import {ModalService} from "../../services/modal.service";
import { PasswordValidation } from "../../directives/passwordValidation.directive";

@Component({
	selector: 'app-user-management',
  templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  length = 0;
  showCreateCaseDialog:boolean = false;
  pageSize: number = 10;
  pageNum: number = 0;
  userform: FormGroup;
  userEditForm: FormGroup;
  caseForm: FormGroup;
  currentUser:User;
  public data: string;
  public dataNewUser: any;
	public dataCase = '1';
	public deletedataCase = '1';
  cases: any = {};
  sortedCases: any = {};
  errorMessage: string;
  user: User = new User();
	users: Array<User> = [];
	path: string[] = ['username'];
	order: number = 1; // 1 asc, -1 desc;
	usercheck: number = 0;

  @Input() renderedOnHomePage: boolean = false;

  constructor(
  	formBuilder: FormBuilder, 
  	private router: Router,
  	private route: ActivatedRoute,
  	private usersService: UsersService,
  	private casesService: CasesService,
    private modalService: ModalService,
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
			confirmpassword: ['', [
  			Validators.required,
  			Validators.minLength(5),
  			Validators.maxLength(15)
  		]],
  		roles: new FormArray([
  			new FormControl(),
  			new FormControl()
  		])
  	}, {
			validator: PasswordValidation.MatchPassword
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
			let roles = [];
			if(form.roles[0]){
				roles.push("ROLE_ADMIN");
			}
			if(form.roles[1]){
				roles.push("ROLE_USER");
			}
  		this.dataNewUser = { "username": form.username, "password": form.password, "roles":roles};
  	});
		this.userEditForm.valueChanges.subscribe((form: any) => {
  		this.data = `${form.username}, ${form.password}, ${form.roles}`;
  	});
  }

  ngOnInit() {
  	this.getCasesAndFetchUsesrs();
    this.subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onPage(pageIndex) {
		this.pageNum = pageIndex;

    this.usersService.getUsers({
      pageNum: this.pageNum - 1,
      pageSize: this.pageSize,
    }).subscribe(
			data => {
				this.createUsersArray(data);
			},
			err => console.error(err),
		);
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
	
	sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
	}

  AddUser(){
		this.usersService.getUser(this.dataNewUser['username'])
		.subscribe(
			(resp) => {
				if (this.dataNewUser['username'] in resp) {
					this.usercheck = 1;
				}
				else {
					var length = this.users.length;
					
					this.dataNewUser['roles'].includes('ROLE_ADMIN') ? this.dataNewUser['isAdmin'] = 'Role admin' : this.dataNewUser['isAdmin'] = '';
					this.dataNewUser['roles'].includes('ROLE_USER') ? this.dataNewUser['isUser'] = 'Role user' : this.dataNewUser['isUser'] = '';
					this.users.splice(length, 0, this.dataNewUser);
					this.usersService.createUser(this.dataNewUser)
					.subscribe(
						(resp) => {
							console.log(resp);
						}
					);
					$('.close').click();
				}
			}
		)
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

	deleteUserFromTheCase(user){
		var index;

		for (var i = 0; i< user['cases'].length -1; i++) {
			if (user['cases'][i]['id'] == this.deletedataCase) {
				index = i;
			}
		}

		if (index !== -1) {
			this.casesService.deleteUserFromCase(this.currentUser.username, this.deletedataCase)
				.subscribe(
					(resp) => {
						user['cases'].splice(index, 1);
						$('.close').click();
					},
					(err) => {
						console.log(err);
						console.log('Error');
					}
				);
			this.deletedataCase = '';
		}
	}

  deleteUser(user){
		var index = this.users.indexOf(user);

		if (index !== -1) {
			this.users.splice(index, 1);
			this.usersService.deleteUser(user.username).subscribe();

			$('.close').click();
		}
  }


  exist(item){
	return exist(item);
	}
	
	caseExistInArray(myArray, value) {
		for(var i=0; i<myArray.length; i++) {
			if (myArray[i].id === value.id) {
				return true;
			}
		}
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

	private subscribe(){
    this.modalService.createUserModal$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
				$('.create_user').click();
      });
  }
}
