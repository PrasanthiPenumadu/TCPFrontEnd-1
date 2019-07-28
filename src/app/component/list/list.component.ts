import { Component, OnInit } from '@angular/core';
import { CmListService } from '../../services/cm-list.service';
import { DmListService } from '../../services/dm-list.service';
import { NavService } from '../../services/nav.service';
import { Channel } from 'src/app/classes/Channel';
import { CmChatService } from 'src/app/services/cm-chat.service';
import { DirectMessageService } from 'src/app/services/chat.service';

import { Router } from '@angular/router';
import { User } from 'src/app/classes/User';
import { CurrentUser } from 'src/app/classes/CurrentUser';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  channels:Channel[];
  users: CurrentUser[];
  channel:Channel;
  channelBody:Channel;
  add: Boolean = false;
  cname:string;
  cpublics:boolean;
  constructor(
    private loginService:LoginService,
    private cmService: CmListService,
    private dmService: DmListService,
    private navService: NavService,
    private cmChatService: CmChatService,
    private dmChatService: DirectMessageService,
    private router:Router
  ) { }

  ngOnInit() {
      this.listChan();
   }

  listChan(){
    console.log("inside listChan");
    this.cmService.getChannelList()
      .subscribe(channels =>
        {
          console.log(channels);
          this.channels = channels;
        }
      );
    this.users = null;
  }
  listDM(){
    console.log('inside listDM');
    this.dmService.getUserList().subscribe(
      users => {
        console.log(users);
        this.users = users;
      }
    );
    this.channels = null;
  }

  onClick(event: any) {
    if(this.add===false)
    this.add=true;
    else if(this.add===true)
    this.add=false;
    //console.log(this.add);

  }
  
  onClick1(event:any){
this.cmService.postChannel(this.loginService.currentUser.user_id,this.cname,this.cpublics);

  }

  channelClick(channel:Channel){
    //inject channelID into the channel service
    console.log(channel);
    this.cmChatService.channel = channel;
    this.router.navigate(['CM']);
  }

  userClick(user: CurrentUser) {
    console.log(user);
    this.dmChatService.fromUser = user;
    this.router.navigate(['DM']);
  }

}
