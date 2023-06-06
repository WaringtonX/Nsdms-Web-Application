import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { GalleriaThumbnails } from 'primeng/galleria';
import { first } from 'rxjs/operators';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { AssessmentProcessBatch } from 'src/app/model/assessmentprocessbatch';
import { AssessmentProcessBatchDetail } from 'src/app/model/assessmentprocessbatchdetail';
import { AssessorList } from 'src/app/model/assessorlist';
import { Company } from 'src/app/model/company.model';
import { CompLearner } from 'src/app/model/complearner.model';
import { SaqaQualification } from 'src/app/model/Saqa.model';
import { SummativeAssessmentReport } from 'src/app/model/summativeassessmentreport';
import { SmmativeAssessmentReportUnitstandards } from 'src/app/model/summativeassessmentreportunitstandards';
import { User } from 'src/app/model/users.model';
import { MersetaService } from 'src/app/service/merseta.service';

@Component({
  selector: 'app-learnerassessmentmoderation',
  templateUrl: './app.learnerassessmentmoderation.component.html',
})

export class AppLearnerAssessmentModeration implements OnInit {
  QualDetails : string;
  qualid : any;
  moderatorsearchlist : any[] = [];
  madaratorslist: AssessorList[] = [];
  singleassessor: AssessorList;
  foundmodlist: AssessorList[] = [];
  moderatorsearchlists : any[] = [];
  selectedmoderator : any;
  selectedbatch : any;
  companyid : any;
  samesize : any;
  moddate : any;
  selectedAll : any;
  singuser : User;
  sdpuser : User;
  modusers : User [] = [];
  OnbjecttoView: any[] = [];
  SearchedView: any[] = [];
  userobjects: any[] = [];
  BatchList: any[] = [];
  company : Company;
  assessmentbacth: AssessmentProcessBatch[] = [];
  assessmentbacthdetail: AssessmentProcessBatchDetail[] = [];
  sdp_id : any;
  sumativebatch_id : any;
  selectedlearner : any;
  isDisabledall : boolean = false;
  summativeassessment: SummativeAssessmentReport [] = [];
  summativeassessmentunitstandardreport : SmmativeAssessmentReportUnitstandards[] = [];
  msgs: Message[] = [];
  msgss: Message[] = [];
  randombacthnumber : any;
  saquaQualification : SaqaQualification;
  fileToUpload: File | null = null;
  files:string | ArrayBuffer=null;
  filename :string;

  constructor(private mersetaservice: MersetaService,private route: ActivatedRoute,private service: MessageService,private breadcrumbService: AppBreadcrumbService,private router: Router) {
    this.breadcrumbService.setItems([
      {label: 'UI Kit'},
      {label: 'Messages'}
   ]);
  }

  ngOnInit(): void {
    this.QualDetails = "(21013) National Certificate: Power and Telecommunication Cable Manufacturing";
    document.getElementById("qualifcationdetails").innerHTML = this.QualDetails;

    this.route.params.subscribe(
      params => { 
             // your code
             const qual = atob(params['assesqualid']);
             this.qualid = qual;
             const compid = atob(params['compid']);
             this.companyid = compid;
             console.log("Saqual Qualification = " + this.qualid);
       });
      this.sdp_id = this.mersetaservice.user_ID;
      console.log("Sdp_id: ",  this.sdp_id );
      console.log("company_id: ",  this.companyid );
      this.getSaquaQualification(this.qualid);
      this.getModeraorList(this.qualid);
      this.getSingleUserSdp(this.sdp_id);
      this.getSingleCompany(this.companyid);
      this.getSummmativeAssessmentReportByQual(this.qualid, this.companyid);
      this.getAssessBatch(this.sdp_id,this.companyid);
  }

  getSaquaQualification(id) {
    this.mersetaservice.getSaqaQualification(id)
    .subscribe(
       response => {
         this.saquaQualification = response;
         document.getElementById("qualifcationdetails").innerHTML = "(" + this.saquaQualification.qualificationidString + ") "  + this.saquaQualification.qualificationtitle;
         console.log(response);
         console.log("yooooooooo");     
       }
    );
  } 

