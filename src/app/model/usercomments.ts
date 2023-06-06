export class usercomments {
    name : string;
    createDate : string;
    comment : string;
    email : string;

    setname(name:string) {
        this.name = name;
    }

    getname():string{
        return this.name;
    }

    setcreateDate(createDate:string) {
        this.createDate = createDate;
    }

    getcreateDate():string{
        return this.createDate;
    }


    setcomment(comment:string) {
        this.comment = comment;
    }

    getcomment():string{
        return this.comment;
    }


    setemail(email:string) {
        this.email = email;
    }

    getemail():string{
        return this.email;
    }


}