import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/model/users.model";
import { Company } from "src/app/model/company.model";
import { SaqaQualification } from "src/app/model/Saqa.model";
import { CompLearner } from "src/app/model/complearner.model";
import { Funding } from "src/app/model/funding.model";
import { Work_item_instance } from "src/app/model/work-item-instance";
import { AddressModel } from "src/app/model/addressmodel";
import { Province } from "src/app/model/province";
import { Town } from "src/app/model/town.model";
import { Municipality } from "src/app/model/municipality";
import { DisabilityRating } from "src/app/model/disabilityrating";
import { Disabilitystatus } from "src/app/model/disabilitystatus";
import { TvetFetQualification } from "src/app/model/tvetFetQualification";
import { Highestqualificationrequired } from "src/app/model/highestqualificationrequired";
import { Region } from "src/app/model/region";
import { RegionTown } from "src/app/model/regiontown";
import { PreviousSchools } from "src/app/model/priviouschools";
import { LangLook } from "src/app/model/langlook";
import { OfoCodes } from "src/app/model/ofocodes";
import { Learnership } from "src/app/model/learnership";
import { StatssaAreaCode } from "src/app/model/statsareacode";
import { Program } from "src/app/model/program";
import { SdfCompany } from "src/app/model/sdfcompany";
import { SicCode } from "src/app/model/siccode";
import { TrainingProvider } from "src/app/model/trainingprovider";
import { UserTaks } from "../model/usertasks";
import { Comments } from "../model/coments";
import { ConfigDoc } from "../model/configdoc";
import { LearnerDoc } from "../model/learnerdoc";
import { DocByte } from "../model/docbyte";
import { IDType } from 'src/app/model/idtype.model'; //added
import {Residentialstatus} from 'src/app/model/residentialstatus.model'; //added
import { BehaviorSubject } from "rxjs";
import { Language } from 'src/app/model/langauges';

//import { RejectionReason } from '../model/rejectionreason.model';
//import { LearnerprogramIndicator } from '../model/learnerprogramindicator.model';

import { RecomendationComment } from "src/app/model/recomendation-comment.model";
import { RejectionReason } from "../model/rejectionreason";
import { LearnerprogramIndicator } from "../model/learnerprogramindicator";

//import { RecomendationComment } from '../model/recomendation-comment.model';

//import { RejectionReason } from '../model/rejectionreason.model';

//import { LearnerprogramIndicator } from '../model/learnerprogramindicator.model';
import { tap } from "rxjs/operators";
import { AssessorList } from "../model/assessorlist";
import { SaqaUnitStandards } from "../model/saqaunitstandards";
import { QualificationUnitStandards } from "../model/qualificationunitstandards";
import { LearnerQual } from "../model/learnerqual";
import { CompanyApproved } from "../model/companyApproved";
import { Designation } from "../model/designation";
import { SummativeAssessmentReport } from "../model/summativeassessmentreport";
import { SmmativeAssessmentReportUnitstandards } from "../model/summativeassessmentreportunitstandards";
import { Learner_achievement_status } from "../model/learner_achievement_status";
import { AssessmentProcessBatch } from "../model/assessmentprocessbatch";
import { AssessmentProcessBatchDetail } from "../model/assessmentprocessbatchdetail";
import { ProvidersBySDP } from "../model/providerspysdp";
import { SummativeAssessmentLearner } from "../model/summativeassessmentlearne";
import { SystemTasks } from "../model/systemtasks";
import { SiteVist } from "../model/sitevisit";
import { CompanySite } from "../model/companysite";
import { SdPCompany } from "../model/sdpcompany";
import { ExternalModerationQuestion } from "../model/externalmoderationquestion";
import { ExternalModerationQuestionSection } from "../model/externalmoderationquestionsection";
import { AssesorCount } from "../model/assessorcount";
import { ModerationValidation } from "../model/moderationvalidation";
import { SORModel } from "../model/sormodel";
import { MaritalStatus } from "../model/maritalstatus"; //added
import { Gender } from "../model/gender.model"; //added
import { Equity } from "../model/equity.model"; //added
import { Organisationtype } from "../model/organisationtype.model"; //added
import { LearningProgramtype } from "../model/learning-programtype.model"; //added
import { Seta } from "../model/seta.model"; //added
import { Stittle } from "../model/stittle.model"; //added
import { Nationality } from "../model/nationality.model"; //added
import { AssessmentRejectionReason } from "../model/assessmentrejectionreason";
import { AccreditationStatus } from "../model/accstatus";
import { UserLanguages } from "../model/userlanguages";
import { UrbanRural } from "../model/urbunrural";

@Injectable({
    providedIn: "root",
})
export class MersetaService {
    /*getTaskFields(id: any) {
    throw new Error('Method not implemented.');
  }*/
    
  uRoleLifecycle  = localStorage.getItem('uRoleLifecycle');
  uName = localStorage.getItem('uName');
  uEmail = localStorage.getItem('uEmail');
  user_ID = localStorage.getItem('user_ID');
  uUser = localStorage.getItem('currentuser');

 
    Init(): any {
        this.uRoleLifecycle  = localStorage.getItem('uRoleLifecycle');
        this.uName = localStorage.getItem('uName');
        this.uEmail = localStorage.getItem('uEmail');
        this.user_ID = localStorage.getItem('user_ID');
        this.uUser = localStorage.getItem('currentuser');
    }

   
    uRecommendContractNumber: any = null;
 //JBPM IP
    jbpm_ip = "";