  onSelectLearner(evenet) {
      console.log("Learner : ", this.selectedlearner);
      console.log("Learner : ", this.selectedlearner.firstName);
      if(this.selectedlearner != null) {
        let query =  this.selectedlearner.firstName;
        let filtered: any[] = [];
        for (let i = 0; i < this.OnbjecttoView.length; i++) {
            let country = this.OnbjecttoView[i];
            if (country.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
      
        this.SearchedView = filtered;
       }else {
        console.log("null users ");
        this.SearchedView  = this.OnbjecttoView;
       }
  }


  getModeraorList(id) {
    this.mersetaservice.getModarators(id)
    .subscribe(
       response => {
         this.madaratorslist = response;
         this.madaratorslist.forEach(obj => {
          var object = {id:obj.id,modatorssorname:obj.firstName + " " + obj.lastName + " " + obj.rsaIdNumber};
          var objects = {id:obj.id,modatorssorname:obj.firstName + " " + obj.lastName};
          this.moderatorsearchlist.push(object);
          this.moderatorsearchlists.push(objects);
        });
         console.log("/////////////// Assessors");
         console.log(this.madaratorslist);
       }
    );
  }


  myUploaderWBLdocs(event,value) {
    event.files;
    console.log("Woooooooooooooow");
    console.log(event.files);
    console.log(event.files[0]["name"]);
    console.log("user_id: ", value);
    console.log();
    this.fileToUpload =  event.files[0];
    this.filename = event.files[0]["name"];
    console.log(this.fileToUpload);

    let fileName:string = value+'_312_' +this.selectedbatch +'_moderatorDocument'+'_AssessmmentModeratorBatch'; //get name from form for example
    let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

    this.updloaddocs(formData); 

  }

  updloaddocs(body)  {
    this.mersetaservice.uploadlearnershipdocument(body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response);
       }
    );
  }

  onsSelectAllUnit() {
    if(this.selectedAll[0] == null) {
      console.log("No");  
      this.isDisabledall = false;
     }else {
      console.log("Yes");  
      this.isDisabledall = true; 
     }
  }

  onSelectedSingleList(event) {
      console.log(event);
      var obj = {id : event}
       var isindexfound = false;
       this.userobjects.forEach(obj => {
          if(obj == event) {
            isindexfound = true;
          }
      });

      if(isindexfound) {
        console.log("found : ");
        const index: number = this.userobjects.indexOf(event);
         if (index !== -1) {
            this.userobjects.splice(index, 1);
         } 
      }else {
        this.userobjects.push(event);
      }
      console.log(this.userobjects);

  }

  onChangeBatch() {
     console.log("Batch log : ", this.selectedbatch);
     this.getAssessBatchDetails(this.selectedbatch);
  }

  submitBatch(body) {
    this.mersetaservice.SubmitAssessmentProcessBatch(body)
    .subscribe(
       response => {
         this.sumativebatch_id = response;
          console.log("batch Id : ",this.sumativebatch_id);
          this.userobjects.forEach(obj => {
                var sumid = this.summativeassessment.filter(x => x.usersId ==  obj)[0].id;
                var objs = {
                  "assessmentProcessBatchId": this.sumativebatch_id,
                  "assessmentId": sumid
                };
                this.submitBatchDetails(objs);
          });
          this.showSuccessViaToast();
       }
    );
  }

  submitBatchDetails(body) {
    this.mersetaservice.SubmitAssessmentProcessBatchDetails(body)
    .subscribe(
       response => {
        // this.sumativebatch_id = response;
          console.log("batch Details Id : ",response);
       }
    );
  }


  getSingleUser(uid) {
    this.mersetaservice.getSingleUser(uid)
    .subscribe(
       response => {
         this.singuser = response;
         if(response != null) {
            this.modusers.push(this.singuser);
            var object = {id:this.singuser.id,firstName : this.singuser.firstName ,lastName : this.singuser.lastName ,rsaIdNumber : this.singuser.rsaIdNumber ,email : this.singuser.email,randid:this.singuser.rsaIdNumber,uniqueidentifier:this.singuser.rsaIdNumber};
            this.OnbjecttoView.push(object);
         }
       }
    );
  }

  getSingleCompany(uid) {
    this.mersetaservice.getSingleCompany(uid)
    .subscribe(
       response => {
         this.company = response[0];
       }
    );
  }

  getSingleUserSdp(uid) {
    this.mersetaservice.getSingleUser(uid)
    .subscribe(
       response => {
         this.sdpuser = response;
         console.log(response);
       }
    );
  }

  getAssessBatch(acudid,compid) {
    this.mersetaservice.GetAssessmentProcessBatch(acudid,compid)
    .subscribe(
       response => {
         this.assessmentbacth = response;
         console.log("Batch response : ",this.assessmentbacth);
         this.assessmentbacth.forEach(obj => {
            var date = new Date(obj.createDate);
            var batchobject = {id:obj.assessmentProcessBatchId,BatchName: "Batch Number " + obj.comments };
            this.BatchList.push(batchobject);
         });
         
       }
    );
  }

  getAssessBatchDetails(assessid) {
    this.mersetaservice.GetAssessmentProcessBatchDetail(assessid)
    .subscribe(
       response => {
         this.assessmentbacthdetail = response;
          this.assessmentbacthdetail.forEach(obj => {
            this.getSummmativeAssessmentUnitStandardReport(obj.assessmentId);
          });
          //this.samesize = this.assessmentbacthdetail.length;
         // this.getAssessBatch(this.sdp_id,this.companyid);
       }
    );
  }

