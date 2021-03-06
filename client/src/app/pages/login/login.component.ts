import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService, IUser } from '../../_services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public user: IUser = {};
	public errorMessage: string;

	constructor(private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) { }

	ngOnInit(): void {
	}

	onSubmit(): void {
		if (!this.user.email) this.errorMessage = 'The email field is required';
		if (!this.user.password) this.errorMessage = 'The password field is required';
		this.authService.login(this.user).subscribe(
			res => {
			this.tokenStorageService.setToken(res.token);
			this.router.navigateByUrl('categories');
			},
			err => this.errorMessage = 'Invalid credentials'
		);
	}
}