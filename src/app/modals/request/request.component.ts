import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from '../../services/user.service';
import { RequestsService } from '../../services/requests.service';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd: string = 'yes';
  userSend: User;
  IsmodelShow: boolean = false;
  constructor(private requetsService: RequestsService, public dialogService: DialogService, private userService: UserService, private authenticationService: AuthenticationService) {
    super(dialogService);
    this.ObtenerDatos();
  }

  accept(){
    if(this.shouldAdd == 'yes'){
      this.requetsService.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud aceptada con exito');
        });
      }).catch((error) => {
        console.log(error);
      });
    }else if(this.shouldAdd == 'no'){
      this.requetsService.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    } else if(this.shouldAdd == 'later'){
      this.requetsService.setRequestStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  ObtenerDatos()
{
this.authenticationService.getStatus().subscribe((session)=>
{
 this.userService.getUserById(this.currentRequest.sender).valueChanges().subscribe((data:User)=>
{
      this.userSend=data;
      console.log(this.userSend);
    },(error)=>{
      console.log(error);
    });

    });

 }

}
