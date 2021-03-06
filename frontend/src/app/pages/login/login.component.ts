import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginButtonClick(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        this.router.navigate(['/lists']);
      }
      console.log(res);
    });
  }
}