    //Alfresco IP
    alfresco_ip = "";

    //SERVER IP
    api_ip = "";

    //API IP
    ip = "https://" + this.api_ip + "";


    proccessid: string = "";

    private editLearnerBehavior = new BehaviorSubject<User>(null);

    editLearner$ = this.editLearnerBehavior.asObservable();

    leanerUrl = this.ip + "/api/User";
    getcompaniesforview = this.ip + "/api/Lookup/GetAllCompanyforview";
    companyUrl = this.ip + "/api/Company";
    companyApprovedUrl = this.ip +"/api/Assessments/AllApprovedProviders";
    companyLeanerUrl = this.ip + "/api/CompanyLeaner?id=";
    userUrl = this.ip + "/api/SingleUser/GetSingleUser?id=";
    saqaUrl = this.ip + "/api/SaqaQualification?id=";
    compUrl = this.ip + "/api/CompLearner?userid=";
    compsinglebyidUrl = this.ip + "/api/CompLearner/GetSingleLearnerById?companyLearnerid=";
    companyLeanerSearchUrl = this.ip + "/api/CompanyLeaner/SearchLearners?";
    interventionUrl = this.ip + "/api/InterventionType?id=";
    FundingnUrl = this.ip + "/api/Fund?id=";
    AddressUrl = this.ip + "/api/Lookup/UserAddress?useraddressid=";

    MunicipilityUrl = this.ip + "/api/Lookup/Municipalities";
    ProvinceUrl = this.ip + "/api/Lookup/Province";
    ImageUploadUrl = "https://" + this.alfresco_ip + ":8081/upload";

    TownUrl = this.ip + "/api/Lookup/Towns";
    disabilitystatusUrl = this.ip + "/api/Lookup/DisabiltyStatus";
    statsSAUrl = this.ip + "/api/JbpmQueries/GetStatsSaAreacode?id=";
    disabilityratingUrl = this.ip + "/api/Lookup/DisabiltyRating";
    designationUrl = this.ip + "/api/Lookup/GetOccupations";
    tvetqualificationUrl = this.ip + "/api/Lookup/TvetFetQualification";
    highestqualificationrequiredUrl =
        this.ip + "/api/Lookup/HighestQualificationRequired";
    regionUrl = this.ip + "/api/Lookup/Region";
    regiontownUrl = this.ip + "/api/Lookup/RegionTown";
    preiviouschoolsUrl = this.ip + "/api/Lookup/PreviousSchools";
    languageslookUrl = this.ip + "/api/Lookup/Languages";
    ofocoidesUrl = this.ip + "/api/Lookup/OfoCode";
    learnershipUrl = this.ip + "/api/Lookup/Learnership";
    LearnershipQualificationsURL = this.ip + '/api/Company/GetCompanyQualification?companyId=';
    statsareaUrl = this.ip + "/api/Lookup/StatssaAreaCode";
    singlecompanyUrl = this.ip + "/api/Lookup/SingleCompany?id=";
    sdpcompanybyuserUrl = this.ip + "/api/User/SDPCompanyByUserId?userId=";
    sdfcompUrl = this.ip + "/api/Lookup/SdfCompany?companyId=";
    siccodesUrl = this.ip + "/api/Lookup/SicCode?scid=";
    trainigprovUrl = this.ip + "/api/TrainingProvider?id=";
    usertasksUrl = this.ip + "/api/Lookup/UserTaks?targetkey=";
    AddcommentUrl = this.ip + "/api/Lookup/Addcomments?";
    commentsUrl = this.ip + "/api/Lookup/ApplicationComments?compid=";
    configdocUrl = this.ip + "/api/Lookup/GetallConfigDoc";
    DocsUrl = this.ip + "/api/Lookup/GetAllLearnerDocs?user_id=";
    DocsModeratortUrl = this.ip + "/api/Lookup/GetModeratorconfigDoc?user_id=";
    DocByteUrl = this.ip + "/api/Lookup/GetAllUserDocuments?doc_id=";
    //-----------------LookUps------------------------------------
    residentialstatusUrl = this.ip + "/api/Lookup/GetAllCitizenResidentStatus";
    idtypeUrl = this.ip + "/api/Lookup/GetAlternativeIdType";
    maritalStatusURL = this.ip + "/api/Lookup/MaritalStatus";
    genderUrl = this.ip + "/api/Lookup/Genders";
    equityUrl = this.ip + "/api/Lookup/GetAllRaces";
    OrganisationUrl = this.ip + "/api/Lookup/OrganizationTypes";
    learningProgramtypeUrl = this.ip + "/api/Lookup/LearningPrograms";
    setaUrl = this.ip + "/api/Lookup/Setas";
    titleUrl = this.ip + "/api/Lookup/GetAllTitles";
    nationalityUrl = this.ip + "/api/Lookup/Countries";
    accreditationstatusURL = this.ip + "/api/Lookup/GetAllAccreditationStatus";
    //-----------------end lookup---------------------------------

