import {
    ChangeDetectorRef,
    Component,
    OnInit,
    AfterViewInit,
    AfterViewChecked,
} from "@angular/core";
import { Company } from "../model/company.model";
import { User } from "../model/users.model";
import { MersetaService } from "../service/merseta.service";
import { TabViewModule } from "primeng/tabview";
import { CompLearner } from "../model/complearner.model";
import { Funding } from "../model/funding.model";
import { SaqaQualification } from "../model/Saqa.model";
import { AddressModel } from "../model/addressmodel";
import { Program } from "../model/program";
import { SdfCompany } from "../model/sdfcompany";
import { SicCode } from "../model/siccode";
import { Town } from "../model/town.model";
import { Province } from "../model/province";
import { Municipality } from "../model/municipality";
import { Accreditationtype } from "../model/accreditationtype";
import { AccreditationStatus } from "../model/accstatus";
import { Seta } from "../model/seta.model";
import { TrainingProvider } from "../model/trainingprovider";
import { LearnerStatus } from "../model/learnerstatus";
import { ActivatedRoute, Router } from "@angular/router";
import { DisabilityRating } from "../model/disabilityrating";
import { Disabilitystatus } from "../model/disabilitystatus";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { AccountService } from "../api-providers/api-account/api-account.service";
import { IUser } from "../shared/models/IUser";
import { IUserAddress } from "../shared/models/IUserAddress";
import { IUserCompany } from "../shared/models/IUserCompany";
import { IUsertraining } from "../shared/models/IUsertraining";
import { of } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { Learnership } from "../model/learnership";
import { ApiCompanyService } from "../api-providers/api-company/api-company.service";
import { ApiTrainingInformationService } from "../api-providers/api-training-information/api-training-information.service";
import { Comments } from "../model/coments";
import { usercomments } from '../model/usercomments';

@Component({
    selector: "app-editlearner",
    templateUrl: "./app.editlearner.component.html",
    // styleUrls: ["./editlearner.component.scss"],
    styles: [
        `
            :host ::ng-deep .tabview-custom {
                i,
                span {
                    vertical-align: middle;
                }

                span {
                    margin: 0 0.5rem;
                }
            }

            :host ::ng-deep .p-button {
                margin-right: 0.25rem;
            }

            :host ::ng-deep .p-tabview p {
                line-height: 1.5;
                margin: 0;
            }
        `,
    ],
})
export class AppEditlearnerComponent implements OnInit, AfterViewInit {
    TitleList: SelectItem[];
    NationalityList: SelectItem[];
    GenderList: SelectItem[];
    ProgramTypeList: SelectItem[];
    pivotavnoneList: SelectItem[];
    learnershipList: Learnership[];

    EmployerList: SelectItem[];
    ProviderList: SelectItem[];

    Learneruser: User;
    inputuser: IUser;
    Employeruser: User;
    Provideruser: User;

    Learnerhomeaddress: AddressModel;
    Learnerpostaladdress: AddressModel;

    //tratining iNFORMATION
    program: Program;

    inputprogram: IUsertraining;

    complearner: CompLearner;

    saqaqualification: SaqaQualification;

    funding: Funding;

    singlecompany: Company;
    singleprovider: Company;

    sdfcompany : SdfCompany;
    sdfperovider : SdfCompany;

    AllEmployers: Company[];
    Allprovider: Company[];
    Alllearnership: Learnership[];

    SelectedLearnerIdValue: any;
    SelectedCompanyIdValue: any;

    selectedprovider: any;
    selectedEmpolyer: any;
    comment_u_name: any;
    comment_message:any;
    Uid: any;
    comp_learn_id: any;
    mycomments:Comments[] = [];;
    ucomments:usercomments[] = [];

    Headerdetails: string;
    Title = {};
    Gender = {};
    Nationality = {};
    Employer = {};
    Provider = {};
    ProgramType = {};
    pivotavnone = {};
    Learnership = {};

