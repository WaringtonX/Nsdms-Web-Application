import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'console';
import { Message, MessageService } from 'primeng/api';
import { GalleriaThumbnails } from 'primeng/galleria';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { AssessmentProcessBatch } from 'src/app/model/assessmentprocessbatch';
import { AssessmentProcessBatchDetail } from 'src/app/model/assessmentprocessbatchdetail';
import { AssesorCount } from 'src/app/model/assessorcount';
import { AssessorList } from 'src/app/model/assessorlist';
import { Company } from 'src/app/model/company.model';
import { CompLearner } from 'src/app/model/complearner.model';
import { ExternalModerationQuestion } from 'src/app/model/externalmoderationquestion';
import { ProvidersBySDP } from 'src/app/model/providerspysdp';
import { RejectionReason } from 'src/app/model/rejectionreason';
import { SaqaQualification } from 'src/app/model/Saqa.model';
import { SiteVist } from 'src/app/model/sitevisit';
import { SummativeAssessmentReport } from 'src/app/model/summativeassessmentreport';
import { SmmativeAssessmentReportUnitstandards } from 'src/app/model/summativeassessmentreportunitstandards';
import { SystemTasks } from 'src/app/model/systemtasks';
import { User } from 'src/app/model/users.model';
import { MersetaService } from 'src/app/service/merseta.service';

