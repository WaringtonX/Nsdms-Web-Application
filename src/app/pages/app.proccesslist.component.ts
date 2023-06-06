import {Component, OnInit} from '@angular/core';
import { Process } from '../model/process';
import { MersetaService } from '../service/merseta.service';

@Component({
    selector: 'app-proccesslist',
    templateUrl: './app.proccesslist.component.html',
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})

export class AppProccesslistComponent implements OnInit {

    
  process: Process[] = [];
  processlist : any[];
  
  constructor(private mersetaservice: MersetaService) {
    
   }

    ngOnInit(): void {
        this.getProcessList();
    }


    getProcessList()  {
        this.mersetaservice.getProcessList()
        .subscribe(
           response => {
            // this.proccessID = response;
             this.processlist = response; 
             console.log(response);
             var key, length = 0;
             for(key in response["process-instance"]) {
               if(response["process-instance"].hasOwnProperty(key)) {
                length++;
               }
             }
             for(let i =0;i < length ; i++)  {
                  var pros = new Process;
              ///val =this.processlist["process-instance"][counter]["process-instance-id"];
                //console.log(proc["process-instance"]["process-instance-id"])
                 pros.setProcess_instance_id(this.processlist["process-instance"][i]["process-instance-id"]);
                 pros.setProcess_name("Learner Application");
                 pros.setInitiator(this.processlist["process-instance"][i]["initiator"]);
                 pros.setcontainder_id(this.processlist["process-instance"][i]["container-id"]); 
                 pros.setstart_date(this.processlist["process-instance"][i]["start-date"]["java.util.Date"]);
                 this.process.push(pros);
             }
             //this.workItemId = this.workitemtinstance["work-item-instance"][0]["work-item-id"];
             console.log(this.process);
            // console.log(this.processlist["process-instance"][0]["process-instance-id"])
           }
        ); 
      }
    
      getDate(date) : string {

        var currentdate = new  Date(date);
        return  currentdate.toDateString();
      }


}