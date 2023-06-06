export class RecomComment {
    name : string;
    createDate : string;
    comment : string;
    email : string;

    setnamea(name:string) {
        this.name = name;
    }

    getnamea():string{
        return this.name;
    }

    setcreateDatea(createDate:string) {
        this.createDate = createDate;
    }

    getcreateDatea():string{
        return this.createDate;
    }


    setcommenta(comment:string) {
        this.comment = comment;
    }

    getcommenta():string{
        return this.comment;
    }


    setemaila(email:string) {
        this.email = email;
    }

    getemaila():string{
        return this.email;
    }
}
