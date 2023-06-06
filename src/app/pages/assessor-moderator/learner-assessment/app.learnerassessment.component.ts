import {Component, OnInit} from '@angular/core';

import {Location} from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';
import { Accreditationtype } from 'src/app/model/accreditationtype';
import { AccreditationStatus } from 'src/app/model/accstatus';
import { Company } from 'src/app/model/company.model';
import { CompLearner } from 'src/app/model/complearner.model';
import { LearnerStatus } from 'src/app/model/learnerstatus';
import { TestModel } from 'src/app/model/testmodel';
import { TrainingProvider } from 'src/app/model/trainingprovider';
import { User } from 'src/app/model/users.model';
import { MersetaService } from 'src/app/service/merseta.service';
import { Program } from 'src/app/model/program';
import { AssessorList } from 'src/app/model/assessorlist';
import { QualificationUnitStandards } from 'src/app/model/qualificationunitstandards';
import { LearnerQual } from 'src/app/model/learnerqual';
import {Message, MessageService} from 'primeng/api';
import {AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Console } from 'console';
import { SummativeAssessmentReport } from 'src/app/model/summativeassessmentreport';
import { SmmativeAssessmentReportUnitstandards } from 'src/app/model/summativeassessmentreportunitstandards';
import { GalleriaThumbnails } from 'primeng/galleria';

@Component({
    selector: 'app-learnerassessment',
    templateUrl: './app.learnerassessment.component.html',
    styles : [`
         .divider {
          width:5px;
          height:auto;
          display:inline-block;
         }

        :host ::ng-deep .p-message {
          margin-left: .25em;
        }
    
        :host ::ng-deep .p-toast{
           z-index:99999;
        }

        .p-calendar {
          width:100px;
         }
      `],
      providers: [MessageService]
})


export class LearnerAssessmentComponent implements OnInit{
    Uid : number = 0;
    type : number = 0;
    comp_learn_id : string;
    companyId : number = 0;
    learnstatuslist : LearnerStatus[] = [];
    dropdownOptions3: SelectItem[];
    programtype: any;
    summativeassessmnentId: any;
    saqaid: any;

    dropdownOptions4: SelectItem[];
    dropdownOptions5: SelectItem[];
    dropdownOptions2: SelectItem[];
    sumativeunitbatch : any[] = [];

    useunit: any[] = [];
    assessorslist: AssessorList[] = [];
    madaratorslist: AssessorList[] = [];
    singlesummativeassessment: SummativeAssessmentReport;
    summativeassessmentunitstandardreport : SmmativeAssessmentReportUnitstandards[] = [];
    unitstandardslis: QualificationUnitStandards[] = [];
    unitfundermentals: QualificationUnitStandards[] = [];
    unitElectives: QualificationUnitStandards[] = [];
    unitCores : QualificationUnitStandards[] = [];
    singleassessor: AssessorList;
    singleassessors: AssessorList;
    testmodel : TestModel[] = [];
    selectuserTittle : string ="";
    selectuserTittlem : string ="";
    selectuserTittle1 : string ="";
    selectuserTittle2: string ="";
    selectedcompintent: string[] = [];
    selectedAll: string[] = [];
    learnerQual : LearnerQual;
    programtypes : Program;
    uname :string;
    complearner: CompLearner;
    singleprovider : Company;
    user: User;
    singlelearnerstatus: LearnerStatus;
    statusDate: any;
    Applystatus: any;
    appstatus : string;
    firstName: any;
    lasttName:any;
    udetails: string;
    idenumber: any;
    midenumber: any;
    namesurname:any;
    leamil:any;
    mnamesurname:any;
    mleamil:any;
    providerName: string;
    accNumber : string;
    singaccredit : Accreditationtype;
    singaccredstatus : AccreditationStatus;
    accredtype : Accreditationtype[] = [];
    accrstatus : AccreditationStatus[] = [];
    credittables : any[] = [];
    unstandardIdCalculated : any[] = [];
    unitstandards : any[] = [];
    assessorsearchlist : any[] = [];
    moderatorsearchlist : any[] = [];
    assessorsearchlists : any[] = [];
    moderatorsearchlists : any[] = [];
    trainingprovider : TrainingProvider;
    currentview: string;
    valRadio: string;
    valRadio1: string;
    valRadio2: string;
    applytoselected: string[] = [];
    applytoselectedmoderator: string[] = [];
    selectedinex: any[] = [];
    birthvalue:any;
    lprogram:any;
    lqualificaion:any;
    reqcredits:any;
    totcredits:any;
    assessorname:string;
    allassessordate:string;
    allmoderatordate:string;
    modatorssorname:string;
    myassossor : string ="assessor";
    mymoderator : string ="moderator";
    isDisabled : boolean;
    isDisabledall : boolean;
    isDisabledButton : boolean;
    isDisabledchecked : boolean;
    ischechecked : any;
    totalfundamentals : number = 0;
    totalelectives : number = 0;
    totalcores: number = 0;
    totaloverallcredits : number =0;
    totalrequiuredelectives : number =0;
    tatalval : any =0;
    corestatalval : any =0;
    fundermentaltatalval : any =0;
    electivestatalval : any =0;
    msgs: Message[] = [];
    uploadedFiles: any;
    doc : string;
    fileURL :any;
    fileresults :any;

