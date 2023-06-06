export class ProcessUI {
    //  processname:string;
      html: string;
  
     getUI(processname:string) : string {
      
         if(processname = "NewLearner") {
           this.html ='<section class="scroll-section" id="basic">' +
           '                                    <h2 class="small-title">Application</h2>'+
           '                                    <div class="card mb-5 wizard" id="wizardBasic" style="height: 890px;">'+
           '                                      <div class="card-header border-0 pb-0">'+
           '                                        <ul class="nav nav-tabs justify-content-center" role="tablist">'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizstartleaner" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Application</div>'+
           '                                              <div class="text-small description d-none d-md-block">Sart Application</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizadlearner" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Nationality</div>'+
           '                                              <div class="text-small description d-none d-md-block">Select Nationality</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizadcompany" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">ID or Passport</div>'+
           '                                              <div class="text-small description d-none d-md-block">Identification</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizaprogram" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Learning Details</div>'+
           '                                              <div class="text-small description d-none d-md-block">Capture Leaner Details</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizlangaunge" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Languages</div>'+
           '                                              <div class="text-small description d-none d-md-block">Language Details</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizadtrade" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Home Address</div>'+
           '                                              <div class="text-small description d-none d-md-block">Address Information</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizademployment" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Postal Address</div>'+
           '                                              <div class="text-small description d-none d-md-block">Postal Address Details</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#wizademployementDetails" role="tab">'+
           '                                              <div class="mb-1 title d-none d-sm-block">Next Of Kin</div>'+
           '                                              <div class="text-small description d-none d-md-block">Next Of Kin Details</div>'+
           '                                            </a>'+
           '                                          </li>'+
           '                                          <li class="nav-item d-none" role="presentation">'+
           '                                            <a class="nav-link text-center" href="#basicLast" role="tab"></a>'+
           '                                          </li>'+
           '                                        </ul>'+
           '                                      </div>'+
           '                                      <div class="card-body sh-35">'+
           '                                        <div class="tab-content">'+
           '                                          <div class="tab-pane fade" id="wizstartleaner" role="tabpanel">'+
           '                                            <button type="button" [disabled]="isDisabled"  class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="StartRegistration()">'+
           '                                              <span>Start Application</span>'+
           '                                            </button>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="wizadlearner" role="tabpanel">'+
           '                                            <h5 class="card-title">Select Nationality</h5>'+
           '                                            <div>'+
           '                                              <div class="col-sm-6">'+
           '                                                <label  for="specificSizeSelect">Nationality</label>'+
           '                                                <select [(ngModel)]="selected" (ngModelChange)="modify($event)" class="form-select" id="specificSizeSelect">'+
           '                                                  <option value="South Africa">South Africa</option>'+
           '                                                  <option value="Other">Other</option>'+
           '                                                </select>'+
           '                                              </div>'+
           '                                              <br/>'+
           '                                              <button type="button"  class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitdetails()">'+
           '                                                <span>Submit Nationality</span>'+
           '                                              </button>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="wizadcompany" role="tabpanel">'+
           '                                            <h5 class="card-title">Identification</h5>'+
           '                                            <form [formGroup]="IdentificationFormGroupd" id="form1">'+
           '                                            <div class="col-md-6">'+
           '                                              <label for="inputEmail4" class="form-label">Identification</label>'+
           '                                              <input type="text" class="form-control" formControlName="Identificationid" id="inputEmail4" />'+
           '                                            </div>'+
           '                                          </form>'+
           '                                          <br>'+
           '                                          <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitIdentification()">'+
           '                                            <span>Submit Identification</span>'+
           '                                          </button>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="wizaprogram" role="tabpanel">'+
           '                                            <h5 class="card-title">Capture Learner Details</h5>'+
           '                                            <form [formGroup]="LearnerdetailsnFormGroupd">'+
           '                                            <div class="col-md-6">'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Name</label>'+
           '                                                <input type="text" class="form-control" formControlName="name" id="inputEmail4" />'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Surname</label>'+
           '                                                <input type="text" class="form-control" formControlName="surname" id="inputEmail4" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                            <div class="col-md-6">'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Cell Number</label>'+
           '                                                <input type="text" class="form-control" formControlName="cellnumber" id="inputEmail4" />'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Telephone Number</label>'+
           '                                                <input type="text" class="form-control" formControlName="telnumber" id="inputEmail4" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                            <div class="col-md-6">'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Primary Email Address</label>'+
           '                                                <input type="text" class="form-control" formControlName="primeemail" id="inputEmail4" />'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Secondary Email Address</label>'+
           '                                                <input type="text" class="form-control" formControlName="secondemail" id="inputEmail4" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                            <div class="col-md-6">'+
           '                                              <div class="col-md-6">'+
           '                                                <label for="inputEmail4" class="form-label">Date of Birth</label>'+
           '                                                <input type="text" class="form-control"  name="personalBirthday" formControlName="datebirth" id="inputEmail4" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                          </form>'+
           '                                          <div class="col-md-6">'+
           '                                            <label class="" for="specificSizeSelect">Gender</label>'+
           '                                            <select  class="form-select" id="specificSizeSelect">'+
           '                                              <option value="Gauteng">Male</option>'+
           '                                              <option value="Limpopo">Female</option>'+
           '                                              <option value="Free State">Other</option>'+
           '                                            </select>'+
           '                                          </div>'+
           '                                          <div class="col-md-6">'+
           '                                            <label class="" for="specificSizeSelect">Equity/Race</label>'+
           '                                            <select  class="form-select" id="specificSizeSelect">'+
           '                                              <option value="Gauteng">Black</option>'+
           '                                              <option value="Limpopo">White</option>'+
           '                                              <option value="Limpopo">Coloured</option>'+
           '                                              <option value="Free State">Indian</option>'+
           '                                              <option value="Free State">Other</option>'+
           '                                            </select>'+
           '                                          </div>'+
           '                                            <br>'+
           '                                           <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitLeanerDetails()">'+
           '                                                 <span>Submit Learner Details</span>'+
           '                                            </button>'+
           '                                          </div>'+
           '                                        <div  class="tab-pane fade" id="wizlangaunge" role="tabpanel">'+
           '                                          <h5 class="card-title">Languages</h5>'+
           '                                          <div class="col-md-6">'+
           '                                            <label class="" for="specificSizeSelect">Select Language</label>'+
           '                                            <select  class="form-select" id="specificSizeSelect">'+
           '                                              <option value="English">English</option>'+
           '                                              <option value="Afrikaans">Afrikaans</option>'+
           '                                              <option value="isiNdebele">isiNdebele</option>'+
           '                                              <option value="isiXhosa">isiXhosa</option>'+
           '                                              <option value="isiZulu">isiZulu</option>'+
           '                                              <option value="Sesotho">Sesotho</option>'+
           '                                              <option value="Setswana">Setswana</option>'+
           '                                              <option value="siSwati">siSwati</option>'+
           '                                              <option value="Tshivenda">Tshivenda</option>'+
           '                                              <option value="Xitsonga">Xitsonga</option>'+
           '                                            </select>'+
           '                                          </div>'+
           '                                          <br/>'+
           '                                          <div class="col-md-6">'+
           '                                            <div class="mb-3">'+
           '                                              <label class="form-label">Read</label>'+
           '                                              <div class="form-check">'+
           '                                                <input class="form-check-input" type="checkbox" id="customCheck1" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                          <div class="col-md-6">'+
           '                                            <div class="mb-3">'+
           '                                              <label class="form-label">Write</label>'+
           '                                              <div class="form-check">'+
           '                                                <input class="form-check-input" type="checkbox" id="customCheck1" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                          <div class="col-md-6">'+
           '                                            <div class="mb-3">'+
           '                                              <label class="form-label">Speak</label>'+
           '                                              <div class="form-check">'+
           '                                                <input class="form-check-input" type="checkbox" id="customCheck1" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                          <div class="col-md-6">'+
           '                                            <div class="mb-3">'+
           '                                              <label class="form-label">Home Language?</label>'+
           '                                              <div class="form-check">'+
           '                                                <input class="form-check-input" type="checkbox" id="customCheck1" />'+
           '                                              </div>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                        </div>'+
           '                                          <div class="tab-pane fade" id="wizadtrade" role="tabpanel">'+
           '                                            <h5 class="card-title">Home Address</h5>'+
           '                                            '+
           '                                            <form [formGroup]="HomeAddressFormGroupd">'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Address 1</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Address" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Address 2</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Address1" id="inputEmail4" />'+
           '                                                </div>'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Address 3</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Address2" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Area</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Area" id="inputEmail4" />'+
           '                                                </div>'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Postal Code</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Postalcode" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <br/>  '+
           '                                              </div>'+
           '                                            </form>'+
           '                                            <div class="col-md-6">'+
           '                                              <label  for="specificSizeSelect">Pronvince</label>'+
           '                                              <select [(ngModel)]="selectedPronvince" (ngModelChange)="modifyPronvince($event)" class="form-select" id="specificSizeSelect">'+
           '                                                <option value="Gauteng">Gauteng</option>'+
           '                                                <option value="Limpopo">Limpopo</option>'+
           '                                                <option value="Free State">Free State</option>'+
           '                                                <option value="Mpumalanga">Mpumalanga</option>'+
           '                                                <option value="Northern Cape">Northern Cape</option>'+
           '                                                <option value="North West">North West</option>'+
           '                                                <option value="KwaZulu-Natal">KwaZulu-Natal</option>'+
           '                                                <option value="Western Cape">Western Cape</option>'+
           '                                                <option value="Eastern Cape">Eastern Cape</option>'+
           '                                              </select>'+
           '                                            </div>'+
           '                                            <br>'+
           '                                            <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitHomeAdrress()">'+
           '                                              <span>Submit Home Adrress</span>'+
           '                                            </button>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="wizademployment" role="tabpanel">'+
           '                                            <h5 class="card-title">Postal Address</h5>'+
           '                                            <form [formGroup]="PostalAddressFormGroupd">'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Postal</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Postal" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Posta 1</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Postal1" id="inputEmail4" />'+
           '                                                </div>'+
           '                                              </div>'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Postal 2</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Postal2" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Postal 3</label>'+
           '                                                  <input type="text" class="form-control" formControlName="Postal3" id="inputEmail4" />'+
           '                                                </div>'+
           '                                              </div>'+
           '                                            </form>'+
           '                                            <br>'+
           '                                            <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitPostalAdrress()">'+
           '                                              <span>Submit Postal Adrress</span>'+
           '                                            </button>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="wizademployementDetails" role="tabpanel">'+
           '                                            <h5 class="card-title">Next Of Kin</h5>'+
           '                                            <form [formGroup]="NextOfKinFormGroupd">'+
           '                                              <div class="col-md-6">'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Next Of Kin Name</label>'+
           '                                                  <input type="text" class="form-control" formControlName="nextofkin" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Next Of Kin Last Name</label>'+
           '                                                  <input type="text" class="form-control" formControlName="nextofkinlastname" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Cell Phone</label>'+
           '                                                  <input type="text" class="form-control" formControlName="nextofkincelphone" id="inputEmail4" />'+
           '                                                </div>'+
           '                                                <div class="col-md-6">'+
           '                                                  <label for="inputEmail4" class="form-label">Email Address</label>'+
           '                                                  <input type="text" class="form-control" formControlName="nextofkinemailaddress" id="inputEmail4" />'+
           '                                                </div>'+
           '                                              </div>'+
           '                                            </form>'+
           '                                            <br/>'+
           '                                            <button type="button" class="btn btn-outline-primary btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto" (click)="submitnextofkin()">'+
           '                                              <span>Submit Next of Kin</span>'+
           '                                            </button>'+
           '                                          </div>'+
           '                                          <div class="tab-pane fade" id="basicLast" role="tabpanel">'+
           '                                            <div class="text-center mt-5">'+
           '                                              <h5 class="card-title">Thank You!</h5>'+
           '                                              <p class="card-text text-alternate mb-4">Your Application completed successfully!</p>'+
           '                                              <button class="btn btn-icon btn-icon-start btn-primary btn-reset" type="button">'+
           '                                                <i data-cs-icon="rotate-left"></i>'+
           '                                                <span>Reset</span>'+
           '                                              </button>'+
           '                                            </div>'+
           '                                          </div>'+
           '                                        </div>'+
           '                                      </div>'+
           '                                      <div class="card-footer text-center border-0 pt-1">'+
           '                                        <button class="btn btn-icon btn-icon-start btn-outline-primary btn-prev" type="button">'+
           '                                          <i data-cs-icon="chevron-left"></i>'+
           '                                          <span>Back</span>'+
           '                                        </button>'+
           '                                        &nbsp;'+
           '                                        <button class="btn btn-icon btn-icon-end btn-outline-primary btn-next" [disabled]="isDisabledNext" type="button">'+
           '                                          <span>Next</span>'+
           '                                          <i data-cs-icon="chevron-right"></i>'+
           '                                        </button>'+
           '                                      </div>'+
           '                                    </div>'+
           '                                  </section>';
         }else {
            this.html ='';
            return this.html;
         }
  
         return this.html;
      } 
}