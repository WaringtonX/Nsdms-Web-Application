import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Company } from "src/app/model/company.model";
import { User } from "src/app/model/users.model";
import { MersetaService } from "src/app/service/merseta.service";
import { CompLearner } from "src/app/model/complearner.model";
import { ActivatedRoute, Router } from "@angular/router";
import { LearnerStatus } from "src/app/model/learnerstatus";
import { RejectionReason } from "src/app/model/rejectionreason";
import { Region } from "src/app/model/region";
import { Learner_achievement_status } from "src/app/model/learner_achievement_status";
import { AccreditationStatus } from "src/app/model/accstatus";
import { SystemTasks } from "src/app/model/systemtasks";
import { Message, MessageService, SelectItem } from "primeng/api";
import { SdPCompany } from "src/app/model/sdpcompany";
import { CompanySite } from "src/app/model/companysite";
import { AppBreadcrumbService } from "src/app/app.breadcrumb.service";
import { LoaderService } from "src/app/loader/loader.service"; //added


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styles: [`
    :host ::ng-deep .tabview-custom {
        i, span {
            vertical-align: middle;
        }
    
        span {
            margin: 0 .5rem;
        }
    }
    
    :host ::ng-deep .p-button {
        margin-right: .25rem;
    }
    
    :host ::ng-deep .p-tabview p {
        line-height: 1.5;
        margin: 0;
    }

    p {
        margin: 0;
    }
    
    .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    :host ::ng-deep .p-dialog .p-button {
        min-width: 6rem;
    }
    .divider {
      width:5px;
      height:auto;
      display:inline-block;
     }
`]
})

export class TasklistComponent implements OnInit {
  title = "nsdmstemp";

  users: User[] = [];
  companies: Company[] = [];
  region: Region[] =[];
  learner_achievement_status: Learner_achievement_status[] = [];
  companyusers: User[] = [];

  seaarchedusers: User[] = [];
  seaarchedUsersFiltered: User[] = [];
  seaarchedregions: Region[] = [];
  searchedlearner_achievement_status: Learner_achievement_status[] =[];

  selectedCountryAdvanced: Company;
  selectedCountry: User;
  selectedRegion: Region;
  selectedLearner_achievement_status: Learner_achievement_status;
  selectedDrop: null;

  selected: string = "";
  searchTerm = "";
  term = "";
  showleaners: string = "";
  isdatainput: boolean = false;
  compid: string = "";
  regioncode: string = "";

  filteredCountries: Company[];

  //Additional Variables to get Learner Status
  Uid : number = 0;
  uRole: any;
  companyId : string = "";
  complearner: CompLearner;
  singlelearnerstatus: LearnerStatus;
  comment_u_name: any;
  Applystatus: any;
  appstatus : string;
  statusDate: any;
  learnstatuslist : LearnerStatus[] = [];
  rejectionReason: RejectionReason[];
  tempROLE:any;
  levyNumber: string;
  accreditationNumber: string;
  Learner_achievement_status_Id: string = "";
  accrstatus : AccreditationStatus[] = [];

  systemtasks : SystemTasks[];
  systemtasksdetails : any [] = [];
  SiteExa : SelectItem [];
  displayBasic: boolean;
  isdateselected : boolean = false;
  sitevisitdate : any;
  selectedsites : any;
  task_id : any;
  assessmentbacthid : any;
  sdpuserid : any;
  spdcompany : SdPCompany;
  company : Company;
  companysite : CompanySite[];
  msgs: Message[] = [];
  userTaks : SystemTasks[];
  usertasksdetails : any [] = [];
  usertasksdetailstsort : any [] = [];
  currentuserid : any = 0;
  
  private routeSub: Subscription;

  