    constructor(private mersetaservice: MersetaService,private service: MessageService,private breadcrumbService: AppBreadcrumbService,private router: Router,private route: ActivatedRoute,private _location: Location) {
       this.breadcrumbService.setItems([
          {label: 'UI Kit'},
          {label: 'Messages'}
       ]);
    }
    
    ngOnInit(): void {
        this.route.params.subscribe(
            params => { 
                   // your code
                   const id = Number(atob(params['id']));
                   const compid = Number(atob(params['compid']));
                   const tep = Number(atob(params['type']));
                   this.type = tep;
                   this.Uid = id;
                   this.companyId = compid;
                   console.log("company id = " + this.companyId);
                   console.log("User id = " + this.companyId);
             });

          this.learnstatuslist = [
            {id: '0', description: "Application"},
            {id: '1', description: "Registered"},
            {id: '2', description: "Transfer Pending Approval"},
            {id: '3', description: "Terminated"},
            {id: '4', description: "Pending Termination"},
            {id: '5', description: "Pending Change Approval"},
            {id: '6', description: "Completed"},
            {id: '7', description: "Pending Trade Test"},
            {id: '8', description: "Pending ARPL Trade Test"},
            {id: '9', description: "Pending Review Approval"},
            {id: '10', description: "Qualification Obtained"},
            {id: '11', description: "Pending non-merSETA Qualification Approval"},
            {id: '12', description: "Pending Verification of Assesment Approval"},
            {id: '13', description: "Pending Completion Letter Approval"},
            {id: '14', description: "Withdrawn"},
            {id: '15', description: "Rejected"},
            {id: '16', description: "Achieved"},
            {id: '17', description: "Pending Lost Time"},
           ];

           this.accredtype = [
            {id: '0', description: "Primary Accreditation (accreditation for merSETA scope qualification/s)"},
            {id: '1', description: "Re-Accreditation or Re-Approval"},
            {id: '2', description: "Extension of Accreditation (merSETA Providers)"},
            {id: '3', description: "Learning Programme Approval (non-merSETA primary provider)"},
            {id: '4', description: "QCTO Skills Development Provider"},
            {id: '5', description: "QCTO Trade Test Centre"},
            {id: '6', description: "Non-merSETA Scope Provider"},
            {id: '7', description: "Training and Assessment OR Assessment Only Site"},
            {id: '8', description: "Extension of Scope, Re-accreditation/Re-approval or Learning Programme Approval"}
           ];
      
           this.accrstatus = [
            {id: '0', description: "Approved"},
            {id: '1', description: "Rejected"},
            {id: '2', description: "Pending Manager Approval"},
            {id: '3', description: "Pending Approval"},
            {id: '4', description: "Pending Sign Off"},
            {id: '5', description: "Completed"},
            {id: '6', description: "Pending accept code of conduct"},
            {id: '7', description: "Awaiting DHET"},
            {id: '8', description: "Pending Final Approval"},
            {id: '9', description: "Withdrawn"},
            {id: '10', description: "N/A"},
            {id: '11', description: "Recommended"},
            {id: '12', description: "Appealed"},
            {id: '13', description: "Pending Committee Approval"},
            {id: '14', description: "Approved By ETQA Review Committee"},
            {id: '15', description: "Rejected By ETQA Review Commitee"},
            {id: '16', description: "Requested Higher Allocation"},
            {id: '17', description: "Accepted MOA"},
            {id: '18', description: "Requested Change"},
            {id: '19', description: "Rejected By MANCO Review"},
            {id: '20', description: "Rejected By Learner Review Committee"},
            {id: '21', description: "Qualification Obtained"},
            {id: '22', description: "Deactivated"},
            {id: '23', description: "Project Terminated Manager Approval"},
            {id: '24', description: "Suspend Project"},
            {id: '25', description: "Project Terminated"},
            {id: '26', description: "Pending Review Approval"},
            {id: '27', description: "Uphold"},
            {id: '28', description: "Pending Resubmission"},
            {id: '29', description: "Awaiting NAMB"},
            {id: '30', description: "Pending Withdrawal"},
            {id: '31', description: "Pending Investigation"},
            {id: '32', description: "Pending Change Approval"},
            {id: '33', description: "Not Competent"},
            {id: '34', description: "De-Accredited"},
            {id: '35', description: "De-Registered"},
            {id: '36', description: "De-activated"},
            {id: '37', description: "Pending Non-Compliance Issues"},
            {id: '38', description: "Expired"},
            {id: '39', description: "Completed"},
            {id: '40', description: "Suspended"}
           ];

           this.dropdownOptions3 = [
             {label: 'Mr', value: "0"},
             {label: 'Mrs', value: "1"}
           ];

           this.dropdownOptions4 = [
             {label: 'Generic Management:', value: "1448"},
           ];

           this.dropdownOptions5 = [
              {label: 'National Certificate: Generic Management: Generic Manufacturing', value: "14237"},
           ];

           this.dropdownOptions2 = [
            {label: 'Fundamentals', value: "0"},
            {label: 'Core', value: "1"},
            {label: 'Electives', value: "2"},
         ];

        
        this.useunit = [
          {id: '12591', tittle: "Physical Planning and Construction",nqflevel:"NQF Level: 01",credits : 4},
          {id: '7464', tittle: "Agriculture and Nature Conservation",nqflevel:"NQF Level: 02",credits : 3},
          {id: '9654', tittle: "Health Sciences and Social Services",nqflevel:"NQF Level: 03",credits : 5},
          {id: '9839', tittle: "Manufacturing, Engineering and Technology",nqflevel:"NQF Level: 04",credits : 2}
          
        ];
        var val =  {id: '12591', tittle: "Physical Planning and Construction",nqflevel:"NQF Level: 01",credits : "4"};
        this.testmodel.push(val);
        console.log(this.testmodel);
      
           this.getSingleUser(this.Uid);
           this.getCompLearner(this.Uid,this.companyId);
    }

