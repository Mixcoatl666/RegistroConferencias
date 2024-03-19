import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-tst-header',
  templateUrl: './tst-header.component.html',
  styleUrl: './tst-header.component.css'
})
export class TstHeaderComponent implements OnInit{
  //------------
  public loged:boolean;
  //------------
  constructor(
    private router:Router,
    private userService:UserService
  ){
    this.loged = false;
  }
  //------------
  ngOnInit(): void {
    this.loged = sessionStorage.getItem('tkn') ? true : false ;
  }

  logOut(){
    //this.userService
  }
}

