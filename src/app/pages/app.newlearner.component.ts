import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {state, style, trigger} from '@angular/animations';
import { DisabilityRating } from '../model/disabilityrating';
import { Disabilitystatus } from '../model/disabilitystatus';
import { TvetFetQualification } from '../model/tvetFetQualification';
import { Highestqualificationrequired } from '../model/highestqualificationrequired';
import { Region } from '../model/region';
import { RegionTown } from '../model/regiontown';
import { PreviousSchools } from '../model/priviouschools';
import { LangLook } from '../model/langlook';
import { OfoCodes } from '../model/ofocodes';
import { Learnership } from '../model/learnership';
import { SaqaQualification } from '../model/Saqa.model';
import { StatssaAreaCode } from '../model/statsareacode';
import { Town } from '../model/town.model';
import { Province } from '../model/province';
import { Municipality } from '../model/municipality';
import { Language } from '../model/langauges';
import { Task } from '../model/task';
import { MersetaService } from '../service/merseta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedFunctions } from '../shared/shared-functions';
import { SharedService } from '../variables/global';
import { FormControl, FormGroup,ReactiveFormsModule, Validators  } from '@angular/forms';



@Component({
    selector: 'app-newlearner',
    templateUrl: './app.newlearner.component.html',
    animations: [
        trigger('tabBar', [
            state('register', style({
                width: '13.3333%',
                left: '0'
            })),
            state('tier', style({
                width: '13.3333%',
                left: '33.3333%'
            })),
            state('payment', style({
                width: '13.3333%',
                left: '66.6667%'
            })),
            state('learner', style({
                width: '13.3333%',
                left: '0%'
            })),
            state('languages', style({
                width: '13.3333%',
                left: '33.3333%'
            })),
            state('learnqual', style({
                width: '13.3333%',
                left: '33.3333%'
            })),
            state('nextofkin', style({
                width: '13.3333%',
                left: '66.6667%'
            })),
            state('homeaddress', style({
                width: '13.3333%',
                left: '99.6667%'
            })),
            state('postaladdress', style({
                width: '13.3333%',
                left: '0'
            })),
            state('employmentstatus', style({
                width: '13.3333%',
                left: '33.3333%'
            })),
            state('contofemployemnent', style({
                width: '13.3333%',
                left: '66.6667%'
            })),
            state('employerdetails', style({
                width: '13.3333%',
                left: '99.6667%'
            })),
            state('employercontperson', style({
                width: '13.3333%',
                left: '0'
            })),
            state('empphysicaladdress', style({
                width: '13.3333%',
                left: '33.3333%'
            })),
            state('empostaladdress', style({
                width: '13.3333%',
                left: '66.6667%'
            })),
            state('provdetails', style({
                width: '13.3333%',
                left: '99.6667%'
            })),
            state('learnprogram', style({
                width: '13.3333%',
                left: '0'
            })),
            state('appdocuments', style({
                width: '13.3333%',
                left: '33.3333%'
            })),

        ])
    ]
})
export class AppNewlearnerComponent implements OnInit{

    // OLD TEMPLATE VALUES
    activeTab = 'register';
    activeCard = '';
    dropdownOptions1: SelectItem[];
    dropdownOptions2: SelectItem[];
    dropdownOptions3: SelectItem[];
    dropdownOptions4: SelectItem[];
    dropdownOptions5: SelectItem[];
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
    selectDropdownOptions1: any;
    selectDropdownOptions2 = null;
    selectDropdownOptions22 = null;
    selectDropdownOptions23 = null;
    selectDropdownOptions24 = null;
    selectedLearningprogram = null;
    qaulificationidmod : any;
    selectDropdownOptionsNationality : any;
    birthdate: Date;
    checked = false;
    valRadio: string;
    valRadios: string;
    valRadioss: string;
    valRadioqual1: string;
    valRadioqual2: string;
    valRadioqual3: string;
    valRadionqf1: string;
    valRadionqf2: string;
    radioButton1: string;
    uploadedFiles: any[] = [];
    value10: any;
   // END OF NEW TEMPLATE

   // for experimental
 experimentalDefID : string = "Usecase001.Experimental";
 existingDefID :  string = "Usecase001.ExistingLearner";
 private temid : string;
 private tempname : string;
 Thankyou : string = "";

 disabilityrating: DisabilityRating[];
 disabilitystatus: Disabilitystatus[];
 tvetfetqualification: TvetFetQualification[];
 highestqualification: Highestqualificationrequired[];
 region: Region[];
 regiontown: RegionTown[];
 prevschools: PreviousSchools[];
 langlook: LangLook[];
 ofocodes: OfoCodes[];
 learnership: Learnership[];
 templearnership: Learnership[];
 saqaQual : SaqaQualification;

 statshome: StatssaAreaCode[];

 //for home
 towns: Town[];
 provinces: Province[];
 municipalities: Municipality[];
 temptown: Town[];
 tempprovinces: Province[];
 tempmunicipalities: Municipality[];

