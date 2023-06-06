import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Company } from '../model/company.model';
import { User } from '../model/users.model';
import {Location} from '@angular/common';
import { MersetaService } from '../service/merseta.service';
import {TabViewModule} from 'primeng/tabview';
import { CompLearner } from '../model/complearner.model';
import { Funding } from '../model/funding.model';
import { SaqaQualification } from '../model/Saqa.model';
import { AddressModel } from '../model/addressmodel';
import { Program } from '../model/program';
import { SdfCompany } from '../model/sdfcompany';
import { SicCode } from '../model/siccode';
import { Town } from '../model/town.model';
import { Province } from '../model/province';
import { Municipality } from '../model/municipality';
import { Accreditationtype } from '../model/accreditationtype';
import { AccreditationStatus } from '../model/accstatus';
import { Seta } from '../model/seta.model';
import { TrainingProvider } from '../model/trainingprovider';
import { LearnerStatus } from '../model/learnerstatus';
import { ActivatedRoute, Router } from '@angular/router';
import { DisabilityRating } from '../model/disabilityrating';
import { Disabilitystatus } from '../model/disabilitystatus';
import { UserTaks } from '../model/usertasks';
import { TaskStatus } from '../model/taskstatus';
import { MessageService, PrimeIcons } from 'primeng/api';
import { events } from '../model/events';
import { AppMainComponent } from 'src/app/app.main.component';
import { AppComponent } from 'src/app/app.component';
import { Comments } from '../model/coments';
import { usercomments } from '../model/usercomments';
import { Observable, Subscription } from 'rxjs';
import { ConfigDoc } from '../model/configdoc';
import { LearnerDoc } from '../model/learnerdoc';
import { DocByte } from '../model/docbyte';
import { RecomendationComment } from '../model/recomendation-comment.model';
import { RecomComment } from '../model/recom-comment.model';
import { RejectionReason } from '../model/rejectionreason';
import { LearnerprogramIndicator } from '../model/learnerprogramindicator';
import { Stittle } from '../model/stittle.model';
import { UserLanguages } from '../model/userlanguages';
import { LangLook } from '../model/langlook';
import { Organisationtype } from '../model/organisationtype.model';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { UrbanRural } from '../model/urbunrural';
import { Highestqualificationrequired } from '../model/highestqualificationrequired';
import { PreviousSchools } from '../model/priviouschools';
import { TvetFetQualification } from '../model/tvetFetQualification';