    rejectionreasonUrl = this.ip + "/api/RejectionReason/RejectReason";
    learnerprogramindicatorurl =
        this.ip + "/api/Indicator/LearnerProgramIndicator?id=";

    recomurl = this.ip + "/api/Lookup/LearnerApplicationLifecycle?apcomID=";
    addrecomurl = this.ip + "/api/Lookup/ApprovalComments?";

    Learner_achievement_status = this.ip + "/api/Lookup/Learner_achievement_status";

    startproccessinstance =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/processes/";
    GetWorkItemID =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/processes/instances/";
    GetTaskId =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/queries/tasks/instances/workitem/";
    StartTask =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/tasks/";
    CompleteTask =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/tasks/";
    ProcessList =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/processes/instances?page=0&pageSize=40&sortOrder=true";
    GetTaskFields =
        "http://wbadmin:wbadmin@" +
        this.jbpm_ip +
        ":8080/kie-server/services/rest/server/containers/Usecase001_1.0.0-SNAPSHOT/forms/tasks/";

    //////////////////////////////////////////////////////////// START API LEARNERSHIP CALLS ///////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    Addpersonurl = this.ip + "/api/JbpmQueries/Register?origin=123";
    AddAddressUrl = this.ip + "/api/JbpmQueries/Address";
    AdduserlanguagesUrl = this.ip + "/api/JbpmQueries/UserLanguages";
    AddCompanyUrl = this.ip + "/api/JbpmQueries/AddCompany";
    AddcompanyLearnerUrl = this.ip + "/api/JbpmQueries/AddCompanyLearner";
    updatecompanyleanerurl =
        this.ip + "/api/JbpmQueries/UpdateCompanyLearner?id=";
    updateuseraddressurl = this.ip + "/api/JbpmQueries/UpdateUserAddress?id=";
    updatecompanyaddressurl =
        this.ip + "/api/JbpmQueries/UpdateCompanyAddress?id=";
    updateNextofkinUrl = this.ip + "/api/JbpmQueries/UpdateNextofKin?id=";
    addLanguageUrl = this.ip + "/api/JbpmQueries/UserLanguages";
    updateemployerurl = this.ip + "/api/JbpmQueries/UpdateCompanyEmnployer?id=";
    updatecontracturl = this.ip + "/api/JbpmQueries/UpdateOfContract?id=";
    getupdatecontracturl = this.ip + "/api/JbpmQueries/GetCopyofcontract?id=";
    addsdfurl = this.ip + "/api/JbpmQueries/AddSdfCompany";
    Allcompanysdp = this.ip + "/api/company/LearnershipProviders";
    getuserlanguagesUrl = this.ip + "/api/JbpmQueries/GetUsersLanguages?Userid=";
    ////////////////////////////////////////////////////////////END API LEARNERSHIP CALLS ///////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////// ASSESSMENT ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    submitsummativeassessmentUrl = this.ip + "/api/Assessments/SaveSummativeAssessmentReport";
    submitsummativeassessmenUnitStandardtUrl = this.ip + "/api/Assessments/SaveSummativeAssessmentReportUnitStandard";
    getsubmitsummativeassessmentUrl = this.ip + "/api/Assessments/GetSummativeAssessmentReport?qualificationId=";
    getsubmitsummativeassessmenUnitStandardtUrl = this.ip + "/api/Assessments/GetSummativeAssessmentReportUnitStandard?id=";
    getsummativebyqulcompUrl = this.ip + "/api/Assessments/GetSummativeAssessmentReportByQualificationCompany?qualificationId=";
    submitassessmentprocessbatchUrl = this.ip + "/api/Assessments/SaveAssessmentProcessBatch";
    submitassessmentprocessbatchDetailsUrl = this.ip + "/api/Assessments/SaveAssessmentProcessBatchDetail";
    getAssessmentProcessBatchUrl = this.ip + "/api/Assessments/GetAssessmentProcessBatch?actionuserid=";
    getAssessmentProcessBatchDetailUrl = this.ip + "/api/Assessments/GetAssessmentProcessBatchDetail?assbacthid=";
    getCompanyQualificationByCompanyIdUrl = this.ip + "/api/Company/CompanyQualificationByCompanyId?companyId=";
    getSummativeAssessmentLearnerReporUrl = this.ip + "/api/Assessments/GetSummativeAssessmentLearnerReport?CompanyId=";
    getSingleAssessmentProcessBatchUrl = this.ip + "/api/Assessments/GetSingleAssessmentProcessBatch?assessment_bacth_id=";
    getexternalmoderationquestionUrl = this.ip + "/api/Assessments/GetExternalModerationQuestion";
    getexternalmoderationquestionsectionUrl = this.ip + "/api/Assessments/GetExternalModerationQuestionSection";
    getassessmentuserUrl = this.ip + "/api/SingleUser/GetAssessmentUser?assessmentid=";
    getassessorCountUrl = this.ip + "/api/Assessments/GetNumberOfAssessors?reportid=";
    getAssessmentRejectionReasosnsUrl = this.ip + "/api/Assessments/GetExternalModRejectionReasons";
    submitaveAssessmentBatchRejectionReasonUrl = this.ip + "/api/Assessments/SaveAssessmentBatchRejectionReason";
    getuserrejectionreasonsurl = this.ip + "/api/Assessments/GetAssessmentBatchRejectionReason?id=";
    getbacthsumativeassessmetreportUrl = this.ip + "/api/SingleUser/GetSummativeReportList?assessmentid=";
    ////////////////////////////////// END ASSESSMENT //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////