   onChangedtype(): void {
      // console.log("Disability  : ", value) 
       console.log("Selected Type  : ",  this.currentview);  
   }  

   
   onSelectedSingleList(event) : void {
       console.log("selected val : ",event);
       var obj = {id : event}
       var isindexfound = false;
       this.selectedinex.forEach(obj => {
          if(obj == event) {
            isindexfound = true;
          }
      });

      if(isindexfound) {
        console.log("found : ");
        const index: number = this.selectedinex.indexOf(event);
         if (index !== -1) {
            this.selectedinex.splice(index, 1);
         } 
      }else {
        this.selectedinex.push(event);
      }
      console.log(this.selectedinex);
      // this.selectedinex.splice(event, 1); 
   }

   onCheckSelectedModaratorRemoved(): void {
    // console.log("Disability  : ", value) 
     console.log("Selected Assessor  : ",  this.applytoselectedmoderator[0]); 
     console.log("Index  : ",  this.selectedinex);
    if(this.selectedAll[0] == null) {
      console.log("No");  
      this.selectedinex.forEach(obj => {
        this.unitstandards[obj].moderatoruidate = null; 
        this.unitstandards[obj].moderatoruid = null;
      });
     }else {
      console.log("Yes");  
        this.unitstandards.forEach(obj => {
        obj.moderatoruidate = null; 
        obj.moderatoruid = null;
      });
     }
   } 

   onChangedCorNYC(event): void {
    // this.submitLeanerDetails();
      console.log(event);
    //  this.credittables = null;
      //var isfound = false;
     // console.log(this.unstandardIdCalculated[event]);
       var val = this.unstandardIdCalculated.filter(x => x == this.unitstandards[event].unitstandardid)[0];
      
       if(val == this.unitstandards[event].unitstandardid) {
         console.log(val);
         console.log(this.unstandardIdCalculated);
       }else {
         this.unstandardIdCalculated.push(this.unitstandards[event].unitstandardid);
         console.log(this.unstandardIdCalculated);
       }
      
     /* this.unstandardIdCalculated.forEach(obj => {
        if(obj == this.unitstandards[event].unitstandardid) {
          isfound = true;
        }else {
          isfound = false;
        }
      }); */

     /* if(isfound) {
        console.log("Found");
        console.log(this.unstandardIdCalculated);
      } else {
        console.log("Not Found");
        this.unstandardIdCalculated.push(this.unitstandards[event].unitstandardid);
        console.log(this.unstandardIdCalculated);
      }  */
    
      if(this.unitstandards[event].id == "C") {
            if(this.unitstandards[event].usqualTypeDescription == "Fundamental") {
               this.totalfundamentals += this.unitstandards[event].unitstdnumberofcredits;
            }else if((this.unitstandards[event].usqualTypeDescription == "Core")) {
               this.totalcores += this.unitstandards[event].unitstdnumberofcredits;
            }else if((this.unitstandards[event].usqualTypeDescription == "Elective")) {
               this.totalelectives +=   this.unitstandards[event].unitstdnumberofcredits;
            }
       }else if(this.unitstandards[event].id == "NYC") {
           if(val == this.unitstandards[event].unitstandardid) {
            if(this.unitstandards[event].usqualTypeDescription == "Fundamental") {
              this.totalfundamentals = this.totalfundamentals - this.unitstandards[event].unitstdnumberofcredits;
           }else if((this.unitstandards[event].usqualTypeDescription == "Core")) {
              this.totalcores = this.totalcores - this.unitstandards[event].unitstdnumberofcredits;;
           }else if((this.unitstandards[event].usqualTypeDescription == "Elective")) {
              this.totalelectives = this.totalelectives - this.unitstandards[event].unitstdnumberofcredits;;
           }
           }
      }
      this.totaloverallcredits =  this.totalfundamentals + this.totalcores + this.totalelectives;
      var tabledataval = [
        {tittle:'Core', value: this.corestatalval,currentcredits : this.totalcores},
        {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : this.totalfundamentals},
        {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : this.totalelectives},
        {tittle:'Total', value: this.tatalval,currentcredits : this.totaloverallcredits},
       ];
       this.credittables = tabledataval;
       this.totcredits = this.totaloverallcredits; 
    
    }

