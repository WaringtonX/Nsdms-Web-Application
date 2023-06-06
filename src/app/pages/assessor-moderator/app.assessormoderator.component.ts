import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GalleriaThumbnails } from 'primeng/galleria';
import { Company } from 'src/app/model/company.model';
import { ProvidersBySDP } from 'src/app/model/providerspysdp';
import { SaqaQualification } from 'src/app/model/Saqa.model';
import { SummativeAssessmentLearner } from 'src/app/model/summativeassessmentlearne';
import { User } from 'src/app/model/users.model';
import { MersetaService } from 'src/app/service/merseta.service';

@Component({
    selector: 'app-assessormoderator',
    templateUrl: './app.assessormoderator.component.html',
    styles : [`
    .divider {
     width:5px;
     height:auto;
     display:inline-block;
    }

 `],
})


export class AssessorModeratorComponent implements OnInit{

    title = 'nsdmstemp';
    users: User[] = [];
    companyusers: SummativeAssessmentLearner[] = [];
    seaarchedusers: SummativeAssessmentLearner[] = [];
    CompanyLearners: any[] = [];
    SearchedCompanyLearners: any[] = [];
    companies: ProvidersBySDP[] = [];
    newSearch: any[] = [];
    newselectedCountryAdvanced: any[] = [];
    companyQualification : SaqaQualification[] = [];
    selected : string = "";
    searchTerm = '';
    term = '';
    showleaners : string = '';
    isdatainput : boolean = false;
    compid:string ='';
    selectedCountryAdvanced: Company;
    selectedQualification : SaqaQualification;
    selectedCountry: any;
    filteredCountries: any[];
    selectedDrop : null;
    sdp_id :any;
    disablefornoQualification : boolean  = true;
    AssessmentStatus: any[];
    selectedstatusid : any;
    
    constructor(private mersetaservice: MersetaService,private router: Router) {
      this.AssessmentStatus = [
        {label: 'Not Started', value: 0},
        {label: 'Completion', value: 1},
        {label: 'Progression', value: 2}
    ];
    }
    
    ngOnInit(): void {
        this.sdp_id = this.mersetaservice.user_ID;
        this.getAllCompanies(this.sdp_id );
    }

    getAllusers() {
        this.mersetaservice.getAllUSers()
        .subscribe(
           response => {
             this.users = response;
           }
        );
      }
    
    
     getAllCompanies(provid) {
      this.mersetaservice.getSdpbyProvider(provid)
      .subscribe(
         response => {
           this.companies = response;
           this.companies.forEach(obj => {
              var object = {id:obj.id,companyName : obj.companyName, accreditationNumber : obj.accreditationNumber,searchname :  obj.companyName + " | " +   obj.accreditationNumber};
              this.newSearch.push(object);
           });
         }
      );
      }
    
      getAllCompanyUSers(compid) {
        this.mersetaservice.getSummativeAssessmentLearner(compid)
        .subscribe(
           response => {
             this.companyusers = response;
           //  v
             console.log(response);
             this.companyusers.forEach(obj => {
              var status = "Not Started";
              if(obj.assessmentProgressStatusTypeId == "0") {
                   status = "Not Started";
              }else if (obj.assessmentProgressStatusTypeId == "1") {
                    status = "Completion";
              }else if(obj.assessmentProgressStatusTypeId == "2"){
                    status = "Progression";
              }
              var object = {id:obj.id,firstName : obj.firstName,lastName : obj.lastName,rsaId :obj.rsaId,email : obj.email,assessmentstatus : status,qualificationId : obj.qualificationId};
              this.CompanyLearners.push(object);
           });
             console.log("Users")
             console.log(this.CompanyLearners);
             this.SearchedCompanyLearners = this.CompanyLearners;
            //this.changeDetectorRef.detectChanges();
  
           }
        );
      }
      
      getCompanyQuaolification(compid) {
        this.mersetaservice.getCompanyQualifications(compid)
        .subscribe(
           response => {
             this.companyQualification = response;
             console.log(this.companyQualification);  
           }
        );
      }
    
      filterCountry(event) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.newSearch.length; i++) {
            let country = this.newSearch[i];
            if (country.searchname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
    
        this.filteredCountries = filtered;
      //  console.log(filtered);
    }
    
    onSelectcompany(event) {
       console.log("event : " + event)
       console.log("Selected company : " + this.newselectedCountryAdvanced["companyName"])
    
        this.selected = this.newselectedCountryAdvanced["id"];
        this.compid = this.newselectedCountryAdvanced["id"];
        console.log(this.selected);
        this.getAllCompanyUSers(this.selected);
        this.getCompanyQuaolification(this.selected);
    }

    onSelectQualification(event) {
      console.log("event : " + event);
    //  console.log("Qual object : " +  this.selectedQualification["id"]);
      console.log("qual : " +  this.selectedQualification);

      if(this.selectedQualification != null) { 
        var qualificationid = this.selectedQualification["id"];
        console.log("qual : " +  qualificationid);
        this.disablefornoQualification = false;
        let filtered: any[] = [];
        this.CompanyLearners.forEach(obj => {
             let obval = obj;
             if(obval.qualificationId == qualificationid) {
              filtered.push(obval);
             }
        });
  
        this.SearchedCompanyLearners = filtered;
      }else {
        this.SearchedCompanyLearners  = this.CompanyLearners;
        this.disablefornoQualification = true;
      }
      

   }

   onSelectStatus(event) {
       console.log("event : " + event);
       console.log("status : " +  this.selectedstatusid);

       if(this.selectedstatusid != null) { 
        var stausid = this.selectedstatusid["assessmentstatus"];
        let filtered: any[] = [];
        this.CompanyLearners.forEach(obj => {
             let obval = obj;
             if(obval.assessmentstatus == stausid) {
               filtered.push(obval);
             }
        });
        this.SearchedCompanyLearners = filtered;
      }else {
        this.SearchedCompanyLearners  = this.CompanyLearners;
      }
   }

    
    onSelectcompany2(event) {
      console.log("emploer : " + event)
     // console.log("Selected Employer : " + this.selectedCountry["firstName"])
     // console.log("Query Employer : " + this.selectedCountry)
     if(this.selectedCountry != null) {
      let query =  this.selectedCountry["firstName"];
      let filtered: any[] = [];
      for (let i = 0; i < this.SearchedCompanyLearners.length; i++) {
          let country = this.SearchedCompanyLearners[i];
          if (country.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
    
      this.SearchedCompanyLearners = filtered;
     }else {
      console.log("null users ");
      this.SearchedCompanyLearners  = this.CompanyLearners;
     }
        
    }


    public GenerateAssessment() {
  
    }

    public BatchModeration() {
      var qualificationid = this.selectedQualification["id"];
      console.log("q : ", qualificationid);
      console.log("C : ", this.compid);
      this.router.navigate(['/main/moderation', btoa(qualificationid),btoa(this.compid)]);
    }

      modify(value) {
        this.selected = value;
        console.log(this.selected);
        this.getAllCompanyUSers(this.selected);
      }
    
      viewleaner(value) {
        console.log("Learner to be assessed Clicked : " + value);
        this.router.navigate(['/main/learnerassessment',btoa(value),btoa(this.compid),btoa('0')]);
      }

      viewleaners(value) {
        console.log("Learner to be assessed Clicked : " + value);
        this.router.navigate(['/main/learnerassessment',btoa(value),btoa(this.compid),btoa('1')]);
      }
    
      RouttoREgister(){
       // this.route.url = '/'
      }


}
