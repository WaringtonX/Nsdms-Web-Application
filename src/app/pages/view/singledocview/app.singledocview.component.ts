import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnerDoc } from 'src/app/model/learnerdoc';
import { MersetaService } from 'src/app/service/merseta.service';

@Component({
  selector: 'app-singledocview',
  templateUrl: './app.singledocview.component.html',
})

export class AppSingleDocView implements OnInit {
  userid : string;
  trargetid : string;
  userdocs: LearnerDoc;
  doc :string;
    constructor(private mersetaservice: MersetaService,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) {
       
    }
 
    ngOnInit(): void {
      this.route.params.subscribe(
        params => { 
               // your code
               const uid = atob(params['userid']);
               const tarkey = atob(params['targetkey']);
               this.userid = uid;
               this.trargetid = tarkey;
               console.log("user id = " + this.userid);
               console.log("target id = " + this.trargetid);
      });
      this.getAllUserDocs(this.userid,this.trargetid);
    }

    getAllUserDocs(u_id,t_key) {
      this.mersetaservice.getModeratortDocs(u_id,t_key)
      .subscribe(
         response => {
           this.userdocs = response;
           console.log("For User documents");
           console.log(response);

          // console.log(this.userdocs[0].originalFname);
           var singledocname =  this.userdocs.id;
           var Extension  = this.userdocs.extension;
           var documentu = "http://129.232.234.109/" + singledocname  +"."+ Extension;
            // var singledocname = 
           console.log(documentu);
           this.doc = documentu;
         }
      );
    }
}