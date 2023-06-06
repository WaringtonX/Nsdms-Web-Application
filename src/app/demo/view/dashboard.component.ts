import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EventService } from "../service/eventservice";
import { Message, MessageService, SelectItem } from "primeng/api";
import { Product } from "../domain/product";
import { ProductService } from "../service/productservice";
import { AppBreadcrumbService } from "../../app.breadcrumb.service";
import { AppMainComponent } from "src/app/app.main.component";
import { AppComponent } from "src/app/app.component";
import { Customer, Representative } from "../domain/customer";
import { CustomerService } from "../service/customerservice";
import { SystemTasks } from "src/app/model/systemtasks";
import { MersetaService } from "src/app/service/merseta.service";
import { SdPCompany } from "src/app/model/sdpcompany";
import { Company } from "src/app/model/company.model";
import { CompanySite } from "src/app/model/companysite";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./dashboard.component.html",
    styles: [`  
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

export class DashboardComponent implements OnInit {
  systemtasks : SystemTasks[];
  systemtasksdetails : any [] = [];
  SiteExa : SelectItem [];

  //customers: Customer[];

    constructor(private mersetaservice: MersetaService,private service: MessageService,private breadcrumbService: AppBreadcrumbService,private router: Router) {

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

    ngOnInit() {
          this.getSystemTasks();
    }

    getSystemTasks() {
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
           document.getElementById("numberoftasks").innerHTML = ""+ this.systemtasksdetails.length;
         }
      );
    }

   
}
