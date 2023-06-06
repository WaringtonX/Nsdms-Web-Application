import { Languages } from './../../model/Languages';
////////////////////////////////////////////////////////////////IMPORTS///////////////////////////////////////////////////////////////////////////////////////////
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {state, style, trigger} from '@angular/animations';
import { DisabilityRating } from 'src/app/model/disabilityrating';
import { Disabilitystatus } from 'src/app/model/disabilitystatus';
import { TvetFetQualification } from 'src/app/model/tvetFetQualification';
import { Highestqualificationrequired } from 'src/app/model/highestqualificationrequired';
import { Region } from 'src/app/model/region';
import { RegionTown } from 'src/app/model/regiontown';
import { PreviousSchools } from 'src/app/model/priviouschools';
import { LangLook } from 'src/app/model/langlook';
import { OfoCodes } from 'src/app/model/ofocodes';
import { Learnership } from 'src/app/model/learnership';
import { SaqaQualification } from 'src/app/model/Saqa.model';
import { StatssaAreaCode } from 'src/app/model/statsareacode';
import { Town } from 'src/app/model/town.model';
import { Province } from 'src/app/model/province';
import { Municipality } from 'src/app/model/municipality';
import { Language } from 'src/app/model/langauges';
import { Task } from 'src/app/model/task';
import { MersetaService } from 'src/app/service/merseta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedFunctions } from 'src/app/shared/shared-functions';
import { SharedService } from 'src/app/variables/global';
import { Company } from 'src/app/model/company.model';
import { SdfCompany } from 'src/app/model/sdfcompany';
import { User } from 'src/app/model/users.model';
import { SicCode } from 'src/app/model/siccode';
import { TrainingProvider } from 'src/app/model/trainingprovider';
import { Accreditationtype } from 'src/app/model/accreditationtype';
import { AccreditationStatus } from 'src/app/model/accstatus';
import { Seta } from 'src/app/model/seta.model';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator } from './cv-generator';
import { CompanyApproved } from 'src/app/model/companyApproved';
import { ignoreElements } from 'rxjs/operators';
import { CompLearner } from 'src/app/model/complearner.model';
import { LearnerStatus } from 'src/app/model/learnerstatus';
import { mainModule } from 'process';
import { Designation } from 'src/app/model/designation';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/model/addressmodel';
import { MaritalStatus } from 'src/app/model/maritalstatus'; 
import { Gender} from 'src/app/model/gender.model'; 
import { IDType } from 'src/app/model/idtype.model'; 
import {Residentialstatus} from 'src/app/model/residentialstatus.model'; 
import { Equity } from 'src/app/model/equity.model'; 
import { Organisationtype } from 'src/app/model/organisationtype.model';
//import { LearningProgramtype } from 'src/app/model/learning-programtype.model'; 
import { Stittle } from 'src/app/model/stittle.model'; 
import { Nationality } from 'src/app/model/nationality.model'; 
import {MessageService} from 'primeng/api'; 
import { LoaderService } from 'src/app/loader/loader.service'; 
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { RejectionReason } from 'src/app/model/rejectionreason';
import { LearnerprogramIndicator } from 'src/app/model/learnerprogramindicator';
import { LearningProgramtype } from 'src/app/model/learning-programtype.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

