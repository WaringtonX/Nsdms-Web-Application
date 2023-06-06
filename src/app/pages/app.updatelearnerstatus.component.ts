import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../model/company.model';
import { Process } from '../model/process';
import { User } from '../model/users.model';
import { MersetaService } from '../service/merseta.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup,ReactiveFormsModule, Validators  } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-updatelearnerstatus',
    templateUrl: './app.updatelearnerstatus.component.html'
    
})

export class AppUpdateLearnerStatusComponent implements OnInit {
    public updatestatusForm: FormGroup;
    dropdownOptions3: SelectItem[];
    dropdownOptions4: SelectItem[];
    dropdownOptions5: SelectItem[];
    selectDropdownOptions2 = null;

    constructor(
        private mersetaservice: MersetaService,
    ) {

        this.dropdownOptions3 = [
            {label: 'De-register', value: 'De-register'},
            {label: 'Withdraw', value: 'Withdraw'},
            {label: 'Transfer', value: 'Transfer'},
            {label: 'Losstime for learner', value: 'Losstime for learner'}
        ];
        this.dropdownOptions4 = [
            {label: 'Pregnant', value: 'Pregnant'},
            {label: 'Deceased', value: 'Deceased'},
            {label: 'AWOL', value: 'AWOL'},
            {label: 'Changed Location', value: 'Changed Location'},
            {label: 'Other – Please specify', value:'Other – Please specify'}
        ];

        this.dropdownOptions5 = [
            {label: '<<TBC>>', value: '<TBC>>'},
            {label: 'Other – Please specify', value: 'Other – Please specify'},

        ];

        this.updatestatusForm = new FormGroup({
            Status: new FormControl("", [
              Validators.required,
            ]),
            Reason: new FormControl("", [
              Validators.required,

            ]),
            SpecifyReason: new FormControl("", [  ])
          });

    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}