 //for postal
 ptowns: Town[];
 pprovinces: Province[];
 pmunicipalities: Municipality[];

 ptemptown: Town[];
 ptempprovinces: Province[];
 ptempmunicipalities: Municipality[];

  //for phyical address employer
  physicaltowns: Town[];
  physicalprovinces: Province[];
  physicalmunicipalities: Municipality[];

  physicaltemptown: Town[];
  physicaltempprovinces: Province[];
  physicaltempmunicipalities: Municipality[];

   //for postal address employer
   empostaltowns: Town[];
   empostalprovinces: Province[];
   empostalmunicipalities: Municipality[];

   empostaltemptown: Town[];
   empostaltempprovinces: Province[];
   empostaltempmunicipalities: Municipality[];
   langauges: Language[] = [];

  proccessID : string = "";
  workItemId : string = "";
  isDisabled :boolean = false;
  selected : string ="";
  selectedPronvince : string ="";
  nationvalue : string ="";
  isDisabledNext :boolean = false;
  workitemtinstance : any[];
  taskidInstance : any[];
  task = new Task;
  langtoadd = new Language;
  cellnumber : string;
  telnumber :string;
  name :string;
  surname:string;
  midname:string;
  Identificationid : string;
  Address: string;
  Address1:string;
  Address2:string;
  Area: string;
  Postalcode:string;
  Pronvince:string;
  Postal: string;
  Postal1: string;
  Postal2: string;
  Postal3:string;
  postArea:string;
  nextofkin:string;
  primeemail:string;
  secondemail:string;
  nextofkinlastname:string;
  nextofkinemailaddress:string;
  nextofkincelphone:string;
  datebirth: string;
  formFields : any[];
  base64: string = "Base64...";
  fileSelected?:Blob;
  inputGroupFile01?: string;
  selectedgender : string ="";
  selectedequity : string ="";

  selectedlanguage : string ="";
  checkedread : boolean = false;
  checkedwrite : boolean = false;
  checkedspeak : boolean = false;
  checkedhomelangauge :boolean = false;

  checkedagreementyes : boolean = false;
  checkedemploymentyes : boolean = false;
  quallastschooldateyear : string ="";
  selectedtvet : string ="";
  selectedofo : string ="";
  selecteddisabilitytype : string ="";
  selecteddisabilitylevel : string ="";
  selectuserTittle : string ="";
  selectedqualificationlevel : string ="";
  selectuserTittlecont : string ="";
  selectedorganization : string ="";

  checkedEmploymentyes : string ="false";
  checkedEmploymentno : string ="false";
  checkedeContractofEmploymenyes : boolean = false;
  checkecopyofcontractyes : boolean = false;
  checkednqlalignedyes : boolean = false;
  checkedfundedyes : boolean = false;

  //address info
  selectedHomeMuni : string ="";
  selectedHomeTown : string ="";
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
  selectedschoolatended : string ="";

  selectedPostalDestrict : string ="";
  selectedhomeDestrict : string ="";

  //provider details
  selectedAccstatus: string ="";
  selectedAcctype: string ="";
  selectedisability: string ="";
  checkedtvetqual: boolean = false;

  //
  selectedphysical: string ="";
  selectedphysicalpostal: string ="";
  selectedstatpostal: string ="";
  selectedstathome: boolean = false;


  //Disable Buttons
  isDisabledNat :boolean = false;
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
  learnq : string = '<span class="text-green-500 font-medium">Learning Program details successfully submitted!</span>';
  ContractofEmployment_html : string = '<span class="text-green-500 font-medium">Contract of Employment successfully submitted!</span>';
  ContactPerson_html : string = '<span class="text-green-500 font-medium">Employer Contact Person successfully submitted!</span>';
  employerpostaladdress_html : string = '<span class="text-green-500 font-medium">Employer Postal Address successfully submitted!</span>';
  employerphysicaladdress_html : string = '<span class="text-green-500 font-medium">Employer Physical Adrress successfully submitted!</span>';
  providerdetails_html : string = '<span class="text-green-500 font-medium">Provider Details Adrress successfully submitted!</span>';
  documents_html : string = '<p-tag styleClass="mr-2" severity="success" value="Application Documents successfully submitted!"></p-tag>';

  // for employer and person of contact
  employername : string ="";
  trainingname : string ="";
  emptelnumber : string ="";
  empfaxnumber : string ="";
  emregnumber : string ="";
  levynumber : string ="";
  numofemployee : string ="";
  siccode : string ="";
  organizationtype : string ="";
  emptemail  : string ="";

  //person of contact
  persontitle : string ="";
  personname : string ="";
  personlastname : string ="";
  personidnumber : string ="";
  personemail : string ="";
  personcellnumber : string ="";
  persontelnumber : string ="";
  persontaxnumber : string ="";
  pDesignation : string ="";

  selectedprogramtype : string ="";
  selectedlearnership : string ="";
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

    //postal address
    epAddress:  string ="";
    epAddress1:  string ="";
    epAddress2:  string ="";
    epPostalcode: string ="";
    epArea:  string ="";