@Component({
    selector: 'app-learnerdetails',
    templateUrl: './app.learnerdetails.component.html',
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
`]
})

export class AppLearnerDetailsComponent implements OnInit {

  valRadioqual1: string ="";


    //learner details
    value1: any;
    Tittle: any;
    firstName: any;
    lasttName:any;
    middlename:any;
    secondemail: any;
    maidenname: any;
    idenumber: any;
    createDateLearner: any;
    alternativeIdNumber: any;
    Nationality: any;
    Dateofbirth: any;
    phonenumber: any;
    email: any;
    cellnumber: any;
    gender: any;
    disability: any;
    disabilitytype: any;
    disabilitylevel: any;
   //Home Address
        Addresss: any;
        Address1: any;
        Address2: any;
        Postalcode: any;
        Area: any;
        Pronvince: any;
        Municipality: any;
        Distritrict: any;
        Town : any;

        pAddress:any;
        pAddress1: any;
        pAddress2:  any;
        pPostalcode: any;
        pArea: any;
        pPronvince: any;
        pMunicipality: any;
        pDistritrict: any;
        pTown : any;

        languages : any[]

        /////////////////////////////////
        //////////// Training information ///////////////

        programtype: any;
        pivnonpivtraining: any;
        nqlaligned: any;
        saqaid: any;
        commencedate: any;
        projenddate: any;
        isleanermersetafunded: any;
        sourcefund: any;

        ///// EMPLOYER INFORMATION ///////
        employerName: any;
        entityId: any;
        contactFirstName: any;
        contactLastName: any;
        telephone: any;
        celnumber: any;
        faxnumber: any;
        emailAddress: any;
        regNumber: any;
        sicCode: any;
        empsiccode:any;
        emporgtpe:any;
        providersiccode:any;
        provideremporgtpe:any;

        eAddresss: any;
        eAddress1: any;
        eAddress2: any;
        ePostalcode: any;
        ePronvince: any;
        eTown: any;

        epAddresss: any;
        epAddress1: any;
        epAddress2: any;
        epPostalcode: any;
        epPronvince: any;
        epTown: any;

        ///////////////////////////////////////////////
        ////// PROVIDER DETAILS //////////////
        providerName: any;
        accType: any;
        accNumber: any;
        accStatus: any;
        setaRegistarion: any;
        dateReview: any;
        contactsLastName: any;
        contactsfirstName: any;
        telphone: any;
        cellnumb: any;
        faxnum: any;
        emailAdd: any;
        sicCod: any;

        providerAddresss: any;
        providerAddress1: any;
        providerAddress2: any;
        providerPostalcode: any;
        providerPronvince: any;
        providerTown: any;

        proAddresss: any;
        proAddress1: any;
        proAddress2: any;
        proPostalcode: any;
        proPronvince: any;
        proTown: any;


        ////////////////////////////
        /////////////////////////////
        //// DECLEARATION //////////////
        user: User;
        sdfuser: User;
        sdfprovideruser: User;
        towns: Town[];
        organizationtype: Organisationtype[];
        singletown: Town;
        psingletown: Town;
        provinces: Province[];
        singleprovince: Province;
        psingleprovince: Province;
        municipalities: Municipality[];
        singlemunicipaliyty: Municipality;
        psinglemunicipaliyty: Municipality;
        accredtype : Accreditationtype[] = [];
        accrstatus : AccreditationStatus[] = [];
        setalist : Seta[] = [];
        singaccredit : Accreditationtype;
        singaccredstatus : AccreditationStatus;
        singleseta : Seta;
        isdisabled : boolean = false;
        trainingprovider : TrainingProvider;
        learnstatuslist : LearnerStatus[] = [];
        taskstatuslist : LearnerStatus[] = [];
        configdocs: ConfigDoc[] = [];
        userdocs: LearnerDoc[] = [];
        urbanrural: UrbanRural[];
        singlelearnerstatus: LearnerStatus;
        taskstatus :TaskStatus;
        complearner: CompLearner;
        complearnerfromtask: CompLearner;
        funding : Funding;
        saqaQual : SaqaQualification;
        homeadd : AddressModel;
        postaladd : AddressModel;
        emphomeadd : AddressModel;
        emppostaladd : AddressModel;
        provemphomeadd : AddressModel;
        provemppostaladd : AddressModel;
        programtypes : Program;
        singlecompany : Company;
        singleprovider : Company;
        sdfcompany : SdfCompany;
        sdfperovider : SdfCompany;
        singlesiccode : SicCode;
        singleprovidersiccode : SicCode;
        Uid : number = 0;
        taskid : number = 0;
        comp_learn_id : string;
        companyId : number = 0;
        disabilityrating: DisabilityRating[];
        disabilitystatus: Disabilitystatus[];
        Usertasks : UserTaks[] = [];
        physinglemunicipaliyty: Municipality;
        physingleprovince: Province;
        physingletown: Town;

        ephysinglemunicipaliyty: Municipality;
        ephysingleprovince: Province;
        ephysingletown: Town;

        pphysinglemunicipaliyty: Municipality;
        pphysingleprovince: Province;
        pphysingletown: Town;

        pephysinglemunicipaliyty: Municipality;
        pephysingleprovince: Province;
        pephysingletown: Town;
        mycomments : RecomendationComment[] = [];

        statusDate: any;
        Applystatus: any;
        statusnotify: any;
        statusNotes: any;
        comment_u_name: any;
        comment_message: any;
        events1: any[] = [];
        events3: any[] = [];
        userlanguages: UserLanguages[];
        founduserlanguages: any[] = [];
        Documents: any[] = [];
        events2: events[] = [];
        ucomments : usercomments[] = [];
        recommendationapp: RecomendationComment
        chatuser : User;
        isDataAvailable:boolean = false;
        isguardianornextofkin:boolean = false;
        udetails : string;
        appstatus : string;
        isdisableview : any =false;
        isvisiblepanel: any =false;
        isvisiblevents : any =false;
        usertittles: Stittle[];
        langlook: LangLook[];

      rejectionReason: RejectionReason[];
      rejectionSelected: RejectionReason;
      learnerprogramIndicator: LearnerprogramIndicator[];
      learnerprogramIndicatorSelected: LearnerprogramIndicator[];
      rcomments: RecomComment[] =[];
      myrecomment: RecomendationComment[] =[];
      nextofkinname: any;
      nextofkintelephone: any;
      nextofkinlastname: any;
      nextofkinemail:any;
      urbanruraldata:any;

      hihgesteducationlevel:any;
      lastschoolattended: any;
      lastschoolyeardate: any;
      tvetqualification:any;
      highestqualification: Highestqualificationrequired[];  
      prevschools: PreviousSchools[];
      tvetfetqualification: TvetFetQualification[];
     
      valRadioqual2: string ="";
      appStatusInt: any =0;
      contractNumber: any = null;
      checkedEmployment: any;
      checkedeContractofEmploymen: any;

      
    constructor(private mersetaservice: MersetaService,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef,public app: AppComponent,private router: Router,private _location: Location,private messageService: MessageService) {

    }

    public goBack() {
      this._location.back();
    }

    //WBL Documents
    testPDF:any;

    getWBL(){
      this.createWBL();
      window.open('http://154.127.114.58/Documents/wbl' + this.Uid+'.pdf', "_blank");
    }

    createWBL(){
      this.mersetaservice.createdocument(this.Uid)
            .subscribe(
                response => {
                    this.testPDF = response;
                     console.log(this.testPDF);

               }
            );
    }

    //getCopyOfContract
    getCopyOfContract(id) {
      this.mersetaservice.getCopyOfContract(id)
      .subscribe(
         response => {
           console.log('Copy Of Contract IS: ',response);
           this.checkedEmployment = response.employmentStatus.toString();
           this.checkedeContractofEmploymen = response.checkedeContractofEmploymentSpecified.toString();
         }
      );
    }

    ngOnInit(): void {
        //this.value1 = "Welcome";
        this.route.params.subscribe(
            params => {
                   // your code
                   const id = atob(params['id']);
                   const compid = atob(params['compid']);
                   const task_id = atob(params['taskid']);
                   this.Uid = Number(id);
                   this.companyId = Number(compid);
                   this.taskid = Number(task_id);
                   console.log("task id = " + this.taskid);
                   console.log("company id = " + this.companyId);
          });

          if(this.taskid == 0) {
           this.isvisiblepanel =false;
           this.isvisiblevents = true;
          }else {{
            this.isvisiblepanel =true;
            this.isvisiblevents = false;
          }}

      
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

           /*this.setalist = [
            {id: '0', description: "AgriSETA - Agriculture Sector Education and Training Authority"},
            {id: '1', description: "BANKSETA - Banking Sector Education and Training Authority"},
            {id: '2', description: "CATHSSETA - Culture, Arts, Tourism, Hospitality and Sports Education and Training Authority"},
            {id: '3', description: "CETA - Construction Education and Training Authority"},
            {id: '4', description:"CETA - Construction Education and Training Authority"},
            {id: '5', description: "CHIETA - Chemical Industries Education and Training Authority"},
            {id: '6', description: "ETDP SETA - Education, Training and Development Practices Sector Education and Training Authority"},
            {id: '7', description: "EWSETA - Energy Sector Education and Training Authority"},
            {id: '8', description: "FASSET - Financial and Accounting Services SETA"},
            {id: '9', description: "FOODBEV - Food and Beverages Manufacturing Industry Sector Education and Training Authority"},
            {id: '10', description: "FP&M SETA - Fibre Processing & Manufacturing Sector Education and Training Authority"},
            {id: '11', description: "HW SETA - Health and Welfare Sector Education and Training Authority"},
            {id: '12', description: "INSETA - Insurance Sector Education and Training Authority"},
            {id: '13', description: "LGSETA - Local Government and related Services Sector Education and Training Authority"},
            {id: '14', description: "MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority"},
            {id: '15', description: "MICTS - Media, Information, and Communication Technologies SETA"},
            {id: '16', description: "MQA - Mining Qualifications Authority"},
            {id: '17', description: "PSETA - Public Service Sector Education and Training Authority"},
            {id: '18', description: "SASSETA - Safety and Security Sector Education and Training Authority "},
            {id: '19', description: "SERVICES - Services Sector Education and Training Authority"},
            {id: '20', description: "TETA - Transport Education and Training Authority"},
            {id: '21', description: "W&RSETA - Wholesale & Retail Sector Education and Training Authority"},
           ];*/

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

           this.taskstatuslist = [
            {id: '0', description: "Not Started"},
            {id: '1', description: "Underway"},
            {id: '2', description: "Completed"}];

            this.events1 = [
              {status: 'Completed', date: '2019-10-29 08:34:13', icon: PrimeIcons.CHECK, color: '#977949',data : "Please upload the required learner registration application documents for: Abigale Ralebepa (9309201449085, AbigaleR@resolutioncircle.co.za) for RESOLUTION CIRCLE PTY LTD (L010782110)."},
              {status: 'Completed', date: '2021-08-02 14:40:56', icon: PrimeIcons.CHECK, color: '#977949',data : "Please complete the mutual learner agreement rescission application for PFANELO SIGONDE (9704065219089, thesgonde@gmail.com) linked to South African Council for Graduates (SACGRA) formerly SACGC (SA Council for Graduates (SACGRA), N000100752). Please review."},
              {status: 'Not Starterd', date: ' ', icon: PrimeIcons.CHECK, color: '#977949',data : "There is a mutual learner agreement rescission application for PFANELO SIGONDE (9704065219089, thesgonde@gmail.com) linked to South African Council for Graduates (SACGRA) formerly SACGC (SA Council for Graduates (SACGRA), N000100752). Please review."},
             ];

             this.events3.push({status: 'Completed', date: '2022-11-22 14:40:56', icon: PrimeIcons.CHECK, color: '#977949',data : "Created Learner Application"}); 

             this.getUrbanaRural();
             this.getAllDisabilityStatus();
             this.getorganizationtype();
             this.getSingleCompany(this.companyId);
            // this.getCompLearner(this.Uid,this.companyId);
             this.getAllTowns();
             this.getAllPronvinces();
             this.getAllMunicipalities();
             this.getAllRejectionReason();
             this.getAllLearnerInduction();
             this.getTitle();
             this.getAllUserTaks(this.companyId);
             this.getAllLanguages();
           //  this.getSingleUser(this.Uid); console.log('single' + this.Uid);
        //     this.getSingleCompany(this.companyId);
        console.log('Are we even getting here');
             this.getCompLearner(this.Uid,this.companyId);
             this.loadApiData();



           /* this.mersetaservice.getAllUserTaks(this.companyId)
            .subscribe(
                response => {
                    this.Usertasks = response;
                    for(let tk of this.Usertasks) {63
                      var ev = new events;
                      var actiondate = new  Date(tk.actionDate);
                      this.taskstatus =  this.taskstatuslist.filter(x => x.id == tk.taskStatus)[0];
                      ev.setstatus(this.taskstatus.description);
                      ev.setdate(actiondate.toLocaleDateString() + " " + actiondate.toLocaleTimeString());
                      ev.seticon(PrimeIcons.SHOPPING_CART);
                      ev.setcolor("#977949");
                      ev.setdata(tk.description);
                      this.events2.push(ev);
                      console.log("Changes to show");
                     // this.changeDetectorRef.detectChanges();
                     }

                     console.log(this.events1);

               }
            );

            this.events1 = this.events2; */

             /* var ev = new events;
          //  var actiondate = new  Date(tk.actionDate);
          //  this.taskstatus =  this.taskstatuslist.filter(x => x.id == tk.taskStatus)[0];
            ev.setstatus("Ordered");
            ev.setdate("15/10/2020 10:30");
            ev.seticon("pi pi-check");
            ev.setcolor("#977949");
            ev.setdata("Testing card infomration for warington Testing card infomration for warington Testing card infomration for warington");
            this.events1.push(ev);



         /* this.events1.push({status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0',data : "Testing card infomration for warington Testing card infomration for warington Testing card infomration for warington"});
             this.events1.push({status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0',data : "Testing card infomration for warington Testing card infomration for warington Testing card infomration for warington"});
             this.events1.push({status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0',data : "Testing card infomration for warington Testing card infomration for warington Testing card infomration for warington"});

             var ev = new events;
             //  var actiondate = new  Date(tk.actionDate);
             //  this.taskstatus =  this.taskstatuslist.filter(x => x.id == tk.taskStatus)[0];
               ev.setstatus("Ordered");
               ev.setdate("15/10/2020 10:30");
               ev.seticon("pi pi-check");
               ev.setcolor("#977949");
               ev.setdata("Testing card infomration for warington Testing card infomration for warington Testing card infomration for warington");
               this.events1.push(ev); */

    }

    /////////////////////////////////////////////////////
    ////// LOAD API DATA ///////////////////////////////////
    //////////////////////////////////////////////////

        //Get Titles For DropDowns
        getTitle(){
          this.mersetaservice.getTitle()
          .subscribe(
              response => {
                 this.usertittles = response;
              }
          )
      }


    onChangedIndicatortype(): void {

      console.log("diability level : ", this.learnerprogramIndicatorSelected)
      console.log("id : ", this.learnerprogramIndicatorSelected["id"])
      console.log("name : ", this.learnerprogramIndicatorSelected["name"])
    //  this.nationvalue = this.selectDropdownOptionsNationality;
  
    }

    onChangedRejectiontype(): void {

      console.log("diability level : ", this.learnerprogramIndicatorSelected)
      console.log("id : ", this.learnerprogramIndicatorSelected["id"])
      console.log("name : ", this.learnerprogramIndicatorSelected["name"])
    //  this.nationvalue = this.selectDropdownOptionsNationality;
  
    }

     //indicator
  getAllLearnerInduction(){
    this.mersetaservice.getAllLearnerInduction()
        .subscribe(
            response => {
                this.learnerprogramIndicator = response;
                console.log("START indicator");
                console.log(response);
                console.log("END indicator");
               // this.loadUsercomments();
                this.loadLearnerStatus();
            }
        )
  }
  //

      //Get all Languages for DropDowns
      getAllLanguages() {
        this.mersetaservice.getAllLanguages()
        .subscribe(
           response => {
             this.langlook = response;
             this.getUserLanguages(this.Uid);
             console.log('STEP ALPHA: THE LINGO, JASON. THE LINGO IS', response);
           }
        );
      }

 //get rejections
 getAllRejectionReason(){
    this.mersetaservice.getAllRejectionReason()
    .subscribe(
        response => {
            this.rejectionReason = response;
            console.log("START rejection");
            console.log(response);
            console.log("END rejection");
           // this.loadUsercomments();
            this.loadLearnerStatus();
        }
    )
  }

  //get rejections
 getorganizationtype(){
  this.mersetaservice.getOrganasationType()
  .subscribe(
      response => {
          this.organizationtype = response;
          console.log("organization type");
      }
  )
}

  getusercomments(comid1) {
    this.mersetaservice.getAllrecommendationcomment(comid1)
    .subscribe(
       response => {
        this.myrecomment = [];
        this.myrecomment = response;
         console.log(response);
         for(let mk of  this.myrecomment) {
            this.mersetaservice.getSingleUser(mk.action_User_Id).subscribe(
              response => {
                var newcom = new RecomComment;
                var users : User;
                var subdate = new  Date(mk.learner_Status_Date);
                console.log("//////////////////////////");
                users = response;
                console.log(users);
                newcom.setnamea(this.mersetaservice.uName);
                newcom.setemaila(this.mersetaservice.uEmail);
                newcom.setcreateDatea(subdate.toLocaleDateString());
                newcom.setcommenta(mk.notes);
                this.rcomments.push(newcom);
               this.changeDetectorRef.detectChanges();
              }
             );
             this.changeDetectorRef.detectChanges();
         }

       }
    );
   // this.changeDetectorRef.detectChanges();
 }
    /////////////////////////////////////////////////////
    //////////////////////////////////////////////////

    loadApiData() {
      if (this.user.genderId == "1") {
          this.gender = "Male";
        }
        else if (this.user.genderId  == "2"){
          this.gender = "Female";
        }

        var date;
        if(this.user.dateOfBirth != null) {
          console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',this.user.dateOfBirth);
          date = new  Date(this.user.dateOfBirth).toLocaleDateString();
          console.log(this.user.dateOfBirth);
        }else {
          date = "N/A"
        }


        var disability = "";
         console.log("your disability :" ,this.user.disability);
        if(this.user.disabledId == "2")  {
          disability = "No"
          this.isdisableview = "hidden";
          this.isdisabled = false;
        }else if(this.user.disabledId == "1") {
          disability = "Yes"
          this.isdisabled = true;
          this.isdisableview = "visible";
          if(this.user.disabilityStatus != null) {
           var disabilitystatus = this.disabilitystatus.filter(x => x.id == this.user.disabilityStatus)[0].description;
           this.disabilitytype  = disabilitystatus;
          }else{
            this.disabilitytype = "NA";
          }
          if(this.user.disabilityRatingId != null) {
            var disabilitrating = this.disabilityrating.filter(x => x.id == this.user.disabilityRatingId)[0].description;
            this.disabilitylevel = disabilitrating;
          }else {
            this.disabilitylevel = "NA"
          }
          
        }

        if(this.user.titleId != null){
          var tittlename = this.usertittles.filter(x => x.id == this.user.titleId)[0].description;
          this.Tittle = tittlename;
        }else {
          this.Tittle = "N/A";
        } 

        
          this.firstName = this.user.firstName;
          this.lasttName = this.user.lastName;
          this.idenumber = this.user.rsaIdNumber;
          this.createDateLearner = new Date(this.user.createDate).toLocaleDateString();
          this.Nationality = "South African";
          this.Dateofbirth =  date;
          this.phonenumber =  this.user.telNumber;
          this.email  =  this.user.email;
          this.secondemail = this.user.secondaryEmailAddress;
          this.maidenname = this.user.maidenName;
          this.cellnumber = this.user.cellNumber;
          this.gender = this.gender;
          this.disability = disability;
       //   this.disabilitytype = "";
          //this.disabilitylevel =  "";xx
          this.middlename = this.user.middleName;
          if(this.user.urbanRuralEnum != null) {
            var urbrural = this.urbanrural.filter(x => x.id == this.user.urbanRuralEnum)[0].description;
            this.urbanruraldata = urbrural;
          }else {
            var urbrural = this.urbanrural.filter(x => x.id == "1")[0].description;
            this.urbanruraldata = urbrural;
          }

          this.udetails = this.user.firstName + " " + this.user.lastName + " (" + this.user.rsaIdNumber + ")           ";
          document.getElementById("userdetails").innerHTML = this.udetails;
      }

      LoadNextOfKinData() {
          this.nextofkinname = this.user.nextOfKinName;
          var lastname ,email;

          if(this.user.nextOfKinLastName != null){ 
            lastname = this.user.nextOfKinLastName;
            this.nextofkinlastname = lastname;
          }else {
            this.nextofkinlastname  = "N/A";
          }

          if(this.user.nextOfKinEmail != null){ 
            email = this.user.nextOfKinEmail;
            this.nextofkinemail = email;
          }else {
            this.nextofkinemail  = "N/A";
          }

          if(this.user.nextOfKinTelephone != ""){ 
            this.nextofkintelephone = this.user.nextOfKinTelephone;
          }else {
            this.nextofkintelephone  = "N/A";
          }
      }

      loadHomeAddress() {
        this.singletown =  this.towns.filter(x => x.id == this.homeadd.townId)[0];
        this.singlemunicipaliyty =  this.municipalities.filter(x => x.id == this.homeadd.municipalityId)[0];
        this.singleprovince =  this.provinces.filter(x => x.id == this.singlemunicipaliyty.provincesIdprovinces)[0];
        this.Addresss = this.homeadd.addressLine1;
        this.Address1 = this.homeadd.addressLine2;
        this.Address2 = this.homeadd.addressLine3;
        this.Postalcode = this.homeadd.postcode;
        this.Area = this.homeadd.statsSaareaCodeId;
        this.Pronvince= this.singleprovince.provinceDesc;
        this.Municipality = this.singlemunicipaliyty.municipalityDesc;
        this.Distritrict = this.singlemunicipaliyty.code;
        this.Town = this.singletown.description;

      }

      loadPostalAddress() {
        this.psingletown =  this.towns.filter(x => x.id == this.postaladd.townId)[0];
        this.psinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.postaladd.municipalityId)[0];
        this.psingleprovince =  this.provinces.filter(x => x.id == this.psinglemunicipaliyty.provincesIdprovinces)[0];

        this.pAddress = this.postaladd.addressLine1;
        this.pAddress1 = this.postaladd.addressLine2;
        this.pAddress2 = this.postaladd.addressLine3;
        this.pPostalcode = this.postaladd.postcode;
        this.pArea =  this.postaladd.statsSaareaCodeId;
        this.pPronvince = this.psingleprovince.provinceDesc;
        this.pMunicipality = this.psinglemunicipaliyty.municipalityDesc;
        this.pDistritrict = this.psinglemunicipaliyty.code;
        this.pTown = this.psingletown.description;

      }

      loadTrainingData() {
        if (this.complearner.nqfAlignedId = "1") {
          this.nqlaligned = "YES";
        }
        else if (this.complearner.nqfAlignedId  = "2"){
          this.nqlaligned = "NO";
        }
        if(this.complearner.mersetaFunded = "1") {
          this.isleanermersetafunded = "No";
          this.sourcefund = this.funding.description;
        }else if (this.complearner.mersetaFunded = "1"){
          this.isleanermersetafunded = "Yes";
          this.sourcefund = "merSETA funded";
        }

        var dateprojend = new  Date(this.complearner.completionDate);
        var datecommence = new  Date(this.complearner.commencementDate);
        console.log("proj end date : " + this.complearner.completionDate);

        this.programtype = this.programtypes.description;
        this.pivnonpivtraining = "PIVOTAL";
        this.nqlaligned = this.nqlaligned;
        this.saqaid = ("(" + this.saqaQual.qualificationid + ") " + this.saqaQual.qualificationtitle); // + this.saqaQual.qualificationid + ") " + this.saqaQual.qualificationtitle,
        this.commencedate = datecommence.toLocaleDateString();
        this.projenddate = dateprojend.toLocaleDateString();
        this.isleanermersetafunded = this.isleanermersetafunded;
        this.sourcefund = this.sourcefund;

      }


      loadpreschools() {
        var prevschol;
        if(this.complearner.previousSchools != null) {
          console.log("Previous schools : ",this.complearner.previousSchools);
          prevschol = this.prevschools.filter(x => x.id == this.complearner.previousSchools)[0];
          console.log("Previous Name : ",prevschol.schoolName);
          this.lastschoolattended = prevschol.schoolName;
        }else {
          this.lastschoolattended = "N/A";
        }
      }

      loadEmployerData() {

        var sicCod,orgazationtypeid,singleorgazationtype;
        if(this.singlecompany != null){
          this.employerName = this.singlecompany.companyName;
          this.entityId = this.singlecompany.levyNumber;
          this.regNumber = this.singlecompany.companyRegistrationNumber;
   
          if(this.singlecompany.sicCodeId != null) {
             sicCod = this.singlecompany.sicCodeId;
             this.empsiccode = "("+sicCod+") "+this.singlesiccode.description;
          } 
          if(this.singlecompany.organisationTypeId != null) {
              orgazationtypeid = this.singlecompany.organisationTypeId;
              singleorgazationtype =  this.organizationtype.filter(x => x.id == orgazationtypeid)[0].description;
              this.emporgtpe =  "("+orgazationtypeid+") " + singleorgazationtype;
          }
          
        }
        if(this.sdfuser != null) {
          console.log("sdf",this.sdfuser);
          this.contactFirstName = this.sdfuser.firstName;
          this.contactLastName = this.sdfuser.lastName;
          this.telephone = this.sdfuser.telNumber;
          this.celnumber = this.sdfuser.cellNumber;
          this.faxnumber = this.sdfuser.faxNumber;
          this.emailAddress = this.sdfuser.email;
        }
        if(this.singlesiccode != null) {
          this.sicCode = this.singlesiccode.description;
        }

        console.log("SIC Code : " + this.singlecompany.sicCodeId);
      }


      loadGuardianNextofkin() {
        var highq,lastsdate,tevqual;
        if(this.complearner.highestEducationEnum != null) {
          highq = this.highestqualification.filter(x => x.id == this.complearner.highestEducationEnum)[0].description;
          this.hihgesteducationlevel = highq;
        }else {
          this.hihgesteducationlevel = "N/A";
        }

        if(this.complearner.lastSchoolYear != null) {
          var date = new  Date(lastsdate).getFullYear();
          this.lastschoolyeardate = date;
        }else {
          this.lastschoolyeardate = "N/A";
        }

        if(this.complearner.tvetFetQualificationId != null) {
          tevqual = this.tvetfetqualification.filter(x => x.id == this.complearner.tvetFetQualificationId)[0].description;
          this.tvetqualification = tevqual;
        }else {
          this.tvetqualification = "N/A";
        }

      }

      loadEmpHomeAddress() {
        this.physingletown =  this.towns.filter(x => x.id == this.emphomeadd.townId)[0];
        this.physinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.emphomeadd.municipalityId)[0];
        this.physingleprovince =  this.provinces.filter(x => x.id == this.physinglemunicipaliyty.provincesIdprovinces)[0];

        this.eAddresss = this.emphomeadd.addressLine1;
        this.eAddress1 = this.emphomeadd.addressLine2;
        this.eAddress2 = this.emphomeadd.addressLine3;
        this.ePostalcode = this.emphomeadd.postcode;
        this.ePronvince = this.physingleprovince.provinceDesc;
        this.eTown = this.physingletown.description;


      }

      loadEmpPostalAddress() {
        this.ephysingletown =  this.towns.filter(x => x.id == this.emppostaladd.townId)[0];
        this.ephysinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.emppostaladd.municipalityId)[0];
        this.ephysingleprovince =  this.provinces.filter(x => x.id == this.ephysinglemunicipaliyty.provincesIdprovinces)[0];

        this.epAddresss = this.emppostaladd.addressLine1;
        this.epAddress1 = this.emppostaladd.addressLine2;
        this.epAddress2 = this.emppostaladd.addressLine3;
        this.epPostalcode = this.emppostaladd.postcode;
        this.epPronvince = this.ephysingleprovince.provinceDesc;
        this.epTown = this.ephysingletown.description;

      }

      loadProviderData() {
        var orgtypeid,siccodeid,orgtypedescritopm;
        if(this.trainingprovider.accreditationApplicationType != null){
          this.singaccredit =  this.accredtype.filter(x => x.id == this.trainingprovider.accreditationApplicationType)[0];
        }

        if(this.singleprovider.sicCodeId != null){
          siccodeid = this.singleprovider.sicCodeId;
          this.providersiccode = "("+siccodeid+") "+this.singleprovidersiccode.description;
        }

        if(this.singleprovider.organisationTypeId != null){;
          orgtypeid = this.singleprovider.organisationTypeId;
          orgtypedescritopm =  this.organizationtype.filter(x => x.id == orgtypeid)[0].description;
          this.provideremporgtpe =  "("+orgtypeid+") " + orgtypedescritopm;
        }
       
        this.singaccredstatus =  this.accrstatus.filter(x => x.id == this.trainingprovider.approvalStatus)[0];
        var setaat = "";
        if(this.singleprovider.setaId == null) {
          setaat = "MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority";
        }else {
          this.singleseta =  this.setalist.filter(x => x.id == this.singleprovider.setaId)[0];
          setaat = this.singleseta.description;
        }

        var reviewdate = new  Date(this.trainingprovider.etqaEviewCommitteeDate);
        this.providerName = this.singleprovider.companyName;
        if(this.singaccredit != null){
          this.accType = this.singaccredit.description;
        }
        this.accStatus = this.singaccredstatus.description;
        this.accNumber = this.singleprovider.accreditationNumber;
        this.setaRegistarion = setaat;
        this.dateReview = reviewdate.toLocaleDateString();
        if(this.sdfprovideruser != null) {
          this.contactsfirstName = this.sdfprovideruser.firstName;
          this.contactsLastName = this.sdfprovideruser.lastName;
          this.telphone = this.sdfprovideruser.telNumber;
          this.cellnumb = this.sdfprovideruser.cellNumber;
          this.faxnum = this.sdfprovideruser.faxNumber;
          this.emailAdd = this.sdfprovideruser.email;
       
        }
        if(this.singleprovidersiccode != null) {
          this.sicCod = this.singleprovidersiccode.description;
        }
        
        console.log(this.singleprovider.accreditationNumber)
        console.log("Seta ID : " + this.singleprovider.setaId);

        this.loadLearnerStatus();
      }

      loadprovEmpHomeAddress() {
        this.pphysingletown =  this.towns.filter(x => x.id == this.provemphomeadd.townId)[0];
        this.pphysinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.provemphomeadd.municipalityId)[0];
        this.pphysingleprovince =  this.provinces.filter(x => x.id == this.pphysinglemunicipaliyty.provincesIdprovinces)[0];

        this.providerAddresss = this.provemphomeadd.addressLine1;
        this.providerAddress1 = this.provemphomeadd.addressLine2;
        this.providerAddress2 = this.provemphomeadd.addressLine3;
        this.providerPostalcode = this.provemphomeadd.postcode;
        this.providerPronvince = this.pphysingleprovince.provinceDesc;
        this.providerTown = this.pphysingletown.description;

      }

      loadprovEmpPostalAddress() {
        this.pephysingletown =  this.towns.filter(x => x.id == this.provemppostaladd.townId)[0];
        this.pephysinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.provemppostaladd.municipalityId)[0];
        this.pephysingleprovince =  this.provinces.filter(x => x.id == this.pephysinglemunicipaliyty.provincesIdprovinces)[0];

        this.proAddresss = this.provemppostaladd.addressLine1;
        this.proAddress1 = this.provemppostaladd.addressLine2;
        this.proAddress2 = this.provemppostaladd.addressLine3;
        this.proPostalcode = this.provemppostaladd.postcode;
        this.proPronvince = this.pephysingleprovince.provinceDesc;
        this.proTown = this.pephysingletown.description;

      }

      loadLearnerStatus() {
        var subdate = new  Date(this.complearner.createDate);
        this.singlelearnerstatus =  this.learnstatuslist.filter(x => x.id == this.complearner.learnerStatus)[0];

        this.statusDate = subdate.toLocaleDateString();
        this.Applystatus = this.singlelearnerstatus.description;
        this.comment_u_name = "Boipelo";///this.user.firstName +" "+ this.lasttName;
        this.appstatus = this.Applystatus;
          document.getElementById("applicationstatus").innerHTML = this.appstatus;
    
      }


    //////////////////////////////////////////////////
    /////////////////////////////////////////////////

    getSingleUser(id) {
        this.mersetaservice.getSingleUser(id)
        .subscribe(
           response => {
             this.user = response;
             console.log('User is:', this.user)
             this.alternativeIdNumber = response.alternativeIdNumber;
             console.log(response);
             this.loadApiData();
             this.loadUsercomments();
             if(this.user.residentialAddressId != null){
              this.gethomeaddress(this.user.residentialAddressId);
             }
             if(this.user.postalAddressId != null){
              this.getPostaldress(this.user.postalAddressId);
             }  

              if(this.user.nextOfKinName != null) {
                    this.isguardianornextofkin = true;
                    this.LoadNextOfKinData();
              }     
             //this.changeDetectorRef.detectChanges();

           }
        );
      }

      getSdfSingleUser(id) {
        this.mersetaservice.getSingleUser(id)
        .subscribe(
           response => {
             this.sdfuser = response;
             console.log(response);
             console.log("sdf firstname =  " + this.sdfuser.firstName + " sdf lastname = " + this.sdfuser.lastName);
             this.getSicCode(this.singlecompany.sicCodeId);
           }
        );
      }


      getuser(id) {
         this.mersetaservice.getSingleUser(id).subscribe(
          response => {
            console.log(response);
            this.chatuser = response;
          }
         );
      }

      getUserLanguages(user_id) {
        this.mersetaservice.getUserLanguages(user_id).subscribe(
         response => {
           console.log(response);
           this.userlanguages = response;
           console.log("User languages for single user : ", this.userlanguages );
           this.userlanguages.filter(obj => {
                var homelang,speak,read,write;            
                var langdesc = this.langlook.filter(x => x.id == obj.languageId)[0].description;
                if(obj.homeLanguage == "1") {
                  homelang = "Yes";
                }else {
                  homelang = "No";
                }
                if(obj.spearkId == "1") {
                  speak = "Yes";
                }else {
                  speak = "No";
                }
                if(obj.readId == "1") {
                  read = "Yes";
                }else {
                  read = "No";
                }
                if(obj.readId == "1") {
                  write = "Yes";
                }else {
                  write = "No";
                }
                var val = {
                  "id" : obj.id,
                  "name" : langdesc,
                  "homelanguage" : homelang,
                  "read": read,
                  "speak" : speak,
                  "write" : write
                }
              this.founduserlanguages.push(val);
           });
         }
        );
     }


      getSdfProviderSingleUser(id) {
        this.mersetaservice.getSingleUser(id)
        .subscribe(
           response => {
             this.sdfprovideruser = response;
             console.log(response);
             console.log("sdf firstname =  " + this.sdfprovideruser.firstName + " sdf lastname = " + this.sdfprovideruser.lastName);
             this.getProviderSicCode(this.singleprovider.sicCodeId);
           }
        );
      }

      ////////////////////////
      ////////////////////

      getemphomeaddress(addessid){
        this.mersetaservice.getSingleUserAddress(addessid)
        .subscribe(
           response => {
             this.emphomeadd = response[0];
             console.log(response);
           //  console.log(" : "+ this.homeadd.addressLine1);
            // console.log(" : "+ this.homeadd.addressLine2);
             this.loadEmpHomeAddress();
           }
        );
      }

      getempPostaldress(postaladdressid){
        this.mersetaservice.getSingleUserAddress(postaladdressid)
        .subscribe(
           response => {
             this.emppostaladd = response[0];
             console.log(response);
             this.loadEmpPostalAddress();
             //this.changeDetectorRef.detectChanges();
           }
        );
      }
      /////////////////////////////////////////////////
      ////////////////////////////////////////////////////////

      getprovemphomeaddress(addessid){
        this.mersetaservice.getSingleUserAddress(addessid)
        .subscribe(
           response => {
             this.provemphomeadd = response[0];
             console.log(response);
           //  console.log(" : "+ this.homeadd.addressLine1);
            // console.log(" : "+ this.homeadd.addressLine2);
             this.loadprovEmpHomeAddress();
           }
        );
      }

      getprovempPostaldress(postaladdressid){
        this.mersetaservice.getSingleUserAddress(postaladdressid)
        .subscribe(
           response => {
             this.provemppostaladd = response[0];
             console.log(response);
             this.loadprovEmpPostalAddress();
             //this.changeDetectorRef.detectChanges();
           }
        );
      }


      ///////////////////////
      /////////
      gethomeaddress(addessid){
        this.mersetaservice.getSingleUserAddress(addessid)
        .subscribe(
           response => {
             this.homeadd = response[0];
             console.log(response);
           //  console.log(" : "+ this.homeadd.addressLine1);
            // console.log(" : "+ this.homeadd.addressLine2);
            this.loadHomeAddress();
           }
        );
      }

      getPostaldress(postaladdressid){
        this.mersetaservice.getSingleUserAddress(postaladdressid)
        .subscribe(
           response => {
             this.postaladd = response[0];
             console.log(response);
             this.loadPostalAddress();
             this.changeDetectorRef.detectChanges();
           }
        );
      }
    //
      getCompLearner(userid,compid) {
        this.mersetaservice.getCompLearner(userid,compid)
        .subscribe(
           response => {
             this.complearner = response;
             this.getCopyOfContract(response.id);
             console.log('Did we get here?', this.complearner);
             this.getSaqa(this.complearner.qualificationId);
             this.getSingleProvider(this.complearner.employerId);
             this.getAllhighestqualificationrequired();
             this.getAllTvet();
             this.getAllSchools();
             this.comp_learn_id = this.complearner.id;
             this.getAllConfigdocs(this.complearner.userId,this.complearner.id);
             this.loadGuardianNextofkin();
             console.log("loading user comments ",this.complearner.userId);
             this.loadUsercomments();
             console.log("company user id : ",this.complearner.userId);
             console.log("company learner id : ",this.complearner.id);
             this.getCopyOfContract(this.complearner.id);
             
             console.log(response);
           }
        );
      }

      getSaqa(id) {
        this.mersetaservice.getSaqaQualification(id)
        .subscribe(
           response => {
             this.saqaQual = response;
             console.log(response);
             this.getIntervention(this.complearner.interventionTypeId);
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
              //this.getIntervention(this.complearner.mersetaFunded);
              this.getFunding(this.complearner.dundingId);
           }
        );
      }

      getFunding(id) {
        this.mersetaservice.getFunding(id)
        .subscribe(
           response => {
             this.funding = response;
             console.log(response);
             this.loadTrainingData();
           }
        );
      }

      setValue(bval :string) {
       console.log(this.firstName);
       bval = this.firstName;
      }

      getAllhighestqualificationrequired() {
        this.mersetaservice.getAllhighestqualificationrequired()
        .subscribe(
           response => {
             this.highestqualification = response;
             console.log(response);
           }
        );
      }
  
         //Get all Schools for DropDowns
         getAllSchools() {
          this.mersetaservice.getAllPreiviouschools()
          .subscribe(
             response => {
              console.log("previous : ",response);
              this.prevschools = response;
              this.loadGuardianNextofkin();
              this.loadpreschools();
              console.log(response);
             }
          );
        }
  
        //Get all TVET Qualifications for DropDowns
      getAllTvet() {
        this.mersetaservice.getAllTvetqualification()
        .subscribe(
           response => {
             this.tvetfetqualification = response;
             console.log(response);
           }
        );
      }

      getAllTowns() {
        this.mersetaservice.getAllTowns()
        .subscribe(
           response => {
             this.towns = response;
             console.log(response);
           }
        );
      }
      getAllPronvinces() {
        this.mersetaservice.getAllProvinces()
        .subscribe(
           response => {
             this.provinces = response;
             console.log(response);
           }
        );
      }

      getSingleCompany(id) {
        this.mersetaservice.getSingleCompany(id)
        .subscribe(
           response => {
             this.singlecompany = response[0];
             console.log('Step 0');
             console.log(response);
             console.log(this.singlecompany);
            // this.loadEmployerData();
             console.log('Step 0');
             this.getSdfCompany(this.companyId);
             this.getemphomeaddress(this.singlecompany.residentialAddressId);
             this.getempPostaldress(this.singlecompany.postalAddressId);
           }
        );
      }

      getSingleProvider(id) {
        this.mersetaservice.getSingleCompany(id)
        .subscribe(
           response => {
             this.singleprovider = response[0];
             this.getTraininProvider(this.singleprovider.id);
             console.log('Step 1');
             console.log(response);
             console.log(this.singleprovider);
            // this.loadProviderData();
             console.log('Step 1');
             this.getSdfProvider(this.companyId)
             this.getprovemphomeaddress(this.singleprovider.residentialAddressId);
             this.getprovempPostaldress(this.singleprovider.postalAddressId);
           }
        );
      }



      getSicCode(id) {
        this.mersetaservice.getSicCode(id)
        .subscribe(
           response => {
             this.singlesiccode = response[0];
             console.log(response);
             this.loadEmployerData();
           }
        );
      }

      getProviderSicCode(id) {
        this.mersetaservice.getSicCode(id)
        .subscribe(
           response => {
             this.singleprovidersiccode = response[0];
             console.log(response);
             this.getTraininProvider(this.singleprovider.id);
           }
        );
      }


      getSdfCompany(id) {
        this.mersetaservice.getSdfCompany(id)
        .subscribe(
           response => {
             this.sdfcompany = response[0];
             console.log("SDF SATA");
             console.log(this.sdfcompany);
             console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);
             this.getSdfSingleUser(this.sdfcompany.sdfId);

           }
        );
      }

      getSdfProvider(id) {
        this.mersetaservice.getSdfCompany(id)
        .subscribe(
           response => {
             this.sdfperovider = response[0];
             console.log("SDF SATA");
             console.log(this.sdfperovider);
             //console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);
             this.getSdfProviderSingleUser(this.sdfperovider.sdfId);

           }
        );
      }

      getTraininProvider(id) {
        this.mersetaservice.getTrainingprovider(id)
        .subscribe(
           response => {
             this.trainingprovider = response;
             //var val = response[0];
             console.log("Training Provider");
             console.log(this.trainingprovider);
             console.log(this.trainingprovider.accreditationApplicationType);
             this.loadProviderData();
             //console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);

           }
        );
      }

      getAllMunicipalities() {
        this.mersetaservice.getAllMunicipalities()
        .subscribe(
           response => {
             this.municipalities = response;
             console.log(response);
           }
        );
      }

      getUrbanaRural() {
        this.mersetaservice.getUrbanrural()
        .subscribe(
           response => {
             this.urbanrural = response;
             console.log(response);
           }
        );
      }

       getAllDisabilityStatus() {
        this.mersetaservice.getAllDisabilitySatus()
        .subscribe(
           response => {
             this.disabilitystatus = response;
             console.log(response);
             this.getAllDisabilityRating();
           }
        );
      }
      getAllDisabilityRating() {
        this.mersetaservice.getAllDisabilityRating()
        .subscribe(
           response => {
             this.disabilityrating = response;
             console.log(response);
             this.getSingleUser(this.Uid);     
           }
        );
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
           }
        );
      }

      getAllUserTaks(targkey) {
        this.mersetaservice.getAllUserTaks(targkey)
        .subscribe(
           response => {
             this.Usertasks = response;
             //this.loadata();
             console.log("For Tasks");
             console.log(this.Usertasks);

           }
        );

    }
  
    
  
    Addcomment() {
  
      if (!this.comment_message)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Text'});
          //alert('Please Fill In The Learners Postal Town');
        }
        else
        {
          
      this.appStatusInt =0;
      console.log(this.comment_message);
      var fieldnae  = "comID";
      var fieldnae1  = "status_Date";
      var fieldnae2  = "notify";
      var fieldnae3  = "commentnote";
      var fieldnae4  = "isdeleted";
      var fieldnae5  = "deletedon";
      var fieldnae6 = "ActionId"
      var fieldnae7 = "companylearnerId"
  
      var date = new Date();
      var d = date.toLocaleDateString() + " " + "00:00:00";
      var val = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/ApprovalComments?comID=1&Status_Date='+new Date().toDateString()+'&notify=1&commentnote='+this.comment_message+'&isdeleted=1&deletedo(n='+new Date().toDateString()+'&ActionId='+this.Uid+'&companylearnerId='+this.companyId;
      var val1 = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/LearnerApplicationLifecycle?apcomID='+this.Uid;
      var object = {};
      object[fieldnae] = "1";
      object[fieldnae1] = date.toLocaleDateString() + " " + "00:00:00";
      object[fieldnae2] = 1;
      object[fieldnae3] = this.comment_message;
      object[fieldnae4] = 1;
      object[fieldnae5] = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      object[fieldnae6] = this.Uid;
      object[fieldnae7] = this.complearner;
       //this.Uid;
       console.log(this.Uid,this.companyId);
     this.AddUsercomment(val,object);
     console.log(this.complearner);
     this.UpdateUserStatus(this.complearner.id, 0);
    // alert('Your application has been updated');
    // this.refreshPage();
      this.messageService.add({key: 'tc1',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc2',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      this.messageService.add({key: 'tc3',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc4',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      if (this.valRadioqual1 == 'Chicago'){
        if (this.mersetaservice.uRecommendContractNumber == null){
          this.contractNumber = this.getRandomInt(1000000, 9999999);
          this.mersetaservice.uRecommendContractNumber = this.contractNumber;
          alert("Your Contract Number is:" + this.contractNumber);
        } else{
          alert("Your Contract Number is:" + this.mersetaservice.uRecommendContractNumber);
        }
  
      }
    }
    }
  
    viewDocument(value) {
      console.log("doc id Clicked : " + value);
      this.router.navigate(['/main/docviewer',btoa(value),btoa(this.complearner.userId),btoa(this.complearner.id)]);
    //  this.getDocbyte(value);
    }
  
    Addcomment2() {

      if (!this.comment_message)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Text'});
          //alert('Please Fill In The Learners Postal Town');
        }
        else
        {
  
      this.appStatusInt =1;
      console.log(this.comment_message);
      var fieldnae  = "comID";
      var fieldnae1  = "status_Date";
      var fieldnae2  = "notify";
      var fieldnae3  = "commentnote";
      var fieldnae4  = "isdeleted";
      var fieldnae5  = "deletedon";
      var fieldnae6 = "ActionId"
      var fieldnae7 = "companylearnerId"
  
      var date = new Date();
      var d = date.toLocaleDateString() + " " + "00:00:00";
      var val = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/ApprovalComments?comID=1&Status_Date='+new Date().toDateString()+'&notify=1&commentnote='+this.comment_message+'&isdeleted=1&deletedo(n='+new Date().toDateString()+'&ActionId='+this.Uid+'&companylearnerId='+this.companyId;
      var val1 = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/LearnerApplicationLifecycle?apcomID='+this.Uid;
      var object = {};
      object[fieldnae] = "1";
      object[fieldnae1] = date.toLocaleDateString() + " " + "00:00:00";
      object[fieldnae2] = 1;
      object[fieldnae3] = this.comment_message;
      object[fieldnae4] = 1;
      object[fieldnae5] = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      object[fieldnae6] = this.Uid;
      object[fieldnae7] = this.complearner;
       //this.Uid;
       console.log(this.Uid,this.companyId);
     this.AddUsercomment(val,object);
     console.log(this.complearner);
     this.UpdateUserStatus(this.complearner.id, 1);
    // alert('Your application has been updated');
    // this.refreshPage();
      this.messageService.add({key: 'tc1',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc2',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      this.messageService.add({key: 'tc3',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc4',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      if (this.valRadioqual1 == 'Chicago'){
        if (this.mersetaservice.uRecommendContractNumber == null){
          this.contractNumber = this.getRandomInt(1000000, 9999999);
          this.mersetaservice.uRecommendContractNumber = this.contractNumber;
          alert("Your Contract Number is:" + this.contractNumber);
        } else{
          alert("Your Contract Number is:" + this.mersetaservice.uRecommendContractNumber);
        }
  
      }
    }
    }
    
  
    Addcomment1() {


      if (!this.comment_message)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Text'});
          //alert('Please Fill In The Learners Postal Town');
        }
        else
        {
  
      this.appStatusInt =15;
      console.log(this.comment_message);
      var fieldnae  = "comID";
      var fieldnae1  = "status_Date";
      var fieldnae2  = "notify";
      var fieldnae3  = "commentnote";
      var fieldnae4  = "isdeleted";
      var fieldnae5  = "deletedon";
      var fieldnae6 = "ActionId"
      var fieldnae7 = "companylearnerId"
  
      var date = new Date();
      var d = date.toLocaleDateString() + " " + "00:00:00";
      var val = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/ApprovalComments?comID=15&Status_Date='+new Date().toDateString()+'&notify=1&commentnote='+this.comment_message+'&isdeleted=1&deletedo(n='+new Date().toDateString()+'&ActionId='+this.Uid+'&companylearnerId='+this.companyId;
      var val1 = 'https://merseta-dev-api.test-es3.co.za/api/Lookup/LearnerApplicationLifecycle?apcomID='+this.Uid;
      var object = {};
      object[fieldnae] = "15";
      object[fieldnae1] = date.toLocaleDateString() + " " + "00:00:00";
      object[fieldnae2] = 1;
      object[fieldnae3] = this.comment_message;
      object[fieldnae4] = 1;
      object[fieldnae5] = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      object[fieldnae6] = this.Uid;
      object[fieldnae7] = this.complearner;
       //this.Uid;
       console.log(this.Uid,this.companyId);
     this.AddUsercomment(val,object);
     this.UpdateUserStatus(this.complearner.id, 15);
    // alert('Your application has been updated');
    // this.refreshPage();
      this.messageService.add({key: 'tc1',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc2',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      this.messageService.add({key: 'tc3',severity:'success', summary: 'Submit', detail: 'Application Approved'});
      this.messageService.add({key: 'tc4',severity:'success', summary: 'Submit', detail: 'Application Rejected'});
      if (this.valRadioqual1 == 'Chicago'){
        var contractNumber = this.getRandomInt(1000000, 9999999);
        alert("Your Contract Number is:" + contractNumber);
      }
    }
    }
    //
    loadUsercomments() {
      this.getusercomments(this.Uid);
  
    }
    //Update User Status
    UpdateUserStatus(id,body) {
      this.mersetaservice.updateStatus(id,body)
      .subscribe(
         response => {
           console.log(response);
         }
      );
  
   }
  
    //Add User Comment
    AddUsercomment(val,body) {
      this.mersetaservice.AddApprovalcomments(val,body)
      .subscribe(
         response => {
           console.log(response);
  
           this.getusercomments(this.Uid);
           this.changeDetectorRef.detectChanges();
         }
      );
   }  

 
 getRandomInt(min: any, max: any){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 //added
 
//  getusercomments(comid1) {
//     this.mersetaservice.getAllrecommendationcomment(comid1)
//     .subscribe(
//        response => {
//         this.myrecomment = [];
//         this.myrecomment = response;
//          console.log(response);
//          for(let mk of  this.myrecomment) {
//             this.mersetaservice.getSingleUser(mk.action_User_Id).subscribe(
//               response => {
//                 var newcom = new RecomComment;
//                 var users : User;
//                 var subdate = new  Date(mk.learner_Status_Date);
//                 console.log("//////////////////////////");
//                 users = response;
//                 console.log(users);
//                 newcom.setnamea(this.mersetaservice.uName);
//                 newcom.setemaila(this.mersetaservice.uEmail);
//                 newcom.setcreateDatea(subdate.toLocaleDateString());
//                 newcom.setcommenta(mk.notes);
//                 this.rcomments.push(newcom);
//                this.changeDetectorRef.detectChanges();
//               }
//              );
//              this.changeDetectorRef.detectChanges();
//          }

//        }
//     );
//    // this.changeDetectorRef.detectChanges();

//   }
  refreshPage() {
    window.location.reload();
   }

  loadata() {

    for(let tk of this.Usertasks) {
      var ev = new events;
      var actiondate = new  Date(tk.actionDate);
      //this.taskstatus =  this.taskstatuslist.filter(x => x.id == tk.taskStatus)[0];
      ev.setstatus(this.taskstatus.description);
      ev.setdate(actiondate.toLocaleDateString() + " " + actiondate.toLocaleTimeString());
      ev.seticon(PrimeIcons.SHOPPING_CART);
      ev.setcolor("#977949");
      ev.setdata(tk.description);
      this.events1.push(ev);
      console.log("Changes to show");

     }
     this.isDataAvailable = false;

  }
}