    constructor(
        private mersetaservice: MersetaService,
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private user_Service: AccountService,
        private company_Service: ApiCompanyService,
        private trainingInformation_Service: ApiTrainingInformationService,
        private router: Router
    ) {
        this.TitleList = [
            { label: "Mr", value: "1" },
            { label: "Mrs", value: "2" },
            { label: "Miss", value: "3" },
            { label: "Ms", value: "4" },
        ];

        this.NationalityList = [
            { label: "South Africa", value: "South Africa" },
            { label: "Other", value: "Other" },
        ];

        this.GenderList = [
            { label: "Male", value: "1" },
            { label: "Female", value: "2" },
            { label: "Other", value: "0" },
        ];
        this.ProgramTypeList = [
            { label: "NQF L4 or higher Learnership", value: 0 },
        ];
        this.pivotavnoneList = [
            { label: "Pivotal", value: "0" },
            { label: "Non-pivotal training", value: "1" },
        ];
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            // your code
            const SelectedLearnerid = atob(params["id"]);
            const selectedCompanyid = atob(params["compid"]);

            this.SelectedLearnerIdValue = SelectedLearnerid;
            this.SelectedCompanyIdValue = selectedCompanyid;
        });

        console.log('Step 0: Origin Point');
        console.log('Learner ID: ', this.SelectedLearnerIdValue);
        console.log('Company ID: ', this.SelectedCompanyIdValue);
        this.LoadLearnerData(
            this.SelectedLearnerIdValue,
            this.SelectedCompanyIdValue
        );
    }
    LoadLearnerData(LearnerId, CompanyId) {
        //get learnerDetails
        //this.complearner
        this.mersetaservice.getUser(LearnerId).subscribe((response) => {
            this.Learneruser = response;
            console.log('The Learner that has been retrieved is: ', this.Learneruser);
            this.Title = this.Learneruser.titleId;
            console.log(this.Learneruser.id);
            //call header
            console.log('Step 1: Run the Get User API', this.Learneruser);
            //get Home address for a Learner
            this.mersetaservice
                .getSingleUserAddress(this.Learneruser.residentialAddressId)
                //this.mersetaservice.getSingleUserAddress(43)
                .subscribe((response) => {
                    this.Learnerhomeaddress = response[0];
                    console.log('Step 2: Get User Address', this.Learnerhomeaddress)

                    //get postal Address for a Learner
                    this.mersetaservice
                        .getSingleUserAddress(this.Learneruser.postalAddressId)
                        // this.mersetaservice.getSingleUserAddress(32)
                        .subscribe((response) => {
                            this.Learnerpostaladdress = response[0];
                        });
                });
        });

        this.mersetaservice
            .getCompLearner(LearnerId, CompanyId)
            .subscribe((response) => {
                this.complearner = response;
                console.log('Step 3: Get the comp learner')

                this.getSingleProvider(this.complearner.employerId);

                this.mersetaservice
                    .getSaqaQualification(this.complearner.qualificationId)
                    .subscribe((response) => {
                        this.saqaqualification = response;

                        this.mersetaservice
                            .geInterbentiontype(
                                this.complearner.interventionTypeId
                            )
                            .subscribe((response) => {
                                this.program = response;

                                this.mersetaservice
                                    .getFunding(this.complearner.dundingId)
                                    .subscribe((response) => {
                                        this.funding = response;
                                        this.loadApiData();
                                        this.loadDropdownData();
                                        this.getSingleCompany(CompanyId);
                                        this.GetAllEmployers();
                                        this.getAllProviders();
                                        this.getAllLearnership();
                                    });
                            });
                    });
            });
    }

    getSingleProvider(id) {
        this.mersetaservice.getSingleCompany(id).subscribe((response) => {
            this.singleprovider = response[0];
            this.mersetaservice.getSdfCompany(id)
            .subscribe(
               response => {
                 this.sdfperovider = response[0];

                    this.mersetaservice.getSingleUser(this.sdfperovider.sdfId)
        .subscribe(
           response => {
             this.Provideruser = response;
             //  this.getProviderSicCode(this.singleprovider.sicCodeId);
           }
        );}
    ); }
    );}
    getSingleCompany(id) {
        this.mersetaservice.getSingleCompany(id).subscribe((response) => {
            this.singlecompany = response[0];

            this.mersetaservice.getSdfCompany(id)
            .subscribe(
               response => {

                this.sdfcompany = response[0];

                this.mersetaservice.getUser(this.sdfcompany.sdfId).subscribe((response) => {
                    this.Employeruser = response;

            });
               });
        });
    }



    Updatemployer() {}

    loadDropdownData() {
        this.Gender = this.GenderList[+this.Learneruser.genderId - 1];
        this.Nationality =
            this.NationalityList[+this.Learneruser.nationalityId - 1];
        this.Title = this.TitleList[+this.Learneruser.titleId - 1];
        this.ProgramType = this.ProgramTypeList[+this.program.id - 1];
        this.pivotavnone = this.pivotavnoneList[+this.program.id - 1];
    }

    loadApiData() {
        this.Headerdetails =
            this.Learneruser.firstName +
            " " +
            this.Learneruser.lastName +
            " (" +
            this.Learneruser.rsaIdNumber +
            ")";
        document.getElementById("userdetails").innerHTML = this.Headerdetails;
    }

    onSelectEmployer() {
        this.getSingleCompany(this.singlecompany.id);
    }

    onSelectProvider(event) {
        this.getSingleProvider(this.singleprovider.id);
    }
    GetAllEmployers() {
        this.mersetaservice.getAllCompaniesview().subscribe((response) => {
            this.AllEmployers = response;
            this.Employer = this.EmployerList[+this.singlecompany.id - 1];
        });
    }
    getAllProviders() {
        this.mersetaservice.getAllCompanies().subscribe((response) => {
            this.Allprovider = response;
            this.Provider = this.ProviderList[+this.singleprovider.id - 1];
        });
    }
    getAllLearnership() {
        this.mersetaservice.getAllLearnership().subscribe((response) => {
            this.Alllearnership = response;
            this.Learnership =
                this.learnershipList[
                    +this.saqaqualification.qualificationid - 1
                ];
        });
    }

    UpdateLearnerdetails() {
        this.user_Service
            .updateUserAddress(this.Learnerhomeaddress)
            .subscribe((Response) => {
                console.log(Response);
                // this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Learner Updated', life: 3000});
                // this.router.navigate(["/learners"]);
            });
        this.user_Service
            .updateCompanyAddress(this.Learnerpostaladdress)
            .subscribe((Response) => {
                console.log(Response);
                // this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Learner Updated', life: 3000});
                // this.router.navigate(["/learners"]);
            });

        this.inputuser = this.Learneruser;
        this.user_Service
            .updateAccount(this.inputuser)
            .subscribe((Response) => {
                console.log(Response);
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Learner Updated",
                    life: 3000,
                });
                this.router.navigate(["/main/learners"]);
            });
    }

    Updatetraininginfo() {
        console.log("test button");

        /*this.inputprogram.pivotNonPivot = this.program.id;
        this.inputprogram.interventionTypeId = this.program.id;
        this.inputprogram.mersetaFunded = this.program.id;
        this.inputprogram.nqfAlignedId = this.program.id;
        this.inputprogram.commencementDate = this.complearner.commencementDate;
        this.inputprogram.completionDate = this.complearner.completionDate;*/
        console.log(this.inputprogram);
        this.trainingInformation_Service
            .updateTraininginformation(this.inputprogram, this.Learneruser.id)
            .subscribe((Response) => {
                console.log(Response);
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Learner Updated",
                    life: 3000,
                });
                this.router.navigate(["/main/learners"]);
            });
    }
    Updateprovider() {
        this.company_Service
            .updateProvider(this.singlecompany.id, this.Learneruser.id)
            .subscribe((Response) => {
                console.log(Response);
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Learner Updated",
                    life: 3000,
                });
                this.router.navigate(["/main/learners"]);
            });
    }
    UpdateEmployer() {
        console.log(this.singlecompany.id);
        console.log(this.Learneruser.id);

        this.company_Service
            .updateEmployer(this.singlecompany.id, this.Learneruser.id)
            .subscribe((Response) => {
                console.log(Response);
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Learner Updated",
                    life: 3000,
                });
                this.router.navigate(["/main/learners"]);
            });
    }
    ngAfterViewInit(): void {
        //neet to push
    }

    Addcomment() {

        console.log(this.comment_message);
        var fieldnae  = "comlearnID";
        var fieldnae1  = "date";
        var fieldnae2  = "createid";
        var fieldnae3  = "comment";
        var fieldnae4  = "isdeleted";
        var fieldnae5  = "deletedon";

        var date = new Date();
        var d = date.toLocaleDateString() + " " + "00:00:00";
        var val = "comlearnID="+this.complearner.id+"&date="+d+"&createid="+this.Uid+"&comment="+this.comment_message+"&isdeleted=1&deletedon="+d;
        var object = {};
        object[fieldnae] = this.complearner.id;
        object[fieldnae1] = date.toLocaleDateString() + " " + "00:00:00";
        object[fieldnae2] = this.Uid;
        object[fieldnae3] = this.comment_message;
        object[fieldnae4] = 1;
        object[fieldnae5] = date.toLocaleDateString() + " " + date.toLocaleTimeString();

       this.AddUsercomment(val,object);
      }

      AddUsercomment(val,body) {
        this.mersetaservice.Addcomments(val,body)
        .subscribe(
           response => {
             console.log(response);

             this.getusercomments(this.comp_learn_id);
             this.changeDetectorRef.detectChanges();
           }
        );
     }

     getusercomments(complearnid) {
        this.mersetaservice.getAllComments(complearnid)
        .subscribe(
           response => {
            this.mycomments = [];
            this.mycomments = response;
             console.log(response);
             for(let mk of  this.mycomments) {
                this.mersetaservice.getSingleUser(mk.createUserId).subscribe(
                  response => {
                    var newcom = new usercomments;
                    var users : User;
                    var subdate = new  Date(mk.createDate);
                    console.log("//////////////////////////");
                    users = response;
                    console.log(users);
                    newcom.setname(this.mersetaservice.uName);
                    newcom.setemail(this.mersetaservice.uEmail);
                    newcom.setcreateDate(subdate.toLocaleDateString());
                    newcom.setcomment(mk.comments);
                    this.ucomments.push(newcom);
                   this.changeDetectorRef.detectChanges();
                  }
                 );
                 this.changeDetectorRef.detectChanges();
             }

           }
        );

       // this.changeDetectorRef.detectChanges();
     }
}
