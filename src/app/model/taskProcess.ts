export class TaskProcess {
    name : string;
    status : string;
    date : string;
    owner : string;

      setname(name:string) {
        this.name = name;
      }

      getTname():string{
        return this.name;
      }

      setTstatus(status:string) {
        this.status = status;
      }
      getTaskstatus():string{
        return this.status;
      }

      setTaskdate(date:string) {
        this.date = date;
      }
      
      getTaskdate():string{
        return this.date;
      }

      setTaskowner(owner:string) {
        this.owner = owner;
      }

      getTaskowner():string{
        return this.owner;
      }

}