    AuthUrl = this.ip + "/api/User/Authenticate";
    forgotPassURL = this.ip + "/api/User/ForgotPassword";
    resetURL = this.ip + "/api/User/ResetPassword";

    ////////////////////////////////////////// START PROVIDER BY SDP /////////////////////////////////////////
    getproviderbySdpURL = this.ip + "/api/Assessments/ProvidersBySDP?id=";
    getproviderbyIdUrl = this.ip + "/api/Assessments/GetProvierByID?companyid=";
    ////////////////////////////////////////// END PROVIDER BY SDP /////////////////////////////////////////

    ////////////////////////////////////////// START TASKS ///////////////////////////////////////////////////
    getAssessmentTasksUrl = this.ip + "/api/Task/GetAGetAssessmentTasks";
    createassessmenttaskUrl = this.ip + "/api/Task/CreateBacthModerationTask";
    updatetaskStatusUrl = this.ip + "/api/Task/UpdateTaskStatus?taskid=";
    createtaskuserUrl = this.ip + "/api/Task/CreateTaskUser";
    getUserTasksUrl = this.ip + "/api/Task/GetuserTasks?userid=";
    getsingleTaskUrl = this.ip + "/api/Task/GetSingleTasks?taskid=";
    ///////////////////////////////////////// END TASKS  ////////////////////////////////////////////////////

     ////////////////////////////////////////// SITE TASKS ///////////////////////////////////////////////////
     createsitevisitUrl = this.ip + "/api/Site/CreateSiteVisit";
     getsitevisitUrl = this.ip + "/api/Site/GetSiteVisit?assessmentbacthid=";
     getcompanysiteUrl = this.ip + "/api/Site/getCompanySite?companyid=";
     ///////////////////////////////////////// SITE TASKS  ////////////////////////////////////////////////////

      ////////////////////////////////////////// EXTERNAL MODERATION ///////////////////////////////////////////////////
      submitExternalmoderationValidationUrl = this.ip + "/api/Assessments/SaveExternalModeationValidation";
      submitExternalmoderationValidationChecklistUrl = this.ip + "/api/Assessments/SaveExternalModeationValidationChecklist";
      getExternalmoderationValidationUrl = this.ip + "/api/Assessments/GetExternalModerationValidation?id=";
      getSORUrl = this.ip + "/api/Assessments/GetLearnerSOR?CompanyLearnerId=";
      geturnanorruralurl = this.ip + "/api/Lookup/GetAllUrbanRural";
      ///////////////////////////////////////// EXTERNAL MODERATION  ////////////////////////////////////////////////////

    register(body:any) {
        return this.http.post(this.ip + '/ApplicationUser/Register', body);
      }

      //WBL Document Situation
      createdocument(id) {
        return this.http.post('http://154.127.114.58/advancedreports/wbl.aspx?user_ID=' + id, '');
      }

      getdocument(id) {
        return this.http.post('http://154.127.114.58/Documents/wbl' + id+'.pdf' ,'');
      }

      //Update Learner Status
      updateStatus(id, body){
        return this.http.put(this.ip+'/api/CompanyLeaner/UpdateCompanyLearnerStatus?id=' +id+'&status='+body, '');
      }

      updateCompanyEmployer(id, body){
        return this.http.put(this.ip+'/api/CompanyLeaner/UpdateCompanyId?companyId=' +id+'&companyLearnerId='+body, '');
      }

      //////////////////////////////// Assessor Information ///////////////////////////////
    assessorlistUrl = this.ip + "/api/Assessments/GetallAssessors?qulificationid=";
    unistandardsUrl = this.ip + "/api/Assessments/GetAllUnitStandardsByQualification?id=";
    moderatorlistUrl = this.ip + "/api/Assessments/GetallModerators?qulificationid=";
    learnerqualUrl = this.ip + "/api/Assessments/GetLearnerQualification?learnersipId=";
    getsdpcompanyUrl = this.ip + "/api/Lookup/GetSdpCompany?sdpid=";
    ///////////////////////////////////////////////// End Assessment//////////////////////////

    constructor(private http: HttpClient) {}
    //// new two
    //
    getAllrecommendationcomment(recid): Observable<RecomendationComment[]> {
        return this.http.get<RecomendationComment[]>(this.recomurl + recid);
    }
    AddApprovalcomments(val,body): any {
        return this.http.post<any[]>(this.addrecomurl +val, body);
    }
    //added rejection reason
    getAllRejectionReason(): Observable<RejectionReason[]> {
        return this.http.get<RejectionReason[]>(this.rejectionreasonUrl);
    }
    getAllLearnerInduction(): Observable<LearnerprogramIndicator[]> {
        return this.http.get<LearnerprogramIndicator[]>(
            this.learnerprogramindicatorurl + '1'
        );
    }
    //--------------------lookups-----------------------------------
    getMaritalStatus(): Observable<MaritalStatus[]>{
        return this.http.get<MaritalStatus[]>(this.maritalStatusURL);
    }
    getGender(): Observable<Gender[]>{
        return this.http.get<Gender[]>(this.genderUrl);
    }

