export class Language {


    createDate:string;
    name : string; //Receving from the API
    homelanguage : boolean; //Receving from the API
    speak : boolean; //Receving from the API
    read : boolean; //Receving from the API
    write : boolean; //Receving from the API

    userId : any; //Sending to API
    languageId : string; //Sending to API
    homeLanguage : number;//
    spearkId : boolean; //Sending to API
    readId : boolean; //Sending to API
    writeId: boolean; //Sending to API
   


    setdate(createDate:string) {
      this.createDate = createDate;
    }
  
    getdate():string{
      return this.createDate;
    }

    setid(userId:any) {
      this.userId = userId;
    }

    getid():any{
      return this.userId;
    }
    sethomeLanguage(homeLanguage:number) {
      this.homeLanguage = homeLanguage;
    }


    gethomeLanguage():number{
      return this.homeLanguage;
    }

    setLanguageId(languageId:string) {
      this.languageId = languageId;
    }

    getLanguageId():string{
      return this.languageId;
    }
    setSpeak(spearkId:boolean) {
      this.spearkId = spearkId;
    }

    getSpeak():boolean{
      return this.spearkId;
    }


    setRead(readId:boolean) {
      this.readId = readId;
    }

    getRead():boolean{
      return this.readId;
    }

    setWrite(writeId:boolean) {
      this.writeId = writeId;
    }

    getWrite():boolean{
      return this.writeId;
    }
      setname(name:string) {
        this.name = name;
      }

      getname():string{
        return this.name;
      }

      sethomelanguage(homelanguage:boolean) {
        this.homelanguage = homelanguage;
      }

      gethomelanguage():boolean{
        return this.homelanguage;
      }

      setspeak(speak:boolean) {
        this.speak = speak;
      }

      getspeak():boolean{
        return this.speak;
      }

      setread(read:boolean) {
        this.read = read;
      }

      getread():boolean{
        return this.read;
      }

      setwrite(write:boolean) {
        this.write = write;
      }

      getwrite():boolean{
        return this.write;
      }
}