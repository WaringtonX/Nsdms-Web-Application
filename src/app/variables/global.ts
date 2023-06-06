import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    //... more of your variables
    PROCESS_ID: string;

    setGlobalVar(PROCESS_ID:string) {
      this.PROCESS_ID = PROCESS_ID;
    }
    getGlobalVar():string{
      return this.PROCESS_ID;
    }
}