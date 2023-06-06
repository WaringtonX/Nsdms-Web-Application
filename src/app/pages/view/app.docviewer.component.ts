import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ConfigDoc } from 'src/app/model/configdoc';
import { DocByte } from 'src/app/model/docbyte';
import { LearnerDoc } from 'src/app/model/learnerdoc';
import { MersetaService } from 'src/app/service/merseta.service';
import { SystemTasks } from "src/app/model/systemtasks";

@Component({
  selector: 'app-docviewer',
  templateUrl: './app.docviewer.component.html',
})
export class AppDocViewerComponent implements OnInit {

  docbyteuser : DocByte;
  doc_id : number = 0;
  docid : string;
  userid : string;
  trargetid : string;
  doc :string;
  Documents: any[] = [];
  configdocs: ConfigDoc[] = [];
  userdocs: LearnerDoc[] = [];


  constructor(private mersetaservice: MersetaService,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef,public app: AppComponent, private router: Router,private location: Location,) {
       
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      params => { 
             // your code
             const id = Number(atob(params['docid']));
             const u = atob(params['uid']);
             const t = atob(params['target']);
             this.doc_id = id;
             this.userid = u;
             this.trargetid = t;
             this.docid = id.toString();
             console.log("doc id = " + this.doc_id);
             console.log("user id = " + this.userid);
             console.log("target id = " + this.trargetid);
    });
     
    this.getDocbyte(this.doc_id,);
    this.getAllConfigdocs(this.userid,this.trargetid);
  }

  getAllConfigdocs(uid,learnid) {
    this.mersetaservice.getAllDocConfig()
    .subscribe(
       response => {
         this.configdocs = response;
         this.getAllUserDocs(uid,learnid);
         console.log("For config docs");
         console.log(response);
       }
    );
  }

  getAllUserDocs(u_id,t_key) {
    this.mersetaservice.getAllDocs(u_id,t_key)
    .subscribe(
       response => {
         this.userdocs = response;
         console.log("For User documents");
         console.log(response);
         
         for(let uds of this.userdocs) {
              var docname = uds.originalFname;
              var id = uds.id;
              var desname =  this.configdocs.filter(x => x.id == uds.configDocId)[0].name;
              this.Documents.push({Id : id,docname : docname,docdescription : desname});
          }
        // console.log(this.userdocs[0].originalFname);
         var singledocname =  this.userdocs.filter(x => x.id == this.docid)[0].id;
         var Extension  = this.userdocs.filter(x => x.id == this.docid)[0].extension;
         var documentu = "http://129.232.234.109/" + singledocname  +"."+ Extension;
          // var singledocname = 
         console.log(documentu);
         this.doc = documentu;
       }
    );
  }

  getDocbyte(doc_id) {
    this.mersetaservice.getAllDocBytes(doc_id)
    .subscribe(
       response => {
         this.docbyteuser = response; 
         const byteCharacters = atob(this.docbyteuser[0].data);
         const byteNumbers = new Array(byteCharacters.length);
         for (let i = 0; i < byteCharacters.length; i++) {
           byteNumbers[i] = byteCharacters.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         const blob = new Blob([byteArray], {type: 'application/pdf'});
         console.log(blob);
         var fileURL = URL.createObjectURL(blob);
         window.open(fileURL);
         console.log(fileURL);
         this.doc = fileURL;
       }
    );

 }

 //////////////////////////////////////////////////////////////IMPLEMENTATION OF THE BACK BUTTON/////////////////////////////////////////////////////////////////////////////


 //Function that handles the click event for the Back Button
 goback() {
  this.location.back();
}


}