   onCheckSelectedModarator(): void {
    // console.log("Disability  : ", value) 
     console.log("Selected Assessor  : ",  this.applytoselectedmoderator[0]); 
     console.log("Index  : ",  this.selectedinex);
    if(this.selectedAll[0] == null) {
      console.log("No");  
      this.selectedinex.forEach(obj => {
        this.unitstandards[obj].moderatoruidate = this.allmoderatordate; 
        this.unitstandards[obj].moderatoruid = this.selectuserTittlem;
      });
     }else {
      console.log("Yes");  
        this.unitstandards.forEach(obj => {
        obj.moderatoruidate = this.allmoderatordate; ; 
        obj.moderatoruid = this.selectuserTittlem;
      });
     }
   } 

   onCheckSelectedAssessor(): void {
    // console.log("Disability  : ", value) 
     console.log("Selected Assessor  : ",  this.applytoselected[0]); 
     console.log("Index  : ",  this.selectedinex);
     if(this.selectedAll[0] == null) {
      console.log("No");  
      this.selectedinex.forEach(obj => {
        this.unitstandards[obj].assessordateuid = this.allassessordate; 
        this.unitstandards[obj].assessoruid = this.selectuserTittle;
       });
     }else {
      console.log("Yes");  
        this.unitstandards.forEach(obj => {
        obj.assessordateuid = this.allassessordate; 
        obj.assessoruid = this.selectuserTittle;
      });
     }

   } 

   
   onCheckSelectedAssessorRemoved(): void {
    // console.log("Disability  : ", value) 
     console.log("Selected Assessor  : ",  this.applytoselected[0]); 
     console.log("Index  : ",  this.selectedinex);
     if(this.selectedAll[0] == null) {
      console.log("No");  
      this.selectedinex.forEach(obj => {
        this.unitstandards[obj].assessordateuid = null; 
        this.unitstandards[obj].assessoruid = null;
       });
     }else {
      console.log("Yes");  
        this.unitstandards.forEach(obj => {
        obj.assessordateuid = null; 
        obj.assessoruid = null;
      });
     }
       
   } 

   onsSelectAllUnit(): void {
    console.log("All Compintet : ",this.selectedAll);
    if(this.selectedAll[0] == null) {
     console.log("No");  
     this.isDisabledchecked = false;
    }else {
     console.log("Yes");  
     this.isDisabledchecked = true; 
    }
}  

   onsSelectAll(): void {
       console.log("All Compintet : ",this.selectedcompintent);
       this.credittables = null;
       if(this.selectedcompintent[0] == null) {
        console.log("No");  
          this.isDisabled = false;
          var tabledataval = [
            {tittle:'Core', value: this.corestatalval,currentcredits : 0},
            {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : 0},
            {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : 0},
            {tittle:'Total', value: this.tatalval,currentcredits : 0},
           ];
           this.credittables = tabledataval;
           this.totcredits = 0;
       }else {
        console.log("Yes");  
        this.isDisabled = true;
        var newtot = this.fundermentaltatalval + this.corestatalval + this.electivestatalval;
        var tabledatavals = [
          {tittle:'Core', value: this.corestatalval,currentcredits : this.corestatalval},
          {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : this.fundermentaltatalval},
          {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : this.electivestatalval},
          {tittle:'Total', value: this.tatalval,currentcredits : newtot},
         ];
         this.credittables = tabledatavals;
         this.totcredits = this.tatalval;
       }

       this.unitstandards.forEach(obj => {
           if(obj.id != null) {
              obj.id = null;
           }
      });
   }  

  onChangeTittle(): void {
    console.log(this.selectuserTittle);
    this.singleassessor =  this.assessorslist.filter(x => x.id == this.selectuserTittle)[0];
    console.log("///////////single assessor////////////");
    console.log(this.singleassessor);
    console.log("///////////single assessor End////////////");
    this.idenumber = this.singleassessor.rsaIdNumber;
    this.leamil =this.singleassessor.email;
    this.namesurname =this.singleassessor.firstName + " " + this.singleassessor.lastName;
    this.assessorname = this.singleassessor.firstName + " " + this.singleassessor.lastName;
  }  

  onChangeAssessor(event): void {
    console.log(event);
  } 

  onChangeTittles(): void {
    console.log(this.selectuserTittlem);
    this.singleassessors =  this.madaratorslist.filter(x => x.id == this.selectuserTittlem)[0];
    console.log("///////////single assessor////////////");
    console.log(this.singleassessors);
    console.log("///////////single assessor End////////////");
    this.midenumber = this.singleassessors.rsaIdNumber;
    this.mleamil =this.singleassessors.email;
    this.mnamesurname =this.singleassessors.firstName + " " + this.singleassessors.lastName;
    this.modatorssorname = this.singleassessors.firstName + " " + this.singleassessors.lastName;
  }  


