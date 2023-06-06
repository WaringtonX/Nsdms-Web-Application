export class Process {
    Process_instance_id : string;
    Process_name : string;
    Initiator : string;
    containder_id : string;
    start_date : string;

    setProcess_instance_id(Process_instance_id:string) {
        this.Process_instance_id = Process_instance_id;
      }

      getProcess_instance_id():string{
        return this.Process_instance_id;
      }

      setProcess_name(Process_name:string) {
        this.Process_name = Process_name;
      }

      getProcess_name():string{
        return this.Process_name;
      }

      setInitiator(Initiator:string) {
        this.Initiator = Initiator;
      }

      getInitiator():string{
        return this.Initiator;
      }

      setcontainder_id(containder_id:string) {
        this.containder_id = containder_id;
      }

      getcontainder_id():string{
        return this.containder_id;
      }

      setstart_date(start_date:string) {
        this.start_date = start_date;
      }

      getstart_date():string{
        return this.start_date;
      }

}