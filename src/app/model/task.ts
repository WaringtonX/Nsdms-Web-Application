export class Task {
    task_id : string;
    task_name : string;
    task_form : string;
    task_status : string;
    task_owner : string;

      setTaskid(task_id:string) {
        this.task_id = task_id;
      }

      getTaskID():string{
        return this.task_id;
      }

      setTaskname(task_name:string) {
        this.task_name = task_name;
      }
      getTaskname():string{
        return this.task_name;
      }

      setTaskForm(task_form:string) {
        this.task_form = task_form;
      }
      
      getTaskForm():string{
        return this.task_form;
      }

      setTaskStatus(task_status:string) {
        this.task_status = task_status;
      }

      getTaskStatus():string{
        return this.task_status;
      }

      setTaskOwner(task_owner:string) {
        this.task_owner = task_owner;
      }

      getTaskOWner():string{
        return this.task_owner;
      }
      
      
}