    getSingleUser(id) {
        this.mersetaservice.getSingleUser(id)
        .subscribe(
           response => {
             this.user = response;
             console.log(response);
             this.loadApiData(); 
           }
        );
      }
   
      getCompLearner(userid,compid) {
        this.mersetaservice.getCompLearner(userid,compid)
        .subscribe(
           response => {
            this.complearner = response;
             this.comp_learn_id = this.complearner.id;
             this.getSingleProvider(this.complearner.employerId);
            // this.getSaqa(this.complearner.qualificationId);
            console.log("Company Learner Qualification ID : ", this.complearner.qualificationId);  
             this.getLearnerQual(this.complearner.qualificationId)
             this.getTraininProvider(this.complearner.employerId);
             console.log("//// provider details ///");   
             console.log(this.complearner.employerId);   
             console.log("//// provider details ///");   
             console.log(response);   
             this.loadLearnerStatus();  
           }
        );
      }


      getLearnerQual(id) {
        this.mersetaservice.getLearnerQual(id)
        .subscribe(
           response => {
             this.learnerQual = response;
             console.log("////////////////////////////");
             console.log(this.learnerQual);
             console.log("////////////////////////////");
             var qualId = this.learnerQual[0].qualificationId;
             this.getAssessorList(qualId);
             console.log("SAQDQ QUALIFICATION");
             console.log(response);
             this.getIntervention(this.complearner.interventionTypeId);
           }
        );
      }

      getSummmativeAssessmentReport(qualificationid,complearnerid) {
        this.mersetaservice.getSubmitSumativeReport(qualificationid,complearnerid)
        .subscribe(
           response => {
             this.singlesummativeassessment = response;
             console.log("/////////////// Summative Assessment Report");
             console.log(this.singlesummativeassessment);
             this.getSummmativeAssessmentUnitStandardReport(this.singlesummativeassessment.id);
           }
        );
      }

      getSummmativeAssessmentUnitStandardReport(id) {
        this.mersetaservice.getSubmitSumativeUnitstandardReport(id)
        .subscribe(
           response => {
             this.summativeassessmentunitstandardreport = response;
             console.log("/////////////// Summative Assessment Unit Standards");
             console.log(this.summativeassessmentunitstandardreport);
            
             if(this.summativeassessmentunitstandardreport.length > 0) {
              this.isDisabledall = true;
              this.isDisabledButton = true;
              this.isDisabledchecked = true;
              this.isDisabled = true;
             } else {
              this.isDisabledall = false;
              this.isDisabledButton = false;
              this.isDisabledchecked = false;
              this.isDisabled = false;
             }
             var i = 0 ;
             this.unitstandards.forEach(obj => {
              var assid=  this.assessorslist.filter(x => x.userId ==  this.summativeassessmentunitstandardreport[i].assessorUserId)[0].id;
              var modid  =  this.madaratorslist.filter(x => x.userId ==  this.summativeassessmentunitstandardreport[i].moderatorUserId)[0].id;

                   var assessdate = new Date(this.summativeassessmentunitstandardreport[i].assesmentDate);
                   var moddate = new Date(this.summativeassessmentunitstandardreport[i].moderationDate);

                  obj.assessordateuid = assessdate;
                  obj.assessoruid = assid;
                  obj.moderatoruidate = moddate;
                  obj.moderatoruid =  modid;
                  this.ischechecked  = obj.index;
                  if(this.summativeassessmentunitstandardreport[i].competenceEnum == "0"){
                    obj.id = "C";
                  }else if (this.summativeassessmentunitstandardreport[i].competenceEnum == "1") {
                    obj.id = "NYC";
                  }
                  
                 i = i + 1
              });

              var coretemp = 0;
              var fundtemp = 0;
              var electivetemp = 0;
              this.summativeassessmentunitstandardreport.forEach(obj => {
                   var credit =  this.unitstandards.filter(x => x.saqaUnitId ==  obj.unitStandardsId)[0].unitstdnumberofcredits;
                   
                       if(obj.unitStandardTypeEnum == "0") {
                           coretemp = coretemp + credit;
                       }else if (obj.unitStandardTypeEnum == "2") {
                         fundtemp = fundtemp + credit;
                       }else if (obj.unitStandardTypeEnum == "1") {
                           if(obj.competenceEnum == "0") {
                            electivetemp = electivetemp + credit;
                           } 
                        }
              });

              var newtot = fundtemp + coretemp + electivetemp;
              var tabledatavals = [
                {tittle:'Core', value: this.corestatalval,currentcredits : coretemp},
                {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : fundtemp},
                {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : electivetemp},
                {tittle:'Total', value: this.tatalval,currentcredits : newtot},
               ];
               this.credittables = tabledatavals;
               this.totcredits = newtot;
           }
        );
      }
    