  constructor(
      private route: ActivatedRoute,
      private mersetaservice: MersetaService,private service: MessageService,private breadcrumbService: AppBreadcrumbService,private router: Router,
      public loaderService: LoaderService //added
  ) {
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

         this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'Messages'}
         ]);
    
          this.SiteExa = [
            {label: 'Welkom Branch', value: "97"},
            {label: 'Cape Town Branch', value: "98"},
            {label: 'Centurion', value: "111"},
            {label: 'Western Cape', value: "122"},
            {label: 'Vanderbijl Park', value: "127"},
          ];
        
  }

  ngOnInit(): void {
      this.tempROLE=  this.mersetaservice.uRoleLifecycle;
      this.uRole = this.mersetaservice.uRoleLifecycle;
      this.currentuserid  = this.mersetaservice.user_ID;
      this.getAllCompaniesWithAccreditation();  
      this.getAllRegions();
      this.getAllLearner_achievement_status();
      console.log("role : ", this.uRole);
      if(this.uRole == "Quality Assuror"){
        this.getSystemTasks();
      }
      this.getUserTasks(this.currentuserid);
  }

  ngOnDestroy(): void {
      //  this.routeSub.unsubscribe();
  }

  getAllusers() {
      this.mersetaservice.getAllUSers().subscribe((response) => {
          this.users = response;
      });
  }

  getAllCompanies() {
      this.mersetaservice.getAllCompaniesview().subscribe((response) => {
          this.companies = response;
      });
  }
  getAllCompaniesWithAccreditation() {
      this.mersetaservice.getAllCompaniesWithAccreditation().subscribe((response) => {
          this.companies = response;
      });
  }

  //Boipelo Needs To Explain Further Specifically on the Roles
  getAllCompanyUSers(id) {
      this.mersetaservice.getAllCompanyLearners(id).subscribe((response) => {
          this.seaarchedusers = response;
            this.companyusers = response;
          var c =0;
          for(let i=0; i<this.companyusers.length; i++){
                  if (this.companyusers[i].status == '2')
                  {
                      this.seaarchedUsersFiltered[c] = this.companyusers[i];
                      c++;
                  }
                  else if (this.companyusers[i].status == null || this.companyusers[i].status == '0')
                  {
                      this.seaarchedUsersFiltered[c] = this.companyusers[i]
                      c++;
                  }
                  else if (this.companyusers[i].status == '0')
                  {
                      this.seaarchedUsersFiltered[c] = this.companyusers[i]
                      c++;
                  }
              }
              
              
          
          this.seaarchedusers = this.seaarchedUsersFiltered.reverse();
          console.log("CompanyLearner Response: ");
          console.log(response);
          console.log("Filtered Learner Response For Recommendation: ");
          console.log(this.seaarchedUsersFiltered);
          this.Uid = Number(response[0].id);
          console.log("comp id = " + id);
          this.selected = id;
          console.log(this.selected);
          console.log("User ID id = " + this.Uid);
          //this.getCompLearnerSearch(this.Uid,this.selected, this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
          //this.loadLearnerStatus();
      });
  }

  getCompLearnerSearch(userid,compid,regioncode, levyNumber, accreditationNumber, Learner_achievement_status_Id) {
      //this.complearner = null;
      this.mersetaservice.getCompLearnerSearchFilter(userid,compid,regioncode, levyNumber, accreditationNumber, Learner_achievement_status_Id)
      .subscribe(
         response => {
           //this.complearner = response;
           //console.log("One " );
           //console.log(this.complearner);

           //should update UI from here?
           this.seaarchedusers = response[0];
           
           //console.log("Two" + response.learnerStatus);
           this.singlelearnerstatus =  this.learnstatuslist.filter(x => x.id == this.complearner.learnerStatus)[0];
           //console.log("Do or do not, Luke... There is no try")
           //console.log(this.singlelearnerstatus);
         }
      );
    }

  getAllRegions() {
      this.mersetaservice.getAllRegion().subscribe((response) => {
          this.region = response;
      });
  }

  getAllLearner_achievement_status() {
      this.mersetaservice.getAllLearner_achievement_status().subscribe((response) => {
          this.learner_achievement_status = response;
          //console.log(this.learner_achievement_status);
      });
  }


  onSelectRegion(event) {
      console.log("region event : " + event);
      
      this.seaarchedregions = this.region;
      this.regioncode = this.selectedRegion.id;
      
      console.log("region code: " + this.regioncode);

      //this.region = this.region;

      console.log(this.selected);
      //this.getAllRegions();
      //console.log("company id = " + this.companyId);
      //console.log("Uid = " + this.Uid);
      //this.getCompLearnerSearch(this.Uid,this.companyId,this.statuscode,this.sdlnumber,this.accrediation,this.regioncode);
      //this.getCompLearner(this.Uid,this.companyId);
      this.getCompLearnerSearch(this.Uid,this.companyId, this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
  }

  onSelectlearner_achievement_status(event) {
      console.log("event : " + event);
      //console.log("selectedLearner_achievement_status: "+JSON.stringify(this.selectedLearner_achievement_status));
      
      this.searchedlearner_achievement_status = this.learner_achievement_status;
      this.Learner_achievement_status_Id = this.selectedLearner_achievement_status.id;
      this.getCompLearnerSearch(this.Uid,this.companyId,this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
  }


  filterCountry(event) {
      let filtered: Company[] = [];
      let query = event.query;
      for (let i = 0; i < this.companies.length; i++) {
          let country = this.companies[i];
          if (
              country.companyName
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) == 0
          ) {
              filtered.push(country);
          }
      }

      this.filteredCountries = filtered;
      //  console.log(filtered);
  }

  onSelectcompany(event) {
      console.log("event : " + event);
      console.log(
          "Selected company : " + this.selectedCountryAdvanced.companyName
      );
      console.log(this.selectedCountryAdvanced);

      this.selected = this.selectedCountryAdvanced.id;
      this.companyId = this.selectedCountryAdvanced.id;
      this.levyNumber = this.selectedCountryAdvanced.levyNumber;
      this.accreditationNumber = this.selectedCountryAdvanced.accreditationNumber;
      console.log(this.selected)
      //this.companyId = Number(this.selected);
      this.getAllCompanyUSers(this.selected);
      console.log("company id = " + this.companyId);
      console.log("Uid = " + this.Uid);
      //this.getCompLearnerSearch(this.Uid,this.companyId, this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
  }

  onSelectcompany2(event) {
      console.log("emploer : " + event);
      console.log("Selected Employer : " + this.selectedCountry);
      // console.log("Query Employer : " + this.selectedCountry)
      if (this.selectedCountry != null) {
          let query = this.selectedCountry.firstName;
          let filtered: User[] = [];
          for (let i = 0; i < this.companyusers.length; i++) {
              let country = this.companyusers[i];
              if (
                  country.firstName
                      .toLowerCase()
                      .indexOf(query.toLowerCase()) == 0
              ) {
                  filtered.push(country);
              }
          }

          this.seaarchedusers = filtered;
      } else {
          console.log("null users ");
          this.seaarchedusers = this.companyusers;
      }

      /*if(this.selectedCountry != null) {
  let query =  this.selectedCountry.firstName;
  let filtered: User[] = [];
  for (let i = 0; i < this.companyusers.length; i++) {
      let country = this.companyusers[i];
      if (country.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(country);
      }
  }

  this.seaarchedusers = filtered;
}else {
  this.seaarchedusers  = this.companyusers;
} */
  }

  modify(value) {
      this.selected = value;
      console.log(this.selected);
      this.getAllCompanyUSers(this.selected);
  }

  viewleaner(value) {
      console.log("Learner Clicked : " + value);
      this.router.navigate(["/main/learnerdetails", btoa(value), btoa(this.compid)]);
  }

  editleaner(value) {
      this.router.navigate(["/main/recomendapprove"]);
  }
  recomendapprove(value) {
    this.compid = this.selected;
      this.router.navigate(["/main/recomendapprove", btoa(value), btoa(this.compid)]);
  }
  updatelearnerstatus(value) {
      this.router.navigate(["/main/updatelearnerstatus", btoa(value), btoa(this.compid)]);
  }

  //this.router.navigate(['/main/editlearner',value,this.compid]);

  editleanerDetail(value) {
      this.router.navigate(["/main/editlearner", btoa(value), btoa(this.compid)]);
  }
  editleanerDetails(value) {
      this.mersetaservice
          .getSingleUser(value)
          .subscribe(() =>
              this.router.navigate(["/main/editlearner", btoa(value), btoa(this.compid)])
          );
  }

  RouttoREgister() {
      // this.route.url = '/'
  }

  ////////////////////////Additional Functions/////////////////////
  loadLearnerStatus() {
      this.getCompLearnerSearch(this.Uid, this.selected, this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
      setTimeout('', 15000);
      if (this.complearner != null){
          console.log("HAHAHA BATMAN!!! " + this.singlelearnerstatus);
          this.singlelearnerstatus =  this.accrstatus.filter(x => x.id == this.complearner.learnerStatus)[0];
          console.log("We figured it out, BATMAN!!! " + this.singlelearnerstatus.description);
          this.Applystatus = this.singlelearnerstatus.description;
          this.comment_u_name = this.mersetaservice.uName;
          this.appstatus = this.Applystatus;
          console.log('app status: '+ this.appstatus);
          console.log('app status: '+ this.appstatus);
      }else {
          console.log("Something's wrong");
          console.log('You must go to the Dagobah system, Luke... Dagobah...');
          console.log(this.complearner);
      }
      
    }


     ////////  My Personal Task //////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////

     getSystemTasks() {
      this.systemtasks = [];
      this.systemtasksdetails = [];
        this.mersetaservice.getAssessmentTask()
        .subscribe(
           response => {
             this.systemtasks = response;
             this.systemtasks.forEach(obj => {
                var status = "";
                  if(obj.taskStatus == "0") {
                    status = "Not Started"
                  }else if (obj.taskStatus == "1") {
                    status = "Started"
                  }else if (obj.taskStatus == "2") {
                    status = "Completed"
                  }
                   var obvalues = {id:obj.id,prossname : " Learner Moderation Batch", description :obj.description,taskStatus:status,dueDate:obj.dueDate,targetKey:obj.targetKey,targetClass:obj.targetClass};       
                   this.systemtasksdetails.push(obvalues);
             });
             console.log(response);       
           //  document.getElementById("numberoftasks").innerHTML = ""+ this.systemtasksdetails.length;
           }
        );
      }
  
      getUserTasks(userid) {
        this.userTaks = [];
        this.usertasksdetails = [];
        this.mersetaservice.getUserTask(userid)
        .subscribe(
           response => {
             this.userTaks = response;
             this.userTaks.forEach(obj => {
                var status = "";
                  if(obj.taskStatus == "0") {
                    status = "Not Started"
                  }else if (obj.taskStatus == "1") {
                    status = "Started"
                  }else if (obj.taskStatus == "2") {
                    status = "Completed"
                  }
                  var taskhearder = "" 
                  if(obj.targetClass == "haj.com.entity.CompanyLearnerBacthList") {
                    taskhearder = "Learner Moderation Batch";
                  }else if(obj.targetClass == "haj.com.entity.ExternalModerationBatchRejection") {
                    taskhearder = "Batch List Rejection";
                  }else if(obj.targetClass == "haj.com.entity.CompanyLearners") {
                    taskhearder = "Employer Learner";
                  }
                   var obvalues = {id:obj.id,prossname : taskhearder, description :obj.description,taskStatus:status,dueDate:obj.dueDate,targetKey:obj.targetKey,targetClass:obj.targetClass};       
                   this.usertasksdetails.push(obvalues);
             });
             console.log(response); 
             this.usertasksdetailstsort = this.usertasksdetails.reverse();
           }
        );
      }
  
      getSdpComany(id) {
        this.mersetaservice.getSdpCompany(id)
        .subscribe(
           response => {
             this.spdcompany = response;
             console.log("sdp : ", response);
             this.getCompanySite(this.spdcompany.companyId);
            // this.getSingleCompany(this.spdcompany.companyId);
           }
        );
      }
  
      getSingleCompany(uid) {
        this.mersetaservice.getSingleCompany(uid)
        .subscribe(
           response => {
             this.company = response[0];
             console.log("company : ", this.company);
           }
        );
      }
  
      getCompanySite(compid) {
        this.mersetaservice.getCompanySite(compid)
        .subscribe(
           response => {
             this.companysite = response;
             this.companysite[0].companyName
             console.log("company site : ", this.companysite);
           }
        );
      }
  
      CreateSite(body) {
        this.mersetaservice.CreateSiteVisit(body)
        .subscribe(
           response => {
             console.log("site visit : ", response);
             var obj = {};
             this.UpdateTaskStatus(obj,this.task_id,1);
           }
        );
      }

      CreatTaskUser(body) {
        this.mersetaservice.CreateTaskUser(body)
        .subscribe(
           response => {
             console.log("task user : ", response);
             this.showSuccessViaToast();
           }
        );
      }
  
      UpdateTaskStatus(body,taskid,status) {
        this.mersetaservice.UodateTaskStatus(body,taskid,status)
        .subscribe(
           response => {
             console.log("task updated : ", response);
             var date = new Date();
             var obj = {
              "createDate": date,
              "taskId": taskid,
              "userId": this.currentuserid
            }
            this.CreatTaskUser(obj);
           }
        );
      }
  
      showBasicDialog(value) {
        this.task_id = value;
        var taskstatus = this.systemtasks.filter(x => x.id ==  this.task_id)[0].taskStatus;
        if(taskstatus == "0") {
          this.displayBasic = true;
          var spdid = this.systemtasks.filter(x => x.id ==  this.task_id)[0].createUserId;
          this.assessmentbacthid = this.systemtasks.filter(x => x.id ==  this.task_id)[0].targetKey;
          this.sdpuserid = spdid;
          this.getSdpComany(spdid);
        }
      }

      showBasicDialogMyTask(value) {
        this.task_id = value;
        var taskstatus = this.userTaks.filter(x => x.id ==  this.task_id)[0].taskStatus;
        var targetclass = this.userTaks.filter(x => x.id ==  this.task_id)[0].targetClass;
        
        console.log(taskstatus);
        console.log(targetclass);
        if((taskstatus == "1")&&(targetclass == "haj.com.entity.CompanyLearnerBacthList")) {
          var spdid = this.userTaks.filter(x => x.id ==  this.task_id)[0].createUserId;
          this.assessmentbacthid = this.userTaks.filter(x => x.id ==  this.task_id)[0].targetKey;
          this.sdpuserid = spdid;
          this.router.navigate(['/main/externalmoderation',btoa(this.assessmentbacthid),btoa(this.sdpuserid),btoa(this.task_id)]); //, {skipLocationChange:true});
        }else if((taskstatus == "2")&&(targetclass == "haj.com.entity.CompanyLearnerBacthList")) {
          var spdid = this.userTaks.filter(x => x.id ==  this.task_id)[0].createUserId;
          this.assessmentbacthid = this.userTaks.filter(x => x.id ==  this.task_id)[0].targetKey;
          this.sdpuserid = spdid;
          this.router.navigate(['/main/sormanagement',btoa(this.assessmentbacthid),btoa(this.sdpuserid),btoa(this.task_id)]); //, {skipLocationChange:true});
        }
       // console.log(taskstatus);

        if((taskstatus == "0")&&(targetclass == "haj.com.entity.ExternalModerationBatchRejection")) {
          var spdid = this.userTaks.filter(x => x.id ==  this.task_id)[0].createUserId;
          this.assessmentbacthid = this.userTaks.filter(x => x.id ==  this.task_id)[0].targetKey;
          this.sdpuserid = spdid;
          this.router.navigate(['/main/moderationrejection',btoa(this.assessmentbacthid),btoa(this.sdpuserid),btoa(this.task_id)]); //, {skipLocationChange:true});
        }else if((taskstatus == "1")&&(targetclass == "haj.com.entity.ExternalModerationBatchRejection")) {
        
          this.router.navigate(['/main/moderationrejection']); //, {skipLocationChange:true});
        }

        //////
        if((taskstatus == "0")&&(targetclass == "haj.com.entity.CompanyLearners")) {
          var targetkey = this.userTaks.filter(x => x.id ==  this.task_id)[0].targetKey;
        var companyid = this.userTaks.filter(x => x.id ==  this.task_id)[0].companyId;
        var actionuserid = this.userTaks.filter(x => x.id ==  this.task_id)[0].actionUserId;
        console.log("for learner details",targetkey + " companyid " +companyid+" actionuserid"+ actionuserid);
          this.router.navigate(["/main/learnerdetails", btoa(actionuserid), btoa(companyid),btoa(this.task_id)]); //, {skipLocationChange:true});
        }

      }
  
      modelChanged(event) {
         if(this.sitevisitdate != null) {
           this.isdateselected = false;
           console.log(this.sitevisitdate);
         }else {
          this.isdateselected = true;
          console.log(this.sitevisitdate);
         }
      }
  
      subnitsidtedate() {
        if(this.sitevisitdate == null) {
           this.isdateselected = true;
        }else {
          this.displayBasic = false;
          var date = new Date();
          console.log("Task Id : " + this.task_id);
           var obj = {
            "createDate": date,
            "visitDate": date,
            "companyId": this.spdcompany.companyId,
            "approvalEnum": 0,
            "userId": this.sdpuserid,
            "assessmentProcessBatchId": this.assessmentbacthid
          }
          this.CreateSite(obj);
          console.log("Clicked");
        }
      }
  
      showSuccessViaToast() {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Site Visit', detail: ' Successfully Scheduled' });
        if(this.uRole == "Quality Assuror"){
          this.getSystemTasks();
        }
        this.getUserTasks(this.currentuserid);
      }
  
      onChangeSite() {
        
      }
}
