import { Component, Input, OnInit, computed, input, signal} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tst-header',
  templateUrl: './tst-header.component.html',
  styleUrl: './tst-header.component.css'
})
export class TstHeaderComponent implements OnInit{
  //------------
  //loged = input<boolean>(false);
  private loged = signal<boolean>(false);
  logedComputed = computed(()=> this.loged());
  //role = input<string>('');
  private role = signal<string>('');
  roleComputed = computed(()=>this.role());
  //------------
  constructor(
    private router:Router,
    private userService:UserService
  ){
  }
  //------------
  ngOnInit(): void {
    this.userService.getRole();
    this.loged.set( this.userService.isLogedComputed() );
    this.role.set(this.userService.userComputed());
    console.log(this.role());
  }
  
  logOut(){
    //this.userService
    this.userService.logout();
    this.userService.getRole();
    this.loged.set( this.userService.isLogedComputed() );
    this.role.set(this.userService.userComputed());
    this.router.navigate(['/auth/home']);
  }
}