    getResidentialstatus(){
        return this.http.get<Residentialstatus[]>(this.residentialstatusUrl);

    }
    //-----Getting ID Types ----------
    getIDtype(): Observable<IDType[]>{
        return this.http.get<IDType[]>(this.idtypeUrl);

    }
    getRace(): Observable<Equity[]>{
        return this.http.get<Equity[]>(this.equityUrl);
    }
    getOrganasationType(): Observable<Organisationtype[]>{
        return this.http.get<Organisationtype[]>(this.OrganisationUrl);
    }
    getlearningProgramtype(): Observable<LearningProgramtype[]>{
        return this.http.get<LearningProgramtype[]>(this.learningProgramtypeUrl);
    }
    getSeta(): Observable<Seta[]>{
        return this.http.get<Seta[]>(this.setaUrl);
    }
    getTitle(): Observable<Stittle[]>{
        return this.http.get<Stittle[]>(this.titleUrl);
    }
    getNationality(): Observable<Nationality[]>{
        return this.http.get<Nationality[]>(this.nationalityUrl);
    }

    getAccreditation(): Observable<AccreditationStatus[]>{
        return this.http.get<AccreditationStatus[]>(this.accreditationstatusURL);
    }
    //// 

    ///////////////////////START API METHOS ///////////////////////
    AddPerson(body): any {
        return this.http.post<any>(this.Addpersonurl, body);
    }
    AddAddress(body): any {
        return this.http.post<any>(this.AddAddressUrl, body);
    }
    Adduserlanguages(body): any {
        return this.http.post<any>(this.AdduserlanguagesUrl, body);
    }
    AddcompanyLearner(body): any {
        return this.http.post<any>(this.AddcompanyLearnerUrl, body);
    }
    AddCompany(body): any {
        return this.http.post<any>(this.AddCompanyUrl, body);
    }
    updatecompanyleaner(body, id): any {
        return this.http.post<any>(this.updatecompanyleanerurl + id, body);
    }
    updateuseraddress(body, id): any {
        return this.http.post<any>(this.updateuseraddressurl + id, body);
    }
    updatecompanyaddress(body, id): any {
        return this.http.post<any>(this.updatecompanyaddressurl + id, body);
    }
    updateNextofkin(body, id): any {
        return this.http.post<any>(this.updateNextofkinUrl + id, body);
    }
    updateEmployer(body, id): any {
        return this.http.post<any>(this.updateemployerurl + id, body);
    }
    updatecontract(body, id): any {
        return this.http.post<any>(this.updatecontracturl + id, body);
    }

    AddSdfCompany(body): any {
        return this.http.post<any>(this.addsdfurl, body);
    }
    AddLanguage(body):Observable<Language[]> {
        return this.http.post<Language[]>(this.addLanguageUrl, body);
    }
    ///////////////////////END API METHOS ///////////////////////

    getCopyOfContract( id): any {
        return this.http.get<any>(this.getupdatecontracturl + id);
    }
    
    getAllDisabilityRating(): Observable<DisabilityRating[]> {
        return this.http.get<DisabilityRating[]>(this.disabilityratingUrl);
    }

    getAllDesignation(): Observable<Designation[]> {
        return this.http.get<Designation[]>(this.designationUrl);
    }
    getAllDisabilitySatus(): Observable<Disabilitystatus[]> {
        return this.http.get<Disabilitystatus[]>(this.disabilitystatusUrl);
    }

    getSTATS(id): Observable<any> {
        return this.http.get<any>(this.statsSAUrl+id);
    }

    getAllTvetqualification(): Observable<TvetFetQualification[]> {
        return this.http.get<TvetFetQualification[]>(this.tvetqualificationUrl);
    }
    getAllhighestqualificationrequired(): Observable<
        Highestqualificationrequired[]
    > {
        return this.http.get<Highestqualificationrequired[]>(
            this.highestqualificationrequiredUrl
        );
    }

    getAllDocBytes(doc_id): Observable<DocByte> {
        return this.http.get<DocByte>(this.DocByteUrl + doc_id);
    }

    getAllRegion(): Observable<Region[]> {
        return this.http.get<Region[]>(this.regionUrl);
    }

    getAllComments(complearnid): Observable<Comments[]> {
        return this.http.get<Comments[]>(this.commentsUrl + complearnid);
    }

    getAllRegionTown(): Observable<RegionTown[]> {
        return this.http.get<RegionTown[]>(this.regiontownUrl);
    }

    getAllPreiviouschools(): Observable<PreviousSchools[]> {
        return this.http.get<PreviousSchools[]>(this.preiviouschoolsUrl);
    }

    getAllLanguages(): Observable<LangLook[]> {
        return this.http.get<LangLook[]>(this.languageslookUrl);
    }

    getAllOfoCodes(): Observable<OfoCodes[]> {
        return this.http.get<OfoCodes[]>(this.ofocoidesUrl);
    }

    getAllUserTaks(targetkey): Observable<UserTaks[]> {
        return this.http.get<UserTaks[]>(this.usertasksUrl + targetkey);
    }