    // provider
    lprovidername: string ="";
    lfirstname:string ="";
    llastname: string ="";
    lemail: string ="";
    lcellnumber: string ="";
    ltellnumber:string ="";
    lfaxnumber: string ="";
    lsiccode: string ="";
    lregistereat:string ="";
    laccnumber: string ="";

    constructor(private mersetaservice: MersetaService,private sant:DomSanitizer,private sharedService: SharedService,private shared: SharedFunctions) {
        this.dropdownOptions1 = [
            {label: 'Select Time Zone', value: null},
            {label: 'UTC-12.00', value: {id: 1, name: 'UTC-12.00', code: '-12'}},
            {label: 'UTC-11.00', value: {id: 2, name: 'UTC-11.00', code: '-11'}},
            {label: 'UTC-10.00', value: {id: 3, name: 'UTC-10.00', code: '-10'}},
            {label: 'UTC-09.30', value: {id: 4, name: 'UTC-09.30', code: '-93'}},
            {label: 'UTC-09.00', value: {id: 5, name: 'UTC-09.00', code: '-09'}},
            {label: 'UTC-08.00', value: {id: 6, name: 'UTC-08.00', code: '-08'}},
            {label: 'UTC-07.00', value: {id: 7, name: 'UTC-07.00', code: '-07'}},
            {label: 'UTC-06.00', value: {id: 8, name: 'UTC-06.00', code: '-06'}},
            {label: 'UTC-05.00', value: {id: 9, name: 'UTC-05.00', code: '-05'}},
            {label: 'UTC-04.00', value: {id: 10, name: 'UTC-04.00', code: '-04'}},
            {label: 'UTC-03.30', value: {id: 11, name: 'UTC-03.30', code: '-33'}},
            {label: 'UTC-03.00', value: {id: 12, name: 'UTC-03.00', code: '-03'}},
            {label: 'UTC-02.00', value: {id: 13, name: 'UTC-02.00', code: '-02'}},
            {label: 'UTC-01.00', value: {id: 14, name: 'UTC-01.00', code: '-01'}},
            {label: 'UTC-+00.00', value: {id: 15, name: 'UTC-+00.00', code: '-00'}},
            {label: 'UTC+01.00', value: {id: 16, name: 'UTC+01.00', code: '+01'}},
            {label: 'UTC+02.00', value: {id: 17, name: 'UTC+02.00', code: '+02'}},
            {label: 'UTC+03.00', value: {id: 18, name: 'UTC+03.00', code: '+03'}},
            {label: 'UTC+03.30', value: {id: 19, name: 'UTC+03.30', code: '+33'}},
            {label: 'UTC+04.00', value: {id: 20, name: 'UTC+04.00', code: '+04'}},
            {label: 'UTC+04.30', value: {id: 21, name: 'UTC+04.30', code: '+43'}},
            {label: 'UTC+05.00', value: {id: 22, name: 'UTC+05.00', code: '+05'}},
            {label: 'UTC+05.30', value: {id: 23, name: 'UTC+05.30', code: '+53'}},
            {label: 'UTC+05.45', value: {id: 24, name: 'UTC+05.45', code: '+54'}},
            {label: 'UTC+06.00', value: {id: 25, name: 'UTC+06.00', code: '+06'}},
            {label: 'UTC+06.30', value: {id: 26, name: 'UTC+06.30', code: '+63'}},
            {label: 'UTC+07.00', value: {id: 27, name: 'UTC+07.00', code: '+07'}},
            {label: 'UTC+08.00', value: {id: 28, name: 'UTC+08.00', code: '+08'}},
            {label: 'UTC+08.45', value: {id: 29, name: 'UTC+08.45', code: '+84'}},
            {label: 'UTC+09.00', value: {id: 30, name: 'UTC+09.00', code: '+09'}},
            {label: 'UTC+09.30', value: {id: 31, name: 'UTC+09.30', code: '+93'}},
            {label: 'UTC+10.00', value: {id: 32, name: 'UTC+10.00', code: '+10'}},
            {label: 'UTC+10.30', value: {id: 33, name: 'UTC+10.30', code: '+13'}},
            {label: 'UTC+11.00', value: {id: 34, name: 'UTC+01.00', code: '+11'}},
            {label: 'UTC+12.00', value: {id: 35, name: 'UTC+01.00', code: '+12'}},
            {label: 'UTC+12.45', value: {id: 36, name: 'UTC+01.00', code: '+24'}},
            {label: 'UTC+13.00', value: {id: 37, name: 'UTC+01.00', code: '+13'}},
            {label: 'UTC+14.00', value: {id: 38, name: 'UTC+01.00', code: '+14'}},
        ];

        this.dropdownOptions2 = [
            {label: 'South Africa', value: "South Africa"},
            {label: 'Other', value: "Other"}
        ];

        this.dropdownOptions3 = [
            {label: 'Mr', value: null},
            {label: 'Mrs', value: null}
        ];
        this.dropdownOptions4 = [
            {label: 'Male', value: null},
            {label: 'Female', value: null},
            {label: 'Other', value: null}
        ];
        this.dropdownOptions5 = [
            {label: 'Black', value: null},
            {label: 'Coloured', value: null},
            {label: 'Indian', value: null},
            {label: 'White', value: null},
            {label: 'Other', value: null},
            {label: 'Unkonwn', value: null}
        ];

        this.dropdownOptions15 = [
            {label: 'Full Accreditation', value: 1},
            {label: 'Non-active', value: 2},
            {label: 'Provisional Accreditation', value: 3},
            {label: 'Application', value: 4},
        ];

        this.dropdownOptions17 = [
            {label: 'Pivotal', value: 0},
            {label: 'Non-pivotal training', value: 1}
        ];

        this.dropdownOptions18 = [
            {label: 'NQF L4 or higher Learnership', value: 0}
        ];

        this.dropdownOptions16 = [
            {label: 'Primary Accreditation (accreditation for merSETA scope qualification/s)', value: 0},
            {label: 'Re-Accreditation or Re-Approval', value: 1},
            {label: 'Extension of Accreditation (merSETA Providers)', value: 2},
            {label: 'Learning Programme Approval (non-merSETA primary provider)', value: 3},
            {label: 'QCTO Skills Development Provider', value: 4},
            {label: 'QCTO Trade Test Centre', value: 5},
            {label: 'Non-merSETA Scope Provider', value: 6},
            {label: 'Training and Assessment OR Assessment Only Site', value: 7},
            {label: 'Extension of Scope, Re-accreditation/Re-approval or Learning Programme Approval', value: 8}
        ];

        this.dropdownOptions6 = [
            {label: 'Yes', value: null},
            {label: 'No', value: null}
        ];

        this.dropdownOptions14 = [
            {label: 'MERSETA - Manufacturing, Engineering and Related Services Education and Training Authority', value: 0}
        ];
        this.dropdownOptions7 = [
            {label: 'Brocken Leg', value: null},
            {label: 'Missing Arm', value: null}
        ];
        this.dropdownOptions8 = [
            {label: 'All of it gone', value: null},
        ];
        this.dropdownOptions9 = [
            {label: 'English', value: null},
            {label: 'Afrikaans', value: null},
            {label: 'Zulu', value: null},
            {label: 'Sotho', value: null}
        ];

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
        this.dropdownOptions11 = [
            {label: 'High School', value: null},
            {label: 'Colledge', value: null}
        ];
        this.dropdownOptions12 = [
            {label: 'TVET/FET 1', value: null},
            {label: 'TVET/FET  2', value: null}
        ];
        this.dropdownOptions13 = [
            {label: 'code 0001', value: null},
            {label: 'code 0002', value: null},
            {label: 'code 0003', value: null},
            {label: 'code 0004', value: null},
        ];
    }