  extmoderation() {
     console.log("logged");
     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
     const lengthOfCode = 11;
     this.randombacthnumber = this.makeRandom(lengthOfCode, possible);

     ///// Generate Batch ///// 
    var date = new Date();
    var object = {
      "processDate": date,
      "comments": this.randombacthnumber,
      "processStatusId": 0,
      "createDate": date,
      "createUserId": this.sdp_id,
      "companyId": this.companyid
    };
    this.submitBatch(object);

     console.log(this.randombacthnumber);
  }

  getSummmativeAssessmentReportByQual(qualificationid,complearnerid) {
    this.mersetaservice.getSubmitSumativeAssessmentByQualComp(qualificationid,complearnerid)
    .subscribe(
       response => {
         this.summativeassessment = response;
         console.log("/////////////// Summative Assessment Report");
         console.log(this.summativeassessment);
         this.summativeassessment.forEach(obj => {
            this.getSingleUser(obj.usersId);
         });
         this.SearchedView = this.OnbjecttoView;
       }
    );
  }

  getSummmativeAssessmentUnitStandardReport(id) {
      this.mersetaservice.getSubmitSumativeUnitstandardReport(id)
      .subscribe(
         response => {
           this.summativeassessmentunitstandardreport = response;
           console.log("/////////////// Summative Assessment Unit Standards");
           console.log(response);
            if(response != null){
              this.summativeassessmentunitstandardreport.forEach(obj => {
                   var modid = obj.moderatorUserId;
                   console.log("Mod id",modid);
                   this.singleassessor = this.madaratorslist.filter(x => x.usersId ==  modid)[0];
                   console.log("Moderator assess",this.singleassessor);
                   if(this.singleassessor != null) {
                      const result = this.foundmodlist.filter(f => f.email === this.singleassessor.email)[0];
                      console.log("Results ",result);
                      if(result == null) {
                        this.foundmodlist.push(this.singleassessor);
                      }
                   }
              }) 
             
            }
            console.log("found list",this.foundmodlist);
         } 
      );
  }

  viewDocument(event,value) {
    console.log("doc id Clicked : " + event);
    this.router.navigate(['/main/singledocview',btoa(value),btoa(this.selectedbatch)]);
  }
  
  CreateTask(body) {
     this.mersetaservice.SubmittAssessmentTask(body).subscribe(
      response => {
        console.log(response);
      }
   );
  }

  SubmitExternal() {
    console.log("logged");
    console.log("batch : ",this.selectedbatch);
    var obj = this.BatchList.filter(f => f.id === this.selectedbatch)[0];
    this.showSuccessViaToasts(obj.BatchName);
    console.log(obj.BatchName)
    console.log(obj);

    console.log("sdp : ", this.sdpuser.firstName + " " + this.sdpuser.lastName);
    console.log("company : ", this.company.companyName);

    let possible = "abcdefghijklmnopqrstuxyz1234567890";
    const lengthOfCode = 4;
    var first4 = this.makeRandom(lengthOfCode, possible);
    var second4 = this.makeRandom(lengthOfCode, possible);
    var third4 = this.makeRandom(lengthOfCode, possible);

    var guid = "4e2777e1-"+first4+"-"+second4+"-"+third4+"-fda613b59d40";

    var date = new Date();
    var objects = {
      "createDate": date,
      "description": obj.BatchName+" for "+this.company.companyName+ " ("+this.company.levyNumber+") has been submitted by "+this.sdpuser.firstName + " " + this.sdpuser.lastName +" containing " +this.samesize+ " learners for External Moderation. Please select and book for onsite moderation.",
      "dueDate": date,
      "guid": guid,
      "targetClass": "haj.com.entity.CompanyLearnerBacthList",
      "targetKey": this.selectedbatch,
      "taskStatus": 0,
      "workflowProcess": 0,
      "createUserId": this.sdp_id,
      "hostingCompanyProcessId": 61,
      "firstInProcess": 0
    }

    this.CreateTask(objects);
    console.log(guid);
 }


  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  showSuccessViaToast() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Batch Number : ' + this.randombacthnumber, detail: ' has been created' });
    this.showSuccessViaMessages();
  }

  showSuccessViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Batch Number : ' + this.randombacthnumber, detail: ' has been created' });
 }

 showSuccessViaToasts(msg) {
  this.service.add({ key: 'tst', severity: 'success', summary: 'Batch Number : ' + msg + " successfully submitted", detail: ' for external moderation'});
  this.showSuccessViaMessagess(msg);
}

showSuccessViaMessagess(msg) {
  this.msgss = [];
  this.msgss.push({ severity: 'success', summary: 'Batch Number : ' + msg + " successfully submitted", detail: ' for external moderation'});
}

}