    getAllDocConfig(): Observable<ConfigDoc[]> {
        return this.http.get<ConfigDoc[]>(this.configdocUrl);
    }

    getAllDocs(user_id, target_id): Observable<LearnerDoc[]> {
        return this.http.get<LearnerDoc[]>(
            this.DocsUrl + user_id + "&target_key=" + target_id
        );
    }

    getAllLearnership(): Observable<Learnership[]> {
        return this.http.get<Learnership[]>(this.learnershipUrl);
    }
    getAllLearnershipQualification(id:any): Observable<Learnership[]> {
        return this.http.get<Learnership[]>(this.LearnershipQualificationsURL + id);
    }
    getAllStatsArea(): Observable<StatssaAreaCode[]> {
        return this.http.get<StatssaAreaCode[]>(this.statsareaUrl);
    }
    //// end new
    getAllMunicipalities(): Observable<Municipality[]> {
        return this.http.get<Municipality[]>(this.MunicipilityUrl);
    }

    getAllTowns(): Observable<Town[]> {
        return this.http.get<Town[]>(this.TownUrl);
    }

    getAllProvinces(): Observable<Province[]> {
        return this.http.get<Province[]>(this.ProvinceUrl);
    }

    getSingleUserAddress(id): Observable<AddressModel> {
        return this.http.get<AddressModel>(this.AddressUrl + id);
    }

    getSicCode(id): Observable<SicCode> {
        return this.http.get<SicCode>(this.siccodesUrl + id);
    }

    getSingleCompany(id): Observable<Company> {
        return this.http.get<Company>(this.singlecompanyUrl + id);
    }

    getSingleCompanyByUser(id): Observable<any> {
        return this.http.get<any>(this.sdpcompanybyuserUrl + id);
    }

    getSingleCompanySite(id): Observable<Company[]> {
        return this.http.get<Company[]>(this.ip +'/api/Site/getCompanySite?companyid='+ id);
    }

    getLearnerByID(id): Observable<any> {
        return this.http.get<any>(this.ip +'/api/User/LearnerByIdNumber?idNumber='+ id);
    }

    getSdfCompany(id): Observable<SdfCompany> {
        return this.http.get<SdfCompany>(this.sdfcompUrl + id);
    }

    getTrainingprovider(id): Observable<TrainingProvider> {
        return this.http.get<TrainingProvider>(this.trainigprovUrl + id);
    }

    getTaskFields(taskId): any {
        return this.http.get<any>(
            this.GetTaskFields +
                taskId +
                "?lang=en&type=ANY&marshallContent=true",
            {}
        );
    }

    startTasks(taskId): any {
        return this.http.put<any>(
            this.StartTask + taskId + "/states/started",
            {}
        );
    }

    Addcomments(val, body): any {
        return this.http.post<any[]>(this.AddcommentUrl + val, body);
    }

    uploadlearnershipdocument(body): any {
        return this.http.post<any>(this.ImageUploadUrl, body);
    }

    completeTasks(taskId, body): any {
        return this.http.put<any>(
            this.CompleteTask + taskId + "/states/completed",
            body
        );
    }

    StartProcessInstrance(definationID): any {
        const body = {
            tittle: '{ "age": 25, "person": { "Person": { "name": "john" } }',
        };
        return this.http.post<any>(
            this.startproccessinstance + definationID + "/instances",
            body
        );
    }

    getWorkItemID(processid): Observable<any[]> {
        return this.http.get<any[]>(
            this.GetWorkItemID + processid + "/workitems"
        );
    }

    getTaskID(workitemid): Observable<any[]> {
        return this.http.get<any[]>(this.GetTaskId + workitemid);
    }

    getProcessList(): Observable<any[]> {
        return this.http.get<any[]>(this.ProcessList);
    }

    getAllUSers(): Observable<User[]> {
        return this.http.get<User[]>(this.leanerUrl);
    }

    getAllCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companyUrl);
    }

    getAllApprovedProviders(): Observable<CompanyApproved[]> {
        return this.http.get<CompanyApproved[]>(this.companyApprovedUrl);
    }

    getAllCompaniesview(): Observable<Company[]> {
        return this.http.get<Company[]>(this.getcompaniesforview);
    }
    getAllCompaniesWithAccreditation(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companyApprovedUrl);
    }

    getAllCompanyLearners(id): Observable<User[]> {
        return this.http.get<User[]>(this.companyLeanerUrl + id);
    }

    getUser(id): Observable<User> {
        return this.http.get<User>(this.userUrl + id);
    }
    getSingleUser(id): Observable<User> {
        return this.http
            .get<User>(this.userUrl + id)
            .pipe(tap((user) => this.editLearnerBehavior.next(user)));
    }

    onDestroy() {
        this.editLearnerBehavior.next(null);
    }
    getSaqaQualification(id): Observable<SaqaQualification> {
        return this.http.get<SaqaQualification>(this.saqaUrl + id);
    }

    getCompLearner(userid, compid): Observable<CompLearner> {
        return this.http.get<CompLearner>(
            this.compUrl + userid + "&companyid=" + compid
        );
    }

    getCompLearnerById(complearnerid): Observable<CompLearner> {
        return this.http.get<CompLearner>(
            this.compsinglebyidUrl + complearnerid
        );
    }

    getLearnerByAlternativeID(id): Observable<any> {
        return this.http.get<any>(this.ip +'/api/User/LearnerAlternativeByIdNumber?alternativeIdNumber='+ id);
    }

    getCompLearnerSearch(userid, compid, region, levyNumber, accreditationNumber, status): Observable<CompLearner> {
        return this.http.get<CompLearner>(
            this.companyLeanerSearchUrl + "companyId=" + compid + "&region=" + region + "&status=" + status
        );
    }

    getCompLearnerSearchFilter(userid, compid, region, levyNumber, accreditationNumber, status): Observable<User> {
        return this.http.get<User>(
            this.companyLeanerSearchUrl + "companyId=" + compid + "&region=" + region + "&status=" + status
        );
    }

    geInterbentiontype(id): Observable<Program> {
        return this.http.get<Program>(this.interventionUrl + id);
    }

    getFunding(id): Observable<Funding> {
        return this.http.get<Funding>(this.FundingnUrl + id);
    }

    forgotPass(email): any {
        //const body = '{"email": '+email+' }';
        return this.http.post<any>(this.forgotPassURL + "?email=" + email, "", {
            responseType: "text" as "json",
        });
    }

    resetPass(oldPassword, otp, newPassword, id) {
        let headers = new HttpHeaders();
        headers = headers.set(
            "Content-Type",
            "application/json; charset=utf-8"
        );
        const body =
            '{ "oldPassword": "' +
            oldPassword +
            '", "otp": "' +
            otp +
            '", "newPassword": "' +
            newPassword +
            '", "id": "' +
            id +
            '", "DeviceId": ""   }';
        return this.http.post<any>(
            this.resetURL + "?id=" + id + "&ip=127.0.0.1",
            body,
            { headers }
        );
    }

    AuthUser(email, password): any {
        let headers = new HttpHeaders();
        headers = headers.set(
            "Content-Type",
            "application/json; charset=utf-8"
        );
        const body =
            '{ "email": "' +
            email +
            '", "password": "' +
            password +
            '", "DeviceId": ""  }';
        return this.http.post<any>(this.AuthUrl + "?ip=127.0.0.1", body, {
            headers,
        });
    }

    //// Assessor Mod ///////////////////

    getAllAssessors(id): Observable<AssessorList[]> {
        return this.http.get<AssessorList[]>(this.assessorlistUrl + id);
    }
    getModarators(id): Observable<AssessorList[]> {
        return this.http.get<AssessorList[]>(this.moderatorlistUrl + id);
    }
    getAllUnitStandards(id): Observable<QualificationUnitStandards[]> {
        return this.http.get<QualificationUnitStandards[]>(this.unistandardsUrl + id);
    }
    getAllCompaniesbySdp(): Observable<Company[]> {
        return this.http.get<Company[]>(this.Allcompanysdp);
    }

    getLearnerQual(id): Observable<LearnerQual> {
        return this.http.get<LearnerQual>(this.learnerqualUrl + id);
    }

    SubmitSumativeReport(body): any {
        return this.http.post<any>(this.submitsummativeassessmentUrl, body);
    }

    SubmitSumativeUnitstandardReport(body): any {
        return this.http.post<any>(this.submitsummativeassessmenUnitStandardtUrl, body);
    }

    getSubmitSumativeReport(QualificationID,CompanyLearnerID): Observable<SummativeAssessmentReport> {
        return this.http.get<SummativeAssessmentReport>(this.getsubmitsummativeassessmentUrl + QualificationID + "&companyLearnerId=" + CompanyLearnerID);
    }

    getSubmitSumativeUnitstandardReport(summativeAssessmentid): Observable<SmmativeAssessmentReportUnitstandards[]> {
        return this.http.get<SmmativeAssessmentReportUnitstandards[]>(this.getsubmitsummativeassessmenUnitStandardtUrl + summativeAssessmentid);
    }

    getSubmitSumativeAssessmentByQualComp(QualificationID,CompanyLearnerID): Observable<SummativeAssessmentReport[]> {
        return this.http.get<SummativeAssessmentReport[]>(this.getsummativebyqulcompUrl + QualificationID + "&companyId=" + CompanyLearnerID);
    }

    SubmitAssessmentProcessBatch(body): any {
        return this.http.post<any>(this.submitassessmentprocessbatchUrl, body);
    }

    getAllLearner_achievement_status(): Observable<Learner_achievement_status[]> {
        return this.http.get<Learner_achievement_status[]>(this.Learner_achievement_status);
    }

    SubmitAssessmentProcessBatchDetails(body): any {
        return this.http.post<any>(this.submitassessmentprocessbatchDetailsUrl, body);
    }

    GetAssessmentProcessBatch(actionuser,companyid): Observable<AssessmentProcessBatch[]> {
        return this.http.get<AssessmentProcessBatch[]>(this.getAssessmentProcessBatchUrl + actionuser + "&companyId=" + companyid);
    }

    GetAssessmentProcessBatchDetail(assessbacthid): Observable<AssessmentProcessBatchDetail[]> {
        return this.http.get<AssessmentProcessBatchDetail[]>(this.getAssessmentProcessBatchDetailUrl + assessbacthid);
    }

    getSdpbyProvider(companyid): Observable<ProvidersBySDP[]> {
        return this.http.get<ProvidersBySDP[]>(this.getproviderbySdpURL + companyid);
    }

    getCompanyQualifications(companyid) :Observable<SaqaQualification[]> {
        return this.http.get<SaqaQualification[]>(this.getCompanyQualificationByCompanyIdUrl + companyid);
    }

    getSummativeAssessmentLearner(companyid) :Observable<SummativeAssessmentLearner[]> {
        return this.http.get<SummativeAssessmentLearner[]>(this.getSummativeAssessmentLearnerReporUrl + companyid);
    }

    getAssessmentTask() :Observable<SystemTasks[]> {
        return this.http.get<SystemTasks[]>(this.getAssessmentTasksUrl);
    }

    SubmittAssessmentTask(body): any {
        return this.http.post<any>(this.createassessmenttaskUrl, body);
    }

    UodateTaskStatus(body,taskid,status): any {
        return this.http.put<any>(this.updatetaskStatusUrl + taskid + "&status=" +status, body);
    }

    CreateSiteVisit(body): any {
        return this.http.post<any>(this.createsitevisitUrl, body);
    }

    getSiteVisit(assessmentbacthid) :Observable<SiteVist> {
        return this.http.get<SiteVist>(this.getsitevisitUrl + assessmentbacthid);
    }

    getCompanySite(companyid) :Observable<CompanySite[]> {
        return this.http.get<CompanySite[]>(this.getcompanysiteUrl + companyid);
    }

    getSdpCompany(spdid) :Observable<SdPCompany> {
        return this.http.get<SdPCompany>(this.getsdpcompanyUrl + spdid);
    }

    GetSingleAssessmentProcessBatch(assessmentbactid): Observable<AssessmentProcessBatch> {
        return this.http.get<AssessmentProcessBatch>(this.getSingleAssessmentProcessBatchUrl + assessmentbactid);
    }

    getProviderbyId(companyid): Observable<ProvidersBySDP> {
        return this.http.get<ProvidersBySDP>(this.getproviderbyIdUrl + companyid);
    }

    getExternalModerationQuestion() :Observable<ExternalModerationQuestion[]> {
        return this.http.get<ExternalModerationQuestion[]>(this.getexternalmoderationquestionUrl);
    }

    getExternalModerationQuestionSection() :Observable<ExternalModerationQuestionSection[]> {
        return this.http.get<ExternalModerationQuestionSection[]>(this.getexternalmoderationquestionsectionUrl);
    }

    getAssessmentUser(assessmentid) :Observable<User[]> {
        return this.http.get<User[]>(this.getassessmentuserUrl + assessmentid);
    }

    getAssessorCount(reportid) :Observable<AssesorCount[]> {
        return this.http.get<AssesorCount[]>(this.getassessorCountUrl + reportid);
    }

    getAssessmentRejectionReasons() :Observable<RejectionReason[]> {
        return this.http.get<RejectionReason[]>(this.getAssessmentRejectionReasosnsUrl);
    }

    SubmitExternalModerationValidation(body): any {
        return this.http.post<any>(this.submitExternalmoderationValidationUrl, body);
    }

    SubmitExternalModerationValidationChecklist(body): any {
        return this.http.post<any>(this.submitExternalmoderationValidationChecklistUrl, body);
    }

    getExternalModerationValidation(assessbacthid) :Observable<ModerationValidation> {
        return this.http.get<ModerationValidation>(this.getExternalmoderationValidationUrl + assessbacthid);
    }

    getSOR(company_learnerId) :Observable<SORModel[]> {
        return this.http.get<SORModel[]>(this.getSORUrl + company_learnerId);
    }

    getModeratortDocs(user_id, target_id): Observable<LearnerDoc> {
        return this.http.get<LearnerDoc>(
            this.DocsModeratortUrl + user_id + "&target_key=" + target_id
        );
    }

    CreateTaskUser(body): any {
        return this.http.post<any>(this.createtaskuserUrl, body);
    }

    getUserTask(userid) :Observable<SystemTasks[]> {
        return this.http.get<SystemTasks[]>(this.getUserTasksUrl + userid);
    }

    SubmitAssessmentBatchRejectionReason(body: any[]): any {
        return this.http.post<any>(this.submitaveAssessmentBatchRejectionReasonUrl, body);
    }

    GetSingleTask(taskid) :Observable<SystemTasks> {
        return this.http.get<SystemTasks>(this.getsingleTaskUrl + taskid);
    }

    getUserAssessmentRejectionReasons(assessmentbachid) :Observable<AssessmentRejectionReason[]> {
        return this.http.get<AssessmentRejectionReason[]>(this.getuserrejectionreasonsurl + assessmentbachid);
    }

    getBatchSummativeAssessmentReport(assessbacthid): Observable<SummativeAssessmentReport[]> {
        return this.http.get<SummativeAssessmentReport[]>(this.getbacthsumativeassessmetreportUrl + assessbacthid);
    }

    getUserLanguages(userd_id): Observable<UserLanguages[]> {
        return this.http.get<UserLanguages[]>(this.getuserlanguagesUrl + userd_id);
    }

    getUrbanrural(): Observable<UrbanRural[]> {
        return this.http.get<UrbanRural[]>(this.geturnanorruralurl);
    }
}
