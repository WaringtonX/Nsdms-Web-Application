import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { AssessmentProcessBatch } from 'src/app/model/assessmentprocessbatch';
import { AssessmentProcessBatchDetail } from 'src/app/model/assessmentprocessbatchdetail';
import { AssessmentRejectionReason } from 'src/app/model/assessmentrejectionreason';
import { AssessorList } from 'src/app/model/assessorlist';
import { CompLearner } from 'src/app/model/complearner.model';
import { RejectionReason } from 'src/app/model/rejectionreason';
import { SaqaQualification } from 'src/app/model/Saqa.model';
import { SummativeAssessmentReport } from 'src/app/model/summativeassessmentreport';
import { SmmativeAssessmentReportUnitstandards } from 'src/app/model/summativeassessmentreportunitstandards';
import { User } from 'src/app/model/users.model';
import { MersetaService } from 'src/app/service/merseta.service';

@Component({
  selector: 'app-moderationrejection',
  templateUrl: './app.moderationrejection.component.html',
})

export class AppModerationRejectionComponent implements OnInit{

  assessmentbachid : any;
  sdp_id : any;
  task_id : any;
  selectedreason:any;
  selecteduser:any;
  assessmentbacth : AssessmentProcessBatch;
  company_id: any;
  learners: User[];
  learnersview: User[];
  msgs: Message[] = [];
  reasons: any[] = [];
  myreasons: any[];
  complearner: CompLearner;
  saquaQualification : SaqaQualification;
  qualification:any;
  qualificationid:any;
  rejectionReasosns: RejectionReason[];
  assessmentrejectionreaseon : AssessmentRejectionReason[];
  batchsummmativeassessmentreport : SummativeAssessmentReport[];
  assessmentbacthdetail: AssessmentProcessBatchDetail[] = [];
  summativeassessmentunitstandardreport : SmmativeAssessmentReportUnitstandards[] = [];
  summativereportid :any;
  madaratorslist: AssessorList[] = [];
  singleassessor: AssessorList;
  foundmodlist: AssessorList[] = [];
  fileToUpload: File | null = null;
  files:string | ArrayBuffer=null;
  filename :string;