///////////////////////////////////////////////////////////////////////////COMPONENET STYLING///////////////////////////////////////////////////////////////////////
@Component({
    selector: 'app-learnership',
    templateUrl: './app.learnership.component.html',
    providers: [MessageService],
    styles: [`

    input.ng-touched.ng-invalid { 
      border-bottom: 2px solid #ed0000; 
      color: #ed0000;
    }

    // p-dropdown.ng-touched.ng-invalid { 
    //   border: 2px solid #ed0000; 
    //   background-color: #ed0000;
    //   box-sizing: border-box;
    //   border-radius: 4px;
    // }


    // p-calendar.ng-touched.ng-invalid { 
    //   border: 2px solid #ed0000; 
    //   box-sizing: border-box;
    //   border-radius: 4px;
    //   //background-color: #ff8b8b;
    //   background-color: #ed0000;
    // }

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

////////////////////////////////////////////////////////////////////LEARNERSHIP COMPONENT CLASS///////////////////////////////////////////////////////////////////////////
export class AppLearnershipComponent implements OnInit{





  //The following variables are for the dropdown
     // OLD TEMPLATE VALUES

     userID:any;
     counter=0;
     activeTab = 'register';
     activeCard = '';
     dropdownOptions1: SelectItem[];
     dropdownOptions2: Nationality[];
     dropdownOptions3: Stittle[];
     dropdownOptions4: Gender[];
     dropdownOptions5: Equity[];
     dropdownOptions6: SelectItem[];
     dropdownOptions7: SelectItem[];
     dropdownOptions8: SelectItem[];
     dropdownOptions9: SelectItem[];
     dropdownOptions10: SelectItem[];
     dropdownOptions11: SelectItem[];
     dropdownOptions12: SelectItem[];
     dropdownOptions13: SelectItem[];
     dropdownOptions14: SelectItem[];
     dropdownOptions15: SelectItem[];
     dropdownOptions16: SelectItem[];
     dropdownOptions17: SelectItem[];
     dropdownOptions18: SelectItem[];
     dropdownOptions19:SelectItem[];
     dropdownOptions20: MaritalStatus[];
     fundingsetas: Seta[];
     selectuserSETAFunding: Seta;
     pivotavnone: SelectItem[];
     organizationtionns: Organisationtype[];
     uploadedFiles: any[] = [];
     selectDropdownOptions1: any;
     selectDropdownOptions2 = null;
     selectDropdownOptions22 = null;
     selectDropdownOptions23 = null;
     selectDropdownOptions24 = null;
     selectedLearningprogram = null;
     selectDropdownOptionsNationality : Nationality;
     selectDropdownOptionsResidentialStatus : any;
     selectDropdownOptionsIDType : any;
     UrbanRuralOption : any;
     
    // END OF NEW TEMPLATE

  disabilityrating: DisabilityRating[];
  designationRating: Designation[];
  disabilitystatus: Disabilitystatus[];
  tvetfetqualification: TvetFetQualification[];
  highestqualification: Highestqualificationrequired[];
  region: Region[];
  regiontown: RegionTown[];
  prevschools: PreviousSchools[];
  langlook: LangLook[];
  ofocodes: OfoCodes[] = [];
  learnership: Learnership[];
  templearnership: Learnership[];
  saqaQual : SaqaQualification;
  learningprograms: LearningProgramtype[];

  statshome: StatssaAreaCode[] = [];

  //for home
  towns: Town[];
  provinces: Province[];
  municipalities: Municipality[];
  temptown: Town[];
  tempprovinces: Province[];
  tempmunicipalities: Municipality[];
  tempdistricts: Municipality[];

  //for postal
  ptowns: Town[];
  pprovinces: Province[];
  pmunicipalities: Municipality[];

  ptemptown: Town[];
  ptempprovinces: Province[];
  ptempmunicipalities: Municipality[];
  ptempdistricts: Municipality[];


   //for phyical address employer
   physicaltowns: Town[];
   physicalprovinces: Province[];
   physicalmunicipalities: Municipality[];

   physicaltemptown: Town[];
   physicaltempprovinces: Province[];
   physicaltempmunicipalities: Municipality[];
   physicaltempdistricts: Municipality[];

    //for postal address employer
    empostaltowns: Town[];
    empostalprovinces: Province[];
    empostalmunicipalities: Municipality[];

    empostaltemptown: Town[];
    empostaltempprovinces: Province[];
    empostaltempmunicipalities: Municipality[];
    empostaltempdistricts: Municipality[];
    langauges: Language[] = [];
    langaugesz: Languages[] = [];
  


    //The following variables are to be used throughout the system

    //For the radio buttons
    valRadio: string;
    valRadios: string;
    valRadioss: string;
    valRadioqual1: string;
    valRadioqual2: string;
    valRadioqual3: string;
    valRadionqf1: string;
    valRadionqf2: string;
    radioButton1: string;
    birthdate: Date;
    qaulificationidmod : any;
    checked = false;
    personidblob : string;
    IdorPassportDocument: string;
    guardianorkin: string =  "Next of kin";
    guardianorkin_visible: string = "display: none;";
    age: number = 0;
    ImageBaseData:string | ArrayBuffer=null;

    sToday:number = new Date().getFullYear();

    // for experimental
  experimentalDefID : string = "Usecase001.Experimental";
  existingDefID :  string = "Usecase001.ExistingLearner";
  private temid : string;
  private tempname : string;
  Thankyou : string = "";


   proccessID : string = "";
   workItemId : string = "";
   isDisabled :boolean = false;
   selected : string ="";
   selectedPronvince : string ="";
   pselectedPronvince : string ="";
   nationvalue : any;
   isDisabledNext :boolean = false;
   workitemtinstance : any[];
   taskidInstance : any[];
   task = new Task;
   langtoadd = new Language;
   langtoadds = new Languages;
   cellnumber : string;
   telnumber :string;
   tittle:any;
   utittle:string;
   uname :string;
   personalBirthday:Date;
   surname:string;
   midname:string;
   maidenName: string = "";
   Identificationid : string;
   alternativeid: string;
   Address: string;
   Address1:string;
   Address2:string;
   Area: string;
   Postalcode:string;
   pPostalcode:string;
   Pronvince:string;
   Postal: string;
   Postal1: string;
   Postal2: string;
   Postal3:string;
   postArea:string;
   nextofkin:string;
   primeemail:string;
   primeemail2:string;
   secondemail:string = "";
   nextofkinlastname:string;
   nextofkinemailaddress:string;
   nextofkincelphone:string;
   datebirth: string;
   formFields : any[];
   base64: string = "Base64...";
   fileSelected?:Blob;
   inputGroupFile01?: string;
   selectedgender : Gender;
   selectedequity : Equity;

   selectedlanguage : string ="";
   checkedread : boolean = false;
   checkedwrite : boolean = false;
   checkedspeak : boolean = false;
   checkedhomelangauge :boolean = false;
   checkeddisability : string;
   fileToUpload: File | null = null;
   files:string | ArrayBuffer=null;

   checkedagreement : string;
   checkedemployment : string;
   quallastschooldateyear : Date;
   selectedtvet : string ="";
   selectedofo : string ="";
   selecteddisabilitytype;
   selecteddisabilitylevel;
   selectuserTittle : Stittle;
   selectuserMaritalStatus : MaritalStatus;
   selectuserFunding : any;
   selectedqualificationlevel : any;
   selectuserTittlecont : string ="";
   selectedorganization : Organisationtype;

   checkedEmployment : string;
   checkedeContractofEmploymen: string;
   checkecopyofcontract : string;
   checkednqlaligned : string;
   checkedfunded : string;

    //Disable Date Birth and Gender
    DisableDOBandMale = true; 
   //address info
   selectedHomeMuni : string ="";
   pselectedHomeMuni : string ="";
   selectedHomeTown : string ="";
   selectedHomeTown1 : string ="";
   pselectedHomeTown : string ="";
   selectedpostalMuni : string ="";
   selectedpostalTown : string ="";
   selectededistrict  : string ="";
   selectedepdistrict : string ="";
   selectedpostalPronvince : string ="";
   selectedePronvince : string ="";
   selectedepPronvince : string ="";
   selectedeHomeMuni : string ="";
   selectedeHomeTown : string ="";
   selectedepHomeMuni : string ="";
   selectedepHomeTown : string ="";
   selectedschoolatended : any;
   selectedschoolatendedNumber : any;

   selectedPostalDestrict : string ="";
   selectedhomeDestrict : string ="";
   pselectedhomeDestrict : string ="";

   //provider details
   selectedAccstatus: string ="";
   selectedAcctype: string ="";
   selectedisability: string ="";
   checkedtvetqual: string ;

   selectedphysical: string ="";
   selectedphysicalpostal: string ="";
   selectedstatpostal: string ="";
   selectedstathome :string ="";
   pselectedstathome: string ="";


   //Disable Buttons
   employeraddressline3:string = "visible";
   employeraddressline3home:string = "visible";
   isDisabledNat :boolean = false;
   isDisabledWBL :boolean = false;
   isDisabledWBLAgreement :boolean = false;
   isDisabledIde :boolean = false;
   isDisabledLea :boolean = false;
   isDisabledLan :boolean = false;
   isDisabledHom :boolean = false;
   isDisabledPos :boolean = false;
   isDisabledKin :boolean = false;
   isDisabledDoc :boolean = false;
   isDisabledqual :boolean = false;
   isDisabledlearn :boolean = false;
   isDisabledemdet :boolean = false;
   isDisableContract  :boolean = false;
   isDisabledcontperson  :boolean = false;
   isDisabledempphysical  :boolean = false;
   isDisabledemppostal  :boolean = false;
   isDisabledempstatus :boolean = false;
   isDisabledprovider :boolean = false;
   isDisableddocuments :boolean = false;
   CheckisDisabledYes :boolean = false;
   isdisableview :string = "hidden";
   isHighestQualificationview :string;
   filename :string;

   // Alerts
   nation : string = '<span class="text-green-500 font-medium">Nationality successfully submitted!</span>';
   idorpas : string = '<span class="text-green-500 font-medium">ID or Passport successfully submitted!</span>';
   learndet : string = '<span class="text-green-500 font-medium">Learner Details successfully submitted!</span>';
   langdet : string = '<span class="text-green-500 font-medium">Language successfully submitted!</span>';
   homadd : string = '<span class="text-green-500 font-medium">Home Address successfully submitted!</span>';
   postadd : string = '<span class="text-green-500 font-medium">Postal Address successfully submitted!</span>';
   nxtkind : string = '<span class="text-green-500 font-medium">NextofKin successfully submitted!</span>';
   docd : string = '<span class="text-green-500 font-medium">Documents successfully submitted!</span>';
   quald : string = '<span class="text-green-500 font-medium">Learner Qualification successfully submitted!</span>';
   empstatus : string = '<span class="text-green-500 font-medium">Employment status successfully submitted!</span>';
   empdet : string = '<span class="text-green-500 font-medium">Employer details successfully submitted!</span>';
   learnq : string = '<span class="text-green-500 font-medium">Learning Details successfully submitted!</span>';
   ContractofEmployment_html : string = '<span class="text-green-500 font-medium">Contract of Employment successfully submitted!</span>';
   ContactPerson_html : string = '<span class="text-green-500 font-medium">Employer Contact Person successfully submitted!</span>';
   employerpostaladdress_html : string = '<span class="text-green-500 font-medium">Employer Postal Address successfully submitted!</span>';
   employerphysicaladdress_html : string = '<span class="text-green-500 font-medium">Employer Physical Adrress successfully submitted!</span>';
   providerdetails_html : string = '<span class="text-green-500 font-medium">Provider Details successfully submitted!</span>';
   documents_html : string = '<p-tag styleClass="mr-2" severity="success" value="Application Documents successfully submitted!"></p-tag>';

   notAvailabeMessage:string ="";

   // for employer and person of contact
   employername : string ="";
   trainingname : string ="";
   emptelnumber : string ="";
   empfaxnumber : string ="";
   emregnumber : string ="";
   levynumber : string ="";
   levynumber2 : string ="";
   numofemployee : string ="";
   siccode : string ="";
   organizationtype : string ="";
   emptemail  : string ="";
   empRegisteredAt  : string ="";
   idnation : string = "";
   submitted: boolean;


   //person of contact
   persontitle : string ="";
   personname : string ="";
   personlastname : string ="";
   personidnumber : string ="";
   personemail : string ="";
   personcellnumber : string;
   persontelnumber : string;
   persontaxnumber : string;
   pDesignation : string ="";

   selectedprogramtype : any;
   popiactCheck : any;
   //selectedprogramtype : LearningProgramtype;
   selectedlearnership : any;
   selectedpivnon : string ="";
   saqaid : string ="";
   coomencedate : string ="";
   completedate : string ="";

   checkednqlalingedno : string ="Yes";
   checkedsetafundedno : string ="Yes";
   isemployed : boolean = false;

   // employer address
     eAddress: string ="";
     eAddress1:string ="";
     eAddress2: string ="";
     ePostalcode:string ="";
     eArea: string ="";
     ePronvince: string ="";
     eMunicipality: string ="";
     eDistritrict: string ="";
     eTown: string ="";


     //postal address
     epAddress:  string ="";
     epAddress1:  string ="";
     epAddress2:  string ="";
     epPostalcode: string ="";
     epArea:  string ="";
    //Contact Person situation
     lfirstname2:string ="";
     llastname2: string ="";
     lemail2: string ="";
     lcellnumber2: string ="";

     // provider
     lprovidername: string ="";
     lfirstname:string ="";
     llastname: string ="";
     lemail: string ="";
     lcellnumber: string ="";
     ltellnumber:string ="";
     lfaxnumber: string ="";
     lreviewdate: string ="";
     lsiccode: string ="";
     lregistereat:string ="";
     laccnumber: string ="";
     index: number = 0;
     laccredstatus:string ="";
     laccredtyep: string ="";
     isapplicationstarted : boolean = false;
    // messageService: any;
     companies: Company[] = [];
     sites: Company[] = [];
     hostSites: Company[] =[];
     hostSiteCheck: any = 1;
     compSiteCheck: any = 1;
     site: any;
     hostSite: any;
     companiesApproved: CompanyApproved[] =[];
     selectedprovider: any;
     selectedAccreditation: any;
     singleprovider : Company;
     sdfperovider : SdfCompany;
     sdfprovideruser: User;
     singleprovidersiccode : SicCode;
     trainingprovider : TrainingProvider;
     singaccredit : Accreditationtype;
     singaccredstatus : AccreditationStatus;
     singleseta : Seta;
     accredtype : Accreditationtype[] = [];
     accrstatus : AccreditationStatus[] = [];
     accrstatus2 : AccreditationStatus[] = []; //Need to make sure if these values are correct
     setalist : Seta[] = [];

     /// test
     jbpmuserid :string;
     jbpmuseraddhomeressid:string;
     jbpmuserpostaladdressid:string;
     jbpmcompanyid:string;
     jbpmcompanylearnerid:string;
     jbpmcompanyaddhomeressid:string;
     jbpmcompanyaddpostaladdressid:string;
     jbpmsdfcompanyid:string;

     //Variables Added thruoghout August - October
     SAQAQualificationIDVariable:any;
     SAQAQualificationTitleVariable:any;
     HomeAddressOption:any;
     HomeAddressOption2:any;
     EmpAddressOption:any='';
     CompanyEmailOption:any='';
     HostEmailOption:any='No';
     WBLcheck:any;
     testID:any;
     selectedCountryAdvanced: Company;
     minDate = new Date(1955, 4, 4, 17, 30, 0, 0);
     emrolmindateminDate :Date;
     today = new Date();
     homeadd : AddressModel;
     postaladd : AddressModel;
     tempIDPDF:any;
     tempHlale:any;
     singletown: Town;
     psingletown: Town;
     singleprovince: Province;
     psingleprovince: Province;
     singlemunicipaliyty: Municipality;
     psinglemunicipaliyty: Municipality;
     languageCheck: any = 0;
     otherschoolCheck: any= 0;
     learnerqualificationTownCheck: any = 0;
     checkedhomelangaugeCheck: any = 0;
     userProvider: any;
     userEmployer: any;
     displayModal: boolean = false;
     residentialstatuses : Residentialstatus[];
     idtypes : IDType[];
     provideraddress: any = "";
     providerPostalAddress: any = "";
     

     //Municipality Filters
     filteredMunicipality: Municipality[];
     filteredMunicipality1: Municipality[];
     filteredMunicipality2: Municipality[];
     filteredMunicipality3: Municipality[];

     filteredDistrict:Municipality[];
     filteredDistrict1:Municipality[];
     filteredDistrict2:Municipality[];
     filteredDistrict3:Municipality[];
     organisationChange:any=0;
     ofoChange:any=0;
     companydata;

     disabledCheck: any = 0;
     returningLearnerCheck: any = 0;
     showCheck: any = 0;
     highestQualCheck: any = 0;
     qualificaitofinalCheck: any;
     changedProgramTest: any;
     postaladdresscheck: any =0;
     locationcheck: any =0;
     statscheck: any =0;
     tempstats : any;
  tempstats1 : any;
  tempPstats : any;
  tempstatsCode : any;
  tempPstatsCode : any;
     proofOfSubmission: Date;
     testqualificationtitle: any;
    physicaladdresscheck: any =0;
     timeout: any = null;
    tempLearner: any;
    organisationTypeDescription: any = "";
    statusInt: any;
 personalBirthdayDisplay: Date;

    seaarchedusers: User[] = [];
    companyusers: User[] = [];
    Uid : number = 0;
    companyId : number = 0;
    compid: string = "";
    complearner: CompLearner;
    filteredCountries: Company[];
    compSELECTIONcheck: any = "";

     //Button Validations for If-Statements
    submitlearnerbuttoncheck:any =0;
    employementstatusbuttoncheck:any =0;
    employerdetailsbuttoncheck:any =0;
    providerdetailsbuttoncheck:any =0;
    learningprogrambuttoncheck:any =0;
    applicationdocumentsbuttoncheck:any =0;
    Langindex: number;
  langCheck: any = 0;


     //Variables to handle the upload functionality validation (Crude at the moment, consider more elegant solution)
     uploaderID:any = 0;
     uploaderProofOfMarriage:any = 0;
     uploaderContractOfEmployment:any = 0;
     uploaderEmploymentStatus:any = 0;
     uploaderHighestQualification:any = 0;
     uploaderOther:any = 0;
     uploaderProofOfDivorce:any = 0;
     uploaderConfirmationOfEmployment:any = 0;
     uploaderProofOfDisability:any = 0;
     uploaderHostAddendumDoc:any = 0;
     uploaderWBLAgreement:any = 0;
     guardianorkinChecker: any = 0;
     uploaderLateSubmission: any = 0;
     workstudyCheck: any = 0;
     

      //Home Address
      Addresss: any;
      Municipality: any;
      Distritrict: any;
      Town : any;

      pAddress:any;
      pAddress1: any;
      pAddress2:  any;
      pArea: any;
      pPronvince: any;
      pMunicipality: any;
      pDistritrict: any;
      pTown : any;
      createdtaskid : any;  
      currentuserid : any = 0;
      isdocumentloader : boolean = false;
    
    constructor(private mersetaservice: MersetaService,private sant:DomSanitizer, private changeDetectorRef: ChangeDetectorRef,
         private sharedService: SharedService,private shared: SharedFunctions, private router: Router, private messageService: MessageService,public loaderService: LoaderService) {


      // Hardcoded values inside Dropdowns -- Needs APIs
      //Funding SETA
        this.dropdownOptions19 = [
          {label: 'Employer Funded', value: "0"},
          {label: 'Learner Funded', value: "1"},
          {label: 'Other SETA Funded', value: "2"},
          {label: 'NSF Funded', value: "3"},
          {label: 'Industry Funded', value: "4"},
      ];

      //Learning Program Type
      this.dropdownOptions18 = [
            {label: 'Apprenticeship', value: 0},
            {label: 'Candidacy', value: 1},
            {label: 'Graduate Internship', value: 2},
            {label: 'Internship for the N Diploma', value: 3},
            {label: 'Learnerships', value: 4},
            {label: 'Student Internship', value: 5},
            {label: 'Student Internship: Category A', value: 6},
            {label: 'Student Internship: Category B', value: 7},
            {label: 'Student Internship: Category C', value: 8},
        ];

        //Highest Qualification Level
        this.dropdownOptions10 = [
            {label: 'Below Matric/Standard 10', value: 0},
            {label: 'Above Matric/Standard 10', value: 1},
            {label: 'N1', value: 2},
            {label: 'N2', value: 3},
            {label: 'N3', value: 4},
            {label: 'N4', value: 5},
            {label: 'N5', value: 6},
            {label: 'N6', value: 7},
            {label: 'NCV Level 2', value: 8},
            {label: 'NCV Level 3', value: 9},
            {label: 'NCV Level 4', value: 10},
            {label: 'S1', value: 11},
            {label: 'S2', value: 12},
            {label: 'S3', value: 13},
            {label: 'Grade 12 / Std 10', value: 14},
            {label: 'Grade 11 / Std 9', value: 15},
            {label: 'Grade 10 / Std 8', value:16},
            {label: 'Grade 9 / Std 7', value:17},
            {label: 'Grade 10 / Std 8', value:18},
            {label: 'Below grade 7/ Std 5', value:19}
        ];

        //Accreditation Type
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

         //Accreditation Status
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

    //Oninit Function initialises the Component and begins calling the relevant API's in order to get the data
    ngOnInit(): void {

      this.currentuserid  = this.mersetaservice.user_ID;

      //this.getProcessID();
      this.getAllTowns();
      this.getAllPronvinces();
      this.getAllMunicipalities();
      this.getAllLanguages();
      this.getAllDisabilityStatus();
      this.getAllDesignation();
      this.getAllDisabilityRating();
      this.getAllTvet();
      this.getAllSchools();
      this.getAllhighestqualificationrequired();
      this.getlearningProgramtype();
      this.getAllOfoCodes();
      //this.getAllLearnership();
      this.getAllStats();
      //this.getAllCompanies();
      this.getAllCompaniesWithAccreditation();
      this.getAllApprovedProviders();
      this.getMaritalStatus();
      this.getGender();
      this.getRace();
      this.getOrganasationType();
      this.getTitle();
      this.getNationality();
      this.getAccreditation();
      this.getSeta();
      this.getIDtype();
      this.getResidentialstatus();
      

      //If the user is an SDP or SDF it should get the Provider and Employer details, respectively
    if (this.mersetaservice.uRoleLifecycle == 'SDP'){
      this.getProviderFromUser(this.mersetaservice.user_ID);
      
    } else if (this.mersetaservice.uRoleLifecycle == 'SDF'){
      this.getEmployerFromUser(this.mersetaservice.user_ID);

    }


    }

    //Getting Provider details from USERID
    getProviderFromUser(id) {
      this.mersetaservice.getSingleCompanyByUser(id)
      .subscribe(
         response => {
          if (response == 0)
          {
            this.messageService.add({severity:'info', summary: 'Info', detail: 'This Representative is not linked to an Employer. Please select one manually'});
            setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000); 
          }
          else
          {
            console.log(response);
            this.getSingleProvider(response);
            this.getAllLearnershipQualifications(response);
          }
        }
      );
    }

    //Getting Employer Details from USERID
    getEmployerFromUser(id) {
      this.mersetaservice.getSingleCompanyByUser(id)
      .subscribe(
         response => {
          if (response == 0)
          {
            this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'This Representative is not linked to an Employer. Please select one manually'});
            setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
          }
          else
          {
           console.log(response);
           this.getSingleProvider2(response.id);
           this.getCompanySites(response.id);
          }
        }
      );

    }

    //Function that toggles whether or not the POPI modal should be shown
    showDialog() {
      this.displayModal = true;
  }

  selectDate()  {
    console.log("Date selected");
    this.completedate = null;
    var dates = new Date(this.coomencedate);
    this.emrolmindateminDate = dates;
  }

  //Function that runs when the POPI Act is accepted
  executeModal(){
    this.displayModal = false;
    this.popiactCheck = true;
    console.log('This is the POPI Act Status: ', this.popiactCheck);
  }


    //////////////////////////////////////////////////////////API Calls For DropDowns//////////////////////////////////////////////////////////////////////////

    //Get Marital Status Values For DropDown
    getMaritalStatus(){
        this.mersetaservice.getMaritalStatus()
        .subscribe(
            response => {
                this.dropdownOptions20 = response;
            }
        )
    }

    //Get Gender Values For DropDown
    getGender(){
        this.mersetaservice.getGender()
        .subscribe(
            response => {
                this.dropdownOptions4 = response;
            }
        )
    }
        //Get ID Types Values For DropDown
    getIDtype(){
          this.mersetaservice.getIDtype()
          .subscribe(
              response => {
                  this.idtypes = response;
              }
          )
        }

                //Get ID Types Values For DropDown
    getResidentialstatus(){
        this.mersetaservice.getResidentialstatus()
          .subscribe(
              response => {
                  this.residentialstatuses = response;
        }
      )
   }
    
    //Get Race Values For DropDown
    getRace(){
        this.mersetaservice.getRace()
        .subscribe(
            response => {
                this.dropdownOptions5 = response;
            }
        )
    }
    //Get Organisation Type For DropDown
    getOrganasationType(){
        this.mersetaservice.getOrganasationType()
        .subscribe(
            response => {
                this.organizationtionns = response;
                console.log('Organisations: ');
                console.log(this.organizationtionns);
            }
        )
    }

    //Get Titles For DropDowns
    getTitle(){
        this.mersetaservice.getTitle()
        .subscribe(
            response => {
               this.dropdownOptions3 = response;
            }
        )
    }
    //Get Nationality For DropDowns
    getNationality(){
        this.mersetaservice.getNationality()
        .subscribe(
            response => {
              console.log("welcome : " + response.length)
               this.dropdownOptions2 = response;
            }
        )
    } 

    //Get Accreditation Statuses For DropDowns
    getAccreditation(){
      this.mersetaservice.getAccreditation()
      .subscribe(
          response => {
            console.log("Accreditation Statuses Are : " + response)
             this.accrstatus2 = response;
          }
      )
  } 
    //get seta For DropDowns
    getSeta(){
        this.mersetaservice.getSeta()
        .subscribe(
        response => {
        this.fundingsetas = response;
      }

        )
    }

    //Get all towns for DropDowns
    getAllTowns() {
      this.mersetaservice.getAllTowns()
      .subscribe(
         response => {
           this.temptown = response;
           this.ptemptown = response;
           this.physicaltemptown = response;
           this.empostaltemptown = response;
  
           this.towns = this.temptown;
           this.ptowns = this.ptemptown;
           this.physicaltowns = this.physicaltemptown;
           this.empostaltowns = this.empostaltemptown;
           console.log(response);
         }
      );
    }

    //Get all Provinces for DropDowns
    getAllPronvinces() {
      this.mersetaservice.getAllProvinces()
      .subscribe(
         response => {
           this.tempprovinces = response;
           this.ptempprovinces = response;
           this.physicaltempprovinces = response;
           this.empostaltempprovinces = response;
  
           this.provinces = this.tempprovinces ;
           this.pprovinces = this.ptempprovinces ;
           this.physicalprovinces = this.physicaltempprovinces ;
           this.empostalprovinces = this.empostaltempprovinces ;
           console.log(response);
         }
      );
    }

    //Get all municipalities for DropDowns
    getAllMunicipalities() {
      this.mersetaservice.getAllMunicipalities()
      .subscribe(
         response => {
           this.tempmunicipalities = response;
           this.ptempmunicipalities = response;
           this.physicaltempmunicipalities = response;
           this.empostaltempmunicipalities = response;
  
           this.tempdistricts = response;
           this.ptempdistricts = response;
           this.physicaltempdistricts = response;
           this.empostaltempdistricts = response;
  
           this.municipalities = this.tempmunicipalities;
           this.pmunicipalities = this.ptempmunicipalities;
           this.physicalmunicipalities = this.physicaltempmunicipalities;
           this.empostalmunicipalities = this.empostaltempmunicipalities;
  
          }
              );
            }
  
    //Get all disability statuses for dropdowns
    getAllDisabilityStatus() {
      this.mersetaservice.getAllDisabilitySatus()
      .subscribe(
         response => {
           this.disabilitystatus = response;
           console.log(response);
         }
      );
    }
    
    //Get STATSSA AREA CODE For Employer Physical Address
    getStats(id) {
      this.mersetaservice.getSTATS(id)
      .subscribe(
         response => {
          this.tempstats1 = response;
           this.tempstats = response.description;
           this.tempstatsCode = response.code;
           this.statshome.push(response);
           console.log('Location Is: ' ,response);
         },err => {
          if (err == 400)
          {
            this.messageService.add({severity:'error', summary: 'error', detail: 'This Employer Does Not Have A Location Listed In The Database'});
            this.tempstats = "";
            this.tempstatsCode = "";
            setTimeout(() => {
            }, 4000);
        } 
          else{
            this.tempstats = "";
            this.tempstatsCode = "";
            this.statscheck = 1;
            this.locationcheck = 1;
            console.log(err);}
        }
      );
    }
  
    //Get STATSSA AREA CODE For Employer Postal Address
    getPStats(id) {
      this.mersetaservice.getSTATS(id)
      .subscribe(
         response => {
           this.tempPstats = response.description;
           this.tempPstatsCode = response.code;
           this.statshome.push(response);
           console.log('Postal Location Is: ' ,response);
         }, err => {
          if (err.status == 400)
          {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'This Employer Does Not Have A Location Listed In The Database'});
            this.tempPstats = "";
            this.tempPstatsCode = "";
            setTimeout(() => {
              this.messageService.clear();
            }, 4000);
        } 
        else{
          this.tempPstats = "";
          this.tempPstatsCode = "";
          this.locationcheck = 1;
          this.statscheck = 1;
          console.log(err);
        }
        }
      );
    }
  
    //Get All Disabilities for DropDowns
    getAllDisabilityRating() {
      this.mersetaservice.getAllDisabilityRating()
      .subscribe(
         response => {
           this.disabilityrating = response;
           console.log(response);
         }
      );
    }
  
    //Get All Designations for DropDowns
    getAllDesignation() {
      this.mersetaservice.getAllDesignation()
      .subscribe(
         response => {
           this.designationRating = response;
           console.log(response);
         }
      );
    }

    //Get All Highest Qualifictaions for DropDowns
    getAllhighestqualificationrequired() {
      this.mersetaservice.getAllhighestqualificationrequired()
      .subscribe(
         response => {
           this.highestqualification = response;
           console.log(response);
         }
      );
    }

    //Get All Learning Programs for DropDowns
    getlearningProgramtype() {
      this.mersetaservice.getlearningProgramtype()
      .subscribe(
         response => {
           this.learningprograms = response;
           console.log(response);
         }
      );
    } 

  
  

    //Get all Languages for DropDowns
    getAllLanguages() {
      this.mersetaservice.getAllLanguages()
      .subscribe(
         response => {
           this.langlook = response;
           console.log("Gething all languages", response);
         }
      );
    }
  
    //Get all OFO Codes for DropDowns
    getAllOfoCodes() {
      this.mersetaservice.getAllOfoCodes()
      .subscribe(
         response => {
           this.ofocodes = response;
  
           console.log(response);
          // console.log(response);
         }
      );
    }
  
    //Get all Schools for DropDowns
    getAllSchools() {
      this.mersetaservice.getAllPreiviouschools()
      .subscribe(
         response => {
           this.prevschools = response;
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
  
    //Get all Learnerships for DropDowns
    getAllLearnership() {
      this.mersetaservice.getAllLearnership()
      .subscribe(
         response => {
          this.templearnership =null;
          this.learnership = null;
          this.selectedLearningprogram = null;
           this.templearnership = response;
           this.learnership =  this.templearnership;
           console.log(response);
         }
      );
    }
  
    //Get all STATSAREA CODES for DropDown Selection
    getAllStats() {
      this.mersetaservice.getAllStatsArea()
      .subscribe(
         response => {
           this.statshome = response;
           console.log(response);
         }
      );
    }
  
    
    //Get all SAQA Qualifications for DropDowns
    getSaqa(id) {
      this.mersetaservice.getSaqaQualification(id)
      .subscribe(
         response => {
           this.saqaQual = response;
           this.saqaid = ('('+this.saqaQual.qualificationid +') ' + this.saqaQual.qualificationtitle);
           this.qaulificationidmod = "(" +this.saqaQual.qualificationid +") " + this.saqaQual.qualificationtitle;
           console.log(response);
           this.SAQAQualificationIDVariable =this.saqaQual.qualificationid;
           this.SAQAQualificationTitleVariable =this.saqaQual.qualificationtitle;
           this.testqualificationtitle = this.saqaQual.qualificationtitle;
         }
      );
    }
  

    /////////////////////////////////////////////////////Next and Previous Buttons on Learnership Form////////////////////////////////////////////

    //Next Button on Application and it's validations
    openNext() {

      if (this.index == 0){
        this.messageService.clear();
        console.log('Learner Details');
        if (!this.Identificationid && !this.alternativeid)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners ID Number'});
          this.index = 0;
        } 
        else if (!this.uname || !this.surname )
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Name And Surname'});
          this.index = 0;
        } 
        else if (!this.selectuserTittle) 
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Title'});
          this.index = 0;
        } 
        else if (!this.cellnumber || !this.telnumber)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Both The Learners Cellphone And Telephone Details'});
          this.index = 0;
        }
        else if (!this.primeemail)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Primary Email'});
          this.index = 0;
        } 
        
        else if (!this.selectuserMaritalStatus)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Marital Status'});
          this.index = 0;
        }
        else if (!this.selectedgender)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Gender'});
          this.index = 0;
          //alert('Please Fill In The Learners Gender');
        }
        else if (!this.selectedequity)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Equity/Race'});
          this.index = 0;
          //alert('Please Fill In The Learners Equity/Race');
        }
        else if (!this.checkeddisability)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Whether Or Not The Learner Has A Disability'});
          this.index = 0;
          //alert('Please Fill In Whether Or Not The Learner Has A Disability');
        }
        else if (!this.selectedqualificationlevel)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest Qualification Level'});
          this.index = 0;
          //alert('Please Fill In The Learners Highest Qualification Level');
        }
        else if (!this.selectedschoolatended)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Last School You Attended'});
          this.index = 0;
          //alert('Please Fill In The Last School You Attended');
        }
        else if (!this.quallastschooldateyear)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Last School Year Date'});
          this.index = 0;
          //alert('Please Fill In The Learners Last School Year Date');
        }
        else if (!this.tvetfetqualification)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest TVET/FET Qualification'});
          this.index = 0;
          //alert('Please Fill In The Learners Highest TVET/FET Qualification');
        }
        // else if (!this.selectedHomeTown1)
        // {
        //   this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Town You Got The Learners Highest Qualification From'});
        //   this.index = 0;
        //   //alert('Please Fill In The Town You Got The Learners Highest Qualification From');
        // }
        else if (!this.Address)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          this.index = 0;
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Address1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          this.index = 0;
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Postalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Postal Code'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Postal Code');
        }
        else if (!this.selectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home STATSSAAreaCode And Location'});
          this.index = 0;
          //alert('Please Fill In The Learners Home STATSSAAreaCode And Location');
        }
        else if (!this.selectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Province'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Province');
        }
        else if (!this.selectedhomeDestrict)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home District'});
          this.index = 0;
          //alert('Please Fill In The Learners Home District');
        }
        else if (!this.selectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Municipality'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Municipality');
        }
        else if (!this.selectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Town'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Town');
        }
        else if (!this.Postal)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.Postal1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.pPostalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Your The Learners Postal Address Code'});
          this.index = 0;
          //alert('Please Fill In Your The Learners Postal Address Code');
        }
        else if (!this.pselectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal STATSSAAreaCode and Location'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal STATSSAAreaCode and Location');
        }
        else if (!this.pselectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Province'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Province');
        }
        else if (!this.pselectedhomeDestrict)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal District'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal District');
        }
        else if (!this.pselectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Municipality'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Municipality');
        }
        else if (!this.pselectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Town'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Town');
        }
      } 
      else if (this.index == 1){
        console.log('Employment Status');
        this.messageService.clear();
        if(!this.checkedEmployment)
        {
          //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?'); checkedEmployment   
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If You Are Employed'});
          this.index = 1;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 
        else if(!this.checkedeContractofEmploymen)
        {
          //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?');    
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If the learners contract of employment specific to the purpose of agreement?'});
          this.index = 1;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 

      } 
      else if (this.index == 2){
        this.messageService.clear();
        console.log('Employer Details');
    if (!this.persontitle){
      //alert('Please Enter Contact Person Title');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter Contact Person Title'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personname){
      //alert('Please Enter The Contact Person Name');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Name'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personlastname){
      //alert('Please Enter The Contact Person Surname');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Surname'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personcellnumber){
      //alert('Please Enter The Contact Person Cellphone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Cellphone Number'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.persontelnumber){
      //alert('Please Enter The Contact Person Telephone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Telephone Number'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    } else if (!this.pDesignation){
      //alert('Please Enter The Contact Person Telephone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Designation'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    } else if (this.epPostalcode == null || this.ePostalcode.toString().length != 4 || this.epPostalcode.toString().length != 4){
      //alert('Postal Codes are typically 4 digits'); 
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Postal Codes are typically 4 digits'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }

      } 
      else if (this.index == 3){
        this.messageService.clear();
        if (!this.laccnumber)
        {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Provider'});
          //alert('Please Select A Provider');
          this.index = 3;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 

      } 
      else if (this.index == 4){
        console.log('Learning Program');
        this.messageService.clear();
        if (!this.selectedlearnership)
        {
          //alert('Please Select A Learnership Program');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Learnership Program'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if (!this.coomencedate)
        {
          //alert('Please Indicate The Date Of Enrolment');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Enrolment'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if (!this.completedate)
        {
          //alert('Please Indicate The Date Of Completion');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Completion'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if(!this.checkedfunded) {
            //alert('Please Indicate Your Funding Method');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Your Funding Method'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }else if(this.checkedfunded == "No" && !this.selectuserFunding) {
              //alert('Please Indicate Who Is Funding You');
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Who Is Funding You'});
              this.index = 4;
              setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }

      } 
      else if (this.index == 5){
        console.log('Application Documents');
        this.messageService.clear();
      if (this.uploaderID != 1){
        //alert('Please submit all the required documents');
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please submit all the required documents'});
        this.index = 5;
        setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
      }

      }
        this.index = (this.index === 5) ? 0 : this.index + 1;
        console.log("Tab index: "+this.index);
    }

    //Previous Button on Application and its validations
    openPrev() {

      if (this.index == 0){
        this.messageService.clear();
        console.log('Learner Details');
        if (!this.Identificationid && !this.alternativeid)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners ID Number'});
          this.index = 0;
         // alert('Please Fill In The Learners ID Number');
        } 
        else if (!this.uname || !this.surname )
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Name And Surname'});
          this.index = 0;
          //alert('Please Fill In The Learners Name And Surname');
        } 
        else if (!this.selectuserTittle) 
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Title'});
          this.index = 0;
          //alert('Please Fill In The Learners Title');
        } 
        else if (!this.cellnumber || !this.telnumber)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Both The Learners Cellphone And Telephone Details'});
          this.index = 0;
          //alert('Please Fill In Both The Learners Cellphone And Telephone Details');
        }
        else if (!this.primeemail)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Primary Email'});
          this.index = 0;
          //alert('Please Fill In The Learners Primary Email');
        } 
        
        else if (!this.selectuserMaritalStatus)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Marital Status'});
          this.index = 0;
          //alert('Please Fill In The Learners Marital Status');
        }
        else if (!this.selectedgender)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Gender'});
          this.index = 0;
          //alert('Please Fill In The Learners Gender');
        }
        else if (!this.selectedequity)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Equity/Race'});
          this.index = 0;
          //alert('Please Fill In The Learners Equity/Race');
        }
        else if (!this.checkeddisability)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Whether Or Not The Learner Has A Disability'});
          this.index = 0;
          //alert('Please Fill In Whether Or Not The Learner Has A Disability');
        }
        else if (!this.selectedqualificationlevel)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest Qualification Level'});
          this.index = 0;
          //alert('Please Fill In The Learners Highest Qualification Level');
        }
        else if (!this.selectedschoolatended)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Last School You Attended'});
          this.index = 0;
          //alert('Please Fill In The Last School You Attended');
        }
        else if (!this.quallastschooldateyear)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Last School Year Date'});
          this.index = 0;
          //alert('Please Fill In The Learners Last School Year Date');
        }
        else if (!this.tvetfetqualification)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest TVET/FET Qualification'});
          this.index = 0;
          //alert('Please Fill In The Learners Highest TVET/FET Qualification');
        }
        // else if (!this.selectedHomeTown1)
        // {
        //   this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Town You Got The Learners Highest Qualification From'});
        //   this.index = 0;
        //   //alert('Please Fill In The Town You Got The Learners Highest Qualification From');
        // }
        else if (!this.Address)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          this.index = 0;
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Address1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          this.index = 0;
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Postalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Postal Code'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Postal Code');
        }
        else if (!this.selectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home STATSSAAreaCode And Location'});
          this.index = 0;
          //alert('Please Fill In The Learners Home STATSSAAreaCode And Location');
        }
        else if (!this.selectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Province'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Province');
        }
        else if (!this.selectedhomeDestrict)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home District'});
          this.index = 0;
          //alert('Please Fill In The Learners Home District');
        }
        else if (!this.selectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Municipality'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Municipality');
        }
        else if (!this.selectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Town'});
          this.index = 0;
          //alert('Please Fill In The Learners Home Town');
        }
        else if (!this.Postal)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.Postal1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.pPostalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Your The Learners Postal Address Code'});
          this.index = 0;
          //alert('Please Fill In Your The Learners Postal Address Code');
        }
        else if (!this.pselectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal STATSSAAreaCode and Location'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal STATSSAAreaCode and Location');
        }
        else if (!this.pselectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Province'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Province');
        }
        else if (!this.pselectedhomeDestrict)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal District'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal District');
        }
        else if (!this.pselectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Municipality'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Municipality');
        }
        else if (!this.pselectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Town'});
          this.index = 0;
          //alert('Please Fill In The Learners Postal Town');
        }
      } 
      else if (this.index == 1){
        console.log('Employment Status');
        this.messageService.clear();
        if(!this.checkedEmployment)
        {
          //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?'); checkedEmployment   
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If You Are Employed'});
          this.index = 1;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 
        else if(!this.checkedeContractofEmploymen)
        {
          //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?');    
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If the learners contract of employment specific to the purpose of agreement?'});
          this.index = 1;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 

      } 
      else if (this.index == 2){
        console.log('Employer Details');
        this.messageService.clear();
    if (!this.persontitle){
      //alert('Please Enter Contact Person Title');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter Contact Person Title'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personname){
      //alert('Please Enter The Contact Person Name');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Name'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personlastname){
      //alert('Please Enter The Contact Person Surname');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Surname'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.personcellnumber){
      //alert('Please Enter The Contact Person Cellphone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Cellphone Number'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }
    else if (!this.persontelnumber){
      //alert('Please Enter The Contact Person Telephone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Telephone Number'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    } else if (!this.pDesignation){
      //alert('Please Enter The Contact Person Telephone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Designation'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    } else if (this.epPostalcode == null || this.ePostalcode.toString().length != 4 || this.epPostalcode.toString().length != 4){
      //alert('Postal Codes are typically 4 digits'); 
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Postal Codes are typically 4 digits'});
      this.index = 2;
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
  
    }

      } 
      else if (this.index == 3){
        console.log('Provider Details');
        this.messageService.clear();
        if (!this.laccnumber)
        {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Provider'});
          //alert('Please Select A Provider');
          this.index = 3;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        } 

      } 
      else if (this.index == 4){
        console.log('Learning Program');
        this.messageService.clear();
        if (!this.selectedlearnership)
        {
          //alert('Please Select A Learnership Program');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Learnership Program'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if (!this.coomencedate)
        {
          //alert('Please Indicate The Date Of Enrolment');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Enrolment'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if (!this.completedate)
        {
          //alert('Please Indicate The Date Of Completion');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Completion'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }
        else if(!this.checkedfunded) {
            //alert('Please Indicate Your Funding Method');
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Your Funding Method'});
          this.index = 4;
          setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }else if(this.checkedfunded == "No" && !this.selectuserFunding) {
              //alert('Please Indicate Who Is Funding You');
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Who Is Funding You'});
              this.index = 4;
              setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
        }

      } 
      else if (this.index == 5){
        console.log('Application Documents');
        this.messageService.clear();
      if (this.uploaderID != 1){
        //alert('Please submit all the required documents');
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please submit all the required documents'});
        this.index = 5;
        setTimeout(() => {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }

      }

      this.index = (this.index === 0) ? 5 : this.index - 1;
      console.log("Tab index: "+this.index);
    }

    

    //////////////////////////////////////Not Sure What The Following Code Does So It Has Been Commented Out////////////////////////////////
    // clickNext(step) {
    //     this.activeTab = step;
    // }

    // selectTier(card) {
    //     this.activeCard = card;
    //     this.activeTab = 'appdocuments';
    // }

    // onUpload(event) {
    //     for (const file of event.files) {
    //       this.uploadedFiles.push(file);
    //     }
    //     console.log("Woooooooooooooow ");
    //     // console.log(this.uploadedFiles.length);
    //      console.log("Yesssss ");
    //     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    // }

    ///////////////////////////////////////////////////////////Document Handlers//////////////////////////////////////////////////////////////////////

    

    //Function That Uploads The Documents Through The API
    updloaddocs(body)  {
      this.mersetaservice.uploadlearnershipdocument(body)
      .subscribe(
         response => {
          // this.proccessID = response;
          console.log("doc loader test: " + event);
          this.isdocumentloader = false;
          this.uploadedFiles.push(this.fileToUpload);
           console.log(response);
         },
         error => {
          this.isdocumentloader = false;
          console.log(error);
        }
      );
      this.messageService.clear();
    }

    viewDocument(event,value) {
      console.log("doc id Clicked : " + event);
      this.router.navigate(['/main/singledocview',btoa(value),btoa(this.jbpmcompanylearnerid)], {
        skipLocationChange: true,
      });
    }

    //When ID Document is Uploaded
    myUploaderIDdocument(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_122_' +this.jbpmcompanylearnerid+'_IDdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

      this.updloaddocs(formData);
      this.uploaderID = 1;
      this.messageService.add({severity:'success', summary: 'Success', detail: 'ID Document Uploaded'});
     
      //alert('ID Document Uploaded');
      //this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

    }

    // myUploaderWBLdocs(event,value) {
    //   event.files;
    //   console.log("Woooooooooooooow");
    //   console.log(event.files);
    //   console.log(event.files[0]["name"]);
    //   console.log("user_id: ", value);
    //   console.log();
    //   this.fileToUpload =  event.files[0];
    //   this.filename = event.files[0]["name"];
    //   console.log(this.fileToUpload);
  
    //   let fileName:string = value+'_312_' +this.selectedbatch +'_moderatorDocument'+'_AssessmmentModeratorBatch'; //get name from form for example
    //   let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
    //   const formData: FormData = new FormData();
    //   formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
  
    //   this.updloaddocs(formData); 
  
    // }

    //When Copy of Employment Document is Uploaded
    myUploadercopyemployment(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_124_' +this.jbpmcompanylearnerid+'_Copyofemploymentdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

      this.updloaddocs(formData);
      this.uploaderContractOfEmployment = 1;
     // alert('Copy of Employment Document');
     this.messageService.add({severity:'success', summary: 'Success', detail: 'Copy of Employment Document Uploaded'});
     this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Copy of Employment Document Uploaded' });
 
    }

    //When Confirmation of Employment Status is Uploaded
    myUploaderconfirmstatus(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string =  this.jbpmuserid+'_162_' +this.jbpmcompanylearnerid+'_Confirmationstatusdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

      this.updloaddocs(formData);
      this.uploaderEmploymentStatus = 1;
      //alert('Confirmation Of Employment Uploaded');
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Confirmation Of Employment Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Confirmation Of Employment Uploaded' });

    }

    //When Highest Qualification is Uploaded
    myUploaderhightestqualification(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_84_' +this.jbpmcompanylearnerid+'_highestcertificatedocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);

      this.updloaddocs(formData);
      this.uploaderHighestQualification = 1;
      //alert('Highest Qualification Uploaded');
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Highest Qualification Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Highest Qualification Uploaded' });
    }

    //When Study Permit is Uploaded
    myUploaderworkpermitstudy(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_253_' +this.jbpmcompanylearnerid+'_workpermitdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.workstudyCheck = 1;
      this.updloaddocs(formData);
     // alert('Work/Study Permit Uploaded');
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Work/Study Permit Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Work/Study Permit Uploaded' });

    }

    //When Other Documents that have not been specified are uploaded
    myUploaderotherdocs(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_162_' +this.jbpmcompanylearnerid+'_otherdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderOther = 1;
      //alert('Document Has Been Uploaded');
      this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Document Has Been Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Document Has Been Uploaded' });


    }


    //When the Addendum Documents are Uploaded
    myUploaderAddendumdocs(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_308_' +this.jbpmcompanylearnerid+'_hostaddendumdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderHostAddendumDoc = 1;
      //alert('Addendum Documents Have Been Uploaded');
      this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Addendum Documents Have Been Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Addendum Documents Have Been Uploaded' });

    }

    //When The WBL Document is Uploaded
    myUploaderWBLdocs(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_309_' +this.jbpmcompanylearnerid+'_workplacebasedlearningdocument'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderWBLAgreement = 1;
      //alert('WBL Document Uploaded');
      this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'WBL Document Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'WBL Document Uploaded' });

    }

    //When Proof of Late Submission is Uploaded
    myUploaderLateSubmission(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);
      this.uploaderLateSubmission = 1;

      let fileName:string = this.jbpmuserid+'_316_' +this.jbpmcompanylearnerid+'_latesubmission'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
     // alert('Proof Of Late Submission Uploaded');
     this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Proof Of Late Submission Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Proof Of Late Submission Uploaded' });

    }

    //When Proof Of Disability is Uploaded
    myUploaderProofofDisability(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);

      let fileName:string = this.jbpmuserid+'_292_' +this.jbpmcompanylearnerid+'_proofofdisability'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderProofOfDisability = 1;
      //alert('Proof Of Disability Uploaded');
      this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Proof Of Disability Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Proof Of Disability Uploaded' });

    }

    //When Letter of Confirmation is Uploaded
    myUploaderLetterofConfirmation(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);
      let fileName:string = this.jbpmuserid+'_313_' +this.jbpmcompanylearnerid+'_letterofconfirmationofemployment'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderConfirmationOfEmployment = 1;
     // alert('Letter Of Confirmation Uploaded');
     this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Letter Of Confirmation Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Letter Of Confirmation Uploaded' });
    }

    //When Proof Of Marriage is Uploaded
    myUploaderProofOfMarriage(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);
      let fileName:string = this.jbpmuserid+'_317_' +this.jbpmcompanylearnerid+'_proofofmarriage'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderProofOfMarriage = 1;
      //alert('Proof Of Marriage Uploaded');
      this.updloaddocs(formData);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Proof of Merriage Uploaded'});
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Proof of Merriage Uploaded' });

    }

    //When Proof Of Divorce is Uploaded
    myUploaderProofOfDivorce(event) {
      this.isdocumentloader = true;
      event.files;
      console.log("Woooooooooooooow ");
      console.log(event.files);
      console.log(event.files[0]["name"]);
      this.fileToUpload =  event.files[0];
      this.filename = event.files[0]["name"];
      console.log(this.fileToUpload);
      let fileName:string = this.jbpmuserid+'_318_' +this.jbpmcompanylearnerid+'_proof of divorce'+'_CompanyLearners'; //get name from form for example
      let fileExtension:string = this.fileToUpload.name.split('?')[0].split('.').pop();
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload,fileName+'.'+fileExtension);
      this.uploaderProofOfDivorce = 1;
     // alert('Proof Of Divorce Uploaded');
     this.updloaddocs(formData);
     this.messageService.add({severity:'success', summary: 'Success', detail: 'Proof of Divorce Uploaded'});
     this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: 'Proof of Divorce Uploaded' });

    }

  //   getBase64(file: Blob) {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = error => reject(error);
  //     });
  // }

  /////////////////////////////////////////////Retrieval of Company Information on Provider and Employer Tabs/////////////////////////////////////////////////

  //Retrieves All Employers that are already accreditted to give modules
  getAllCompaniesWithAccreditation() {
    this.mersetaservice.getAllCompaniesWithAccreditation().subscribe((response) => {
      this.companies = response;
    });
  }

  //Retrieves List of All Companies
  getAllCompanies() {
    this.mersetaservice.getAllCompanies()
    .subscribe(
       response => {
         this.companies = response;
       }
    );
    }

    //Retrieves all Providers that are approved to give modules
    getAllApprovedProviders() {
      this.mersetaservice.getAllApprovedProviders()
      .subscribe(
         response => {
           this.companiesApproved = response;
         }
      );
      }

      LPdisabled: any;
      //Function that retrieves all the learnership Qualifications that a particular provider is approved to Provide
      getAllLearnershipQualifications(id) {
        this.mersetaservice.getAllLearnershipQualification(id)
        .subscribe(
          response => {
            this.templearnership =null;
            this.learnership = null;
            this.selectedLearningprogram = null;
            
            this.templearnership = response;
            console.log('Array Length Is: ', this.templearnership.length)
            if (this.templearnership.length == 0){
              this.LPdisabled = 0;
              this.messageService.add({severity:'error', summary: 'Error', detail: 'This Provider Doesnt Have Any Learning Programs, Please Select A Different One Or Contact Your Provider'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              if (this.learnership == null){
                this.ofoChange = 1;
              } else {
                this.ofoChange = 0;
              }
            }
            else{
              this.templearnership = response;
              this.learnership =  this.templearnership;
              console.log("You were the chosen one!! It was said you would bring to the force!!! You were meant to destroy the sith not Join them!!");
              console.log(response);
              console.log(this.learnership);
              this.LPdisabled = 1;
            }
          }
        );
      }
      //////////////////////////////////Functions to populate Company DropDowns Found on Employer and Details Tab///////////////////////////////////////

    //Dropdown on Provider Details Tab That Handles The Retrieval of Said Provider's Details and the qualifications they are allowed to give
    onSelectcompany2(event) {
      this.templearnership =null;
      this.learnership = null;
      this.selectedLearningprogram = null;
      console.log("employer : " + event);
      console.log("Selected Employer : " + this.laccnumber)
      this.getSingleProvider(this.laccnumber);
      this.getAllLearnershipQualifications(this.laccnumber);
    }

    // onSelectcompany3(event) {
    //   console.log("employer : " + event);
    //   console.log("Selected Employer : " + this.laccnumber);
    //   this.getSingleProvider(this.laccnumber);
    // }

    //Provider Address
  // var provhomprovince,provhomedestric,provhomemunicipality,provhometown;
  // var provpostalprovince,provpostaldestric,provpostalmunicipality,provpostaltown;

  // provhomprovince: string = this.provinces.filter(x => x.id == response[0].provID)[0].provinceDesc;
  // provhomedestric:string = this.tempmunicipalities.filter(x => x.id == response[0].municipalityId)[0].municipalityDesc;
  // provhometown:string = this.towns.filter(x => x.id == response[0].townId)[0].description;

  // provpostalprovince:string = this.provinces.filter(x => x.id == this.pselectedPronvince)[0].provinceDesc;
  // provpostaldestric:string = this.filteredDistrict1.filter(x => x.id == this.pselectedhomeDestrict)[0].municipalityDesc;
  // provpostalmunicipality:string = this.filteredMunicipality1.filter(x => x.id == this.pselectedHomeMuni)[0].municipalityDesc;
  // provpostaltown:string = this.towns.filter(x => x.id == this.pselectedHomeTown)[0].description;

  returnAddressString(addessid) {
    this.mersetaservice.getSingleUserAddress(addessid)
    .subscribe(
       response => {
        var varmuni:string = this.tempmunicipalities.filter(x => x.id == response[0].municipalityId)[0].municipalityDesc;
        var vartown:string = this.towns.filter(x => x.id == response[0].townId)[0].description;
        this.provideraddress = response[0].addressLine1 + " " +  response[0].addressLine2 + " " + response[0].addressLine3 + " " + response[0].postcode + " " + varmuni + " " + vartown;
        console.log('RESPONSE IS: ', response[0]);
        console.log('OUTPUT IS: ', this.provideraddress)
       }
    );
  }


  returnAddressPostalString(addessid) {
    this.mersetaservice.getSingleUserAddress(addessid)
    .subscribe(
       response => {
        var varmuni:string = this.tempmunicipalities.filter(x => x.id == response[0].municipalityId)[0].municipalityDesc;
        var vartown:string = this.towns.filter(x => x.id == response[0].townId)[0].description;
        this.providerPostalAddress = response[0].addressLine1 + " " +  response[0].addressLine2 + " " + response[0].addressLine3 + " " + response[0].postcode + " " + varmuni + " " + vartown;
        console.log('RESPONSE IS: ', response[0]);
        console.log('OUTPUT IS: ', this.providerPostalAddress)
       }
    );
  }


    
    getSingleProvider(id) {
      this.mersetaservice.getSingleCompany(id)
      .subscribe(
         response => {
           this.singleprovider = response[0];
           console.log("Single sdf provider details");
           console.log(response[0]);
           this.clearProviderData();
           this.getSdfProvider(id);
           console.log('residential' ,this.singleprovider.residentialAddressId);
           this.returnAddressString(this.singleprovider.residentialAddressId);
           console.log('postal' ,this.singleprovider.postalAddressId);
           this.returnAddressPostalString(this.singleprovider.postalAddressId);
         }
      );
    }

    getSdfProvider(id) {
      this.mersetaservice.getSdfCompany(id)
      .subscribe(
         response => {
           this.sdfperovider = response[0];
           console.log("SDF SATA bro");
           console.log(this.sdfperovider);
           if (this.sdfperovider == null){
            //alert('This Provider does not have an SDF Contact Person');
            this.messageService.add({severity:'error', summary: 'Error', detail: 'This Provider does not have an SDF Contact Person'});
            setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
            this.lfirstname = 'Not Available';
            this.llastname =  'Not Available';
            this.lemail  = 'Not Available';
            this.lcellnumber = 'Not Available';
           }else{
            this.getSdfProviderSingleUser(this.sdfperovider.sdfId);
           }
           
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

    getTraininProvider(id) {
      this.mersetaservice.getTrainingprovider(id)
      .subscribe(
         response => {
           this.trainingprovider = response;
           //var val = response[0];
           console.log("Training Provider");
           console.log(this.trainingprovider);
           console.log(this.trainingprovider.accreditationApplicationType);
           //this.laccnumber = this.trainingprovider.accreditationNumber;
           this.loadProviderData();
           //console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);

         }
      );
    }

    clearProviderData() {
       console.log("Load Provider Data: " + this.singleprovider.accreditationNumber);
      // this.singaccredit =  this.accredtype.filter(x => x.id == this.trainingprovider.accreditationApplicationType)[0];
      // this.singaccredstatus =  this.accrstatus.filter(x => x.id == this.trainingprovider.approvalStatus)[0];
      var setaat = "";
      if(this.singleprovider.setaId == null) {
        setaat = "MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority";
      }else {
        setaat = '';
      }
      // var reviewdate = new  Date(this.trainingprovider.etqaEviewCommitteeDate);
      this.lprovidername = this.singleprovider.companyName;
      //this.lprovidername = this.singleprovider.;
      // this.lfirstname = this.sdfprovideruser.firstName;
      // this.llastname =  this.sdfprovideruser.lastName;
      // this.lemail  = this.sdfprovideruser.email;
      //  this.lcellnumber = this.sdfprovideruser.cellNumber;
      this.ltellnumber = this.singleprovider.telNumber;
      this.lfaxnumber = this.singleprovider.faxNumber;
      this.lreviewdate = '';
      this.lsiccode = '';
      this.lregistereat = setaat;
      this.laccredstatus = '';
      this.laccredtyep = '';
      //  console.log(this.lcellnumber);
      //  console.log(this.sdfprovideruser.cellNumber);
    }

    loadProviderData() {
      console.log("Load Provider Data: " + this.singleprovider.accreditationNumber);
      this.singaccredit =  this.accredtype.filter(x => x.id == this.trainingprovider.accreditationApplicationType)[0];
      this.singaccredstatus =  this.accrstatus.filter(x => x.id == this.trainingprovider.approvalStatus)[0];
      var setaat = "";
      if(this.singleprovider.setaId == null) {
        setaat = "MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority";
      }else {
        this.singleseta =  this.setalist.filter(x => x.id == this.singleprovider.setaId)[0];
        setaat = this.singleseta.description;
      }
      var reviewdate = new  Date(this.trainingprovider.etqaEviewCommitteeDate);
       this.lprovidername = this.employername;
       this.lfirstname = this.sdfprovideruser.firstName;
       this.llastname =  this.sdfprovideruser.lastName;
       this.lemail  = this.sdfprovideruser.email;
       this.lcellnumber = this.sdfprovideruser.cellNumber;
       this.ltellnumber = this.sdfprovideruser.telNumber;
       this.lfaxnumber = this.sdfprovideruser.faxNumber;
       this.lreviewdate = reviewdate.toLocaleDateString();
       this.lsiccode = this.singleprovidersiccode.description;
       this.lregistereat = setaat;
       this.laccnumber = this.singleprovider.id;
       this.laccredstatus = this.singaccredstatus.description;
       this.laccredtyep = this.singaccredit.description;
       console.log(this.lcellnumber);
       console.log(this.sdfprovideruser.cellNumber);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // onSelectcompany3(event) {
    //   console.log("employer : " + event);
    //   console.log("Selected Employer : " + this.laccnumber);
    //   this.getSingleProvider(this.laccnumber);
    // }

    //Dropdown on Employer Details Tab That Handles The Retrieval of Said Employer's Details Based on The Levy Number
    onSelectcompany4(event) {
      console.log("employer : " + event);
      console.log("Selected Employer : " + this.levynumber);
      this.getSingleProvider2(this.levynumber);
      this.getCompanySites(this.levynumber);
      this.messageService.clear();
    }

    getSingleProvider2(id) {
      this.mersetaservice.getSingleCompany(id)
      .subscribe(
         response => {

           this.singleprovider = response[0];
           console.log("Single sdf provider details based on levy number");
           console.log(response[0]);
           this.companyId = response[0].id;
           this.employername = response[0].companyName;
           //this.levynumber = response[0].levyNumber;
            this.trainingname = response[0].tradingName;
            this.empRegisteredAt = response[0].registeredAddress;
            this.selectedorganization = response[0].organisationTypeId;
            this.emptemail = response[0].email;
            this.emptelnumber = response[0].telNumber.toString();
            this.empfaxnumber = response[0].faxNumber;
            this.emregnumber = response[0].companyRegistrationNumber;
            this.siccode = response[0].sicCodeId;
            this.eAddress = response[0].residentialAddress;
            this.epAddress1 = response[0].postalAddress;
            this.ePostalcode = response[0].Postalcode;
            this.organisationTypeDescription = this.organizationtionns.filter(x => x.id == response[0].organisationTypeId)[0].description;
            this.onChangeOrganization();
            this.getEhomeaddress(response[0].residentialAddressId);
            this.getPostaldress(response[0].postalAddressId);

         }
      );

    }

    getSingleProvider3(id) {
      this.mersetaservice.getSingleCompany(id)
      .subscribe(
         response => {
            this.getEhomeaddress(response[0].residentialAddressId);
            this.getPostaldress(response[0].postalAddressId);
         }
      );

    }

    //Dropdown on Employer Details Tab That Handles The Retrieval of Said Employer's Sites
    onSelectcompany5(event) {
      console.log(this.site);
      this.getEhomeaddress(this.site);
    }

    //Dropdown on Employer Details Tab That Handles The Retrieval of a Host-Employer's Details Based on The Levy Number
    onSelectcompany6(event) {
      console.log("employer : " + event);
      console.log("Selected Employer : " + this.levynumber);
      this.getSingleProvider3(this.levynumber2);
      this.getHostSites(this.levynumber2);
    }

    //Dropdown on Employer Details Tab That Handles The Retrieval of Host Employer's Sites
    onSelectcompany7(event) {
      console.log(this.hostSite);
      this.getEhomeaddress(this.hostSite);
    }

    //Dropdown on Employer Details Tab That That Has The Function of retrieving Host Sites
    getHostSites(id){
      this.mersetaservice.getSingleCompanySite(id)
      .subscribe(
        response => {
          this.hostSites = response;
          console.log("Host Sites for the companies selected");
          console.log(response);
          if (this.hostSites.length == 0) {
            this.hostSiteCheck = 1;
          } 
          else {
            this.hostSiteCheck = 0;
          }
        }
      );
    }

    //Dropdown on Employer Details Tab That That Has The Function of retrieving regular sits
    getCompanySites(id){
      this.mersetaservice.getSingleCompanySite(id)
      .subscribe(
        response => {
          this.sites = response;
          console.log("Sites for the companies selected");
          console.log(response);

          if (this.sites.length == 0) {
            this.compSiteCheck = 1;
          } 
          else {
            this.compSiteCheck = 0;
          }
        }
      );
    }

    //Function that is ran when a User clicks on Submit at the end of the Application Process
    async testupload(){ 
      var tempdate = new Date(this.completedate);

      this.messageService.clear();

      if ((this.selectedschoolatendedNumber != 26389) && (this.uploaderHighestQualification == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your highest qualificaton document'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if ((Number(this.selectuserMaritalStatus)== 5) && (this.uploaderProofOfDivorce == 0) )
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Proof Of Divorce'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if (((Number(this.selectuserMaritalStatus)== 1)) && (this.uploaderProofOfMarriage == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Marriage Certificate'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if ((this.nationvalue != 1) && (this.workstudyCheck == 0))
      {
        if(!this.selectDropdownOptionsNationality){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select Your Nationality'});
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Work or Study Permit'});
          setTimeout(() => 
          {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
       }
      }
      else if ((this.HostEmailOption == 'HostEmail') && (this.uploaderHostAddendumDoc == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Host Addendum Document'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if ((tempdate < this.today) && (this.uploaderLateSubmission == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Proof of Late Submission'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if ((this.checkedEmployment == 'Yes') && (this.uploaderConfirmationOfEmployment == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Letter of Confirmation of Employment'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else if ((this.checkeddisability == 'Yes') && (this.uploaderProofOfDisability == 0))
      {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please upload your Proof of Disability'});
        setTimeout(() => 
        {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
      else{ 
        if (this.checkedfunded == 'No'){
          console.log(this.uploaderID);
          console.log(this.uploaderContractOfEmployment);
          console.log(this.uploaderEmploymentStatus);
          console.log(this.uploaderWBLAgreement);
          if (this.selectuserFunding == '2'){
            if ((this.uploaderID == 0) || (this.uploaderContractOfEmployment == 0) || (this.uploaderWBLAgreement == 0) ){

              if (this.uploaderID == 0){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your ID'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
              else if (this.uploaderContractOfEmployment == 0){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your Contract Of Employment'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
              else if (this.uploaderWBLAgreement == 0){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your WBL Agreement'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }


            }
            else{
            console.log('Application Submitted');
            //alert('Application Has Been Successfully Submitted');
            this.messageService.add({severity:'success', summary: 'success', detail: 'Application Has Been Successfully Submitted'});
            setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
            let tempidentification: string = "";
            if (this.alternativeid){
              tempidentification = this.alternativeid;
            } else if (this.Identificationid){
              tempidentification = this.Identificationid;
            }
            let possible = "abcdefghijklmnopqrstuxyz1234567890";
            const lengthOfCode = 4;
            var first4 = this.makeRandom(lengthOfCode, possible);
            var second4 = this.makeRandom(lengthOfCode, possible);
            var third4 = this.makeRandom(lengthOfCode, possible);
            var guid = "4e2777e1-"+first4+"-"+second4+"-"+third4+"-fda613b59d40";

            var date = new Date();
            var objects = {
                "createDate": date,
                "description":"Please review the learner registration application for: "+this.uname+" "+this.surname+"(" +tempidentification +","+ this.primeemail +").", //this.Identificationid
                "dueDate": date,
                "guid": guid,
                "targetClass": "haj.com.entity.CompanyLearners",
                "targetKey": this.jbpmcompanylearnerid,
                "taskStatus": 0,
                "workflowProcess": 1,
                "createUserId": this.currentuserid,
                "hostingCompanyProcessId":59,
                "firstInProcess": 0,
                "companyId": this.companyId,
                "actionUserId": this.jbpmuserid
              }
              this.CreateTask(objects);
              this.router.navigate(['/main/tasklist'], {
                skipLocationChange: true,
              });
            //Application must become a task
            }
        }
        else
          {
            if ((this.uploaderID == 0) || (this.uploaderContractOfEmployment == 0) || (this.uploaderEmploymentStatus == 0 || this.uploaderWBLAgreement == 0) ){
              //alert('Please submit all the required documents');
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Please submit all the required documents'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
            }
            else{
            console.log('Application Submitted');
            //alert('Application Has Been Successfully Submitted');
            this.messageService.add({severity:'success', summary: 'success', detail: 'Application Has Been Successfully Submitted'});
            setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
            let possible = "abcdefghijklmnopqrstuxyz1234567890";
            const lengthOfCode = 4;
            var first4 = this.makeRandom(lengthOfCode, possible);
            var second4 = this.makeRandom(lengthOfCode, possible);
            var third4 = this.makeRandom(lengthOfCode, possible);
            var guid = "4e2777e1-"+first4+"-"+second4+"-"+third4+"-fda613b59d40";

            var date = new Date();
            var objects = {
                "createDate": date,
                "description":"Please review the learner registration application for: "+this.uname+" "+this.surname+"(" + this.Identificationid+","+ this.primeemail +").",
                "dueDate": date,
                "guid": guid,
                "targetClass": "haj.com.entity.CompanyLearners",
                "targetKey": this.jbpmcompanylearnerid,
                "taskStatus": 0,
                "workflowProcess": 1,
                "createUserId": this.currentuserid,
                "hostingCompanyProcessId":59,
                "firstInProcess": 0,
                "companyId": this.companyId,
                "actionUserId": this.jbpmuserid
              }
              this.CreateTask(objects);
              this.router.navigate(['/main/tasklist'], {
                skipLocationChange: true,
              });
            //Application must become a task
            }
          }

        }
        else if (this.checkedfunded == 'Yes')
        {
            if ((this.uploaderID == 0) || (this.uploaderContractOfEmployment == 0) || (this.uploaderEmploymentStatus == 0) || (this.uploaderWBLAgreement == 0) ){
              if (this.uploaderID == 0){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your ID'});
              setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
              else if ((this.uploaderContractOfEmployment == 0)){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your Contract Of Employment'});
                setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
              else if (this.uploaderEmploymentStatus == 0 ){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your Contract Of Employment Status'});
                setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
              else if ((this.uploaderWBLAgreement == 0)){
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Upload Your Work Based Learnership Agreement'});
                setTimeout(() => {
                console.log('sleep');
                this.messageService.clear();
              }, 4000);
              }
            }
            else{
            console.log('Application Submitted');
            //alert('Application Has Been Successfully Submitted');
            let possible = "abcdefghijklmnopqrstuxyz1234567890";
            const lengthOfCode = 4;
            var first4 = this.makeRandom(lengthOfCode, possible);
            var second4 = this.makeRandom(lengthOfCode, possible);
            var third4 = this.makeRandom(lengthOfCode, possible);
            var guid = "4e2777e1-"+first4+"-"+second4+"-"+third4+"-fda613b59d40";

            var date = new Date();
            var objects = {
                "createDate": date,
                "description":"Please review the learner registration application for: "+this.uname+" "+this.surname+"(" + this.Identificationid+","+ this.primeemail +").",
                "dueDate": date,
                "guid": guid,
                "targetClass": "haj.com.entity.CompanyLearners",
                "targetKey": this.jbpmcompanylearnerid,
                "taskStatus": 0,
                "workflowProcess": 1,
                "createUserId": this.currentuserid,
                "hostingCompanyProcessId":59,
                "firstInProcess": 0,
                "companyId": this.companyId,
                "actionUserId": this.jbpmuserid
              }
              this.CreateTask(objects);
              this.messageService.add({severity:'success', summary: 'success', detail: 'Application Has Been Successfully Submitted'});
              setTimeout(() => {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
              this.router.navigate(['/main/tasklist'], {
                skipLocationChange: true,
              });
            //Application must become a task
            }
        } 
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If The Learner Is merSeta Funded'});
            setTimeout(() => 
            {
              console.log('sleep');
              this.messageService.clear();
            }, 4000);
        }
    }
  }

    makeRandom(lengthOfCode: number, possible: string) {
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
        return text;
    }

    CreatTaskUser(body) {
      this.mersetaservice.CreateTaskUser(body)
      .subscribe(
         response => {
           console.log("task user : ", response);
           this.router.navigate(['/main/tasklist'], {
            skipLocationChange: true,
          });
        }
      );
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
          "userId": this.currentuserid
         }
         this.CreatTaskUser(obj);
       }
    );
   }
    

    getProviderData(id) {
      this.mersetaservice.getSdfCompany(id)
      .subscribe(
         response => {
           this.sdfperovider = response[0];
           console.log("SDF SATA bro");
           console.log(this.sdfperovider);
           this.getSdfProviderSingleUserData(this.sdfperovider.sdfId);
         }
      );
    }

    getSdfProviderSingleUserData(id) {
      this.mersetaservice.getSingleUser(id)
      .subscribe(
         response => {
           this.sdfprovideruser = response;
           console.log(response);
           console.log("sdf firstname =  " + this.sdfprovideruser.firstName + " sdf lastname = " + this.sdfprovideruser.lastName);
           //this.getProviderSicCodeData(this.singleprovider.sicCodeId);
           this.loadProviderDataData();
         }
      );
    }


    getProviderSicCodeData(id) {
      this.mersetaservice.getSicCode(id)
      .subscribe(
         response => {
           this.singleprovidersiccode = response[0];
           console.log(response);
           this.getTraininProviderData(this.singleprovider.id);
         }
      );
    }

    getTraininProviderData(id) {
      this.mersetaservice.getTrainingprovider(id)
      .subscribe(
         response => {
           this.trainingprovider = response;
           //var val = response[0];
           console.log("Training Provider");
           console.log(this.trainingprovider);
           console.log(this.trainingprovider.accreditationApplicationType);
           //this.laccnumber = this.trainingprovider.accreditationNumber;
           this.loadProviderDataData();
           //console.log("SDF ID = " +  this.sdfcompany.sdfId + " Company id = " +  this.sdfcompany.createDate);

         }
      );
    }

    loadProviderDataData() {
      console.log("Load Provider Data: " + this.singleprovider.accreditationNumber);
      this.singaccredit =  this.accredtype.filter(x => x.id == this.trainingprovider.accreditationApplicationType)[0];
      this.singaccredstatus =  this.accrstatus.filter(x => x.id == this.trainingprovider.approvalStatus)[0];
      var setaat = "";
      if(this.singleprovider.setaId == null) {
        setaat = "MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority";
      }else {
        this.singleseta =  this.setalist.filter(x => x.id == this.singleprovider.setaId)[0];
        setaat = this.singleseta.description;
      }
      var reviewdate = new  Date(this.trainingprovider.etqaEviewCommitteeDate);
       this.lprovidername = this.employername;
       this.lfirstname = this.sdfprovideruser.firstName;
       this.llastname =  this.sdfprovideruser.lastName;
       this.lemail  = this.sdfprovideruser.email;
       this.lcellnumber = this.sdfprovideruser.cellNumber;
       this.ltellnumber = this.sdfprovideruser.telNumber;
       this.lfaxnumber = this.sdfprovideruser.faxNumber;
       this.lreviewdate = reviewdate.toLocaleDateString();
       this.lsiccode = this.singleprovidersiccode.description;
       this.lregistereat = setaat;
       //this.laccnumber = this.singleprovider.accreditationNumber;
       this.laccredstatus = this.singaccredstatus.description;
       this.laccredtyep = this.singaccredit.description;
    }

    


      //// FORM GROUPS /////
    /////////////////////////////////////

      //////////////////////////////////////////////////
    //////////////////////////  JBPM Calls ///////////////////////

    //Creates a new rown in the User table
    Addperson(body) {
      this.mersetaservice.AddPerson(body)
      .subscribe(
         response => {
           this.jbpmuserid = response.data; //response.userid
           var date = new Date();
           var addressdata = {
              "addressLine1": this.Address,
              "addressLine2": this.Address1,
              "addressLine3": this.Address2,
              "createDate": date,
              "municipalityId": this.selectedHomeMuni,
              "userId": this.jbpmuserid,
              "townId": this.selectedHomeTown,
              "postcode": this.Postalcode,
              "statsSaareaCodeId": this.selectedstathome,
              "sameAddress": 0
           };
           this.AddUHomeAddress(this.jbpmuserid,addressdata);
           console.log('You have just created a learner and the User ID is');
           console.log(this.jbpmuserid);
           console.log(response);
           console.log('Creating WBL');
           //this.createWBL();
           console.log('Company Learner ID is');
           console.log(this.jbpmcompanylearnerid);
           this.messageService.add({key: 'tc1',severity:'success', summary: 'info', detail: 'Learner Details Have Been Created. You will be able to return and resume'});
           console.log('We are waiting for User ID to be created and add Languages');
           this.AddLanguages();     
         }
      );
    }

    //Creates a new row in the address table while referencning the user
    AddUHomeAddress(id,body) {
      this.mersetaservice.AddAddress(body)
      .subscribe(
         response => {
           this.jbpmuseraddhomeressid = response;
           var date = new Date();
           var addressdata = {
            "addressLine1": this.Postal,
            "addressLine2": this.Postal1,
            "addressLine3": this.Postal2,
            "createDate": date,
            "municipalityId": this.pselectedHomeMuni,
            "userId": this.jbpmuserid,
            "townId": this.pselectedHomeTown,
            "companyId": this.jbpmcompanyid,
            "postcode": this.pPostalcode,
            "statsSaareaCodeId": this.pselectedstathome,
            "sameAddress": 0
          };
          console.log('Step 0: Origin Point');
          this.AddUPostalAddress(id,addressdata);
          console.log('User Home Address Is: ');
          console.log(response);
         }
      );
    }

    //Creates a new row in the address table while referencning the user
    AddUPostalAddress(id,body) {
      this.mersetaservice.AddAddress(body)
      .subscribe(
         response => {
           this.jbpmuserpostaladdressid = response;
           console.log(response);
           var date = new Date();
           var updateuaddress = {
              "residentialAddressId": response,
              "postalAddressId":  response,
              "lastUpdateDate":date
           }
           console.log('Step 1: Find Address should be committed');
           this.UpdatePostalUSerAddress(updateuaddress,this.jbpmuserid);
         }
      );
    }

    UpdatePostalUSerAddress(body,id) {
      this.mersetaservice.updateuseraddress(body,id)
      .subscribe(
         response => {
           console.log(response);
           var date = new Date();
           var telephoene = "";
           if(this.nextofkincelphone != null)   {
              telephoene = this.nextofkincelphone.toString();
           }else {
            telephoene = "";
           }
           var nextofkin = {
              "nextOfKinName": this.nextofkin,
              "nextOfKinTelephone": telephoene, //Needs to be troubleshooted
              "nextOfKinEmail": this.nextofkinemailaddress,
              "nextOfKinLastName": this.nextofkinlastname, 
              "lastUpdateDate": date,
              "userid" : this.jbpmuserid
           }
           console.log('Step 2: Attempting to run UpdateNextOfKIn... Hold on Folks, we are about to go on a ride');
           this.UpdateNextofkin(nextofkin,this.jbpmuserid);
         }
      );
    }

    UpdateNextofkin(body,id) {
      this.mersetaservice.updateNextofkin(body,id)
      .subscribe(
         response => {
          console.log('Step 3: Sequencing successfull. Update Next of kin has officially been ran... Standby');
           console.log(response);

           var isworkbased = 0;
           var isemplayerform = 0;

           if(this.checkedemployment == "Yes") {
             isemplayerform = 1;
           }else if(this.checkedemployment == "No") {
             isemplayerform = 0;
           }

           if(this.checkedagreement ==  "Yes")  {
             isworkbased = 0;
           }else if (this.checkedagreement ==  "No"){
             isworkbased = 1;
           }
           var istved = 0;

           if(this.checkedtvetqual = "Yes") {
             istved = 1;
           }else if(this.checkedtvetqual = "No"){
             istved = 0;
           }
           console.log('Creating a date');
           var date = new Date();
           console.log(date)
           console.log('date has officially been created')

           console.log('Step 4: 30 Aug 2022 - I dont think we are reaching this point')
           var learningprogdata = {
            "createDate": date,
            "userId": this.jbpmuserid,
            "contractOfEmploymentCopy": 0,
            "employedByEmployerBefore": isemplayerform,
            "workplaceBasedBefore": isworkbased,
            "highestEducationEnum": this.selectedqualificationlevel.id,
            "lastUpdateDate": "2022-07-28T22:07:11.798Z",
            "lastSchoolYear": this.quallastschooldateyear,
            "previousSchools": this.selectedschoolatended.id,
            "tvetFetQualificationId": this.selectedtvet,
            "employmentStatus": 0,
            "tvetLecturer": istved
           }
           console.log('Step 5: 16 Sep 2022 - I dreamt that I could code in Four Dimensions...Running the function AddCompanyLearner, which should create a learner');
           this.AddCompanyLeaner(learningprogdata);
         }
      );
    }

    AddCompanyLeaner(body) {
      console.log('Begin');
      this.mersetaservice.AddcompanyLearner(body)
      .subscribe(
         response => {
            console.log('Assuming the learner has been created, the company Learner ID should be: ');
           this.jbpmcompanylearnerid = response;
           console.log(response);
         }
      );
      console.log('End');
    }

    UpdateLeanercontract(body,id) {
      this.mersetaservice.updatecontract(body,id)
      .subscribe(
         response => {
           console.log(response);
         }
      );
    }

    AddCompany(body) {
      this.mersetaservice.AddCompany(body)
      .subscribe(
         response => {
           this.jbpmcompanyid = response;

           var date = new Date();

           var varuserdata = {
             "cellNumber": this.personcellnumber.toString(),
             "createDate": date,
             "email": this.personemail,
             "faxNumber": this.persontaxnumber.toString(),
             "firstName": this.personname,
             "lastName": this.personlastname,
             "passportNumber": "",
             "registrationDate": date,
             "rsaIdNumber": '133784672897983',
             "password": "abcder",
             "username": "defualt",
             "middleName": this.midname,
             "titleId": 1,
             "nationalityId": 1,
             "genderId":  1,
             "equityId": 1,

           };
          this.AddContactPerson(varuserdata);
           console.log(varuserdata);
           console.log(response);
         }
      );
    }

    AddContactPerson(body) {
      this.mersetaservice.AddPerson(body)
      .subscribe(
         response => {
           this.jbpmsdfcompanyid = response;
           var date = new Date();

           var sdfdata = {
              "createDate": "2022-07-29T00:38:23.299Z",
              "companyId": this.jbpmcompanyid,
              "sdfId": this.jbpmsdfcompanyid,
              "sdfTypeId": 1
            };

           console.log(response);
         this.AddSdfcompanyPerson(sdfdata);
         }
      );
    }

    AddSdfcompanyPerson(body) {
      this.mersetaservice.AddSdfCompany(body)
      .subscribe(
         response => {
           var sdfid = response;
           var date = new Date();
           var addressdata = {
              "addressLine1": this.eAddress,
              "addressLine2": this.eAddress1,
              "addressLine3": this.eAddress2,
              "createDate": date,
              "municipalityId": this.selectedeHomeMuni,
              "companyId": this.jbpmcompanyid,
              "townId": this.selectedeHomeTown,
              "postcode":  this.ePostalcode,
              "statsSaareaCodeId": this.selectedphysical,
              "sameAddress": 0
           };
           var addid = this.AddCompanyPhysicalAddress(addressdata)

           console.log(response);
         }
      );
    }

    AddCompanyPhysicalAddress(body) {
      this.mersetaservice.AddAddress(body)
      .subscribe(
         response => {
           this.jbpmcompanyaddpostaladdressid = response;

           var date = new Date();
           var addressdata = {
              "addressLine1": this.epAddress,
              "addressLine2": this.epAddress1,
              "addressLine3": this.epAddress2,
              "createDate": date,
              "municipalityId": this.selectedepHomeMuni,
              "companyId": this.jbpmcompanyid,
              "townId": this.selectedepHomeTown,
              "postcode":  this.epPostalcode,
              "statsSaareaCodeId": this.selectedphysicalpostal,
              "sameAddress": 0
           };
           var addid = this.AddCompanyPostaladdress(addressdata)

           console.log(response);
         }
      );
    }


    AddCompanyPostaladdress(body) {
      this.mersetaservice.AddAddress(body)
      .subscribe(
         response => {
           this.jbpmcompanyaddhomeressid = response;
           console.log(response);
           var date = new Date();
           var updateuaddress = {
              "residentialAddressId": this.jbpmcompanyaddpostaladdressid,
              "postalAddressId": this.jbpmcompanyaddhomeressid
           };
           this.UPCompanyAddress(updateuaddress,this.jbpmcompanyid);
           console.log(response);
         }
      );
    }

    UPCompanyAddress(body,id) {
      this.mersetaservice.updatecompanyaddress(body,id)
      .subscribe(
         response => {
          console.log(response);
         }
      );
    }


    UpDateProvider(body,id) {
      this.mersetaservice.updateEmployer(body,id)
      .subscribe(
         response => {
          console.log(response);
         }
      );
    }


    UpDateCompanylearner(body,id) {
      this.mersetaservice.updatecompanyleaner(body,id)
      .subscribe(
         response => {
          console.log(response);
          err => {
            if (err.status == 400){
              	//alert('Please make sure you have entered all the dates correctly');
                  this.messageService.add({severity:'error', summary: 'error', detail: 'Please make sure you have entered all the dates correctly'});
                  setTimeout(() => {
                    console.log('sleep');
                    this.messageService.clear();
                  }, 4000);
            }
          }
         }
      );
    }



  /////// ONCHANGE FUNCTION//////////////////////
  ///////////////////////////////////////
  
  onChange(): void {
    console.log("country : ", this.selectDropdownOptionsNationality)
    console.log("Country Description: " , this.selectDropdownOptionsNationality.description )
    this.nationvalue = Number(this.selectDropdownOptionsNationality.id);
    this.showCheck = 1;
  }
  onChangeSeta(): void {
    console.log("Seta funded : ", this.selectuserSETAFunding)
  }

  //Function that rnus when the Title is changed
  onChangeTittle(): void {
    console.log("utittle : ", this.selectuserTittle)
  }

  //Function that runs when the gender is changed
  onChangegender(): void {
    console.log("gennder : ", this.selectedgender)
    console.log(this.selectedgender)
  }

  //Function that runs when race is changed
  onChangeequity(): void {
    console.log("equity : ", this.selectedequity)
   // this.nationvalue = this.selectedequity;
  }

  //Function that runs when disability type is selected
  onChangedisabilitytype(): void {
    console.log("disability type : ", this.selecteddisabilitytype)
   // this.nationvalue = this.selectDropdownOptionsNationality;
  }

  //Function that runs when disability levels are selected
  onChangedisabilitylevel(): void {
    console.log("diability level : ", this.selecteddisabilitylevel)
  //  this.nationvalue = this.selectDropdownOptionsNationality;
  }

  //Functino that runs when Language is changed
  onChangedLanguage(): void {
    console.log('STEP BETA: THE AFTERMATH, JASON. THE AFTERMATH IS', this.langlook);
    console.log("Language : ", this.selectedlanguage)
    if (Number(this.selectedlanguage) == 4){
      this.languageCheck = 1;
    } else{
      this.languageCheck = 0;
    }
  }

  //A Function that runs when the last school attended dropdown is changed
  onChangeSelectedschoolatended(): void{ 
    if (Number(this.selectedschoolatended )== 26389) 
    { 
      this.isHighestQualificationview = 'visible';
      this.uploaderHighestQualification = 0;
    }
    else
    {
      this.isHighestQualificationview = 'hidden';
      this.uploaderHighestQualification = 1;
    }
    
    this.selectedschoolatendedNumber = Number(this.selectedschoolatended.id);
   
 } 
 notAvailableData(){
  
if(!this.levynumber && this.employername !="")
{
 if(this.empRegisteredAt==""  || this.locationcheck == 1 || this.empfaxnumber =="" || this.compSiteCheck == 1 || this.physicaladdresscheck == 1 || this.statscheck == 1 || this.physicaladdresscheck == 1 || this.postaladdresscheck == 1 )
 
 {
  this.notAvailabeMessage !="Are Not Available";
 }else
 {
  this.notAvailabeMessage !="";
 }

}

 }

 //Function that runs when ID/PassportDocument is Changed
 onChangeIdorPassportDocument(): void{
  if ((Number(this.selectDropdownOptionsNationality) == 1))
    {
     this.IdorPassportDocument = "Passport Document";
    } else
   {
   this.IdorPassportDocument = "ID Document "; 
 }

}
  
 //Function that runs when marital status is changed
 onChangeBirthDay(): void {
  
  this.personalBirthday = this.personalBirthdayDisplay;
  console.log("personalBirthday : ", this.personalBirthdayDisplay.toISOString());
  var out = new Date(this.personalBirthdayDisplay.getUTCFullYear(), this.personalBirthdayDisplay.getUTCMonth(), this.personalBirthdayDisplay.getUTCDate());
  var test = new Date();
  console.log(out.toLocaleDateString());
  console.log(out.toLocaleDateString().substring((out.toLocaleDateString().indexOf( "/" ) + 1),(out.toLocaleDateString().indexOf( "/" ) + 3)));
  console.log(test.toLocaleDateString);
  this.datebirth = this.personalBirthdayDisplay.toISOString();
  console.log("Date Of Birth : ", this.personalBirthday.toISOString());

  console.log('Getting Age')
  console.log(this.today.toString().substring(11,15)) ;
  console.log(this.personalBirthday.toString().substring(11,15));
  var temp: number;
  temp = (Number(this.today.toString().substring(11,15)) - Number(this.personalBirthdayDisplay.toString().substring(11,15)));
  console.log('Age Is: ', temp);
  this.age = temp;
  
}

  onChangeMaritalStatus(): void {
    console.log("MaritalStatus : ", this.selectuserMaritalStatus);
    this.statusInt = Number(this.selectuserMaritalStatus)
    if (Number(this.selectuserMaritalStatus)== 1){
      //this.uploaderProofOfMarriage = 1;
      this.uploaderProofOfDivorce = 0;
    }else if (Number(this.selectuserMaritalStatus)== 5){
      this.uploaderProofOfMarriage = 0;
      //this.uploaderProofOfDivorce = 1;
    } else{
      this.uploaderProofOfMarriage = 0;
      this.uploaderProofOfDivorce = 0;
    }
    console.log("personalBirthday : ", this.personalBirthday.toISOString());
    this.datebirth = this.personalBirthday.toISOString();
    console.log("Date Of Birth : ", this.personalBirthday.toISOString());
    
    var temp = (Number(this.today.toString().substring(11,15)) - Number(this.personalBirthday.toString().substring(11,15)));
    if(Number(temp) < 18 )
    {
      if((Number(this.selectuserMaritalStatus) == 1) && (temp < 18))
      {
        this.guardianorkinChecker = 1;
        this.guardianorkin = "Next of kin"; 
        this.guardianorkin_visible = "display: block;";
      }  
      if((Number(this.selectuserMaritalStatus) != 1) && (temp < 18))
      {
        this.guardianorkinChecker = 1;
        this.guardianorkin = "Guardian";
        this.guardianorkin_visible = "display: block;";
      }
    }
    else if(Number(temp) > 17 )
    {
      if((Number(this.selectuserMaritalStatus) == 1) && (temp > 17))
      {
        this.guardianorkinChecker = 1;
        this.guardianorkin = "Next of kin"; 
        this.guardianorkin_visible = "display: block;";
      }      
      if(Number(this.selectuserMaritalStatus) > 1 && (temp > 17))
      {
       console.log('Nothing');
       this.guardianorkinChecker = 0;
       this.guardianorkin =  "";
       this.guardianorkin_visible = "display: none;";
      }
    }
  }

  onChanges(): void {
    console.log("Program : ", this.selectedLearningprogram)
    this.selectedlearnership = this.selectedLearningprogram;
    this.Showvalue();
  }

  //age calculate
  public CalculateAge(): void {
    
    if (this.personalBirthday) {
      var timeDiff = Math.abs(Date.now() - new Date(this.personalBirthday).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }
  public enableDOBandMale(): void {
  
    this.DisableDOBandMale =false;
  }
  //HLALE NOTES: Come back and see about the whole language situation
  modifycheckedhomelangauge(): void {
    console.log("home : ", this.checkedhomelangauge)
  }
  modifycheckedread(): void {
    console.log("read : ", this.checkedread)
  }
  modifycheckedwrite(): void {
    console.log("write : ", this.checkedwrite)
  }
  modifycheckedspeak(): void {
    console.log("speak : ", this.checkedspeak)
  }

  onChangedCheckedDisbility(): void {
   // console.log("Disability  : ", value)
    console.log("Checked Disability  : ",  this.checkeddisability)
    if(this.checkeddisability == "Yes"){
        this.isdisableview = "visible";
    }else {
        this.isdisableview = "hidden";
    }
  }

  onChangedAddress(): void {
    if (this.HomeAddressOption == 'Home')
    {

      this.filteredMunicipality1 = [];
    for(let o of this.ptempmunicipalities){
      if((this.selectedPronvince == o.provincesIdprovinces)) {
        if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality1.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ) this.filteredMunicipality1.push(o);
      }
    }

    this.filteredDistrict1 = [];
    for(let o of this.ptempdistricts){
      if(this.selectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1') this.filteredDistrict1.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '3') this.filteredDistrict1.push(o);
      }
    }
      
    this.Postal = this.Address;
    this.Postal1 = this.Address1;
    this.Postal2 = this.Address2;
    this.pPostalcode = this.Postalcode;
    this.pselectedstathome = this.selectedstathome;
    this.tempPstatsCode = this.tempstatsCode;
    this.pselectedPronvince = this.selectedPronvince;
    this.pselectedHomeMuni = this.selectedHomeMuni;
    this.pselectedhomeDestrict = this.selectedhomeDestrict;
    this.pselectedHomeTown = this.selectedHomeTown;

  } else if (this.HomeAddressOption == 'Postal'){
      this.Postal = '';
      this.Postal1 = '';
      this.Postal2 = '';
      this.pPostalcode = '';
      this.pselectedstathome = '';
      this.tempPstatsCode = '';
      this.pselectedPronvince = '';
      this.pselectedHomeMuni = '';
      this.pselectedhomeDestrict = '';
      this.pselectedHomeTown = '';
    }
    else{}
    this.submitPostalAdrressHome();
   }

   onChangedAddressPhysical(): void {
    if (this.HomeAddressOption2 == 'Home')
    {
      this.epAddress = this.eAddress;
      this.epAddress2 = this.eAddress2;
      this.epAddress1 = this.eAddress1;
      this.epPostalcode = this.ePostalcode;
      this.selectedphysicalpostal =this.selectedphysical;
      this.selectedepPronvince = this.selectedePronvince;
      this.selectedepdistrict = this.selectededistrict;
      this.selectedepHomeTown = this.selectedeHomeTown;
      this.selectedepHomeMuni =this.selectedeHomeMuni;
    } else if (this.HomeAddressOption2 == 'Postal'){
      this.epAddress = '';
      this.epAddress2 = '';
      this.epAddress1 = '';
      this.epPostalcode = '';
      this.selectedphysicalpostal ='';
      this.selectedepPronvince = '';
      this.selectedepdistrict = '';
      this.selectedepHomeTown = '';
      this.selectedepHomeMuni ='';
    }
    console.log(this.HomeAddressOption2);
   }

   onChangedAddressEmp(): void{
   
    //tempstats
    if (this.EmpAddressOption == 'Home'){
 
     this.filteredMunicipality = [];
     for(let o of this.tempmunicipalities){
       if(this.selectedePronvince == o.provincesIdprovinces) {
         if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality.push(o);
         if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ) this.filteredMunicipality.push(o);
       }
     }
 
     this.filteredDistrict = [];
     for(let o of this.tempdistricts){
       if(this.selectedePronvince == o.provincesIdprovinces) {
         if (o.idmunicipalitytype == '1' ) this.filteredDistrict.push(o);
         if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '3') this.filteredDistrict.push(o);
       }
     }
     if(this.levynumber == "") {
       this.messageService.clear();
      // this.messageService.add({severity:'info', summary: 'info', detail: 'You need to select an employer first , before you use this functionality'});
       this.messageService.add({ key: 'tst', severity: 'info', summary: 'info', detail: 'You need to select an employer first , before you use this functionality' });
       setTimeout(() => {
         console.log('sleep');
         this.messageService.clear();
       }, 3000);
       this.EmpAddressOption = null;
     }else {
       this.messageService.clear();
       this.Address = this.eAddress;
       this.Address1 = this.eAddress1;
       this.Address2 = this.eAddress2;
       this.Postalcode = this.ePostalcode;
       this.selectedPronvince = this.selectedePronvince;
       this.selectedHomeMuni = this.selectedeHomeMuni;
       this.selectedhomeDestrict = this.selectededistrict;
       this.selectedHomeTown = this.selectedeHomeTown;
       this.selectedstathome = this.tempstats1.id;
     //  this.submitPostalAdrressHome();
     }
 
    }else if (this.EmpAddressOption == 'Postal'){
    this.Address = '';
     this.Address1 = '';
     this.Address2 = '';
     this.Postalcode = '';
     this.selectedPronvince = '';
     this.selectedHomeMuni = '';
     this.selectedhomeDestrict = '';
     this.selectedHomeTown = '';
    }
   }

   onChangedCompanyEmail(): void {

    if (this.CompanyEmailOption == 'CompanyEmail'){
      if(this.levynumber == "") {
        this.messageService.clear();
        //this.messageService.add({severity:'info', summary: 'info', detail: 'You need to select an employer first , before you use this functionality'});
        this.messageService.add({ key: 'tst', severity: 'info', summary: 'info', detail: 'You need to select an employer first , before you use this functionality' });
        setTimeout(() => {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
        this.CompanyEmailOption = null;
      }else{
        this.primeemail = this.emptemail;
    }
    }else
    {
      console.log(this.primeemail2);
        //this.primeemail = this.primeemail2;
        console.log('Nothing');
    }
    
   }

   onChangedUrbanRural(): void {
    console.log(this.UrbanRuralOption);
    
   }

   onChangedResidentialStatus(): void {
    console.log(this.selectDropdownOptionsResidentialStatus);
    
   }

   onChangedIDType(): void {
    console.log(this.selectDropdownOptionsIDType);
    
   }

   onChangedHostEmail(): void {
    if (this.CompanyEmailOption == 'HostEmail'){
      this.primeemail = this.emptemail;
    }
    }

  modifyEmployed(): void {
     console.log("employed  : ",  this.checkedemployment);
  }
  modifyagreement(): void {
    console.log("agreement  : ",  this.checkedagreement);
  }
  modifycheckedtvetqual(): void {
    console.log("tvet  : ",  this.checkedtvetqual);
  }

  
  modifyqualificationlevel(): void {
    console.log("qual  : ",  this.selectedqualificationlevel);
    if (Number(this.selectedqualificationlevel.id) >= 0){
      this.qualificaitofinalCheck = 1;
    } else{
      this.qualificaitofinalCheck = 0;
    }
    
  }
  modifylastschoolattended(): void {
    console.log("school  : ",  this.selectedschoolatended); //26389
    if (Number(this.selectedschoolatended.id) == 26392){
      this.otherschoolCheck = 1;
    } else{
      this.otherschoolCheck = 0;
    }

    if (Number(this.selectedschoolatended.id) == 26389){
      this.highestQualCheck = 1;
      this.uploaderHighestQualification = 1;
    } else{
      this.highestQualCheck = 0;
      this.uploaderHighestQualification = 0;
    }
  }

  modifyTvetqual(): void {
    console.log("tvet  : ",  this.selectedtvet);
  }
  modifyOfocode(): void {
    console.log("ofo  : ",  this.selectedofo);
  }

  // home address
  onChangedhomeStats(): void {
    console.log("stats home  : ",  this.selectedstathome);
  }
  onChangedhomeMuni(): void {
    console.log("Home Muni  : ",  this.selectedHomeMuni);
  }
  onChangedhomeDistrict(): void {
    console.log("Home district  : ",  this.selectedhomeDestrict);

    this.filteredMunicipality = [];
    for(let o of this.tempmunicipalities){
      if(this.selectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ){
          if (o.iddistrict == this.selectedhomeDestrict)
          this.filteredMunicipality.push(o);
        } 
      }
    }
  }
  onChangedhomeTown(): void {
    console.log("Home town  : ",  this.selectedHomeTown);
    if (Number(this.selectedlanguage) == 4){
      this.learnerqualificationTownCheck = 1;
    } else{
      this.learnerqualificationTownCheck = 0;
    }
  }

  onChangedhomeProvince(): void {
    console.log("home province  : ",  this.selectedPronvince);


    this.filteredMunicipality = [];
    for(let o of this.tempmunicipalities){
      if(this.selectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ) this.filteredMunicipality.push(o);
      }
    }

    this.filteredDistrict = [];
    for(let o of this.tempdistricts){
      if(this.selectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1' ) this.filteredDistrict.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '3') this.filteredDistrict.push(o);
      }
    }
  }

  //postal address
  onChangedpostalStats(): void {
    console.log("stats p home  : ",  this.selectedstatpostal);
  }
  onChangedpostalMuni(): void {
    console.log("Home p Muni  : ",  this.selectedpostalMuni);
  }
  onChangedpostalDistrict(): void {
    console.log("Home p district  : ",  this.pselectedhomeDestrict);

    this.filteredMunicipality1 = [];
    for(let o of this.ptempmunicipalities){
      if(this.pselectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ){
          if (o.iddistrict == this.pselectedhomeDestrict)
          this.filteredMunicipality1.push(o);
        } 
      }
    }
  }
  onChangedpostalTown(): void {
    console.log("Home p town  : ",  this.selectedpostalTown);
  }
  
  onChangedpostalProvince(): void {
    console.log("home p province  : ",  this.pselectedPronvince);
    this.filteredMunicipality1 = [];
    for(let o of this.ptempmunicipalities){
      if((this.pselectedPronvince == o.provincesIdprovinces)) {
        if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality1.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ) this.filteredMunicipality1.push(o);
      }
    }

    this.filteredDistrict1 = [];
    for(let o of this.ptempdistricts){
      if(this.pselectedPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1') this.filteredDistrict1.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '3') this.filteredDistrict1.push(o);
      }
    }
  }
  /// postal code

  modifyEmployment(): void {
    console.log("employed  : ",  this.checkedEmployment);
  }
  modifyContractofEmploymen(): void {
    console.log("contract  : ",  this.checkedeContractofEmploymen);
  }
  modifycopyofcontract(): void {
    console.log("copy of contract  : ",  this.checkecopyofcontract);
  }

  
  onChangeOrganization(): void {
    console.log("org type  : ",  this.selectedorganization);
    if (this.selectedorganization == null){
      this.organisationChange = 1;
    } else {
      this.organisationChange = 0;
    }
  }
  onChangePersontittle(): void {
    console.log("ptittle  : ",  this.persontitle);
  }


  // Phyical address
  onChangedPhyicalStats(): void {
    console.log("Phyical stats home  : ",  this.selectedphysical);
  }
  onChangedPhyicalMuni(): void {
    console.log("Phyical Home Muni  : ",  this.selectedeHomeMuni);
  }
  onChangedPhyicalDistrict(): void {
    console.log("Phyical Home district  : ",  this.selectededistrict);
  }
  onChangedPhyicalTown(): void {
    console.log("Phyical Home town  : ",  this.selectedeHomeTown);
  }
  onChangedPhyicalProvince(): void {
    console.log("Phyical home province  : ",  this.selectedePronvince);
    this.filteredMunicipality2 = [];
    for(let o of this.physicaltempmunicipalities){
      if(this.selectedePronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality2.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '2' ) this.filteredMunicipality2.push(o);
      }
    }

    this.filteredDistrict2 = [];
    for(let o of this.physicaltempdistricts){
      if(this.selectedePronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1') this.filteredDistrict2.push(o);
        if (o.idmunicipalitytype == '1' || o.idmunicipalitytype == '3') this.filteredDistrict2.push(o);
      }
    }
  }

  // Phyical Post address
  onChangedPhyicalposStats(): void {
    console.log("Phyical post stats home  : ",  this.selectedphysicalpostal);
  }
  onChangedPhyicalposMuni(): void {
    console.log("Phyical post Home Muni  : ",  this.selectedepHomeMuni);
  }
  onChangedPhyicalposDistrict(): void {
    console.log("Phyical post Home district  : ",  this.selectedepdistrict);
  }
  onChangedPhyicalposTown(): void {
    console.log("Phyical post Home town  : ",  this.selectedepHomeTown);
  }
   onChangedPhyicalposProvince(): void {
    console.log("Phyical post home province  : ",  this.selectedepPronvince);
    this.filteredMunicipality3 = [];
    for(let o of this.empostaltempmunicipalities){
      if(this.selectedepPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '2' || o.idmunicipalitytype == '3') this.filteredMunicipality3.push(o);
      }
    }

    this.filteredDistrict3 = [];
    for(let o of this.empostaltempdistricts){
      if(this.selectedepPronvince == o.provincesIdprovinces) {
        if (o.idmunicipalitytype == '1') this.filteredDistrict3.push(o);
      }
    }
  }

  onChangedSETAAT(): void {
    console.log("registered at  : ",  this.lregistereat);
  }
  onChangedAccredStatus(): void {
    console.log("selectedAccstatus  : ",  this.selectedAccstatus);
  }
  onChangedAccredtype(): void {
    console.log("selectedAcctype  : ",  this.selectedAcctype);
  }

  //THis is the function that runs when a user selects a learning program type -- Currently, there is only one Learning Program (Learnership)
  onChangedProgram(): void {
    console.log("porgram  : ",  this.selectedprogramtype);
    if (this.selectedprogramtype.description == 'Learnership'){
      this.changedProgramTest = 'Show';
      this.showDialog();
    }
  }
  onChangedPivotal(): void {
    console.log("pivotal  : ",  this.selectedpivnon);
  }
  onChangedLearning(): void {
    console.log("Learnig program  : ",  this.selectedlearnership);
    console.log(this.selectedlearnership);
    //this.learnership.ofoCode == null
    var ofoCode = this.learnership.find(x=>x.qualificationId == this.selectedlearnership.qualificationId).ofoCode;
    console.log('OFO Code is' , ofoCode)
    if (ofoCode == ""){
      this.ofoChange = 1;
    } else {
      this.ofoChange = 0;
    }
    this.Showvalue();
  }

  modifyNqlaligned(): void {
    console.log("Nqf  : ",  this.checkednqlaligned);
  }
  modifyfunded(): void {
    console.log("Funded  : ",  this.checkedfunded);
  }
  ////////////////////////////////////////////////
  /////////////////////////////// END CHANGE //////////////////
  ///////////////////////////////////////////////////////

  
  // = this.langlook.indexOf(this.selectedlanguage)
  public Addlanguage() { 
    if((this.checkedread == false) && (this.checkedspeak == false) && (this.checkedwrite == false) && (this.checkedhomelangauge == false)){
      this.messageService.add({key: 'tc1', severity:'error', summary: 'Error', detail: 'Please Select At Least One Of The Language Options'});
      setTimeout(() => {
            console.log('sleep');
            this.messageService.clear();
          }, 4000);
    }
    else{
      var lang = this.langlook.filter(x => x.id == this.selectedlanguage)[0];
      console.log("Which language is seelected")
    console.log(lang.description);

    //this.Deletelanguage(lang.description);

    let obj = this.langauges.find(o => o.name === lang.description);
    //console.log("obj: "+obj);

      let homeLang:any=0;
      let readLang:any=0;
      let writeLang:any=0;
      let speakLang:any=0;
 

      for(let i=0; i < this.langauges.length; i++){
        console.log('Attempting to post Language');
        console.log('To :-'+this.jbpmuserid+'');
        //Popuklating object to be sent to language API
        if ((this.checkedhomelangauge)== true ) homeLang = 1; else homeLang = 0;
        if ((this.checkedread) == true ) readLang = 1; else readLang = 0;
        if ((this.checkedwrite) == true ) writeLang = 1; else writeLang = 0;
        if ((this.checkedspeak)  == true  ) speakLang = 1; else speakLang = 0;
       
      }
      this.langtoadd = new Language();
      this.langtoadd.setname(lang.description);
      this.langtoadd.sethomelanguage(this.checkedhomelangauge);
      this.langtoadd.setread(this.checkedread) ;
      this.langtoadd.setspeak(this.checkedspeak);
      this.langtoadd.setwrite(this.checkedwrite);
      this.langauges.push(this.langtoadd);
      console.log("The language properties of langueges");
      console.log(this.langauges);
      console.log("There are :- " +this.langauges.length+" (Languages) added Now" );
      console.log("The language properties of body");
      this.langCheck = 1;
      this.ClearLanguages();
      //this.langCheck = true
    }

  }
 public AddLanguages() {
    var count = 0;

    this.langauges.forEach(obj => {

      var homeLang;
      var readLang;
      var writeLang;
      var speakLang;
      console.log('Attempting to post Language');
      //Popuklating object to be sent to language API
      if (obj.homelanguage == true) homeLang = 1; else homeLang = 0;
      if (obj.read == true) readLang = 1; else readLang = 0;
      if (obj.write == true) writeLang = 1; else writeLang = 0;
      if (obj.speak == true) speakLang = 1; else speakLang = 0;
      count++;
      console.log("They are " +count+" added Now" );
      console.log("Sending an arroy of language objects ");
      console.log("Object is  ", obj);
      

      var lang = this.langlook.filter(x => x.description == obj.name)[0];

      console.log("Language is  ", lang);

      var bodyLang =
      {"createDate": "2022-10-05T08:56:00.844Z",
       "homeLanguage": homeLang,
       "languageId": lang.id,
       "readId": readLang,
       "spearkId": speakLang,
       "userId": this.jbpmuserid,
       "writeId": writeLang
      }

      this.adduserlanguages(bodyLang);
        
    });

  }

  adduserlanguages(object) {
    this.mersetaservice.AddLanguage(object)
    .subscribe(
       response => {
        console.log('Language Post Start');
         console.log(response);
         console.log('Language Post End');
       }
    );
  }



  public ClearLanguages()
  {
    this.checkedhomelangauge = false;
    this.checkedread = false;
    this.checkedwrite = false;
    this.checkedspeak = false;  
  }
  public Deletelanguage(name)
  {
    console.log("Selected language: " + name);
    //console.log(this.langauges);

    this.langauges.forEach((value,index)=>{
      //console.log("language: " + name);
      if(value.name==name) this.langauges.splice(index,1);
      
  });

  }
  getLanguageCount(character) {
    return this.langauges.filter(obj => obj.name === character).length;
  }

  Showvalue() {
    var learn =  this.learnership.filter(x => x.id == this.selectedlearnership.qualificationId)[0];
    this.getSaqa(this.selectedlearnership.qualificationId);
    //this.getSaqa(learn.qualificationId);
  }

    /// JBPM API CALLS ////
    /// START  /////
    /// /////////////////////////
    getProcessID(id)  {
        this.mersetaservice.StartProcessInstrance(id)
        .subscribe(
           response => {
             this.proccessID = response;
             this.sharedService.setGlobalVar(this.proccessID);
             this.getWorkItem(this.proccessID);
             console.log("Process id = " + this.proccessID)
             if(this.sharedService.PROCESS_ID == null || "") {
              this.isDisabled = false;
            }else {
                this.isDisabled = true;
                this.isapplicationstarted = true;
                console.log("id = " + this.sharedService.PROCESS_ID)
            }
             //console.log(response)
           }
        );
       // return this.sharedService.PROCESS_ID;
      }


      getTaskId(id)  {
        this.mersetaservice.getTaskID(id)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);

           }
        );
      }

      StartTask(id,object)  {
        this.mersetaservice.startTasks(id)
        .subscribe(
           response => {
            // this.proccessID = response;
             console.log(response)
             console.log("Start Task Response = " + response);
             this.CompleTask(this.task.task_id,object);
           }
        );
      }

     /* CompleTask(id,body)  {
        this.mersetaservice.completeTasks(id,body)
        .subscribe(
           response => {
            // this.proccessID = response;
             console.log(response)CalculateAge
             console.log("Complete Task Response = " + response);
             this.getNextTask();
           }
        );
      } */

       /// END JBPM ////
    /// END  /////
    /// /////////////////////////


    //// BUTTON CLICKS ///
    //////////////////////////////////
    ////////////////////////////////
    

    private onKeySubmitID() {
      clearTimeout(this.timeout);
      var $this = this;
      if (this.Identificationid.length == 13)  {
        this.timeout = setTimeout(function () {
          $this.submitdetails();
      }, 500);
      }
    }
    public submitdetails() {

      if ((Number(this.selectDropdownOptionsNationality.id) != 1) && (this.showCheck == 1))
      {

        if(!this.selectDropdownOptionsResidentialStatus){
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Indicate Your Residential Status'});
        }
        else if(!this.selectDropdownOptionsIDType){
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Indicate Your ID Type'});
        }
        else if(!this.alternativeid || (this.alternativeid.length < 7)){
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid Alternative ID Number'});
        }
        else{
          console.log('Foreign National');
          this.disabledCheck = 1;
          this.GetLeanerDetailbyAlternativeID(this.alternativeid.toString());
          this.isDisabledNat = true;
          this.getLearnerDetails(this.alternativeid.toString());
        }


        
      }
      else{
      this.getDOB();

     if(this.Identificationid){
      if (!this.selectDropdownOptionsNationality){
        // alert('Please Select a Nationality');
         this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Select a Nationality'});
       }
       else{
         if (!this.Identificationid){
           //alert('Please Enter Your ID');
           this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter Your ID'});
         }
         else
         {
           if (this.Identificationid.toString().length != 13){
             //alert('ID Numbers are typically 13 Digits');
             this.messageService.add({key: 'tc1',severity:'error', summary: 'error', detail: 'SA ID Numbers are typically 13 Digits'});
           }
           else
           {
             this.getLearnerDetails(this.Identificationid.toString());
             var ddd = Number(this.Identificationid.substring(4,6));
             var mmm = Number(this.Identificationid.substring(2,4));
             if (ddd > 31){
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }
             else if (mmm < 1 && mmm > 12 ){
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }
             else if (this.Identificationid.substring(2,4) == '00'){
              this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }
             else if (this.Identificationid.substring(6,10) == '1111'){
               console.log(this.Identificationid.substring(6,10));
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }else if (this.Identificationid.substring(6,10) == '0000'){
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }
             else if (this.Identificationid.substring(4,6) == '00'){
  
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }else if (this.Identificationid.substring(6,9) == '4444'){
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             } else if (Number(this.Identificationid.substring(10,11)) > 1 ){
               this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
             }  
             else 
             {
               console.log('Getting DOB')
               this.getDOB();
               console.log('Getting Age')
               console.log(this.today.toString().substring(11,15)) ;
               console.log(this.personalBirthday.toString().substring(11,15));
               var temp: number;
               temp = (Number(this.today.toString().substring(11,15)) - Number(this.personalBirthday.toString().substring(11,15)));

               if(this.Identificationid.substring(0,1) == '1'|| (this.Identificationid.substring(0,1) == '2'))
               {
                 let newAge=this.age;
                // this.age = Math.floor(this.age/10);
                 this.age = temp;
                 console.log("Age between 2011 to 2022 is working. First d is "+this.age+"");
                 this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'You Must Be At Least 16 Years Of Age To Complete This Application. You will Now Be Redirected To The Dashboard '});
                 setTimeout(() => {
                   console.log('sleep');
                   this.router.navigate(['/main/dashboard'], {
                    skipLocationChange: true,
                  });
                   // And any other code that should run only after 5s
                 }, 4000);
               }
               console.log(temp);
               if(temp > 15){
                 this.onChangeMaritalStatus();
                 this.isDisabledNat = true;
                 /////// ADD AGE HERE ////
                 console.log("age : ", temp);
                 var fieldnae  = "Nationality"
                 var object = {};
                 object[fieldnae] = this.nationvalue ;
                 setTimeout(() => {
                  console.log('sleep');
                  this.isDisabledNat = false;
                  // And any other code that should run only after 5s
                }, 2000);
               } else{
                 this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'You Must Be At Least 16 Years Of Age To Complete This Application. You will Now Be Redirected To The Dashboard '});
                 setTimeout(() => {
                   console.log('sleep');
                   this.router.navigate(['/main/dashboard'], {
                    skipLocationChange: true,
                  });
                   // And any other code that should run only after 5s
                 }, 4000);
               }
               
             }
           }
         }
        }
     }else
     {  
      this.enableDOBandMale();
     }
     
    }

      }
    getLearnerDetails(id){
      this.mersetaservice.getLearnerByID(id)
      .subscribe(
        response => {
          this.tempLearner = response;
          console.log("Learner Details");
          console.log(response);
          if (this.tempLearner.id != 0){
            this.messageService.add({key: 'tc1',severity:'info', summary: 'Info', detail: 'This Learner Has Already Been Captured Before'});
            setTimeout(() => {
              console.log('Existing Learner Has Been Loaded');
            }, 4000);
            this.selectuserTittle = this.tempLearner.title;
            this.uname = this.tempLearner.firstName;
            this.surname = this.tempLearner.lastName;
            this.midname = this.tempLearner.middleName;
            this.maidenName = this.tempLearner.maidenName;
            this.cellnumber = this.tempLearner.cellNumber;
            this.telnumber = this.tempLearner.cellNumber;
            this.primeemail = this.tempLearner.primaryEmailAddress;
            this.secondemail = this.tempLearner.secondaryEmailAddress;
            this.selectedgender.id = this.tempLearner.gender;
            this.selectedequity = this.tempLearner.equity;
            this.selecteddisabilitytype = this.tempLearner.disability;
            this.jbpmcompanylearnerid = this.tempLearner.companyLearnerId;
            this.returningLearnerCheck = 1;
            if (response.acceptPopi == false) this.showDialog();
            this.alternativeid = response.alternativeIdNumber;
            this.selectDropdownOptionsIDType = response.alternativeIdType;
            this.selectedlearnership = response.learnershipId;
            this.quallastschooldateyear = new Date(response.lastSchoolYear);
            console.log(response.lastSchoolYear);
            console.log(this.quallastschooldateyear);
            this.jbpmuserid = response.id;
            console.log('Company Learner ID', this.jbpmcompanylearnerid)
          }err => {
            if (err.status == 405){
                this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Seems like The Server isnt allowing us to check'});
              	//alert('Seems like The Server isnt allowing us to check');
            }
            else if (err.status == 404){
                this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Seems like something went wrong. Please contact your SDF Provider or email us at: '});
          }
          else console.log(err);console.log(err);
          }
        }
      );
    }

    GetLeanerDetailbyAlternativeID(id){
      this.mersetaservice.getLearnerByAlternativeID(id)
        .subscribe(
          response => {
            this.tempLearner = response;
            console.log(" National Learner Details");
            console.log(response);
            if (this.tempLearner.id != 0){
              this.messageService.add({key: 'tc1',severity:'info', summary: 'Info', detail: 'The Captured learner Alternative ID already exist.'});
              setTimeout(() => {
                console.log('Existing Learner Has Been Loaded');
              }, 4000);
              this.selectuserTittle = this.tempLearner.title;
              this.uname = this.tempLearner.firstName;
              this.surname = this.tempLearner.lastName;
              this.midname = this.tempLearner.middleName;
              this.maidenName = this.tempLearner.maidenName;
              this.cellnumber = this.tempLearner.cellNumber;
              this.telnumber = this.tempLearner.cellNumber;
              this.primeemail = this.tempLearner.primaryEmailAddress;
              this.secondemail = this.tempLearner.secondaryEmailAddress;
              this.selectedgender.id = this.tempLearner.gender;
              this.selectedequity = this.tempLearner.equity;
              this.selecteddisabilitytype = this.tempLearner.disability;
              this.jbpmcompanylearnerid = this.tempLearner.companyLearnerId;
              this.returningLearnerCheck = 1;
              if (response.acceptPopi == false) this.showDialog();
              this.alternativeid = response.alternativeIdNumber;
              this.selectDropdownOptionsIDType = response.alternativeIdType;
              this.selectedlearnership = response.learnershipId;
              this.quallastschooldateyear = new Date(response.lastSchoolYear);
              console.log(response.lastSchoolYear);
              console.log(this.quallastschooldateyear);
              this.jbpmuserid = response.id;
              console.log('Company Learner ID', this.jbpmcompanylearnerid)
            }err => {
              if (err.status == 405){
                  this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Seems like The Server isnt allowing us to check'});
                  //alert('Seems like The Server isnt allowing us to check');
              }
              else if (err.status == 404){
                  this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Seems like something went wrong. Please contact your SDF Provider or email us at: '});
            }
            else console.log(err);console.log(err);
            }
            this.messageService.add({key: 'tc1',severity:'success', summary: 'Success', detail: 'Alternative ID Submitted'});
          }
        );
      }
  

    public StartRegistration() {
        this.getProcessID(this.experimentalDefID);
        //console.log("pr_id "+process_id);
        //var task_id = this.getWorkItem(this.getProcessID);

    }

    /////////
    getEhomeaddress(addessid){
      this.mersetaservice.getSingleUserAddress(addessid)
      .subscribe(
         response => {
           this.homeadd = response[0];
          this.getStats(response[0].statsSaareaCodeId);
           console.log(response);
           this.eMunicipality = response[0].municipalityId;
           this.selectedeHomeMuni = response[0].municipalityId;
           this.selectedeHomeTown = response[0].townId;
           this.eTown = response[0].townId;
         //  console.log(" : "+ this.homeadd.addressLine1);
          // console.log(" : "+ this.homeadd.addressLine2);
          if (response[0] == null) this.clearEPhysicalAddress(); else this.loadEPhysicalAddress();
         }
      );
    }

    getPostaldress(postaladdressid){
      this.mersetaservice.getSingleUserAddress(postaladdressid)
      .subscribe(
         response => {
           this.postaladd = response[0];
           this.getPStats(response[0].statsSaareaCodeId);
           console.log(response);
           this.selectedepHomeMuni = response[0].municipalityId;
           this.selectedepHomeTown = response[0].townId;
           if (response[0] == null) this.clearPostalAddress(); else this.loadPostalAddress();
           this.changeDetectorRef.detectChanges();
         }
      );
    }

    //Function that clears the employer's physical address
    clearEPhysicalAddress() {
      this.singletown =  this.towns.filter(x => x.id == this.homeadd.townId)[0];
      this.singlemunicipaliyty =  this.municipalities.filter(x => x.id == this.homeadd.municipalityId)[0];
      this.singleprovince =  this.provinces.filter(x => x.id == this.singlemunicipaliyty.provincesIdprovinces)[0];
      this.eAddress = '';
      this.eAddress1 = '';
      this.eAddress2 = '';
      console.log("Log Id : ", this.homeadd.addressLine3);
      if (this.homeadd.addressLine3  == ""){
        this.physicaladdresscheck = 1;
      } else {
        this.physicaladdresscheck = 0;
      }

      
      this.ePostalcode = '';
      this.eArea = '';
      this.ePronvince= '';
      this.selectedeHomeMuni = '';
      this.selectededistrict= '';
      this.selectedePronvince = '';
      this.selectedphysical = this.homeadd.statsSaareaCodeId;
      this.eMunicipality = '';
      this.eDistritrict = '';
      this.eTown = '';

    }

    //Function that clears the employer's postal address
    clearPostalAddress() {
      this.psingletown =  this.towns.filter(x => x.id == this.postaladd.townId)[0];
      this.psinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.postaladd.municipalityId)[0];
      this.psingleprovince =  this.provinces.filter(x => x.id == this.psinglemunicipaliyty.provincesIdprovinces)[0];

      this.epAddress = '';
      this.epAddress1 = '';
      this.epAddress1 = '';
      
      if (this.postaladd.addressLine3  == ""){
        this.postaladdresscheck = 1;
      } else {
        this.postaladdresscheck = 0;
      }
      if (this.postaladd.statsSaareaCodeId  == ""){
        this.locationcheck = 1;
      } else {
        this.locationcheck = 0;
      }
      this.epPostalcode = '';
      this.selectedphysicalpostal = '';
      this.selectedepPronvince = '';
      this.selectedepHomeMuni = '';
      this.selectedepdistrict = '';
      this.selectedepHomeTown = '';

    }

    //Function that loads the employer's physical address
    loadEPhysicalAddress() {
      this.singletown =  this.towns.filter(x => x.id == this.homeadd.townId)[0];
      this.singlemunicipaliyty =  this.municipalities.filter(x => x.id == this.homeadd.municipalityId)[0];
      this.singleprovince =  this.provinces.filter(x => x.id == this.singlemunicipaliyty.provincesIdprovinces)[0];
      this.eAddress = this.homeadd.addressLine1;
      this.eAddress1 = this.homeadd.addressLine2;
      this.eAddress2 = this.homeadd.addressLine3;
      console.log("Log Id : ", this.homeadd.addressLine3);

      if (this.homeadd.addressLine3  == ""){
        this.physicaladdresscheck = 1;
      } else {
        this.physicaladdresscheck = 0;
      }

      if (this.tempstats  == ""){
        this.statscheck = 1;
      } else {
        this.statscheck = 0;
      }

      
      this.ePostalcode = this.homeadd.postcode;
      this.eArea = this.homeadd.statsSaareaCodeId;
      this.ePronvince= this.singleprovince.provinceDesc;
      this.selectedeHomeMuni = this.singlemunicipaliyty.id;
      this.selectededistrict= this.singlemunicipaliyty.id;
      this.selectedePronvince = this.singlemunicipaliyty.provincesIdprovinces;
      this.selectedphysical = this.homeadd.statsSaareaCodeId;
      //this.eMunicipality = this.singlemunicipaliyty.municipalityDesc;
      this.eDistritrict = this.singlemunicipaliyty.code;
      //this.eTown = this.singletown.description;

    }

    //Function that loads the employer's postal address
    loadPostalAddress() {
      this.psingletown =  this.towns.filter(x => x.id == this.postaladd.townId)[0];
      this.psinglemunicipaliyty =  this.municipalities.filter(x => x.id == this.postaladd.municipalityId)[0];
      this.psingleprovince =  this.provinces.filter(x => x.id == this.psinglemunicipaliyty.provincesIdprovinces)[0];

      this.epAddress = this.postaladd.addressLine1;
      this.epAddress1 = this.postaladd.addressLine2;
      this.epAddress2 = this.postaladd.addressLine3;

      if (this.tempPstats  == ""){
        this.locationcheck = 1;
      } else {
        this.locationcheck = 0;
      }

      if (this.postaladd.addressLine3  == ""){
        this.postaladdresscheck = 1;
      } else {
        this.postaladdresscheck = 0;
      }
      this.epPostalcode = this.postaladd.postcode;
      this.selectedphysicalpostal = this.psingleprovince.provinceDesc;
      this.selectedepPronvince = this.psinglemunicipaliyty.provincesIdprovinces;
      this.selectedepHomeMuni = this.psinglemunicipaliyty.id;
      this.selectedepdistrict = this.psinglemunicipaliyty.id;
      //this.selectedepHomeTown = this.psingletown.description;

    }
  //

    public submitIdentification() {
        if (Number(this.selectDropdownOptionsNationality.id) == 1)
        { 
          var val = this.Identificationid;
        }else 
        {
          var val = this.alternativeid;
        }

        console.log("ID:" + val);
        var object = {};
          //
         if(this.task.task_name == "Capture ID number") {
          var fieldnae  = "ID"
          object[fieldnae] = val ;

         } else if (this.task.task_name == "Capture passport number") {
          var fieldnae  = "Passport"
          object[fieldnae] = val ;
         }
         console.log(this.task);

         //this.StartTaskIdentification(this.task.task_id,object);
         document.getElementById("Identif_html").innerHTML = this.idorpas;
         this.isDisabledIde = true;
         this.temid = " " + val;
         document.getElementById("appinfomation").innerHTML = " for " +  this.temid;
     
        }

      //Function that submits learner details
      public submitLeanerDetails (){ 

        if (!this.Identificationid && !this.alternativeid)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners ID Number'});
         // alert('Please Fill In The Learners ID Number'); 
        } 
        else if (!this.uname)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Name And Surname'});
          //alert('Please Fill In The Learners Name And Surname');
        } 
        else if (!this.surname )
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Name And Surname'});
          //alert('Please Fill In The Learners Name And Surname');
        } 
        else if (!this.selectuserTittle) 
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Title'});
          //alert('Please Fill In The Learners Title');
        } 
        else if (!this.cellnumber || !this.telnumber)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Both The Learners Cellphone And Telephone Details'});
          //alert('Please Fill In Both The Learners Cellphone And Telephone Details');
        }
        else if (!this.primeemail)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Primary Email'});
          //alert('Please Fill In The Learners Primary Email');
        } 
        
        else if (!this.selectuserMaritalStatus)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Marital Status'});
          //alert('Please Fill In The Learners Marital Status');
        }
        else if (!this.selectedgender)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Gender'});
          //alert('Please Fill In The Learners Gender');
        }
        else if (!this.selectedequity)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Equity/Race'});
          //alert('Please Fill In The Learners Equity/Race');
        }
        else if (!this.checkeddisability)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Whether Or Not The Learner Has A Disability'});
          //alert('Please Fill In Whether Or Not The Learner Has A Disability');
        }
        else if((this.checkeddisability == "Yes" && !this.selecteddisabilitytype) || (this.checkeddisability == "Yes" && !this.selecteddisabilitylevel)) {
           if (!this.selecteddisabilitytype)
          {
            this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Indicate The Learners Disability Type'});
            //alert('Please Fill In The Learners Postal Town');
          }else if(!this.selecteddisabilitylevel) {
            this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Indicate The Learners Disability Level'});
          }
        }
        else if (!this.UrbanRuralOption )
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Indicate If You Are From An Urban Or Rural Area'});
          //alert('Please Fill In The Learners Name And Surname');
        } 
        else if (this.langCheck != 1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter At Least One Language'});
          //alert('Please Fill In The Last School You Attended');
        }
        else if (Number(this.qualificaitofinalCheck) != 1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest Education Level'});
          //alert('Please Fill In The Learners Highest Qualification Level');
        }
        else if (!this.selectedschoolatended)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Last School You Attended'});
          //alert('Please Fill In The Last School You Attended');
        }
        else if (!this.quallastschooldateyear)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Last School Year Date'});
          //alert('Please Fill In The Learners Last School Year Date');
        }
        else if (!this.tvetfetqualification)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Highest TVET/FET Qualification'});
          //alert('Please Fill In The Learners Highest TVET/FET Qualification');
        }
        // else if (!this.selectedHomeTown1)
        // {
        //   this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Town You Got The Learners Highest Qualification From'});
        //   //alert('Please Fill In The Town You Got The Learners Highest Qualification From');
        // }
        else if (!this.Address)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Address1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learner Home Address'});
          //alert('Please Fill In The Learner Home Address');
        }
        else if (!this.Postalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Postal Code'});
          //alert('Please Fill In The Learners Home Postal Code');
        }
        else if (!this.selectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home STATSSAAreaCode And Location'});
          //alert('Please Fill In The Learners Home STATSSAAreaCode And Location');
        }
        else if (!this.selectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Province'});
          //alert('Please Fill In The Learners Home Province');
        }
        // else if (!this.selectedhomeDestrict)
        // {
        //   this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home District'});
        //   //alert('Please Fill In The Learners Home District');
        // }
        else if (!this.selectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Municipality'});
          //alert('Please Fill In The Learners Home Municipality');
        }
        else if (!this.selectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Home Town'});
          //alert('Please Fill In The Learners Home Town');
        }
        else if (!this.Postal)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.Postal1)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Address'});
          //alert('Please Fill In The Learners Postal Address');
        }
        else if (!this.pPostalcode)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In Your The Learners Postal Address Code'});
          //alert('Please Fill In Your The Learners Postal Address Code');
        }
        else if (!this.pselectedstathome)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal STATSSAAreaCode and Location'});
          //alert('Please Fill In The Learners Postal STATSSAAreaCode and Location');
        }
        else if (!this.pselectedPronvince)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Province'});
          //alert('Please Fill In The Learners Postal Province');
        }
        // else if (!this.pselectedhomeDestrict)
        // {
        //   this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal District'});
        //   //alert('Please Fill In The Learners Postal District');
        // }
        else if (!this.pselectedHomeMuni)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Municipality'});
          //alert('Please Fill In The Learners Postal Municipality');
        }
        else if (!this.pselectedHomeTown)
        {
          this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Fill In The Learners Postal Town'});
          //alert('Please Fill In The Learners Postal Town');
        }
       
        else
        {
          if (this.pPostalcode == null || this.Postalcode == null ||this.pPostalcode.toString().length != 4 || this.Postalcode.toString().length != 4){
            this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Postal Codes are typically 4 digits'});
            //alert('Postal Codes are typically 4 digits');
    
          } else if(this.selectedschoolatended != null){
            var name = this.uname;
            var surname = this.surname;
            var cellnumber = this.cellnumber;
            var telnumber = this.telnumber;
            var primaryemail = this.primeemail;
            var secondayemail = this.secondemail;
            var dateofbirth = this.personalBirthday;
            var fieldnae  = "Name"
            var fieldnae1  = "Surname"
            var fieldnae2  = "Cell"
            var fieldnae3  = "Telephone"
            var fieldnae4  = "PrimaryEmail"
            var fieldnae5  = "SecondaryEmail"
            var fieldnae6  = "DateofBirth"
            var fieldnae7  = "Gender"
            var fieldnae8  = "Equity"
            var fieldnae9  = "Disability"
            var fieldnae10  = "DisabilityType"
            var fieldnae11  = "Title"

            if(this.checkeddisability == "Yes"){
              this.selectedisability = "1";
            }else {
                 this.selectedisability = "1";
             }
             var urbanrural = 1;

             if(this.UrbanRuralOption == "Urban") {
               urbanrural = 3;
             }else if(this.UrbanRuralOption == "Rural") {
              urbanrural = 2;
             }

            var date = new Date();
            var varuserdata;
    
    
            if (this.checkeddisability == "No"){
              if (Number(this.selectDropdownOptionsNationality.id) == 1)
              {
                varuserdata = {
                  "cellNumber": this.cellnumber.toString(),
                  "createDate": date,
                  "dateOfBirth":  this.personalBirthday,
                  "email":  this.primeemail,
                  "faxNumber": this.cellnumber.toString(),
                  "firstName": this.uname,
                  "lastName": this.surname,
                  "passportNumber": "",
                  "registrationDate": date,
                  "rsaIdNumber": this.Identificationid.toString(),
                  "password": "abcder",
                  "username": "defualt",
                  "middleName": this.midname,
                  "maidenName": this.maidenName,
                  "titleId": this.selectuserTittle,
                  "nationalityId": this.selectDropdownOptionsNationality.id,
                  "primaryEmailAddress": this.primeemail,
                  "secondaryEmailAddress": this.secondemail,
                  "disabledId": 2,
                  "genderId":   this.selectedgender.id,
                  "equityId": this.selectedequity.id,
                  "urbanRuralId": urbanrural
                };
              }
              else{
              varuserdata = {
                "cellNumber": this.cellnumber.toString(),
                "createDate": date,
                "dateOfBirth":  this.personalBirthday,
                "email":  this.primeemail,
                "faxNumber": this.cellnumber.toString(),
                "firstName": this.uname,
                "lastName": this.surname,
                "passportNumber": "",
                "registrationDate": date,
                "password": "abcder",
                "username": "defualt",
                "middleName": this.midname,
                "maidenName": this.maidenName,
                "titleId": this.selectuserTittle,
                "nationalityId": this.selectDropdownOptionsNationality.id,
                "primaryEmailAddress": this.primeemail,
                "secondaryEmailAddress": this.secondemail,
                "disabledId": 2,
                "genderId":   this.selectedgender.id,
                "equityId": this.selectedequity.id,
                "alternativeIdNumber": this.alternativeid.toString(),
                "alternativeIdType": Number(this.selectDropdownOptionsIDType),
                "urbanRuralId": urbanrural,
              };
            }
            } else{
              if (Number(this.selectDropdownOptionsNationality.id) == 1){
                varuserdata = {
                "cellNumber": this.cellnumber.toString(),
                "createDate": date,
                "dateOfBirth":  this.personalBirthday,
                "email":  this.primeemail,
                "faxNumber": this.cellnumber.toString(),
                "firstName": this.uname,
                "lastName": this.surname,
                "passportNumber": "",
                "registrationDate": date,
                "rsaIdNumber": this.Identificationid.toString(),
                "password": "abcder",
                "username": "defualt",
                "middleName": this.midname,
                "maidenName": this.maidenName,
                "titleId": this.selectuserTittle,
                "nationalityId": this.selectDropdownOptionsNationality.id,
                "primaryEmailAddress": this.primeemail,
                "secondaryEmailAddress": this.secondemail,
                "disabilityStatus": this.selecteddisabilitytype,
                "disabledId": 1,
                "genderId":  this.selectedgender.id,
                "equityId": this.selectedequity.id,
                "disabilityRatingId": this.selecteddisabilitylevel.id,
                "urbanRuralId": urbanrural
              };
              }
              else{
                varuserdata = {
                  "cellNumber": this.cellnumber.toString(),
                  "createDate": date,
                  "dateOfBirth":  this.personalBirthday,
                  "email":  this.primeemail,
                  "secondaryEmailAddress": this.secondemail,
                  "faxNumber": this.cellnumber.toString(),
                  "firstName": this.uname,
                  "lastName": this.surname,
                  "passportNumber": "",
                  "registrationDate": date,
                  "password": "abcder",
                  "username": "defualt",
                  "middleName": this.midname,
                  "maidenName": this.maidenName,
                  "titleId": this.selectuserTittle,
                  "nationalityId": this.selectDropdownOptionsNationality.id,
                  "primaryEmailAddress": this.primeemail,
                  "disabilityStatus": this.selecteddisabilitytype,
                  "disabledId": 1,
                  "genderId":  this.selectedgender.id,
                  "equityId": this.selectedequity.id,
                  "disabilityRatingId": this.selecteddisabilitylevel.id,
                  "alternativeIdNumber": this.alternativeid.toString(),
                  "alternativeIdType": Number(this.selectDropdownOptionsIDType),
                  "urbanRuralId": urbanrural
                };
              }
            }
    
    
    
            console.log(varuserdata);
            
            if (this.returningLearnerCheck = 1){
              var isworkbased = 0;
           var isemplayerform = 0;

           if(this.checkedemployment == "Yes") {
             isemplayerform = 1;
           }else if(this.checkedemployment == "No") {
             isemplayerform = 0;
           }

           if(this.checkedagreement ==  "Yes")  {
             isworkbased = 0;
           }else if (this.checkedagreement ==  "No"){
             isworkbased = 1;
           }
           var istved = 0;

           if(this.checkedtvetqual = "Yes") {
             istved = 1;
           }else if(this.checkedtvetqual = "No"){
             istved = 0;
           }

            console.log('Step 0: 15 Nov 2022 - the cost of Supremacy is dedication');
            this.Addperson(varuserdata);
            console.log('User ID: ', this.jbpmuserid);
            

            
            var learningprogdata = 
            {
              "createDate": date,
              "userId": this.jbpmuserid,
              "contractOfEmploymentCopy": 0,
              "employedByEmployerBefore": isemplayerform,
              "workplaceBasedBefore": isworkbased,
              "highestEducationEnum": this.selectedqualificationlevel.id,
              "lastUpdateDate": "2022-07-28T22:07:11.798Z",
              "lastSchoolYear": this.quallastschooldateyear,
              "previousSchools": this.selectedschoolatended.id,
              "tvetFetQualificationId": this.selectedtvet,
              "employmentStatus": 0,
              "tvetLecturer": istved
            }
            console.log('Step 1: 10 Nov 2022 - We spent months ckimbing over mountatins, but when we got there all there was was a bunch of rocks');
            this.AddCompanyLeaner(learningprogdata);

            }
            else{
              //this.Addperson(varuserdata);
              this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'You have selected an existing ID. Please Enter A Unique One TO Continue'});
              console.log('To be implemented');
            }
            var id = this.jbpmuserid;
            this.tempIDPDF = id;
            console.log(this.tempIDPDF);
    
           /* var object = {};
            object[fieldnae] = name ;
            object[fieldnae1] = surname ;
            object[fieldnae2] = cellnumber ;
            object[fieldnae3] = telnumber ;
            object[fieldnae4] = primaryemail ;
            object[fieldnae5] = secondayemail ;
            object[fieldnae6] = dateofbirth ;
            object[fieldnae7] = this.selectedgender;
            object[fieldnae8] = this.selectedequity;
            object[fieldnae9] = this.selectedisability ;
            object[fieldnae10] = this.selecteddisabilitytype;
            object[fieldnae11] = this.selectuserTittle;
    
            this.StartTaskLearnerDetails(this.task.task_id,object);*/
            document.getElementById("Learn_html").innerHTML = this.learndet;
            this.isDisabledLea = true;
            this.tempname = name  + " " + surname;
            this.Thankyou = name  + " " + surname;
            document.getElementById("appinfomation").innerHTML = " for " +   this.tempname +" (" + this.Identificationid +")" ;
            this.submitlearnerbuttoncheck = 1;
          }else{
            this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Select the last school you attended'});
            //alert('Please Select the last school you attended');
          }
        } 
     
}
////////////////////////////////////////////////////////////////////////////////////////////////
    //Function that creates wbl
    createWBL(){
      this.mersetaservice.createdocument(this.jbpmuserid)
            .subscribe(
                response => {
                    this.tempHlale = response;
                     console.log(this.tempHlale);

               },err => {
                if (err.status == 404)
                {
                  this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Seems like something went wrong. Please contact your SDF Provider or email us at: '});//alert('Seems like something went wrong. Please contact your SDF Provider or email us at: ');
                  setTimeout(() => {
                    console.log('sleep');
                    this.messageService.clear();
                  }, 4000);
              } 
                else console.log(err);
              }
            );
    }

    //Function that submits language
      public submitlanguage() {

        var fieldnae  = "homelanguage";
        var fieldnae1  = "language";
        var fieldnae2  = "read";
        var fieldnae3  = "speak";
        var fieldnae4  = "write";
        var object = {};

        object[fieldnae] = this.checkedhomelangauge;
        object[fieldnae1] = this.selectedlanguage;
        object[fieldnae2] = this.checkedread ;
        object[fieldnae3] = this.checkedspeak ;
        object[fieldnae4] = this.checkedwrite ;
        //this.StartTaskLanguages(this.task.task_id,object);
        document.getElementById("lang_html").innerHTML = this.langdet;
        this.isDisabledLan = true;
      }

      //Function that submits qualification details
      public submitQualification() {

        var isworkbased = 0;
        var isemplayerform = 0;

        if(this.checkedemployment == "Yes") {
          isemplayerform = 1;
        }else if(this.checkedemployment == "No") {
          isemplayerform = 0;
        }

        if(this.checkedagreement ==  "Yes")  {
          isworkbased = 0;
        }else if (this.checkedagreement ==  "No"){
          isworkbased = 1;
        }

        var fieldnae  = "employedByemployerBefore";
        var fieldnae1  = "workplaceBaseBefore";
        var fieldnae2  = "highestEducation";
        var fieldnae3  = "LastSchoolAttended";
        var fieldnae4  = "LastSchoolYear";
        var fieldnae5  = "TVETLecturer";
        var fieldnae6  = "TVETOrFETQualification";
        var fieldnae7  = "OFOCode";
        var fieldnae8 = "EmploymentStatus";

        var istved = 0;

        if(this.checkedtvetqual = "Yes") {
          istved = 1;
        }else if(this.checkedtvetqual = "No"){
          istved = 0;
        }

        var object = {};
        object[fieldnae] = isemplayerform;
        object[fieldnae1] = isworkbased;
        object[fieldnae2] = this.selectedqualificationlevel.id;
        object[fieldnae3] = this.selectedschoolatended.id;
        object[fieldnae4] = this.quallastschooldateyear.toString();
        object[fieldnae5] = istved ;
        object[fieldnae6] = this.selectedtvet ;
        object[fieldnae7] = this.selectedofo ;
        object[fieldnae8] = "" ;

        //this.StartTaskQualifications(this.task.task_id,object);
        document.getElementById("qualification_html").innerHTML = this.quald;
        this.isDisabledqual = true;
      }


      //Function that submits next of kin details
  public submitnextofkin() {

    var nextofkin = this.nextofkin;
    var nextofkinemail = this.nextofkinemailaddress;
    var nextofkinlastname = this.nextofkinlastname;
    var nextofkincelphone = this.nextofkincelphone;
    var fieldname  = "NextofKin";
    var fieldname1  = "NextofKinEmail";
    var fieldname2  = "NextofKinLastName";
    var fieldname3  = "NextOfKinTelephone";
    var object = {};

    object[fieldname] = nextofkin ;
    object[fieldname1] = nextofkinemail ;
    object[fieldname2] = nextofkinlastname ;
    object[fieldname3] = nextofkincelphone;

    //this.StartTaskNextofkin(this.task.task_id,object);
    document.getElementById("kin_html").innerHTML = this.nxtkind;
    this.isDisabledKin = true;
  }


  //Function that submits the learner's Home address
  public submitHomeAdrress() {
    var Address = this.Address;
    var address1 = this.Address1;
    var address2 = this.Address2;
    var Area = 1;
    var Postalcode = this.Postalcode;
    var fieldnae  = "Address1";
    var fieldnae1  = "Address2";
    var fieldnae2  = "Address3";
    var fieldnae4  = "Area";
    var fieldnae5  = "PostalCode";
    var fieldnae6  = "Province";
    var fieldnae7  = "Municipality";
    var fieldnae8  = "StatsSAAreaCode";
    var fieldnae9  = "SameAsPostal";
    var object = {};

    object[fieldnae] = Address ;
    object[fieldnae1] = address1 ;
    object[fieldnae2] = address2 ;
    object[fieldnae4] = Area;
    object[fieldnae5] = Postalcode ;
    object[fieldnae6] = this.selectedPronvince;
    object[fieldnae7] = this.selectedHomeMuni;
    object[fieldnae8] = this.selectedstathome;
    object[fieldnae9] = false;


    //this.StartTaskHomeAddress(this.task.task_id,object);
    document.getElementById("home_html").innerHTML = this.homadd;
    this.isDisabledHom = true;
    console.log(this.selectedHomeMuni +","+ this.selectedHomeTown);
  }

  //Function that submits the learner's postal address
  public submitPostalAdrress() {
    var Postal = this.Postal;
    var Postal1 = this.Postal1;
    var Postal2 = this.Postal2;
    var Postalcode = this.Postal3;
    var areas = 1;
    var fieldnae  = "Postal";
    var fieldnae1  = "Postal1";
    var fieldnae2  = "Postal2";
    var fieldnae3  = "Postal3";
    var fieldnae4  = "Area";
    var fieldnae5  = "Province";
    var fieldnae6  = "Municipality";
    var fieldnae7  = "StatsSAAreaCode";

    var object = {};

    object[fieldnae] = Postal;
    object[fieldnae1] = Postal1;
    object[fieldnae2] = Postal2;
    object[fieldnae3] = Postalcode;
    object[fieldnae4] = areas;
    object[fieldnae5] = this.selectedpostalPronvince;
    object[fieldnae6] = this.selectedpostalMuni;
    object[fieldnae7] = this.selectedstatpostal;

    //this.StartTaskPostaladdress(this.task.task_id,object);
    document.getElementById("post_html").innerHTML = this.postadd;
    this.isDisabledPos = true;
  }

  public submitPostalAdrressHome() {
    var Postal = this.Postal;
    var Postal1 = this.Postal1;
    var Postal2 = this.Postal2;
    var Postalcode = this.pPostalcode;
    var areas = 1;
    var fieldnae  = "Postal";
    var fieldnae1  = "Postal1";
    var fieldnae2  = "Postal2";
    var fieldnae3  = "Postal3";
    var fieldnae4  = "Area";
    var fieldnae5  = "Province";
    var fieldnae6  = "Municipality";
    var fieldnae7  = "StatsSAAreaCode";

    var object = {};

    object[fieldnae] = Postal;
    object[fieldnae1] = Postal1;
    object[fieldnae2] = Postal2;
    object[fieldnae3] = Postalcode;
    object[fieldnae4] = areas;
    object[fieldnae5] = this.pselectedPronvince;
    object[fieldnae6] = this.pselectedHomeMuni;
    object[fieldnae7] = this.pselectedstathome;

    //this.StartTaskPostaladdress(this.task.task_id,object);
    document.getElementById("post_html").innerHTML = this.postadd;
    this.isDisabledPos = true;

    console.log(object);
  }


  //Function that submits the learner's employment status
  public submitEmployementStatus()
  {
  this.messageService.clear();
  if(!this.checkedEmployment)
    {
      //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?'); checkedEmployment   
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If You Are Employed'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
      
    } 
    else if(!this.checkedeContractofEmploymen)
    {
      //alert('Please Indicate If the learners contract of employment specific to the purpose of agreement?');    
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate If the learners contract of employment specific to the purpose of agreement?'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    } 
    else
    {
      if (this.submitlearnerbuttoncheck == 1){
      var fieldnae  = "Employed"
      var val = 0;
      if(this.checkedEmployment == "Yes") {
            this.isemployed = true
            val = 1;
      }else if (this.checkedEmployment == "No") {
            this.isemployed = false;
            val = 0;
      }
      var contract = 0;
      var copyof = 0;

      if(this.checkedeContractofEmploymen == "Yes") { //contractOfEmploymentSpecified
          contract = 1;
      }else if(this.checkedeContractofEmploymen == "No") {
        contract = 0;
      }

      if(this.checkecopyofcontract == "Yes") {
        copyof = 1;
      }else if(this.checkecopyofcontract == "No") {
        copyof = 0;
      }

      var data = {
        "employmentStatus": val,
        "contractOfEmploymentCopy": copyof,
        "contractOfEmploymentSpecified": contract
      }

      this.UpdateLeanercontract(data,this.jbpmcompanylearnerid);
      var object = {};
      object[fieldnae] =  this.isemployed;
      //this.StartTaskEmploymentStatus(this.task.task_id,object);
      document.getElementById("empstatus_html").innerHTML = this.empstatus;
      // this.isDisabledempstatus = true;
      // this.employementstatusbuttoncheck = 1;
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Fill in all the necessary Learner Detail Fields'});
        setTimeout(() => {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
        //alert('Please Fill in all the necessary Learner Detail Fields');
      }
    }
  
  
  }

  //Function that submits the learner's contract of employment
   public submitContractofEmployment() {
    var fieldnae  = "EmploymentSpecifictothePeriod"
    var fieldnae1  = "CopyOftheContractOfEmployment"
    var contract = 0;
    var copyof = 0;

    if(this.checkedeContractofEmploymen = "Yes") {
        contract = 1;
    }else if(this.checkedeContractofEmploymen = "No") {
      contract = 0;
    }

    if(this.checkecopyofcontract = "Yes") {
      copyof = 1;
    }else if(this.checkecopyofcontract = "No") {
      copyof = 0;
    }


    var object = {};
    object[fieldnae] =  contract;;
    object[fieldnae1] =  copyof;

    //this.StartTaskContractofEmployment(this.task.task_id,object);
    document.getElementById("ContractofEmployment_html").innerHTML = this.ContractofEmployment_html;
    this.isDisableContract = true;

   }

   //Function that submits the employer details
   public submitEmployerDetails()
   {
    this.messageService.clear();
    if (!this.levynumber){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select an Employer'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else if (!this.persontitle){
      //alert('Please Enter Contact Person Title');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter Contact Person Title'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else if (!this.personname){
      //alert('Please Enter The Contact Person Name');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Name'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else if (!this.personlastname){
      //alert('Please Enter The Contact Person Surname');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Surname'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else if (!this.personcellnumber){
      //alert('Please Enter The Contact Person Cellphone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Cellphone Number'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else if (!this.persontelnumber){
      //alert('Please Enter The Contact Person Telephone Number');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Telephone Number'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    } else if (!this.pDesignation){
      //alert('Please Enter The Contact Person Telephone Number'); 
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter The Contact Person Designation'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    } else if (this.epPostalcode == null || this.ePostalcode.toString().length != 4 || this.epPostalcode.toString().length != 4){
      //alert('Postal Codes are typically 4 digits'); 
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Postal Codes are typically 4 digits'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
  
    }
    else
    {

      // emplpoyer
      var fieldnae  = "EmployerName";
      var fieldnae1  = "TradingName";
      var fieldnae2  = "TelNumber";
      var fieldnae3  = "FaxNumber";
      var fieldnae4  = "EmployerRegistrationNumber";
      var fieldnae5  = "EntityID";
      var fieldnae6  = "NumberOfEmployee";
      var fieldnae7  = "SICCode" ;
      var fieldnae8  = "OrganizationType";
      var fieldnae9  = "ContactEmail";

      var ename = this.employername;
      var etname = this.trainingname;
      var etnumber = this.emptelnumber;
      var efaxnumber = this.empfaxnumber;
      var eregnumber = this.emregnumber;
      var elevy = this.levynumber;
      var enumemploye = this.numofemployee;
      var eiccode = this.siccode;
      var orgtype = this.selectedorganization;
      var orgemail = this.emptemail;

      this.companydata = {
        "companyName": this.employername,
        "companyRegistrationNumber": this.emregnumber,
        "companyStatus": 0,
        "createDate": "2022-07-29T00:41:53.655Z",
        "email": this.emptemail,
        "faxNumber": this.empfaxnumber,
        "levyNumber":  this.levynumber.toString(),
        "telNumber": this.emptelnumber,
        "tradingName": this.trainingname,
        "sicCodeId": 4,
        "organisationTypeId": this.selectedorganization
      }

      console.log('Getting Comp Learner')
      this.UpdateCompanyEmployer(this.companyId, this.jbpmcompanylearnerid);
      console.log('Comp Leanrer has been gotten and its: ' + this.jbpmcompanylearnerid)
      //console.log('Old Comp LEarner would have been: ' + this.complearner.id)

      var object = {};
      object[fieldnae] = ename;
      object[fieldnae1] = etname;
      object[fieldnae2] = etnumber;
      object[fieldnae3] = efaxnumber;
      object[fieldnae4] = eregnumber;
      object[fieldnae5] = elevy;
      object[fieldnae6] = enumemploye;
      object[fieldnae7] = eiccode;
      object[fieldnae8] = orgtype;
      object[fieldnae9] = orgemail;

      document.getElementById("employerdet_html").innerHTML = this.empdet;
      this.employerdetailsbuttoncheck =1;
  }
}


  //Function that submits the employer contact person
   public submitEmployerContactPerson() {


    ///person
    var pfieldnae  = "Title";
    var pfieldnae1  = "FirstName";
    var pfieldnae2  = "LastName";
    var pfieldnae3  = "IdentityNumber";
    var pfieldnae4  = "ContactEmail";
    var pfieldnae5  = "ContactCellNumber";
    var pfieldnae6  = "ContactTelNumber";
    var pfieldnae7  = "ContactFaxNumber" ;
    var pfieldnae8  = "Designation" ;

    var ptitle = this.persontitle;
    var pname = this.personname;
    var plname = this.personlastname;
    var pidnumber = this.personidnumber;
    var pemail = this.personemail;
    var pcellnum = this.personcellnumber;
    var ptelnumber = this.persontelnumber;
    var pafaxnum = this.persontaxnumber;
    var pdesig = this.pDesignation;

    var object = {};
    object[pfieldnae] = ptitle;
    object[pfieldnae1] = pname;
    object[pfieldnae2] = plname;
    object[pfieldnae3] = pidnumber;
    object[pfieldnae4] = pemail;
    object[pfieldnae5] = pcellnum;
    object[pfieldnae6] = ptelnumber;
    object[pfieldnae7] = pafaxnum;
    object[pfieldnae8] = pdesig;


    //this.StartTaskEmployerContact(this.task.task_id,object);
    document.getElementById("ContactPerson_html").innerHTML = this.ContactPerson_html;
    this.isDisabledcontperson= true;

   }

   //Function that submits the employer physical address
   public submitEmployerPhysicalAdrress() {

    var Address = this.eAddress;
    var address1 = this.eAddress1;
    var address2 = this.eAddress2;
    var Area = this.eArea;
    var Postalcode = this.ePostalcode;
    var fieldnae  = "Addressline1";
    var fieldnae1  = "Addressline2";
    var fieldnae2  = "Addressline3";
    var fieldnae4  = "PostalCode";
    var fieldnae5  = "StatsAreaCode";
    var fieldnae6  = "Province";
    var fieldnae7  = "Munucipality";
    var fieldnae8  = "Town";
    var fieldnae9  = "SameAsPostal";
    var object = {};

    object[fieldnae] = Address ;
    object[fieldnae1] = address1 ;
    object[fieldnae2] = address2 ;
    object[fieldnae4] = Postalcode ;
    object[fieldnae5] = this.selectedphysical ;
    object[fieldnae6] = this.selectedePronvince ;
    object[fieldnae7] = this.selectedeHomeMuni ;
    object[fieldnae8] = this.selectedeHomeTown ;
    object[fieldnae9] = false ;


    //this.StartTaskPhysicalAddress(this.task.task_id,object);
    document.getElementById("employerphysicaladdress_html").innerHTML = this.employerphysicaladdress_html;
    this.isDisabledempphysical = true;
  }

  //Function that submits the employer postal address
  public submitEmployerPostalAdrress() {
    var Address = this.epAddress;
    var address1 = this.epAddress1;
    var address2 = this.epAddress2;
    var Area = this.epArea;
    var Postalcode = this.epPostalcode;
    var fieldnae  = "AddressLine1";
    var fieldnae1  = "AddressLine2";
    var fieldnae2  = "AddressLine3";
    var fieldnae4  = "PostalCode";
    var fieldnae5  = "StatsAreaCode";
    var fieldnae6  = "Province";
    var fieldnae7  = "Munucipality";
    var fieldnae8  = "Town";
    var object = {};

    object[fieldnae] = Address ;
    object[fieldnae1] = address1 ;
    object[fieldnae2] = address2 ;
    object[fieldnae4] = Postalcode ;
    object[fieldnae5] = this.selectedphysicalpostal ;
    object[fieldnae6] = this.selectedepPronvince ;
    object[fieldnae7] = this.selectedepHomeMuni ;
    object[fieldnae8] = this.selectedepHomeTown ;



    //this.StartTaskPhysicalPostal(this.task.task_id,object);
    document.getElementById("employerpostaladdress_html").innerHTML = this.employerpostaladdress_html;
    this.isDisabledemppostal = true;

  }

  //Function that submits the provider details
  public submitProviderDetails() {
    this.messageService.clear();
    if (this.isDisabledprovider || !this.laccnumber)
    {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Provider'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
      //alert('Please Select A Provider');
    } 
    else
    {
      if(this.employerdetailsbuttoncheck == 1)
      {

        var pfieldnae  = "ProviderName";
        var pfieldnae1  = "Firstname";
        var pfieldnae2  = "Lastname";
        var pfieldnae3  = "Email";
        var pfieldnae4  = "CellNumber";
        var pfieldnae5  = "TelNumber";
        var pfieldnae6  = "FaxNumber";
        var pfieldnae7  = "ReviewDate" ;
        var pfieldnae8  = "SICCode" ;
        var pfieldnae9  = "SETARegisteredAt";
        var pfieldnae10  = "AccreditationNumber" ;
        var pfieldnae11  = "AccreditationStatus" ;
        var pfieldnae12  = "AccreditationType" ;
    
        var ProviderName = this.lprovidername;
        var Firstname = this.lfirstname;
        var Lastname = this.llastname;
        var Email = this.lemail;
        var CellNumber = this.lcellnumber;
        var TelNumber = this.ltellnumber;
        var FaxNumber = this.lfaxnumber;
        var ReviewDate = this.lreviewdate;
        var SICCode = this.lsiccode;
        var SETARegisteredAt = this.lregistereat;
        var AccreditationNumber = this.laccnumber;
        // var Accreditationstatus = this.ProviDetailsFormGroup.value["laccnumber"];
        // var AccreditationType = this.ProviDetailsFormGroup.value["laccnumber"];
      
        console.log(this.selectedprovider);
      
        var provdata = {
          "employerId": this.singleprovider.id,
          "companyId": this.companyId
        }
        console.log('Prvider Data:')
        console.log(provdata);
        this.UpDateProvider(provdata,this.jbpmcompanylearnerid);
        console.log('UpdateProvider has been ran')
      
        var object = {};
        object[pfieldnae] = ProviderName;
        object[pfieldnae1] = Firstname;
        object[pfieldnae2] = Lastname;
        object[pfieldnae3] = Email;
        object[pfieldnae4] = CellNumber;
        object[pfieldnae5] = TelNumber;
        object[pfieldnae6] = FaxNumber;
        object[pfieldnae7] = ReviewDate;
        object[pfieldnae8] = SICCode;
        object[pfieldnae9] = SETARegisteredAt;
        object[pfieldnae10] = AccreditationNumber;
        object[pfieldnae11] = this.selectedAccstatus;
        object[pfieldnae12] = this.selectedAcctype;
      
      
        // this.StartTaskProviderDetails(this.task.task_id,object);
        document.getElementById("providerdetails_html").innerHTML = this.providerdetails_html;
        this.isDisabledprovider = true;
        this.providerdetailsbuttoncheck = 1;
      }
      else
      {
        //alert('Please Fill in all the necessary Employer Detail Fields');
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Fill in all the necessary Employer Detail Fields'});
        setTimeout(() => {
          console.log('sleep');
          this.messageService.clear();
        }, 4000);
      }
    }
  }


  
  public submiLearnershipQualification() {

    this.proofOfSubmission = new Date(this.coomencedate);
    //[disabled]="!selectedlearnership || !completedate || !coomencedate"
    this.messageService.clear();
    if (!this.selectedlearnership)
    {
      //alert('Please Select A Learnership Program');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Select A Learnership Program'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    }
    else if (!this.coomencedate)
    {
      //alert('Please Indicate The Date Of Enrolment');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Enrolment'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    }
    else if (!this.completedate)
    {
      //alert('Please Indicate The Date Of Completion');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate The Date Of Completion'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    }
    else if(!this.checkedfunded) {
        //alert('Please Indicate Your Funding Method');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Your Funding Method'});
      setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    }
    else if(this.checkedfunded == "No" && !this.selectuserFunding) {
           //alert('Please Indicate Who Is Funding You');
           this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Indicate Who Is Funding You'});
           setTimeout(() => {
        console.log('sleep');
        this.messageService.clear();
      }, 4000);
    }
    else {
      if(this.providerdetailsbuttoncheck == 1){
        this.WBLcheck = 'Check';
        this.isDisabledWBLAgreement = true;
        // emplpoyer
        var fieldnae  = "LearningProgramType";
        var fieldnae1  = "LearnershipQualification";
        var fieldnae2  = "PivotalOrNonPivotalTraining";
        var fieldnae3  = "NQFAligned";
        var fieldnae4  = "SAQAID";
        var fieldnae5  = "CommencementDate";
        var fieldnae6  = "CompletionDate";
        var fieldnae7  = "MersetaFunded" ;
        var isnqfaligfned = 0;
        var ismersetafunded = null;
    
        var ename = this.saqaid;
        var etname = this.coomencedate;
        var etnumber = this.completedate;

        if(this.checkednqlaligned = "Yes") {
          isnqfaligfned = 1;
        }else if(this.checkednqlaligned = "No") {
          isnqfaligfned = 0;
        }
    
        if(this.checkedfunded == "Yes") {
          ismersetafunded = 1;
        }else if(this.checkedfunded == "No"){
          ismersetafunded = 0;
        }else if(this.checkedfunded == null){
          console.log('Please Indicate Weather The Program Is merSETA Funded Or Not');
        }
    
        var d = new Date();
        var dtla = {
          "learnershipId": this.selectedlearnership.qualificationId,
          "interventionTypeId": 33,
          "nqfAlignedId": isnqfaligfned,
          "pivotNonPivot": 0,
          "qualificationId": this.saqaQual.id ,
          "commencementDate": this.coomencedate,
          "completionDate": this.completedate,
          "lastUpdateDate": d,
          "mersetaFunded": ismersetafunded,
          "learnerStatus": 0,
          "dundingId": 1
        }
    
        this.UpDateCompanylearner(dtla,this.jbpmcompanylearnerid);
    
        var object = {};
        object[fieldnae] = this.selectedprogramtype;
        object[fieldnae1] = this.selectedlearnership.qualificationId;
        object[fieldnae2] = this.selectedpivnon;
        object[fieldnae3] = isnqfaligfned;
        object[fieldnae4] = ename;
        object[fieldnae5] = etname;
        object[fieldnae6] = etnumber;
        object[fieldnae7] = ismersetafunded;
    
        //this.StartTaskLearnershipqualification(this.task.task_id,object);
        document.getElementById("learnqualification_html").innerHTML = this.learnq;
        this.isDisabledlearn = true;
        this.learningprogrambuttoncheck == 1;
        if(this.checkedfunded == 'Yes'){
          console.log('Create WBL');
          this.export();
        }
    
      }else{
        
        //alert('Please Fill in all the necessary Provider Detail Fields');
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Fill in all the necessary Provider Detail Fields'});
     }
    }
    
}


  //Update User Status updateCompanyEmployer
  UpdateCompanyEmployer(id,body) {
    this.mersetaservice.updateCompanyEmployer(id,body)
    .subscribe(
       response => {
         console.log(response);
       },err => {
        console.log('The Function UpdateCompany did not run successfully so we are running AddCompany');
        if (err.status == 500) this.AddCompany(this.companydata);
        else console.log(err);
      }
    );

 }

  
  ///////////////////////////////
  //////////////////////////////////
  getNextTask() {
   // this.getWorkItem(this.proccessID);
    if(this.task.task_form == "learner_Postal") {
      this.getProcessID(this.existingDefID)

    }else {
      this.getWorkItem(this.proccessID)
    }

  }

  getWorkItem(id)  {
    this.mersetaservice.getWorkItemID(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
         this.getTaskId(this.workItemId);
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
       }
    );
    //return this.workitemtinstance["work-item-instance"][0]["work-item-id"];
  }

  ////////////////////////////
  ///////////////////////////

///////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// Force of complete and start Task Processces /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

  StartTaskNationality(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTask(this.task.task_id,object);
       }
    );
  }

  CompleTask(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
               this.submitIdentification()
             }
          );
         }
        );
       }
    );
  }

  StartTaskIdentification(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskIdentification(this.task.task_id,object);
       }
    );
  }

  CompleTaskIdentification(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
              // this.submitIdentification()
             }
          );
         }
        );
       }
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// END OF NATIONALITY TAB ?/////////////////////////


StartTaskLearnerDetails(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskLearnerDetails(this.task.task_id,object);
       }
    );
  }

  CompleTaskLearnerDetails(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
               this.submitlanguage()
             }
          );
         }
        );
       }
    );
  }

  StartTaskLanguages(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskLanguages(this.task.task_id,object);
       }
    );
  }

  CompleTaskLanguages(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
              this.submitQualification()
             }
          );
         }
        );
       }
    );
  }

  StartTaskQualifications(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskQualifications(this.task.task_id,object);
       }
    );
  }

  CompleTaskQualifications(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
              this.submitnextofkin()
             }
          );
         }
        );
       }
    );
  }

  StartTaskNextofkin(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskNextofkin(this.task.task_id,object);
       }
    );
  }

  CompleTaskNextofkin(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
              this.submitHomeAdrress()
             }
          );
         }
        );
       }
    );
  }

  StartTaskHomeAddress(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskHomeAddress(this.task.task_id,object);
       }
    );
  }

  CompleTaskHomeAddress(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
              this.submitPostalAdrress()
             }
          );
         }
        );
       }
    );
  }

  StartTaskPostaladdress(id,object)  {
    this.mersetaservice.startTasks(id)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Start Task Response = " + response);
         this.CompleTaskPostaladdress(this.task.task_id,object);
       }
    );
  }

  CompleTaskPostaladdress(id,body)  {
    this.mersetaservice.completeTasks(id,body)
    .subscribe(
       response => {
        // this.proccessID = response;
         console.log(response)
         console.log("Complete Task Nationality Response = " + response);

         this.mersetaservice.getWorkItemID(this.proccessID)
         .subscribe(
         response => {
        // this.proccessID = response;
         this.workitemtinstance = response;
         this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
         console.log(response)
          console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
          this.mersetaservice.getTaskID(this.workItemId)
          .subscribe(
             response => {
              // this.proccessID = response;
              this.taskidInstance = response;
              this.workItemId = this.taskidInstance["task-id"];
               //console.log(response);
               //console.log("Task id = " + this.taskidInstance["task-id"]);
               this.task.setTaskid(this.taskidInstance["task-id"]);
               this.task.setTaskname(this.taskidInstance["task-name"]);
               this.task.setTaskForm(this.taskidInstance["task-form"]);
               this.task.setTaskStatus(this.taskidInstance["task-status"]);
               this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
             //  this.getTaskFields(this.task.task_id);
               console.log(this.task);
               this.getProcessID(this.existingDefID);
             // this.submitPostalAdrress()
             }
          );
         }
        );
       }
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// END OF PERSONAL DETAILS TAB ?/////////////////////////


  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// START EMPLOYMENT ?/////////////////////////

StartTaskEmploymentStatus(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskEmploymentStatus(this.task.task_id,object);
     }
  );
}

CompleTaskEmploymentStatus(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
             this.submitContractofEmployment()
           }
        );
       }
      );
     }
  );
}

StartTaskContractofEmployment(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskContractofEmployment(this.task.task_id,object);
     }
  );
}

CompleTaskContractofEmployment(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
          //   this.submitContractofEmployment()
           }
        );
       }
      );
     }
  );
}
  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// START EMPLOYMENT ?/////////////////////////

StartTaskEmployer(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskEmployer(this.task.task_id,object);
     }
  );
}

CompleTaskEmployer(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
            this.submitEmployerContactPerson()
           }
        );
       }
      );
     }
  );
}

StartTaskEmployerContact(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskEmployerContact(this.task.task_id,object);
     }
  );
}

CompleTaskEmployerContact(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
            this.submitEmployerPhysicalAdrress()
           }
        );
       }
      );
     }
  );
}

StartTaskPhysicalAddress(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskPhysicalAddress(this.task.task_id,object);
     }
  );
}

CompleTaskPhysicalAddress(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
            this.submitEmployerPostalAdrress()
           }
        );
       }
      );
     }
  );
}

StartTaskPhysicalPostal(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskPhysicalPostal(this.task.task_id,object);
     }
  );
}

CompleTaskPhysicalPostal(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
           }
        );
       }
      );
     }
  );
}

///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// END EMPLOYMENT ?/////////////////////////

///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// START PROVIDER DETAILS ?/////////////////////////

StartTaskProviderDetails(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskProviderDetails(this.task.task_id,object);
     }
  );
}

CompleTaskProviderDetails(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
           }
        );
       }
      );
     }
  );
}
///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// END PROVIDER DETAILS ?/////////////////////////

///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////
////////////////////// START LEARNERSHIP QUALIFICATION ?/////////////////////////

StartTaskLearnershipqualification(id,object)  {
  this.mersetaservice.startTasks(id)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Start Task Response = " + response);
       this.CompleTaskLearnershipqualification(this.task.task_id,object);
     }
  );
}

CompleTaskLearnershipqualification(id,body)  {
  this.mersetaservice.completeTasks(id,body)
  .subscribe(
     response => {
      // this.proccessID = response;
       console.log(response)
       console.log("Complete Task Nationality Response = " + response);

       this.mersetaservice.getWorkItemID(this.proccessID)
       .subscribe(
       response => {
      // this.proccessID = response;
       this.workitemtinstance = response;
       this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
       console.log(response)
        console.log("work item id = " + this.workitemtinstance["work-item-instance"][0]["work-item-id"]);
        this.mersetaservice.getTaskID(this.workItemId)
        .subscribe(
           response => {
            // this.proccessID = response;
            this.taskidInstance = response;
            this.workItemId = this.taskidInstance["task-id"];
             //console.log(response);
             //console.log("Task id = " + this.taskidInstance["task-id"]);
             this.task.setTaskid(this.taskidInstance["task-id"]);
             this.task.setTaskname(this.taskidInstance["task-name"]);
             this.task.setTaskForm(this.taskidInstance["task-form"]);
             this.task.setTaskStatus(this.taskidInstance["task-status"]);
             this.task.setTaskOwner(this.taskidInstance["task-actual-owner"]);
           //  this.getTaskFields(this.task.task_id);
             console.log(this.task);
           }
        );
       }
      );
     }
  );
}

//////////////////////////////////////////////Additional Functions/////////////////////////////////////////////////////////

//A Function that handles the format validations and Gender/Date  Of Birth Front end stuff
getDOB()
{
  if (Number(this.selectDropdownOptionsNationality.id) == 1){


      var isCorrect: boolean;
      var id = this.Identificationid.toString();
      var skrrskrrTest = Number(id.substring(0,2));
      var dateFix = "20"  + yyyy;
      var yyyy = id.substring(0,2);
      var mm = Number(id.substring(2,4));
      var dd = id.substring(4,6);

      if ((mm> 12) || (mm <=0)){
        this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID '});
      } 
      else if (Number(dd)> 31 || Number(dd) <=0){
        this.messageService.add({key: 'tc1',severity:'error', summary: 'Error', detail: 'Please Enter A Valid RSA ID'});
      }
      else{

      if (skrrskrrTest >= 50)    {console.log("Date of birth is: " + dd + '-' + mm + '-'  + "19" + yyyy )}
      else if (skrrskrrTest < 50)    {console.log("Date of birth is: " + dd + '-' + mm + '-' + "20"  + yyyy)}
      else{ isCorrect = false;}

      var gender =id.substring(6,10);
      if ((Number(gender) >-1) && (Number(gender) <= 4999))
      {
        console.log("Gender is : Female");  
        this.selectedgender= this.dropdownOptions4[1];
        Number(this.selectedgender);
        this.onChangegender();
        console.log(this.dropdownOptions4[1]);
        console.log(this.dropdownOptions4);
        console.log(this.selectedgender);
        this.onChangegender();
      }
      else if ((Number(gender) >=5000) && (Number(gender) <= 9999))
      {
        console.log("Gender is : Male"); 
        this.selectedgender = this.dropdownOptions4[0];
        Number(this.selectedgender);
        this.onChangegender();
        console.log(this.dropdownOptions4[0]);
        console.log(this.dropdownOptions4);
        console.log(this.selectedgender);
        this.onChangegender();
      }
      else { isCorrect = false;}

      var citizen = id.substring(10,11);
      if (Number(citizen) == 0) {console.log("You are a South African citizen")}
      else if (Number(citizen) == 1) {console.log("You are not a South African citizen")}
      else {isCorrect= false; }

      if (isCorrect = true){
        if (skrrskrrTest >= 11)    var date=new Date(Number("19"  + yyyy), (mm - 1), Number(dd));
        else if (skrrskrrTest < 11)    var date=new Date(Number("20"  + yyyy), (mm - 1), Number(dd));
        this.personalBirthday = date;
        this.personalBirthdayDisplay = this.personalBirthday;
        this.datebirth = this.personalBirthday.toISOString();
        console.log('Date of Birth' , this.datebirth)
        console.log("The ID Number Is Valid");
      }else {
        console.log("This SA ID Number Is Not Valid");
      }
    }
  } 
  }

  


  onSelectcompany(event) {
    console.log("event : " + event);
    console.log(
        "Selected company : " + this.selectedCountryAdvanced.companyName
    );
    this.compSELECTIONcheck = 'show';
    this.selected = this.selectedCountryAdvanced.id;
    this.compid = this.selectedCountryAdvanced.id;
    console.log(this.selected)
    //this.companyId = Number(this.selected);
    this.getAllCompanyUsers(this.selected);
    this.companyId = Number(this.selected);
    console.log("company id = " + this.companyId);
    console.log("Uid = " + this.Uid);
    this.getCompLearner(this.Uid,this.companyId);
}

getAllCompanyUsers(id) {
  this.mersetaservice.getAllCompanyLearners(id).subscribe((response) => {
      this.companyusers = response;
      this.seaarchedusers = this.companyusers;
      console.log(response);
      this.Uid = Number(response[0].id);
      console.log("comp id = " + id);
      console.log("User ID id = " + this.Uid);
  });
}


getCompLearner(userid,compid) {
  this.mersetaservice.getCompLearner(userid,compid)
  .subscribe(
     response => {
       this.complearner = response;
       console.log(response);
     }
  );
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

//THis is the function that defines the WBL Agreement that will be downloaded
public export(): void {

  //Leanrer Address
  var homprovince,homedestric,homemunicipality,hometown;
  var postalprovince,postaldestric,postalmunicipality,postaltown;

  homprovince = this.provinces.filter(x => x.id == this.selectedPronvince)[0].provinceDesc;
  homedestric = this.filteredDistrict.filter(x => x.id == this.selectedhomeDestrict)[0].municipalityDesc;
  homemunicipality = this.filteredMunicipality.filter(x => x.id == this.selectedHomeMuni)[0].municipalityDesc;
  hometown = this.towns.filter(x => x.id == this.selectedHomeTown)[0].description;

  postalprovince= this.provinces.filter(x => x.id == this.pselectedPronvince)[0].provinceDesc;
  postaldestric= this.filteredDistrict1.filter(x => x.id == this.pselectedhomeDestrict)[0].municipalityDesc;
  postalmunicipality= this.filteredMunicipality1.filter(x => x.id == this.pselectedHomeMuni)[0].municipalityDesc;
  postaltown= this.towns.filter(x => x.id == this.pselectedHomeTown)[0].description;

  //Employer Address
  var emphomprovince,emphomedestric,emphomemunicipality,emphometown;
  var emppostalprovince,emppostaldestric,emppostalmunicipality,emppostaltown;

  emphomprovince = this.provinces.filter(x => x.id == this.selectedePronvince)[0].provinceDesc;
  emphomedestric = this.physicaltempmunicipalities.filter(x => x.id == this.selectededistrict)[0].municipalityDesc;
  emphomemunicipality = this.physicaltempmunicipalities.filter(x => x.id == this.selectedeHomeMuni)[0].municipalityDesc;
  emphometown = this.towns.filter(x => x.id == this.selectedeHomeTown)[0].description;

  emppostalprovince= this.empostalprovinces.filter(x => x.id == this.selectedepPronvince)[0].provinceDesc;
  emppostaldestric= this.empostaltempmunicipalities.filter(x => x.id == this.selectedepdistrict)[0].municipalityDesc;
  emppostalmunicipality= this.empostaltempmunicipalities.filter(x => x.id == this.selectedepHomeMuni)[0].municipalityDesc;
  emppostaltown= this.empostaltowns.filter(x => x.id == this.selectedepHomeTown)[0].description;

  if (!this.checkeddisability)
  { 
    var disabledness: string = "Not Available"
    var tempdisability: string = "Not Available";
  } 
  else
  {
    var disabledness: string = this.checkeddisability
    if (!this.selecteddisabilitylevel) var tempdisability: string = "Not Available"; else var tempdisability: string = this.selecteddisabilitylevel.description;
  }

  var tempDate: Date = new Date(this.singleprovider.approvalDate);
  var varcomplete: Date = new Date (this.completedate);
  var varcommence: Date = new Date (this.coomencedate);

  if (!this.empRegisteredAt) var registeredAt: string = "Not Available"; else var registeredAt: string = this.empRegisteredAt;
  if (!this.selectedlearnership.ofoCode) var selectedLearnershipOFOCode: string = "Not Available"; else var selectedLearnershipOFOCode: string = this.selectedlearnership.ofoCode;
  if (!this.lsiccode) var providerSICcode = "Not Available"; else var providerSICcode: string = this.lsiccode;
  if (!this.lregistereat) var providerRegisteredAt: string = "Not Available"; else var providerRegisteredAt: string = this.lregistereat;
  if (!this.singleprovider.approvalDate) var singleProviderApprovalDate = "Not Available"; else singleProviderApprovalDate = tempDate.toLocaleDateString();
  if (!this.organisationTypeDescription || (this.organisationTypeDescription == null)) var orgaType = "Not Available"; else orgaType = this.organisationTypeDescription; 
  if (!this.siccode) var empSIC = "Not Available"; else var empSIC = this.siccode;
  if (!this.empfaxnumber || (this.empfaxnumber == null)) var empfax = "Not Available"; else var empfax = this.empfaxnumber;
  if (this.HostEmailOption == "HostEmail")
  { 
    var varHostEmailOption: string = "Yes"; 
    var varHostName: string = ""; 
    var varHostLevy: string = ""; 
    var varHostSites: string = ""; 
    var varHostSiteName: string = ""; 
  }
  else 
  {
    var varHostEmailOption: string = "No"; 
    var varHostName: string = "Not Available"; 
    var varHostLevy: string = "Not Available"; 
    var varHostSites: string = "Not Available"; 
    var varHostSiteName: string = "Not Available";
  }

  // User Detaisl
  var fulnames,identnumber,dateofbirth,cellnumber,primeeail = '';
  if((this.uname != null)&&(this.surname != null)){
    if (!this.midname) fulnames = this.uname + " " + this.surname; else fulnames = this.uname + " " + this.midname+ " " + this.surname;
    
  }
  var langs = "";
  var homelangs = "";
  for( var i = 0; i < this.langauges.length; i++){
    if (this.langauges[i].homelanguage == true) homelangs = homelangs + " " + this.langauges[i].name; else langs = langs + " " + this.langauges[i].name;
  }
  //this.nextofkinemailaddress
  if (!this.nextofkinemailaddress) var NOKemail: string = "Not Available"; else var NOKemail: string = this.nextofkinemailaddress;
  if (!this.nextofkin) var NOK: string = "Not Available"; else var NOK: string = this.nextofkin;
  if (!this.nextofkincelphone) var NOKcellphone: string = "Not Available"; else var NOKcellphone: string = this.nextofkincelphone;
  if (!this.nextofkinlastname) var NOKLastName: string = " "; else var NOKLastName: string = this.nextofkinlastname;
  var templevy = this.levynumber
  // if(templevy.substring(1,1) == 'L'){
    var sdlLiability = 'Yes'

  // }else{
  //   var sdlLiability = 'No'
  // }

  if((this.Identificationid != null) || (this.alternativeid != null)){
     if (Number(this.selectDropdownOptionsNationality.id) == 1)
        { 
          identnumber = this.Identificationid.toString();
        }else 
        {
          identnumber = this.alternativeid.toString();
        }
  }
  if (Number(this.selectDropdownOptionsNationality.id) != 1)
  {
    if(this.datebirth != null){dateofbirth = this.personalBirthdayDisplay.toLocaleDateString();}
  } 
  else 
  {
    if (Number(this.selectDropdownOptionsNationality.id) != 1){if(this.datebirth != null){dateofbirth = this.personalBirthdayDisplay.toLocaleDateString();}} else {if(this.datebirth != null){dateofbirth = this.personalBirthday.toLocaleDateString();}}
  }
  if(this.cellnumber != null) {
    cellnumber = this.cellnumber.toString();
  }
  if(this.primeemail != null) {
    primeeail  = this.primeemail;
  }

  //Employer Details
  var employername,tradingname,registrationnumber,compemail,comptelnumber,comlevynumber,comaddress,compostaladdress,ischeckedagreement = '';
  if(this.employername != null){
    employername = this.employername;
  }
  if(this.trainingname != null){
    tradingname = this.trainingname;
  }
  if(this.emregnumber != null){
    registrationnumber = this.emregnumber;
  }
  if(this.emptemail != null) {
    compemail = this.emptemail;
  }
  if(this.emptemail != null) {
    compemail = this.emptemail;
  }
  if(this.emptelnumber != null){
    comptelnumber = this.emptelnumber;
  }
  if(this.levynumber != null) {
    comlevynumber = this.levynumber;
  }
  if(this.eAddress != null) {
    comaddress  = this.eAddress + " " + this.eAddress1 + " " + this.eAddress2 + " " + this.ePostalcode + " " + this.tempstats + " " + emphomprovince + " " + emphomedestric+ " " + emphomemunicipality+ " " + emphometown;
  }
  if(this.epAddress != null) {
    compostaladdress  = this.epAddress + " " + this.epAddress2 + " " + this.epPostalcode + " " + this.tempPstats + " " + emppostalprovince + " " + emppostaldestric + " " + emppostalmunicipality+ " " + emppostaltown;
  }
  if(this.checkedagreement  != null) {
      ischeckedagreement = this.checkedagreement ;
  }

  // Provider
  var pname,ptradingname,accrednumber,sdlnumber,Sicode,setareg,phaddress,ppostaladd,ptelnum,pfaxnumber,pemailadd = '';
  if(this.singleprovider != null) {
    if(this.singleprovider.companyName != null) {
      pname  = this.singleprovider.companyName;
  }
  if(this.singleprovider.tradingName != null) {
      ptradingname  = this.singleprovider.tradingName;
  }
  if(this.singleprovider.accreditationNumber != null) {
      accrednumber  = this.singleprovider.accreditationNumber;
  }
  if(this.singleprovider.levyNumber != null) {
    sdlnumber  = this.singleprovider.levyNumber;
  }
  if(this.singleprovider.sicCodeId != null) {
    Sicode = this.singleprovider.sicCodeId;
  }
  if(this.singleprovider.setaId != null) {
    setareg = this.singleprovider.setaId;
  }
  if(this.singleprovider.residentialAddressId != null) {
    phaddress = this.singleprovider.residentialAddressId;
  }
  if(this.singleprovider.postalAddressId != null) {
    ppostaladd = this.singleprovider.postalAddressId;
  }
  if(this.singleprovider.telNumber != null) {
    ptelnum = this.singleprovider.telNumber;
  }
  if(this.singleprovider.faxNumber != null) pfaxnumber = this.singleprovider.faxNumber; else pfaxnumber = "Not Available";

  if(this.singleprovider.email != null) {
    pemailadd = this.singleprovider.email;
  }
  }

  //Creating the template for the WBL Document
  const docDefinition = {
    watermark: {text: 'MerSETA', color: 'black', opacity: 0.1, bold: true, italics: true},
    content: [
      { text: "WORKBASED LEARNING PROGRAME AGREEMENT", style: "header" , alignment: 'center', fontSize: 16},
      { text: fulnames, style: "header" , alignment: 'center', fontSize: 13,color: '#977949',},
      " ",
      " ",
      { text: "PART A - INTERPRETATION", style: "header" , alignment: 'center', fontSize: 16},
      " ",
      { text: "In this Agreement, unless the context indicates otherwise, any word or expression to which a meaning has been assigned in the skills Development Act, 1998 (Act 97 of 1998) (‘the Act’) or the SETA Workplace Based Learning Programme Agreement Regulations, 2018 (‘these regulations,) shall have the meaning so assigned.", fontSize: 10},
      " ",
      " ",
      { text: "PART B - DEFINITIONS", style: "header" , alignment: 'center', fontSize: 16},
      { text: "For purpose of workplace based learning programme agreements only: ",color: '#977949', fontSize: 12},
      " ",
      { text: "“Apprenticeship” means a period of workplace based learning culminating in an occupational qualification for a listed trade. ", fontSize: 10},
      " ",
      { text: "“Candidacy” means a period of workplace based learning undertaken by a graduate as part of the requirement for registration as a professional in the required professional designation as stipulated by a professional body.", fontSize: 10},
      " ",
      { text: "“Internship for the “N” Diploma” means a period of workplace based learning undertaken as part of the requirement for the “N” Diploma.", fontSize: 10},
      " ",
      { text: "“Learnership” means a period of workplace based learning culminating in an occupational qualification or part qualification.", fontSize: 10},
      " ",
      { text: "“Student Internship: Category A” means a period of workplace based learning undertaken as part of the requirement for a Diploma, National Diploma, Higher Education Certificate or Advanced Certificate as vocational qualification stipulated in the Higher Education Qualification sub-Framework (HEQSF).", fontSize: 10},
      " ",
      { text: "“Student Internship: Category B” means a period of workplace based learning undertaken as part of requirement for a professional qualification.", fontSize: 10},
      " ",
      { text: "“Student Internship: Category C” means a period of workplace based learning undertaken as part of the requirement for the occupational qualification of the Quality Council for Trades and Occupations (QCTO).", fontSize: 10},
      " ",
      { text: "“Graduate Internship” means a period of workplace  based learning for the purpose allowing a person who has completed a post-school qualification to gain workplace experience or exposure to enhance competence and/or employability. This may include academic staff with existing qualifications that need industrial exposure or experience.", fontSize: 10},
      " ",
      { text: "“Student Internship” means a period of workplace-based learning for a person who is enrolled at an education and training institution for a SAQA registered qualification and may include vacation work.", fontSize: 10},
      " ",
      " ",
      { text: "PART C: TERMS AND CONDITIONS OF AGREEMENT", style: "header" , alignment: 'center', fontSize: 16},
      " ",
      { text: "1.	Declaration of the parties", style: "header" , alignment: 'left', color: '#977949', fontSize: 12},
      { text: "We understand that this agreement is legally binding.", fontSize: 10},
      { text: "We understand that it is an offence in terms of the Act to provide false or misleading information in this agreement.", fontSize: 10},
      { text: "We agree to the following rights and duties.", fontSize: 10},
      " ",
      { text: "2.	Rights and duties of learners, employers and providers", style: "left" , alignment: 'left', color: '#977949', fontSize: 12},
      { text: "2.1	Rights of the learner", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The learner has the right to:", fontSize: 10},
      { text: "2.1.1.	receive an induction to the workplace based learning programme;", fontSize: 10},
      { text: "2.1.2.	be educated and trained under the workplace based learning programme;", fontSize: 10},
      { text: "2.1.3.	access to the required resources for all required curriculum components of the work-based learning programme;", fontSize: 10},
      { text: "2.1.4.	be assessed internally as specified and have access to the assessment results of the workplace based learning programme;", fontSize: 10},
      { text: "2.1.5.	have access to final external summative assessments as specifies in the assessment specification;", fontSize: 10},
      { text: "2.1.6.	if successful, be awarded a certificate of competence, by the relevant body;", fontSize: 10},
      { text: "2.1.7.	in the case of an unemployed learner, receive the agreed workplace-based learning programme allowance for the duration of the learning programme; and", fontSize: 10},
      { text: "2.1.8.	raise grievances in writing with the SETA concerning any shortcomings in the quality of the education and training under the workplace based learning programme.", fontSize: 10},
      " ",
      { text: "2.2	Duties of the learner", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The learner must:", fontSize: 10},
      { text: "2.2.1.	carry out all related work experience activities specified in the workplace-based learning programme;", fontSize: 10},
      { text: "2.2.2.	comply with the employer’s workplace policies and procedures;", fontSize: 10},
      { text: "2.2.3.	be available for, and participate in, all knowledge, practical skills and work experience activities required by the workplace- based learning programme; ", fontSize: 10},
      { text: "2.2.4.	complete timesheets and projects, and participate in all internal assessment activities that are required for the final external summative assessment at the end of the workplace-based learning programme; and", fontSize: 10},
      { text: "2.2.5.	be available for the final external summative assessment of occupational competence on the date and place scheduled.", fontSize: 10},
      " ",
      { text: "2.3	Rights of the Employer", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The employer has the right to require the learner to:", fontSize: 10},
      { text: "2.3.1.	perform lawful duties in terms of this agreement; and", fontSize: 10},
      { text: "2.3.2.	comply with the rules and regulations concerning the employer’s workplace policies and procedures.", fontSize: 10},
      " ",
      { text: "2.4	Duties of the Employer", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The Employer Must: ", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "2.4.1.	comply with all duties in terms of the Act and applicable legislation including those listed hereunder unless other legislation exists that is applicable to the employer specifically:", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "2.4.1.1.	Basic Conditions of Employment Act, 1997 (Act 75 of 1997);", fontSize: 10},
      { text: "2.4.1.2.	Labour Relations Act, 1995 (Act 66 of 1995);", fontSize: 10},
      { text: "2.4.1.3.	Employment Equity Act, 1998 (Act 55 of 1998);", fontSize: 10},
      { text: "2.4.1.4.	Occupational Health and Safety Act, 1993 (Act 85 of 1993) of Mine Health and Safety Act, 1996 (Act 27 of 1996);", fontSize: 10},
      { text: "2.4.1.5.	Compensation for Occupational Injuries and Diseases Act, 1993 (Act 130 of 1993); and", fontSize: 10},
      { text: "2.4.1.6.	Unemployment Insurance Act, 1996 (Act 30 of 1996);", fontSize: 10},
      { text: "2.4.2.	provide the facilities and resources required for the work experience components of the workplace-based learning programme;", fontSize: 10},
      { text: "2.4.3.	provide the learner with supervision and mentoring at work;", fontSize: 10},
      { text: "2.4.4.	release the learner during normal working hours to attend off-the-job components of the workplace-based learning programme;", fontSize: 10},
      { text: "2.4.5.	complete the learner’s work records;", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "2.4.6.	keep up to date records of workplace learning and periodically discuss progress with the learner and the provider;", fontSize: 10},
      { text: "2.4.7.	if the learner was not in the employment of the employer at the time of concluding this agreement, the employer must:", fontSize: 10},
      { text: "2.4.7.1.	enter into a contract of employment with the learner for the duration of the learning programme;", fontSize: 10},
      { text: "2.4.7.2.	advise the learner of the terms and conditions of his or her employment, including the learner allowance;", fontSize: 10},
      { text: "2.4.7.3.	advise the learner of the employers workplace policies and procedures;", fontSize: 10},
      { text: "2.4.7.4.	pay the learner on time the agreed learner allowance for the duration of the learning programme; and", fontSize: 10},
      { text: "2.4.7.5.	apply the same disciplinary, grievance and dispute resolution procedures to the learner as to any other employee.", fontSize: 10},
      { text: "2.4.8.	submit the signed learning programme agreement to the SETA for registration.", fontSize: 10},
      " ",
      { text: "2.5	Rights of the Provider", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The provider has the right to access the learner’s work experience records.", fontSize: 10},
      " ",
      { text: "2.6	Duties of the Provider", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "The provider must:", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "2.6.1.	provide the knowledge and practical skills components specified in the work-based learning programme;", fontSize: 10},
      { text: "2.6.2.	provide the learner support as required by the workplace-based learning programme;", fontSize: 10},
      { text: "2.6.3.	record, monitor and retain details of the education and training provided to the learner in terms of the workplace-based learning programme and periodically discuss and record progress with the learner and the employer;", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "2.6.4.	conduct internal assessments for the knowledge and practical skills components specified in the workplace-based learning programme; and", fontSize: 10},
      { text: "2.6.5.	issue statement of results.", fontSize: 10},
      " ",
      { text: "3.	Completion or termination of this agreement", style: "left" , alignment: 'left', color: '#977949', fontSize: 12},
      { text: "3.1.	This workplace based learning programme agreements is completed:", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "3.1.1.	on the date as stipulated in this agreement as completion date; or", fontSize: 10},
      { text: "3.1.2.	on an earlier date is the learner has successfully completed the final external summative assessment and fulfilled all requirements associated with the specified workplace experience activities of the work-based learning programme.", fontSize: 10},
      " ",
      { text: "3.2.	This workplace based learning programme agreement is terminated if:", style: "left" , alignment: 'left', color: '#977949', fontSize: 11},
      { text: "3.2.1.	the learner is fairly dismissed by the employer for a reason related to the learner’s conduct or capacity as an employee; or", fontSize: 10},
      { text: "3.2.2.	the SETA approves the termination of the agreement in terms of the SETA Workplace-Based Learning Programme Regulations.", fontSize: 10},
      " ",
      " ",
      { text: "DETAILS OF THE LEARNING PROGRAMME AND THE PARTIES TO THIS AGREEMENT", style: "header" , alignment: 'center', fontSize: 16},
      " ",
      { text: "Please Take Note Of The Following: ", style: "header" , alignment: 'center', color: '#977949', fontSize: 12},
      " ",
      { text: "•	If the learner is not already in the employ of the employer, the learner and the employer must conclude a contract of employment;", fontSize: 10},
      " ",
      { text: "•	If the learner is an unmarried person under 18 years then the learner’s parents or guardian must be a party to this agreement and must complete Section 2. The parent or guardian ceases to be a party to this agreement once the learner turns 18; ", fontSize: 10},
      " ",
      { text: "•	If a group of employers is party to this agreement, one of the employers must perform the function of a lead employer. The lead employer must complete Section 3. Details of the other employers must be attached on a  separate sheet; and", fontSize: 10},
      " ",
      { text: "•	If a group of providers is party to this agreement, one of them must perform the function of lead provider. The lead provider must be accredited for the relevant curriculum components and must complete Section 4. Details of the other providers must be attached on a separate sheet.", fontSize: 10},
      " ",
      " ",
      {text: 'Learner Details', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Learner's full name : " + fulnames,
          fontSize: 10
      },
      " ",
      {
        text:
          "Nationality : " + this.selectDropdownOptionsNationality.description,
          fontSize: 10
          ,
      },  
      " ",
      {
        text:
          "ID number / passport number : "  + identnumber,
          fontSize: 10
      },
      " ",
      {
        text:
        "Date of birth : " + this.personalBirthdayDisplay.toLocaleDateString(),
          fontSize: 10
      },
      " ",
      {
        text:
          "Gender : " + this.selectedgender.genderName ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Equity : " + this.selectedequity.description ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Disability : " + disabledness,
          fontSize: 10
      },
      " ",
      {
        text:
          "Disability status : " + tempdisability,
          fontSize: 10
      },
      " ",
      {
        text:
          "Learner Qualification : " + this.selectedqualificationlevel.description + " at " + this.selectedschoolatended.schoolName,
          fontSize: 10
      }, 
      " ",
      {
        text:
        "Home Address : " + this.Address + " " + this.Address1 + " " + this.Address2 + " " + this.Postalcode + " " + homprovince + " " + homemunicipality + " " +homedestric + " " + hometown,
          fontSize: 10
        },
      " ",
      {
        text:
        "Postal Address : " + this.Postal + " " + this.Postal1 + " " + this.Postal2 + " " + this.pPostalcode + " " + postalprovince + " " + postalmunicipality + " " + postaldestric + " " + postaltown,
          fontSize: 10
      },
      " ",
      {
        text:
          "Cell phone : " + cellnumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "E-mail Address : " + primeeail,
          fontSize: 10
      },
      " ",
      {
        text:
          "Home Languages : " + homelangs,
          fontSize: 10
      },
      " ",
      {
        text:
          "Other Languages : " + langs,
          fontSize: 10
      },
      " ",
      {text: 'Next Of Kin / Guardian', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Full name : " + NOK + " " + NOKLastName,
          fontSize: 10
      },
      " ",
      {
        text:
          "Contact number : " + NOKcellphone,
           fontSize: 10
      },
      " ",
      {
        text:
          "Email Address : " + NOKemail,
           fontSize: 10
      },
      " ",
      " ",
      {text: 'Employer Details', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Employer name : " + employername,
          fontSize: 10

      },
      " ",
      {
        text:
          "Employer trading name : " + tradingname,
          fontSize: 10
      },
      " ",
      {
        text:
          "Company approval number : " + registrationnumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "Approving by SETA : " + registeredAt,
          fontSize: 10
      },
      " ",
      {
        text:
          "Approval date : " + singleProviderApprovalDate,
          fontSize: 10
      },
      " ",
      {
        text:
          "Review date : Not Available" ,
          fontSize: 10
      },
      " ",
      {
        text:
          "SDL number : " + comlevynumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "Organisation Type  : " + orgaType,
          fontSize: 10
      },
      " ",
      {
        text:
          "SIC Code  : " + empSIC,
          fontSize: 10
      },
      " ",
      {
        text:
          "Is this employer liable for Skills Development Levy  : " + sdlLiability,
          fontSize: 10
      },
      " ",
      {
        text:
          "Registered SETA : " + registeredAt,
          fontSize: 10
      },
      " ",
      {
        text:
          "Physical Address : " + comaddress,
          fontSize: 10
      },
      " ",
      {
        text:
          "Postal Address : " + compostaladdress,
          fontSize: 10
      },
      " ",
      {
        text:
          "Telephone number : " + comptelnumber ,
          fontSize: 10
      },
      " ",
      {
        text:
        "Fax number : " + empfax,
          fontSize: 10
      },
      " ",
      {
        text:
          "E-mail address : " + compemail,
          fontSize: 10
      },
      " ",
      {text: 'Employer Details Contact Person', style: 'header',	color: '#977949', fontSize: 12},

      {
        text:
          "Full name : " + this.personname + " " + this.personlastname,
          fontSize: 10
      },
      " ",
      {
        text:
          "Cellphone number : " + this.personcellnumber,
           fontSize: 10
      },
      " ",
      {
        text:
          "Telephone number : " + this.persontelnumber,
           fontSize: 10
      },
      " ",
      {
        text:
          "Email Address : " + this.personemail,
           fontSize: 10
      },
      " ",
      {
        text:
          "Designation : " + this.pDesignation,
           fontSize: 10
      },
      " ",
      " ",
      {text: 'Host Employer Details', style: 'header',	color: '#977949', fontSize: 12},

      {
        text:
          "Is the Host Emplyer Involved : " + varHostEmailOption,
          fontSize: 10
      },
      " ",
      {
        text:
           "Host Employer Levy Number: " +  varHostLevy,
           fontSize: 10
      },
      " ",
      {
        text:
           "Host Employer Name : " + varHostName,
           fontSize: 10
      },
      " ",
      {
        text:
           "Does this employer have host sites : " + varHostSites,
           fontSize: 10
      },
      " ",
      {
        text:
          "Host Site Name: " + varHostSiteName,
          fontSize: 10
      },
      " ",
      " ",
      {text: 'Provider details', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Provider name : " + pname,
          fontSize: 10
      },
      " ",
      {
        text:
          "Provider trading name : " + ptradingname ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Accreditation number : " + accrednumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "Accreditation council : Not Available" ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Accreditation council review : Not Available" ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Accreditation Status : " + this.laccredstatus,
          fontSize: 10
      },
      " ",
      {
        text:
          "Accreditation Type : " + this.laccredtyep ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Review Date : " + this.lreviewdate,
          fontSize: 10
      },
      " ",
      {
        text:
          "SIC code : " + providerSICcode,
          fontSize: 10
      },
      " ",
      {
        text:
          "SDL number : " + sdlnumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "Is this provider liable for Skills Development Levy : " + sdlLiability,
          fontSize: 10
      },
      " ",
      {
        text:
          "Registered SETA : " + providerRegisteredAt ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Physical Address : " + this.provideraddress,
          fontSize: 10
      },
      " ",
      {
        text:
          "Postal Address : " + this.providerPostalAddress,
          fontSize: 10
      },
      " ",
      {
        text:
          "Telephone number : " + ptelnum,
          fontSize: 10
      },
      " ",
      {
        text:
          "Fax number : " + pfaxnumber,
          fontSize: 10
      },
      " ",
      {
        text:
          "E-mail address : " + pemailadd,
          fontSize: 10
      },
      " ",
      {text: 'Provider Contact Person Details', style: 'header',	color: '#977949', fontSize: 12},

      {
        text:
          "Full name : " + this.lfirstname + " " + this.llastname,
          fontSize: 10
      },
      " ",
      {
        text:
          "Contact number : " + this.lcellnumber,
           fontSize: 10
      },
      " ",
      {
        text:
          "Email Address : " + this.lemail,
           fontSize: 10
      },
      " ",
      " ",

      {text: 'Contract of Employment Status', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Is this contract specific to the period of employment? : "  + this.checkedeContractofEmploymen,

          fontSize: 10
      },
      " ",
      {
        text:

          "Was a copy created for the learner? : Yes" ,
          fontSize: 10
      },
      " ",
      " ",
      " ",
      {text: 'Workbased learning programme', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Workbased learning programme: "+ this.selectedprogramtype.description ,
          fontSize: 10
      },
      " ",
      " ",
      {text: 'SETA responsible for agreement', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:

          "SETA responsible for agreement: " + providerRegisteredAt,
          fontSize: 10
      },
      " ",
      // {text: 'Learning Programme Details', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Qualification or part qualification title associated with agreement if applicable: "+ this.selectedlearnership.qualificationTitle ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Qualification or part qualification SAQA ID number associated with agreement if applicable: " + this.selectedlearnership.saqaQualificationId ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Qualification MerSETA Funded: " + this.checkedfunded ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Curriculum registration number associated with the agreement :" + selectedLearnershipOFOCode ,
          fontSize: 10
      },
      " ",
      {
        text:
          "QCTO appointed Assessment Quality partner(AQP) associated with the workplace-based agreement: Not Available " ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Agreement start date(date SETA registers the agreement): "+ varcommence.toLocaleDateString() ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Agreement end date (subject to number of credits of qualification or part qualification or duration of curriculum): "+ varcomplete.toLocaleDateString() ,
          fontSize: 10
      },
      " ",
      {
        text:
          "Designation registered with SAQA if applicable: Not Available" ,
          fontSize: 10
      },
      " ",
      " ",
      {text: 'SIGNATORIES', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Learner Full Name :  ____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Signature :  _____________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Date :  __________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Signature :  _____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Date :  ___________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      " ",
      {text: 'PARENT OR GUARDIAN SIGNATURES (IF LEARNER IS A MINOR)', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Learner Full Name :  ____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Signature :  _____________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Date :  __________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Signature :  _____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Date :  ___________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      " ",
      {text: 'EMPLOYER LEAD OR EMPLOYER SIGNATURE', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Learner Full Name :  ____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Signature :  _____________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Date :  __________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Signature :  _____________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Date :  ___________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      " ",
      {text: 'PROVIDER LEAD OR EMPLOYER SIGNATURE', style: 'header',	color: '#977949', fontSize: 12},
      {
        text:
          "Learner Full Name :  ______________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Signature :  _______________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Date :  ________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Signature :  _______________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Witness Date :  _____________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      " ",
      { text: "SETA OFFICIAL USE ONLY", style: "header" , alignment: 'center', fontSize: 16},
      {
        text:
          "Workplace based Learning Programme Agreement Number :  ______________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Conditional placement date (Regulation 6(1)) :  _____________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Registration date of the agreement (Regulation 10 (1)) :  ____________________________________________________________________",
          fontSize: 10
      },
      " ",
      {text: 'SETA official approved by the CEO to register Workplace Based Learning programme Agreements.', style: 'header',	color: '#977949', fontSize: 12},
      " ",
      {
        text:
          "Name :  ____________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Disignation :  ________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      {
        text:
          "Signature :  __________________________________________________________________________________________________________________",
          fontSize: 10
      },
      " ",
      " ",

    ],

    styles: {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 11,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      }	,defaultStyle: {
        fontSize: 10
      }
    }
  };

  pdfMake.createPdf(docDefinition).download("Wbl Agreement.pdf");
  this.messageService.add({severity:'success', summary: 'Success', detail: 'WBL Has Been Generated And Downloaded Onto Your Device'});
  setTimeout(() => {
    console.log('sleep');
    this.messageService.clear();
  }, 4000);
}


//////////////////////////////////////////////Get Learner Details/////////////////////////////////////////////////////////

}