@Component({
    selector: 'app-externalmoderation',
    templateUrl: './app.externalmoderation.component.html'

  })

  export class AppExternalModeration implements OnInit{
    
    assessmentbachid : any;
    sdp_id : any;
    task_id : any;
    assessmentbacth : AssessmentProcessBatch;
    sitevist : SiteVist;
    company: Company;
    valbacthnumber : any;
    qualityAssessor : any;
    ModerationDate : any;
    providername : any;
    provideraccred : any;
    checkcredit : any;
    upheld : any;
    selectedReason:any[];
    quassurordate: any;
    employmentstatus: any;
    assessorbehaviour: any;
    assessmenttoolsdocumentation: any;
    validationfindingrecomendation: any;
    remarks : any;
    extquestionComments: any;
    quassure_id : any = 87;
    qauser: User;
    provider:ProvidersBySDP; 
    learners: User[];
    rejectionreason: any[] = [];
    qualification:any;
    numberofAssessors:any;
    qualificationid:any;
    stageofmoderation:any;
    numberoflearners:any;
    complearner: CompLearner;
    externalmoderationQuestions : ExternalModerationQuestion[];
    saquaQualification : SaqaQualification;
    assessmentBachdetails: AssessmentProcessBatchDetail[];
    assessorcount: AssesorCount[] = [];
    externalmoderationQuestionsList: any[] = [];
    assc: AssesorCount[];
    singlesummativeassessment: SummativeAssessmentReport;
    company_id: any;
    rejectionReasosns: RejectionReason[];
    isShown: boolean = false;
    disabledall: boolean = false;
    msgs: Message[] = [];
    externalmodId:any;
    fileToUpload: File | null = null;
    files:string | ArrayBuffer=null;
    filename :string;
    singleTask : SystemTasks;
    createdtaskid : any;  

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
               const assid =atob( params['assessmentbacthid']);
               const taskid = atob(params['taskid']);
               this.assessmentbachid = assid;
               this.sdp_id = sdp;
               this.task_id = taskid;
               console.log("sdp id = " + this.sdp_id);
               console.log("assessment id = " + this.assessmentbachid);
         });
       this.getSingleAssessmentBatch(this.assessmentbachid);
       this.getExternalModerationQuestions();
       this.getAssessBatchDetails(this.assessmentbachid);
       this.getAssessmentRejectionReason();
       this.getSingleTask(this.task_id);
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
           this.getSummmativeAssessmentReport(this.saquaQualification.id,this.complearner.id);
         }
      );
    } 

    getAssessmentRejectionReason() {
      this.mersetaservice.getAssessmentRejectionReasons()
      .subscribe(
         response => {
          this.rejectionReasosns = response;
           console.log(this.rejectionReasosns);     
         }
      );
    }

    getCompLearner(userid,compid) {
      this.mersetaservice.getCompLearner(userid,compid)
      .subscribe(
         response => {
          this.complearner = response;
          this.getSaquaQualification(this.complearner.qualificationId);
           console.log(response);     
         }
      );
    }

    getAssessBatchDetails(assessid) {
      this.mersetaservice.GetAssessmentProcessBatchDetail(assessid)
      .subscribe(
         response => {
           this.assessmentBachdetails = response;
           this.assessmentBachdetails.forEach(obj => {
                this.getAssessorCount(obj.assessmentId);
           });
         }
      );
    }

    
    getSingleTask(assessid) {
      this.mersetaservice.GetSingleTask(assessid)
      .subscribe(
         response => {
           this.singleTask = response;
           console.log("Task : ", this.singleTask);
         }
      );
    }

    getAssessorCount(reportid) {
      this.mersetaservice.getAssessorCount(reportid)
      .subscribe(
         response => {
           this.assc = response;
           console.log("Assess list : ",this.assc);
           this.assc.forEach(obj => {
                 var assexist = this.assessorcount.filter(x => x.assessorUserId == obj.assessorUserId)[0];
                 if(assexist == null) {
                  this.assessorcount.push(obj);
                 }
           });
           console.log("Number Of Assesors");
           console.log("count : ", this.assessorcount.length);
           this.numberofAssessors = this.assessorcount.length;
         }
      );
    }


    getSingleAssessmentBatch(assessId) {
      this.mersetaservice.GetSingleAssessmentProcessBatch(assessId)
      .subscribe(
         response => {
           this.assessmentbacth = response;
           console.log("Bacth : 0", this.assessmentbacth);
           document.getElementById("userdetails").innerHTML = "Batch Number : ";
           document.getElementById("applicationstatus").innerHTML = this.assessmentbacth.comments;
           document.getElementById("assessmenttype").innerHTML =  " External Moderation";
           this.company_id = this.assessmentbacth.companyId;
           this.getSingleCompany( this.assessmentbacth.companyId);
           this.getAssessmentUser(this.assessmentbachid);
         }
      );
    }

    getSingleCompany(uid) {
      this.mersetaservice.getSingleCompany(uid)
      .subscribe(
         response => {
           this.company = response[0];
           console.log("company : ", this.company);
           this.GetSiteVisit(this.assessmentbachid);
         }
      );
    }

    getAssessmentUser(assessmentid) {
      this.mersetaservice.getAssessmentUser(assessmentid)
      .subscribe(
         response => {
           this.learners = response;
           this.numberoflearners =  this.learners.length;
           console.log("learners : ", this.learners);
           this.getCompLearner(this.learners[0].id,this.company_id);
         }
      );
    }

    getSummmativeAssessmentReport(qualificationid,complearnerid) {
      this.mersetaservice.getSubmitSumativeReport(qualificationid,complearnerid)
      .subscribe(
         response => {
           this.singlesummativeassessment = response;
           if(this.singlesummativeassessment.assessmentProgressStatusTypeId = "1") {
                  this.stageofmoderation = "Completion";
           }else if (this.singlesummativeassessment.assessmentProgressStatusTypeId = "2") {
            this.stageofmoderation = "Progression";
           }
           console.log("/////////////// Summative Assessment Report");
         }
      );
    }

    getExternalModerationQuestions() {
      this.mersetaservice.getExternalModerationQuestion()
      .subscribe(
         response => {
           this.externalmoderationQuestions = response;
           console.log("QUestions : ", this.externalmoderationQuestions);
          
         }
      );
    }

    onCheckCredit() {
      console.log("credit : ",this.checkcredit);
    }

    onUpheld() {
      console.log("Upheld : ",this.upheld);
      if(this.upheld == "Yes") {
        this.learners.forEach(obj => {
          obj.id = "Yes";
          obj.rsaIdNumber= "Yes";
          this.disabledall = false;
        });
        this.isShown = false;
      }else if(this.upheld == "No") {
        this.learners.forEach(obj => {
          obj.id = "Yes";
          obj.rsaIdNumber= "No";
          this.disabledall = true;
          this.disablevalues();
        });
        this.isShown = true;
      }
    }


    disablevalues() {
      this.checkcredit = null;
      this.remarks = null;
      this.employmentstatus = null;
      this.quassurordate = null;
      this.validationfindingrecomendation  = null;
      this.assessmenttoolsdocumentation = null;
      this.assessorbehaviour  = null;
      this.extquestionComments = null;
      if(this.externalmoderationQuestions.length  > 0) {
        this.externalmoderationQuestions.forEach(obj => {
          if(obj.externalModerationQuestionSectionId != null){
           obj.externalModerationQuestionSectionId = null;
          }      
        })
      }
      
    }

    onSelectReason(event) {
      console.log("reasosn : ",this.selectedReason)
    }

    onIssueSOR(event) {
      console.log("SOR : ",event);
    }
    onQualSPUS(event) {
      console.log("QUalification/SP/US : ",event);
    }

    onExternanlModerationQuestion(event) {
      console.log("ExternanlModerationQuestion : ",event);
    }

    onEmploymentStatus() {
      console.log("EmploymentStatus : ",this.employmentstatus);
    }

    myUploaderotherdocs(event) {
      event.files;
      console.log(event.files[0]["name"]);
   // console.log("user_id: ", value);
    console.log();
    this.fileToUpload =  event.files[0];
    this.filename = event.files[0]["name"];
    console.log(this.fileToUpload);

    let fileName:string = this.sdp_id +'_312_' +this.assessmentbachid  +'_ExternalModerationEvidance'+'_externalmoderatorEvidancedoc'; //get name from form for example
    let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

    this.updloaddocs(formData); 
    }

    SubmitAssessmentBatchRejectionReason(body : any[])  {
      this.mersetaservice.SubmitAssessmentBatchRejectionReason(body)
      .subscribe(
         response => {
          // this.proccessID = response;
           console.log(response);
           let possible = "abcdefghijklmnopqrstuxyz1234567890";
           const lengthOfCode = 4;
           var first4 = this.makeRandom(lengthOfCode, possible);
           var second4 = this.makeRandom(lengthOfCode, possible);
           var third4 = this.makeRandom(lengthOfCode, possible);
           var guid = "4e2777e1-"+first4+"-"+second4+"-"+third4+"-fda613b59d40";

            var date = new Date();
            var objects = {
               "createDate": date,
               "description":"Batch Number : " + this.assessmentbacth.comments+" for "+this.company.companyName+ " ("+this.company.levyNumber+") has been Rejected by "+this.qauser.firstName + " " + this.qauser.lastName +" please select and review.",
               "dueDate": date,
               "guid": guid,
               "targetClass": "haj.com.entity.ExternalModerationBatchRejection",
               "targetKey": this.assessmentbachid,
               "taskStatus": 0,
               "workflowProcess": 0,
               "createUserId": this.qauser.id,
               "hostingCompanyProcessId": 61,
               "firstInProcess": 0
             }
           this.CreateTask(objects);
         }
      );
    }

    CreatTaskUser(body) {
      this.mersetaservice.CreateTaskUser(body)
      .subscribe(
         response => {
           console.log("task user : ", response);
           var obj = {};
           this.UpdateTaskStatusRejection(obj,this.task_id,3);
           }
      );
    }

    makeRandom(lengthOfCode: number, possible: string) {
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
        return text;
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

    UpdateTaskStatus(body,taskid,status) {
      this.mersetaservice.UodateTaskStatus(body,taskid,status)
      .subscribe(
         response => {
           console.log("task updated : ", response);
           this.showSuccessViaToast();
         }
      );
    }

    
    UpdateTaskStatusRejection(body,taskid,status) {
      this.mersetaservice.UodateTaskStatus(body,taskid,status)
      .subscribe(
         response => {
           console.log("task updated : ", response);
           this.showSuccessRejectionViaToast();
         }
      );
    }


    SubmitExternal() {
      if(this.upheld == "Yes") {
        
        var date = new Date();
        var satgemodid = 0;
        var learneremployed = 0;
        var isuesor = 0;
        var credit = 0;
        if(this.stageofmoderation == "Completion") {
          satgemodid = 1;
        }else if (this.stageofmoderation == "Progression") {
          satgemodid = 2;
        }
        if(this.employmentstatus == "Yes") {
          learneremployed = 1;
        }else if(this.employmentstatus == "No") {
          learneremployed = 2;
        }
  
        if(this.upheld = "Yes"){
          isuesor = 1;
        }else if(this.upheld = "No") {
          isuesor = 2;
        }
  
        if(this.checkcredit = "Yes"){
          credit = 1;
        }else if(this.checkcredit = "No") {
          credit = 2;
        }
        var body  =
          {
            "assessmentProcessBatchId": this.assessmentbachid,
            "stageOfModerationId": satgemodid,
            "isLearnersEmployed": learneremployed,
            "numberOfLearners": this.numberoflearners,
            "numberOfAssessors": this.numberofAssessors,
            "issueSor": isuesor,
            "externalModerationAssessorsBehaviour": this.assessorbehaviour,
            "externalModerationAssessmentToolsAndDocumentation": this.assessmenttoolsdocumentation,
            "validationFindingsAndRecommendations": this.validationfindingrecomendation,
            "moderationDate": date,
            "providerId":  this.provider.id,
            "qualityAssurorId": this.qauser.id,
            "qualityAssurorSignatureDate": this.quassurordate,
            "hasProviderLoadedCredits": credit,
            "providerCreditRemarks": this.remarks
          };
  
          this.SubmitExternalModerationValidation(body);

      }else if(this.upheld == "No") {
            this.selectedReason.forEach(obj => {
              var objed = {
                  "rejectionReasonId": obj.id,
                  "assessmentProcessBatchId": this.assessmentbachid
                };
              this.rejectionreason.push(objed);
            })
            console.log(this.rejectionreason);
            this.SubmitAssessmentBatchRejectionReason(this.rejectionreason);
      }
      
    }

    GetSiteVisit(sessbacthid) {
      this.mersetaservice.getSiteVisit(sessbacthid)
      .subscribe(
         response => {
           this.sitevist = response;
           console.log("sitevist : 0", this.sitevist);
           this.getSingleUser(this.quassure_id);
         }
      );
    }

    getSingleUser(id) {
      this.mersetaservice.getSingleUser(id)
      .subscribe(
         response => {
           this.qauser = response;
           console.log(response);
           this.loadodInformation();
         }
      );
    }

    getProviderByID(companyid) {
      this.mersetaservice.getProviderbyId(companyid)
      .subscribe(
         response => {
           this.provider = response;
           console.log("provider : ",response);
           this.loadprovider();
         }
      );
    }

    SubmitExternalModerationValidation(body) {
      this.mersetaservice.SubmitExternalModerationValidation(body)
      .subscribe(
         response => {
          this.externalmodId = response;
          console.log(response);
          console.log("Extern ID : ",this.externalmodId);
          this.externalmoderationQuestions.forEach(obj => {
               var isyesorno = 0;
               if(obj.externalModerationQuestionSectionId == "Yes") {
                isyesorno = 0;
               }else if(obj.externalModerationQuestionSectionId == "NO") {
                isyesorno = 1;
               }
              var body = {
                  "externalModerationValidationId": this.externalmodId,
                  "moderationQuestionId": obj.externalModerationQuestionId,
                  "answer": isyesorno,
                  "evidenceComments": this.extquestionComments
              };
              this.SubmitExternalModerationValidationChecklist(body);
          }); 
          var obj = {};
          this.UpdateTaskStatus(obj,this.task_id,2);
         }
      );
    }

    SubmitExternalModerationValidationChecklist(body) {
      this.mersetaservice.SubmitExternalModerationValidationChecklist(body)
      .subscribe(
         response => {
          console.log(response);
          console.log("valid Id : ",response);
         }
      );
    }

    loadprovider() {
      this.providername = this.provider.companyName;
      this.provideraccred = this.provider.accreditationNumber;
    }

    loadodInformation() {
      this.valbacthnumber = this.assessmentbacth.comments;
      this.qualityAssessor = this.qauser.firstName + " " + this.qauser.lastName;
      this.ModerationDate = this.sitevist.visitDate;
      this.getProviderByID(this.assessmentbacth.companyId);
    }

    showSuccessViaToast() {
      this.service.add({ key: 'tst', severity: 'success', summary: 'External Moderation ', detail: ' Successfully Submitted!' });
      this.showSuccessViaMessages();
    }
  
    showSuccessViaMessages() {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'External Moderation ', detail: ' Successfully Submitted!' });
   }

   showSuccessRejectionViaToast() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Batch Number : ' + this.assessmentbacth.comments, detail: ' been rejected and sent back for the required chnages!' });
    this.showSuccessRejectionViaMessages();
  }

  showSuccessRejectionViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Batch Number : ' + this.assessmentbacth.comments, detail: ' been rejected and sent back for the required chnages!' });
  }

  CreateTask(body) {
    this.mersetaservice.SubmittAssessmentTask(body).subscribe(
     response => {
       console.log(response);
       this.createdtaskid = response
       var date = new Date();
             var obj = {
              "createDate": date,
              "taskId":   this.createdtaskid,
              "userId": this.singleTask.createUserId
      }
      this.CreatTaskUser(obj);
     }
  );
 }
    
} 