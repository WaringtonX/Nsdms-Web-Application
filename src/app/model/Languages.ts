export class Languages {
  createDate:string;
  languageId : string;
  homeLanguage : boolean;
  spearkId : boolean;
  readId : boolean;
  userId : any;
  writeId: boolean;

  setdate(createDate:string) {
    this.createDate = createDate;
  }

  getdat():string{
    return this.createDate;
  }
  setid(userId:string) {
      this.userId = userId;
    }

    getid():string{
      return this.userId;
    }


  setname(languageId:string) {
      this.languageId = languageId;
    }

    getname():string{
      return this.languageId;
    }
    sethomelanguage(homeLanguage:boolean) {
      this.homeLanguage = homeLanguage;
    }

    gethomelanguage():boolean{
      return this.homeLanguage;
    }


    setspeak(spearkId:boolean) {
      this.spearkId = spearkId;
    }

    getspeak():boolean{
      return this.spearkId;
    }

    setread(readId:boolean) {
      this.readId = readId;
    }

    getread():boolean{
      return this.readId;
    }

    setwrite(writeId:boolean) {
      this.writeId = writeId;
    }

    getwrite():boolean{
      return this.writeId;
    }
}