  constructor(private mersetaservice: MersetaService,private router: Router,private route: ActivatedRoute,private service: MessageService,private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'UI Kit'},
      {label: 'Messages'}
   ]);
  }
    ngOnInit(): void {
      this.route.params.subscribe(
        params => { 
               // your code
               const sdp = atob(params['spdid']);
               const assid = atob(params['assessmentbacthid']);
               const taskid = atob(params['taskid']);
               this.assessmentbachid = assid;
               this.sdp_id = sdp;
               this.task_id = taskid;
               console.log("sdp id = " + this.sdp_id);
               console.log("assessment id = " + this.assessmentbachid);
         });
         this.getSingleAssessmentBatch(this.assessmentbachid);
         this.getAssessmentRejectionReason();
         this.getAssessBatchDetails(this.assessmentbachid);
       //  this.getBatchSummativeAssessmentReport(this.assessmentbachid);
    }

    getAssessBatchDetails(assessid) {
      this.mersetaservice.GetAssessmentProcessBatchDetail(assessid)
      .subscribe(
         response => {
           this.assessmentbacthdetail = response;
           console.log("assessment detail : ", this.assessmentbacthdetail);
           this.getBatchSummativeAssessmentReport(this.assessmentbacthdetail[0].assessmentProcessBatchId);
            /* this.assessmentbacthdetail.forEach(obj => {
              this.getSummmativeAssessmentUnitStandardReport(obj.assessmentId);
            });*/
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

  getModeraorList(id) {
    this.mersetaservice.getModarators(id)
    .subscribe(
       response => {
         this.madaratorslist = response;
         this.assessmentbacthdetail.forEach(obj => {
          this.getSummmativeAssessmentUnitStandardReport(obj.assessmentId);
         });
         console.log(this.madaratorslist);
       }
    );
  }
    getUserAssessmentRejectionReasons(assessId) {
      this.mersetaservice.getUserAssessmentRejectionReasons(assessId)
      .subscribe(
         response => {
           this.assessmentrejectionreaseon = response;
           this.assessmentrejectionreaseon.forEach(obj => {
           // console.log(obj.rejectionReasonId);
         //   console.log(this.rejectionReasosns[0].id);
            var reas = this.rejectionReasosns.filter(x => x.id == obj.rejectionReasonId)[0].description;
            var objs = { name :reas };
            this.reasons.push(objs);
           });
           this.myreasons =  this.reasons;
           console.log(this.reasons);
         }
      );
    }

    getBatchSummativeAssessmentReport(assessId) {
      this.mersetaservice.getBatchSummativeAssessmentReport(assessId)
      .subscribe(
         response => {
           this.batchsummmativeassessmentreport = response;
           console.log("report start");
           console.log(this.batchsummmativeassessmentreport);
           console.log("report end");
           this.getSaquaQualification(this.batchsummmativeassessmentreport[0].qualificationId);
           this.getModeraorList(this.batchsummmativeassessmentreport[0].qualificationId);
           this.getCompLearnerById(this.batchsummmativeassessmentreport[0].companyLearnersId);
         }
      );
    }

    getSingleAssessmentBatch(assessId) {
      this.mersetaservice.GetSingleAssessmentProcessBatch(assessId)
      .subscribe(
         response => {
           this.assessmentbacth = response;
           console.log("Bacth : 0", this.assessmentbacth);
           this.company_id = this.assessmentbacth.companyId;
           this.getAssessmentUser(this.assessmentbachid);
         }
      );
    }

    getAssessmentUser(assessmentid) {
      this.mersetaservice.getAssessmentUser(assessmentid)
      .subscribe(
         response => {
           this.learners = response;
           this.learnersview =  response;
           console.log("  : ", this.learnersview);
          // this.getCompLearner(this.learners[0].id,this.company_id);
         }
      );
    }

   /* getCompLearner(userid,compid) {
      this.mersetaservice.getCompLearner(userid,compid)
      .subscribe(
         response => {
          this.complearner = response;
          this.getSaquaQualification(this.complearner.qualificationId);
          this.getModeraorList(this.complearner.qualificationId);
           console.log(response);     
         }
      );
    }*/

    getCompLearnerById(compidlearnerid) {
      this.mersetaservice.getCompLearnerById(compidlearnerid)
      .subscribe(
         response => {
          this.complearner = response;
           console.log(response);     
         }
      );
    }


    getSaquaQualification(id) {
      this.mersetaservice.getSaqaQualification(id)
      .subscribe(
         response => {
           this.saquaQualification = response;
          // document.getElementById("qualifcationdetails").innerHTML = "(" + this.saquaQualification.qualificationidString + ") "  + this.saquaQualification.qualificationtitle;
           console.log(response);
           console.log("yooooooooo"); 
           this.qualification = this.saquaQualification.qualificationtitle;
           this.qualificationid = this.saquaQualification.qualificationidString;
           document.getElementById("userdetails").innerHTML =  this.qualification ; 
           document.getElementById("applicationstatus").innerHTML =  " (" + this.qualificationid +") ";
           document.getElementById("assessmenttype").innerHTML = "Batch Number : " + this.assessmentbacth.comments;
         }
      );
    } 

    getAssessmentRejectionReason() {
      this.mersetaservice.getAssessmentRejectionReasons()
      .subscribe(
         response => {
          this.rejectionReasosns = response;
           console.log(this.rejectionReasosns);  
           this.getUserAssessmentRejectionReasons(this.assessmentbachid);   
         }
      );
    }

   viewDocument(event,value) {
    console.log("doc id Clicked : " + event);
    this.router.navigate(['/main/singledocview',btoa(value),btoa(this.assessmentbachid)]);
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

    let fileName:string = value+'_312_' +this.assessmentbachid +'_moderatorDocument'+'_AssessmmentModeratorBatch'; //get name from form for example
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


  onSelectedSingleList(event) {
    console.log("user id : ",event);
    this.selecteduser = event;
    this.summativereportid = this.batchsummmativeassessmentreport.filter(x => x.usersId ==  this.selecteduser)[0].id;
    console.log("summative assessment report id : ",this.summativereportid);
  }

    removelearner() {

    }
}
