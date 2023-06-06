import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Company } from "../model/company.model";
import { Process } from "../model/process";
import { User } from "../model/users.model";
import { MersetaService } from "../service/merseta.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CompLearner } from "../model/complearner.model";
import { LearnerStatus } from "../model/learnerstatus";
import { RejectionReason } from "../model/rejectionreason";
import { Region } from "../model/region";
import { Learner_achievement_status } from "../model/learner_achievement_status";
import { AccreditationStatus } from "../model/accstatus";
import { LoaderService } from "src/app/loader/loader.service"; //added

@Component({
    selector: "app-learners",
    templateUrl: "./app.learners.component.html",
})
export class AppLearnersComponent implements OnInit {
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

    private routeSub: Subscription;



    constructor(
        private mersetaservice: MersetaService,
        private router: Router,
        private route: ActivatedRoute,
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
    }

    ngOnInit(): void {
        this.tempROLE=  this.mersetaservice.uRoleLifecycle;
        this.getAllCompaniesWithAccreditation();
        this.getAllRegions();
        this.getAllLearner_achievement_status();
        this.uRole = this.mersetaservice.uRoleLifecycle;
      //  if (this.uRole == 'SDP') this.router.navigate(['/main/dashboard']);
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
            this.seaarchedusers = response.reverse();
            this.companyusers = response.reverse();
            // this.seaarchedusers = this.companyusers;
            // console.log("CompanyLearner Response: ");
            // console.log(response);
             this.Uid = Number(response[0].id);
            // console.log("comp id = " + id);
             this.selected = id;
            // console.log(this.selected);
            // console.log("User ID id = " + this.Uid);
            //this.changeDetectorRef.detectChanges();
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

        //console.log("Learner_achievement_status_Id: "+ this.Learner_achievement_status_Id);
        //console.log("company id = " + this.companyId);
        //console.log("Uid = " + this.Uid);
        this.getCompLearnerSearch(this.Uid,this.companyId,this.regioncode, this.levyNumber, this.accreditationNumber, this.Learner_achievement_status_Id);
    }


    //     onSelectaccrediation(event) {
    //     console.log("event : " + event);
    //     console.log(this.selectedLearner);

    //     this.searchedlearner_achievement_status = this.searchedlearner_achievement_status;
    //     //this.regioncode = this.selectedRegion.code;

    //     //this.region = this.region;

    //     console.log(this.searchedlearner_achievement_status)
    //     //this.getAllRegions();
    //     //console.log("company id = " + this.companyId);
    //     //console.log("Uid = " + this.Uid);
    //     this.getCompLearnerSearch(this.Uid,this.companyId,this.statuscode,this.sdlnumber,this.accrediation,this.regioncode);
    // }


    filterCountry(event) {
        let filtered: Company[] = [];
        let query = event.query;
        for (let i = 0; i < this.companies.length; i++) {
            let country = this.companies[i];
            if (country.companyName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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

    // modify(value) {
    //     this.selected = value;
    //     console.log(this.selected);
    //     this.getAllCompanyUSers(this.selected);
    // }

    viewleaner(value) {
        console.log("Learner Clicked : " + value);
        this.router.navigate(["/main/learnerdetails", btoa(value), btoa(this.selected),btoa('0')]); //, {skipLocationChange:true});
    }

    editleaner(value) {
        this.router.navigate(["/main/recomendapprove"]); //, {skipLocationChange:true});
    }
    recomendapprove(value) {
        this.compid = this.selected;
        this.router.navigate(["/main/recomendapprove", btoa(value), btoa(this.compid)]); //, {skipLocationChange:true});
    }
    updatelearnerstatus(value) {
        this.router.navigate(["/main/updatelearnerstatus", btoa(value), btoa(this.compid)]); //, {skipLocationChange:true});
    }

    //this.router.navigate(['/main/editlearner',value,this.compid]);

    editleanerDetail(value) {
        this.router.navigate(["/main/editlearner", btoa(value), btoa(this.compid)]); //, {skipLocationChange:true});
    }
    editleanerDetails(value) {
        this.mersetaservice
            .getSingleUser(value)
            .subscribe(() =>
                this.router.navigate(["/main/editlearner", btoa(value), btoa(this.compid)]) //, {skipLocationChange:true})
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
            this.singlelearnerstatus =  this.accrstatus.filter(x => x.id == this.complearner.learnerStatus)[0];
            this.Applystatus = this.singlelearnerstatus.description;
            this.comment_u_name = this.mersetaservice.uName;
            this.appstatus = this.Applystatus;
            console.log('app status: '+ this.appstatus);
        }else {
            console.log(this.complearner);
        }

      }
    //   getCompLearner(userid,compid) {
    //     this.mersetaservice.getCompLearner(userid,compid)
    //     .subscribe(
    //        response => {
    //          this.complearner = response;
    //          console.log("One " + response);
    //          console.log(this.complearner);
    //          console.log("Two" + response.learnerStatus);
    //          this.singlelearnerstatus =  this.learnstatuslist.filter(x => x.id == this.complearner.learnerStatus)[0];
    //          console.log("Do or do not, Luke... There is no try")
    //          console.log(this.singlelearnerstatus);
    //        }
    //     );
    //   }



    //   getusercomments(comid1) {
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
    //                 newcom.setnamea("Boipelo");
    //                 newcom.setemaila("boipelo@gmail.com");
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
    //  }


    // getAllRejectionReason(){
    //     this.mersetaservice.getAllRejectionReason()
    //     .subscribe(
    //         response => {
    //             this.rejectionReason = response;
    //             console.log("START rejection");
    //             console.log(response);
    //             console.log("END rejection");
    //            // this.loadUsercomments();
    //             this.loadLearnerStatus();
    //         }
    //     )
    //   }
}