      getIntervention(id) {
        this.mersetaservice.geInterbentiontype(id)
        .subscribe(
           response => {
             this.programtypes = response;
             console.log("/////////////// Intervention Type to be here");
             console.log(response);
             this.LoadQualification();
              //this.getIntervention(this.complearner.mersetaFunded);
           }
        );
      }

      getAssessorList(id) {
        this.mersetaservice.getAllAssessors(id)
        .subscribe(
           response => {
             this.assessorslist = response;
             this.assessorslist.forEach(obj => {
              var object = {id:obj.id,assessorname:obj.firstName + " " + obj.lastName + " " + obj.rsaIdNumber};
              var objects = {id:obj.id,assessorname:obj.firstName + " " + obj.lastName};
              this.assessorsearchlist.push(object);
              this.assessorsearchlists.push(objects);
            });
             console.log("/////////////// Assessors");
             console.log(response);
             this.getModeraorList(id); 
           }
        );
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
             console.log(response);
             this.getAllUnitstandards(id);
           }
        );
      }

      SubmitSumativeAssessment(body) {
        this.mersetaservice.SubmitSumativeReport(body)
        .subscribe(
           response => {
             this.summativeassessmnentId = response;
             console.log("Sam Assess ID : ",this.summativeassessmnentId);
             this.completeunitedStandaerdApplication();
           }
        );
      }

      SubmitSumativeAssessmentUnitStandard(body) {
        this.mersetaservice.SubmitSumativeUnitstandardReport(body)
        .subscribe(
           response => {
             console.log(response);
           }
        );
      }

      completeunitedStandaerdApplication() {
         this.unitstandardBoard();
         this.sumativeunitbatch.forEach(obj => {
            console.log(obj);
            this.SubmitSumativeAssessmentUnitStandard(obj);
        });
        this.showSuccessViaToast();
      }


      getAllUnitstandards(id) {
        this.mersetaservice.getAllUnitStandards(id)
        .subscribe(
           response => {
             this.unitstandardslis = response;
             var count = 0;
             this.unitstandardslis.forEach(obj => {
            
                var object = {id:obj.saquausid,saqaUnitId : obj.saqaUnitId,index:count,indexname:"selected"+count,unitstandardid:obj.unitstandardid,unitstandardidnyc:obj.unitstandardid,usqualTypeDescription:obj.usqualTypeDescription,unitStdTitle:obj.unitStdTitle, fieldDescription:obj.fieldDescription, type:obj.description,unitstdnumberofcredits:obj.unitstdnumberofcredits,
                assessoruid:"assessoruid"+count, assessordateuid:"assessordateuid"+count,moderatoruid:"moderatoruid"+count,moderatoruidate:"moderatoruid"+count};
                this.unitstandards.push(object);
                count++;
             });
             console.log("/////////////// United standards");
             console.log(response);
             this.getSummmativeAssessmentReport(this.learnerQual[0].qualificationId,this.comp_learn_id);
             this.loadunitData();
           }
        );
      }
    
      loadunitData() {
  
      if(this.type == 0) { 

        this.totcredits = 0;
        this.unitfundermentals =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Fundamental");
        this.unitCores =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Core");
        this.unitElectives =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Elective");
        this.unitfundermentals.forEach(obj => {
          this.fundermentaltatalval += parseInt(obj.unitstdnumberofcredits);
         }); 
 
         this.unitCores.forEach(obj => {
          this.corestatalval += parseInt(obj.unitstdnumberofcredits);
         });
 
         this.unitElectives.forEach(obj => {
          this.electivestatalval += parseInt(obj.unitstdnumberofcredits);
         });

         var tot = this.fundermentaltatalval + this.corestatalval;
         this.totalrequiuredelectives = this.learnerQual[0].credits - tot;
         this.tatalval =  this.fundermentaltatalval + this.corestatalval + this.totalrequiuredelectives;

         var tabledataval = [
          {tittle:'Core', value: this.corestatalval,currentcredits : 0},
          {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : 0},
          {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : 0},
          {tittle:'Total', value: this.tatalval,currentcredits : 0},
         ];
         this.credittables = tabledataval;

      }else if(this.type == 1){

        
        this.totcredits = 0;
        this.unitfundermentals =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Fundamental");
        this.unitCores =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Core");
        this.unitElectives =  this.unitstandardslis.filter(x => x.usqualTypeDescription == "Elective");
        var tempfunda = 0;
        var tempcore = 0;
        var tempelec = 0;
        var tots = 0;
        var temptotalrequiuredelectives = 0;

        this.unitfundermentals.forEach(obj => {
            tempfunda += parseInt(obj.unitstdnumberofcredits);
         }); 
 
         this.unitCores.forEach(obj => {
            tempcore += parseInt(obj.unitstdnumberofcredits);
         });
 
         this.unitElectives.forEach(obj => {
            tempelec += parseInt(obj.unitstdnumberofcredits);
         });

         tots = tempfunda + tempcore;
         temptotalrequiuredelectives = this.learnerQual[0].credits - tots;
         this.tatalval =  (tempfunda + tempcore + temptotalrequiuredelectives) / 2;
        
         this.corestatalval = tempcore / 2;
         this.fundermentaltatalval = tempfunda / 2;
         this.totalrequiuredelectives = temptotalrequiuredelectives / 2;

         var tabledataval = [
          {tittle:'Core', value: this.corestatalval,currentcredits : 0},
          {tittle:'Fundamental', value: this.fundermentaltatalval,currentcredits : 0},
          {tittle:'Elective', value: this.totalrequiuredelectives,currentcredits : 0},
          {tittle:'Total', value: this.tatalval,currentcredits : 0},
         ];

         this.credittables = tabledataval;
       }   
 
      }

      LoadQualification() {
        this.programtype = this.programtypes.description;
        this.saqaid = ("(" + this.learnerQual[0].qualificationidString + ") " + this.learnerQual[0].qualificationtitle);
        this.lprogram =  this.programtype;
        this.lqualificaion =  this.saqaid;
        if(this.type == 0) { 
          this.reqcredits = this.learnerQual[0].credits; 
        }else if(this.type == 1) {
          this.reqcredits = this.learnerQual[0].credits / 2; 
        }

      }

      myUploaderotherdocs(event) {
        event.files;
        console.log(event.files);
        console.log("Documents");
        console.log(event.files[0]["name"]);
        console.log("Documents");
        this.uploadedFiles = event.files;


      }

      ViewDocument() {
       // window.open(this.uploadedFiles[0]);
        console.log(this.uploadedFiles[0]);
      //  console.log(fileURL);
      }

      getSingleProvider(id) {
        this.mersetaservice.getSingleCompany(id)
        .subscribe(
           response => {
             this.singleprovider = response[0];
             console.log("///// Training ////");
             console.log(response);
             console.log("///// End Training ////");
            // this.getSdfProvider(this.companyId)
           }
        );
      }

      Loadproviderdetails() {
        this.singaccredit =  this.accredtype.filter(x => x.id == this.trainingprovider.accreditationApplicationType)[0];
        this.singaccredstatus =  this.accrstatus.filter(x => x.id == this.trainingprovider.approvalStatus)[0];
        this.providerName = this.singleprovider.companyName;
        this.accNumber = this.trainingprovider.accreditationNumber;
      }

      loadApiData() {
        this.firstName = this.user.firstName;
        this.lasttName = this.user.lastName;
        this.udetails = this.user.firstName + " " + this.user.lastName + " (" + this.user.rsaIdNumber + ") ";
        document.getElementById("userdetails").innerHTML = this.udetails;
      }

      
      loadLearnerStatus() {
        var subdate = new  Date(this.complearner.createDate);
        this.singlelearnerstatus =  this.learnstatuslist.filter(x => x.id == this.complearner.learnerStatus)[0];
        this.statusDate = subdate.toLocaleDateString();
        this.Applystatus = this.singlelearnerstatus.description;
        this.appstatus = this.Applystatus;
          document.getElementById("applicationstatus").innerHTML = this.appstatus;
          if(this.type == 0) {
            document.getElementById("assessmenttype").innerHTML = (" (Completion)");
          }else if(this.type == 1){
            document.getElementById("assessmenttype").innerHTML = (" (Progressive)");
          }
          
      }

      getTraininProvider(id) {
        this.mersetaservice.getTrainingprovider(id)
        .subscribe(
           response => {
             this.trainingprovider = response;
             this.Loadproviderdetails();
             //console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);
            
           }
        );
      }


    public goBack() {
      this._location.back();
    }

    unitstandardBoard() {
      var date = new Date();
      this.sumativeunitbatch = [];
      if(this.selectedcompintent[0] == null) { 
         
        this.unitstandards.forEach(obj => {
          if((obj.id == "C") || (obj.id == "NYC")) {
            console.log("US ID : " + obj.unitstandardid);
            console.log("C OR NYC : " + obj.id);
            var nycid = 0;
          var unitstandardtype = 0;
           if(obj.id == "C") {
            nycid =0;
           } else if (obj.id == "NYC"){
            nycid =1;
           }
  
           if(obj.usqualTypeDescription == "Core") {
              unitstandardtype = 0;
           }else if (obj.usqualTypeDescription == "Fundamental") {
              unitstandardtype = 2;
           }else if (obj.usqualTypeDescription == "Elective") {
              unitstandardtype = 1;
           }
  
           var moduserid =  this.madaratorslist.filter(x => x.id == obj.moderatoruid)[0].userId;
           var modAppId =  this.madaratorslist.filter(x => x.id == obj.moderatoruid)[0].assessModAppId;
           var assuserd =  this.assessorslist.filter(x => x.id == obj.assessoruid)[0].userId;
           var AssessAppId =  this.assessorslist.filter(x => x.id == obj.assessoruid)[0].assessModAppId;
  
            var bathdata = 
                {
                  "assesmentDate": obj.assessordateuid,
                  "competenceEnum": nycid,
                  "createDate": date,
                  "moderationDate": obj.moderatoruidate,
                  "unitStandardTypeEnum": unitstandardtype,
                  "assessorApplicationId": AssessAppId,
                  "assessorUserId": assuserd,
                  "companyLearnersId": this.comp_learn_id,
                  "moderatorApplicationId":  modAppId,
                  "moderatorUserId":  moduserid,
                  "summativeAssessmentReportId": this.summativeassessmnentId,
                  "unitStandardsId": obj.saqaUnitId
                }
            }
              this.sumativeunitbatch.push(bathdata);
  
        });


      }else {

        this.unitstandards.forEach(obj => {

          var nycid = 0;
          var unitstandardtype = 0;
          
          if(obj.usqualTypeDescription == "Core") {
            unitstandardtype = 0;
          }else if (obj.usqualTypeDescription == "Fundamental") {
            unitstandardtype = 2;
          }else if (obj.usqualTypeDescription == "Elective") {
            unitstandardtype = 1;
          }
          
          var moduserid =  this.madaratorslist.filter(x => x.id == obj.moderatoruid)[0].userId;
          var modAppId =  this.madaratorslist.filter(x => x.id == obj.moderatoruid)[0].assessModAppId;
          var assuserd =  this.assessorslist.filter(x => x.id == obj.assessoruid)[0].userId;
          var AssessAppId =  this.assessorslist.filter(x => x.id == obj.assessoruid)[0].assessModAppId;
 
           var bathdata = 
               {
                 "assesmentDate": obj.assessordateuid,
                 "competenceEnum": nycid,
                 "createDate": date,
                 "moderationDate": obj.moderatoruidate,
                 "unitStandardTypeEnum": unitstandardtype,
                 "assessorApplicationId": AssessAppId,
                 "assessorUserId": assuserd,
                 "companyLearnersId": this.comp_learn_id,
                 "moderatorApplicationId":  modAppId,
                 "moderatorUserId":  moduserid,
                 "summativeAssessmentReportId": this.summativeassessmnentId,
                 "unitStandardsId": obj.saqaUnitId
               }
            
            this.sumativeunitbatch.push(bathdata);
 
          
        });
      }
     
    }
    
    
    CompleteAssessment() {
      /*console.log("Click");
      this.unitstandards.forEach(obj => {
        if((obj.id == "C") || (obj.id == "NYC")) {
          console.log("US ID : " + obj.unitstandardid);
          console.log("C OR NYC : " + obj.id);
        }
      });8*/
      var date = new Date();
      var summativedata = {
        "createDate": date,
        "pivotNonPivot": 0,
        "companyLearnersId": this.comp_learn_id,
        "interventionTypeId": this.programtypes.id,
        "nqfAlignedId": 1,
        "qualificationId": this.learnerQual[0].qualificationId,
        "trainingProviderVerficationId": this.trainingprovider.id,
        "usersId": this.user.id,
        "assessmentProgressStatusTypeId": 1
       }

      //////////////////
      ///////////////////////////
      if(this.type == 0) { 
         if(this.selectedcompintent[0] == null) {
          console.log("No");  
              
          if((this.totalcores < this.corestatalval) || (this.totalfundamentals < this.fundermentaltatalval)) {
            this.showWarnViaMessagesFundaCores();
           }else {
          if(this.totalelectives < this.totalrequiuredelectives) {
            console.log("required :",this.totalrequiuredelectives)
            console.log("Archived :",this.electivestatalval)
             this.showWarnViaMessageElectives();
          } else {
            console.log("required :",this.totalrequiuredelectives)
            console.log("Archived :",this.electivestatalval)
             this.SubmitSumativeAssessment(summativedata);
          }
         }
        
         }else {
          console.log("Yes");  
          this.SubmitSumativeAssessment(summativedata);
          

         }
    
      }else if(this.type == 1){
        if(this.selectedcompintent[0] == null) { 
          console.log("No");  

          if((this.totalcores < this.corestatalval) || (this.totalfundamentals < this.fundermentaltatalval)) {
            this.showWarnViaMessagesFundaCores();
         }else {
          if(this.totalelectives < this.totalrequiuredelectives) {
            console.log("required :",this.totalrequiuredelectives)
            console.log("Archived :",this.electivestatalval)
             this.showWarnViaMessageElectives();
          } else {
            console.log("required :",this.totalrequiuredelectives)
            console.log("Archived :",this.electivestatalval)
             this.SubmitSumativeAssessment(summativedata);
          }
         }
         
        }else { 
          console.log("Yes");  
          this.SubmitSumativeAssessment(summativedata);
          
        }
      
      }
     
   //   this.showSuccessViaToast();
      console.log("Clicked");
    }
    
    showSuccessViaToast() {
      this.service.add({ key: 'tst', severity: 'success', summary: 'Assessment Successfully', detail: 'Completed' });
      this.showSuccessViaMessages();
    }

    showWarnViaMessagesFundaCores() {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'required cores and fundamentals', detail: 'have not been archived'});
    }

    showWarnViaMessageElectives() {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'minimum required electives', detail: 'have not been archived'});
    }

    showSuccessViaMessages() {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Assessment Successfully', detail: 'Completed' });
  }

}