    clickNext(step) {
        this.activeTab = step;
    }

    selectTier(card) {
        this.activeCard = card;
        this.activeTab = 'appdocuments';
    }

    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles[0] = file;
        }
    }

    onBasicUpload(event) {

    }

    ngOnInit(): void {
        //this.getProcessID();
        this.getAllTowns();
        this.getAllPronvinces();
        this.getAllMunicipalities();
        this.getAllLanguages();
        this.getAllDisabilityStatus();
        this.getAllDisabilityRating();
        this.getAllTvet();
        this.getAllSchools();
        this.getAllOfoCodes();
        this.getAllLearnership();
        this.getAllStats();
    }

    //// FORM GROUPS /////
    /////////////////////////////////////

  IdentificationFormGroupd = new FormGroup({
    Identificationid: new FormControl("",[ Validators.required,
    ]),
  });

  LearnerdetailsnFormGroupd2 = new FormGroup({
    personalBirthday: new FormControl(),
  });

  LearnerdetailsnFormGroupd = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    surname: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    cellnumber: new FormControl("", [ Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
  ]),
    telnumber: new FormControl("", [ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    primeemail: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern(this.shared.REGEX_PATTERNS.emailPattern),
    ]),
    secondemail: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern(this.shared.REGEX_PATTERNS.emailPattern),
    ]),
    tittle: new FormControl("", [
      Validators.required,
    ]),
    datebirth: new FormControl("", Validators.required,),
    midname:new FormControl()
  });


  QualificationFormGroupd = new FormGroup({
    quallastschooldateyear :new FormControl(""),
  });

  NextOfKinFormGroupd  = new FormGroup({
    nextofkin: new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    nextofkincelphone: new FormControl("", [ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    nextofkinlastname: new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    nextofkinemailaddress: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern(this.shared.REGEX_PATTERNS.emailPattern),
    ]),
  });

  HomeAddressFormGroupd = new FormGroup({
    Address: new FormControl("", [
      Validators.required,
    ]),
    Address1: new FormControl("", [
      Validators.required,
    ]),
    Address2: new FormControl(),
    Area: new FormControl("", [
      Validators.required,
    ]),
    Postalcode: new FormControl("", [
      Validators.required,
    ]),
  });

  PostalAddressFormGroupd = new FormGroup({
    Postal: new FormControl("",[
      Validators.required,
    ]),
    Postal1: new FormControl("",[
      Validators.required,
    ]),
    Postal2: new FormControl("",[
      Validators.required,
    ]),
    Postal3: new FormControl(),
    postArea: new FormControl("",[
      Validators.required,
    ]),
  });

  EmployerFormGroup = new FormGroup({
    employername : new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    trainingname :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    emptelnumber :  new FormControl("",[ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    empfaxnumber :  new FormControl("",[ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    emregnumber :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500),
    ]),
    levynumber :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(500),
    ]),
    numofemployee :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
     // Validators.pattern(this.shared.REGEX_PATTERNS.numericOnlyPattern),
      Validators.maxLength(500),
    ]),
    organizationtype :  new FormControl("",[
      Validators.required,
    ]),
    siccode :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      //Validators.pattern(this.shared.REGEX_PATTERNS.numericOnlyPattern),
      Validators.maxLength(500),
    ]),
    emptemail :  new FormControl("",[
      Validators.required,
      Validators.email,
      Validators.pattern(this.shared.REGEX_PATTERNS.emailPattern),
    ]),

  });

  personofcontacFormGroup = new FormGroup({
    persontitle :  new FormControl("" ,[Validators.required]),
    personname :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    personlastname :  new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(this.shared.REGEX_PATTERNS.textOnlyPattern),
      Validators.maxLength(500),
    ]),
    personidnumber :  new FormControl("",[ Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13),
      Validators.pattern(this.shared.REGEX_PATTERNS.numericOnlyPattern),
    ]),
    personemail :  new FormControl("",[
      Validators.required,
      Validators.email,
      Validators.pattern(this.shared.REGEX_PATTERNS.emailPattern),
    ]),
    personcellnumber :  new FormControl("",[ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    persontelnumber :  new FormControl("",[ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    persontaxnumber : new FormControl("",[ Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(this.shared.REGEX_PATTERNS.telNoPattern),
    ]),
    pDesignation : new FormControl("")
  });


  EmployerphysicaladdressFormGroupd = new FormGroup({
    eAddress: new FormControl(""),
    eAddress1: new FormControl(""),
    eAddress2: new FormControl(""),
    ePostalcode: new FormControl(""),
    eArea: new FormControl("")
  });

EmployerPostaladdressFormGroupd = new FormGroup({
    epAddress: new FormControl(""),
    epAddress1: new FormControl(""),
    epAddress2: new FormControl(""),
    epPostalcode: new FormControl(""),
    epArea: new FormControl("")
  });

  ProviDetailsFormGroup = new FormGroup({
    lprovidername: new FormControl(""),
    lfirstname: new FormControl(""),
    llastname: new FormControl(""),
    lemail: new FormControl(""),
    lcellnumber: new FormControl(""),
    ltellnumber: new FormControl(""),
    lfaxnumber: new FormControl(""),
    lsiccode: new FormControl(""),
    lreviewdate: new FormControl(""),
    lregistereat: new FormControl(""),
    laccnumber: new FormControl("")
  });

  LearnerqualificationFormGroupd = new FormGroup({
    saqaid : new FormControl("",[ Validators.required,
    ]),
    coomencedate : new FormControl("",[ Validators.required,
    ]),
    completedate : new FormControl("",[ Validators.required,
    ]),
  });


  /////// ONCHANGE FUNCTION//////////////////////
  ///////////////////////////////////////
  onChange(): void {
    console.log("country : ", this.selectDropdownOptionsNationality)
    this.nationvalue = this.selectDropdownOptionsNationality;
  }

  onChanges(): void {
    console.log("Program : ", this.selectedLearningprogram)
    this.selectedlearnership = this.selectedLearningprogram;
    this.Showvalue();
  }
  Showvalue() {
    var learn =  this.learnership.filter(x => x.id == this.selectedlearnership)[0];
    this.getSaqa(learn.qualificationId);
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
                console.log("id = " + this.sharedService.PROCESS_ID)
            }
             //console.log(response)
           }
        );
       // return this.sharedService.PROCESS_ID;
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

      getNextTask() {
        this.getWorkItem(this.proccessID)
        if(this.task.task_form == "learner_Postal") {
          this.getProcessID(this.existingDefID)

        }else {
          this.getWorkItem(this.proccessID)
        }

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

      CompleTask(id,body)  {
        this.mersetaservice.completeTasks(id,body)
        .subscribe(
           response => {
            // this.proccessID = response;
             console.log(response)
             console.log("Complete Task Response = " + response);
             this.getNextTask();
           }
        );
      }

       /// END JBPM ////
    /// END  /////
    /// /////////////////////////


    //// BUTTON CLICKS ///
    //////////////////////////////////
    ////////////////////////////////
    public submitdetails() {

       // console.log(this.selectDropdownOptions2);
        //this.isDisabledNext = true;
         var fieldnae  = "Nationality"
         var object = {};
         object[fieldnae] = this.nationvalue ;
         this.StartTask(this.task.task_id,object);
         document.getElementById("Nation_html").innerHTML = this.nation;
         this.isDisabledNat = true;
      }

    public StartRegistration() {
        this.getProcessID(this.experimentalDefID);
        //console.log("pr_id "+process_id);
        //var task_id = this.getWorkItem(this.getProcessID);

    }

    public submitIdentification() {
        var val = this.IdentificationFormGroupd.value["Identificationid"];
        console.log(val);
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

         this.StartTask(this.task.task_id,object);
         document.getElementById("Identif_html").innerHTML = this.idorpas;
         this.isDisabledIde = true;
         this.temid = " " + val;
         document.getElementById("appinfomation").innerHTML = "Application for " +  this.temid;
      }

      public submitLeanerDetails () {
        var name = this.LearnerdetailsnFormGroupd.value["name"];
        var surname = this.LearnerdetailsnFormGroupd.value["surname"];
        var cellnumber = this.LearnerdetailsnFormGroupd.value["cellnumber"];
        var telnumber = this.LearnerdetailsnFormGroupd.value["telnumber"];
        var primaryemail = this.LearnerdetailsnFormGroupd.value["primeemail"];
        var secondayemail = this.LearnerdetailsnFormGroupd.value["secondemail"];
        var dateofbirth = this.LearnerdetailsnFormGroupd.value["datebirth"];
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

        var object = {};
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
        object[fieldnae10] = this.selecteddisabilitylevel;
        object[fieldnae11] = this.selectuserTittle;

        this.StartTask(this.task.task_id,object);
        document.getElementById("Learn_html").innerHTML = this.learndet;
        this.isDisabledLea = true;
        this.tempname = name  + " " + surname;
        this.Thankyou = name  + " " + surname;
        document.getElementById("appinfomation").innerHTML = "Application for " +   this.tempname +" (" + this.temid +")" ;
      }

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
        this.StartTask(this.task.task_id,object);
        document.getElementById("lang_html").innerHTML = this.langdet;
        this.isDisabledLan = true;
      }

      public submitQualification() {

        var isworkbased = 0;
        var isemplayerform = 0;

        if(this.checkedemploymentyes) {
          isemplayerform = 1;
        }else {
          isemplayerform = 0;
        }

        if(this.checkedagreementyes)  {
          isworkbased = 0;
        }else {
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

        if(this.checkedtvetqual) {
          istved = 1;
        }else {
          istved = 0;
        }

        var object = {};
        object[fieldnae] = isemplayerform;
        object[fieldnae1] = isworkbased;
        object[fieldnae2] = this.selectedqualificationlevel;
        object[fieldnae3] = this.selectedschoolatended;
        object[fieldnae4] = this.QualificationFormGroupd.value["quallastschooldateyear"];
        object[fieldnae5] = istved ;
        object[fieldnae6] = this.selectedtvet ;
        object[fieldnae7] = this.selectedofo ;
        object[fieldnae8] = "" ;

        this.StartTask(this.task.task_id,object);
        document.getElementById("qualification_html").innerHTML = this.quald;
        this.isDisabledqual = true;
      }


  public submitnextofkin() {

    var nextofkin = this.NextOfKinFormGroupd.value["nextofkin"];
    var nextofkinemail = this.NextOfKinFormGroupd.value["nextofkinemailaddress"];
    var nextofkinlastname = this.NextOfKinFormGroupd.value["nextofkinlastname"];
    var nextofkincelphone = this.NextOfKinFormGroupd.value["nextofkincelphone"];
    var fieldname  = "NextofKin";
    var fieldname1  = "NextofKinEmail";
    var fieldname2  = "NextofKinLastName";
    var fieldname3  = "NextOfKinTelephone";
    var object = {};

    object[fieldname] = nextofkin ;
    object[fieldname1] = nextofkinemail ;
    object[fieldname2] = nextofkinlastname ;
    object[fieldname3] = nextofkincelphone;

    this.StartTask(this.task.task_id,object);
    document.getElementById("kin_html").innerHTML = this.nxtkind;
    this.isDisabledKin = true;
  }

  public submitHomeAdrress() {
    var Address = this.HomeAddressFormGroupd.value["Address"];
    var address1 = this.HomeAddressFormGroupd.value["Address1"];
    var address2 = this.HomeAddressFormGroupd.value["Address2"];
    var Area = this.HomeAddressFormGroupd.value["Area"];
    var Postalcode = this.HomeAddressFormGroupd.value["Postalcode"];
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
    object[fieldnae4] = this.selectedstathome ;
    object[fieldnae5] = Postalcode ;
    object[fieldnae6] = this.selectedPronvince ;
    object[fieldnae7] = this.selectedHomeMuni ;
    object[fieldnae8] = Area ;
    object[fieldnae9] = false ;


    this.StartTask(this.task.task_id,object);
    document.getElementById("home_html").innerHTML = this.homadd;
    this.isDisabledHom = true;
    console.log(this.selectedHomeMuni +","+ this.selectedHomeTown);
  }

  public submitPostalAdrress() {
    var Postal = this.PostalAddressFormGroupd.value["Postal"];
    var Postal1 = this.PostalAddressFormGroupd.value["Postal1"];
    var Postal2 = this.PostalAddressFormGroupd.value["Postal2"];
    var Postalcode = this.PostalAddressFormGroupd.value["Postal3"];
    var areas = this.PostalAddressFormGroupd.value["postArea"];
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
    object[fieldnae4] = this.selectedstatpostal;
    object[fieldnae5] = this.selectedpostalPronvince;
    object[fieldnae6] = this.selectedpostalMuni;
    object[fieldnae7] = areas;

    this.StartTask(this.task.task_id,object);
    document.getElementById("post_html").innerHTML = this.postadd;
    this.isDisabledPos = true;
  }


  public submitEmployementStatus() {
    var fieldnae  = "Employed"

    if(this.checkedEmploymentyes == "option1") {
           this.isemployed = true
    }else if (this.checkedEmploymentno == "option2") {
           this.isemployed = false;
    }

    var object = {};
    object[fieldnae] =  this.isemployed;
    this.StartTask(this.task.task_id,object);
    document.getElementById("empstatus_html").innerHTML = this.empstatus;
    this.isDisabledempstatus = true;
   }

   public submitContractofEmployment() {
    var fieldnae  = "EmploymentSpecifictothePeriod"
    var fieldnae1  = "CopyOftheContractOfEmployment"
    var contract = 0;
    var copyof = 0;

    if(this.checkedeContractofEmploymenyes) {
        contract = 1;
    }else {
      contract = 0;
    }

    if(this.checkecopyofcontractyes) {
      copyof = 1;
    }else {
      copyof = 0;
    }


    var object = {};
    object[fieldnae] =  contract;;
    object[fieldnae1] =  copyof;

    this.StartTask(this.task.task_id,object);
    document.getElementById("ContractofEmployment_html").innerHTML = this.ContractofEmployment_html;
    this.isDisableContract = true;

   }


   public submitEmployerDetails() {

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

    var ename = this.EmployerFormGroup.value["employername"];
    var etname = this.EmployerFormGroup.value["trainingname"];
    var etnumber = this.EmployerFormGroup.value["emptelnumber"];
    var efaxnumber = this.EmployerFormGroup.value["empfaxnumber"];
    var eregnumber = this.EmployerFormGroup.value["emregnumber"];
    var elevy = this.EmployerFormGroup.value["levynumber"];
    var enumemploye = this.EmployerFormGroup.value["numofemployee"];
    var eiccode = this.EmployerFormGroup.value["siccode"];
    var orgtype = this.selectedorganization;
    var orgemail = this.EmployerFormGroup.value["emptemail"];

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


    this.StartTask(this.task.task_id,object);
    document.getElementById("employerdet_html").innerHTML = this.empdet;
    this.isDisabledemdet = true;
   }


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

    var ptitle = this.personofcontacFormGroup.value["persontitle"];
    var pname = this.personofcontacFormGroup.value["personname"];
    var plname = this.personofcontacFormGroup.value["personlastname"];
    var pidnumber = this.personofcontacFormGroup.value["personidnumber"];
    var pemail = this.personofcontacFormGroup.value["personemail"];
    var pcellnum = this.personofcontacFormGroup.value["personcellnumber"];
    var ptelnumber = this.personofcontacFormGroup.value["persontelnumber"];
    var pafaxnum = this.personofcontacFormGroup.value["persontaxnumber"];
    var pdesig = this.personofcontacFormGroup.value["pDesignation"];

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


    this.StartTask(this.task.task_id,object);
    document.getElementById("ContactPerson_html").innerHTML = this.ContactPerson_html;
    this.isDisabledcontperson= true;

   }

   public submitEmployerPhysicalAdrress() {

    var Address = this.EmployerphysicaladdressFormGroupd.value["eAddress"];
    var address1 = this.EmployerphysicaladdressFormGroupd.value["eAddress1"];
    var address2 = this.EmployerphysicaladdressFormGroupd.value["eAddress2"];
    var Area = this.EmployerphysicaladdressFormGroupd.value["eArea"];
    var Postalcode = this.EmployerphysicaladdressFormGroupd.value["ePostalcode"];
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


    this.StartTask(this.task.task_id,object);
    document.getElementById("employerphysicaladdress_html").innerHTML = this.employerphysicaladdress_html;
    this.isDisabledempphysical = true;
  }

  public submitEmployerPostalAdrress() {
    var Address = this.EmployerPostaladdressFormGroupd.value["epAddress"];
    var address1 = this.EmployerPostaladdressFormGroupd.value["epAddress1"];
    var address2 = this.EmployerPostaladdressFormGroupd.value["epAddress2"];
    var Area = this.EmployerPostaladdressFormGroupd.value["epArea"];
    var Postalcode = this.EmployerPostaladdressFormGroupd.value["epPostalcode"];
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



    this.StartTask(this.task.task_id,object);
    document.getElementById("employerpostaladdress_html").innerHTML = this.employerpostaladdress_html;
    this.isDisabledemppostal = true;

  }

  public submitProviderDetails() {

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

    var ProviderName = this.ProviDetailsFormGroup.value["persontitle"];
    var Firstname = this.ProviDetailsFormGroup.value["personname"];
    var Lastname = this.ProviDetailsFormGroup.value["personlastname"];
    var Email = this.ProviDetailsFormGroup.value["personidnumber"];
    var CellNumber = this.ProviDetailsFormGroup.value["personemail"];
    var TelNumber = this.ProviDetailsFormGroup.value["personcellnumber"];
    var FaxNumber = this.ProviDetailsFormGroup.value["persontelnumber"];
    var ReviewDate = this.ProviDetailsFormGroup.value["persontaxnumber"];
    var SICCode = this.ProviDetailsFormGroup.value["pDesignation"];
    var SETARegisteredAt = this.ProviDetailsFormGroup.value["persontelnumber"];
    var AccreditationNumber = this.ProviDetailsFormGroup.value["persontaxnumber"];

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


    this.StartTask(this.task.task_id,object);
    document.getElementById("providerdetails_html").innerHTML = this.providerdetails_html;
    this.isDisabledprovider = true;
   }


  public submiLearnershipQualification() {

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
    var ismersetafunded = 0;

    var ename = this.LearnerqualificationFormGroupd.value["saqaid"];
    var etname = this.LearnerqualificationFormGroupd.value["coomencedate"];
    var etnumber = this.LearnerqualificationFormGroupd.value["completedate"];

    if(this.checkednqlalignedyes) {
      isnqfaligfned = 1;
    }else {
      isnqfaligfned = 0;
    }

    if(this.checkedfundedyes) {
      ismersetafunded = 1;
    }else {
      ismersetafunded = 0;
    }

    var object = {};
    object[fieldnae] = this.selectedprogramtype;
    object[fieldnae1] = this.selectedlearnership;
    object[fieldnae2] = this.selectedpivnon;
    object[fieldnae3] = isnqfaligfned;
    object[fieldnae4] = ename;
    object[fieldnae5] = etname;
    object[fieldnae6] = etnumber;
    object[fieldnae7] = ismersetafunded;

    this.StartTask(this.task.task_id,object);
    document.getElementById("learnqualification_html").innerHTML = this.learnq;
    this.isDisabledlearn = true;
  }


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
  getAllMunicipalities() {
    this.mersetaservice.getAllMunicipalities()
    .subscribe(
       response => {
         this.tempmunicipalities = response;
         this.ptempmunicipalities = response;
         this.physicaltempmunicipalities = response;
         this.empostaltempmunicipalities = response;

         this.municipalities = this.tempmunicipalities;
         this.pmunicipalities = this.ptempmunicipalities;
         this.physicalmunicipalities = this.physicaltempmunicipalities;
         this.empostalmunicipalities = this.empostaltempmunicipalities;

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
       }
    );
  }
  getAllDisabilityRating() {
    this.mersetaservice.getAllDisabilityRating()
    .subscribe(
       response => {
         this.disabilityrating = response;
         console.log(response);
       }
    );
  }

  getAllLanguages() {
    this.mersetaservice.getAllLanguages()
    .subscribe(
       response => {
         this.langlook = response;
         console.log(response);
       }
    );
  }

  getAllOfoCodes() {
    this.mersetaservice.getAllOfoCodes()
    .subscribe(
       response => {
         this.ofocodes = response;
         console.log(response);
       }
    );
  }

  getAllSchools() {
    this.mersetaservice.getAllPreiviouschools()
    .subscribe(
       response => {
         this.prevschools = response;
         console.log(response);
       }
    );
  }

  getAllTvet() {
    this.mersetaservice.getAllTvetqualification()
    .subscribe(
       response => {
         this.tvetfetqualification = response;
         console.log(response);
       }
    );
  }

  getAllLearnership() {
    this.mersetaservice.getAllLearnership()
    .subscribe(
       response => {
         this.templearnership = response;
         this.learnership =  this.templearnership;
         console.log(response);
       }
    );
  }

  getAllStats() {
    this.mersetaservice.getAllStatsArea()
    .subscribe(
       response => {
         this.statshome = response;
         console.log(response);
       }
    );
  }

  getSaqa(id) {
    this.mersetaservice.getSaqaQualification(id)
    .subscribe(
       response => {
         this.saqaQual = response;
         this.LearnerqualificationFormGroupd.controls.saqaid.setValue('('+this.saqaQual.qualificationid +') ' + this.saqaQual.qualificationtitle);
         this.qaulificationidmod = "(" +this.saqaQual.qualificationid +") " + this.saqaQual.qualificationtitle;
         console.log(response);
       }
    );
  }

}
