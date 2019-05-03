import {Component, OnInit} from '@angular/core';
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  constructor(private userService: UserService,
              private autheticationService: AuthenticationService,
              private router: Router) {
    userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  logOut() {
    this.autheticationService.logOut().then(()=> {
      alert('LogOut');
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error);
    });
  }

}
