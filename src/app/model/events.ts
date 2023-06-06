export class events {

    color : string;
    data : string;
    date : string;
    icon : string;
    status : string;

    setcolor(color:string) {
        this.color = color;
    }

    getcolor():string{
        return this.color;
    }

    setdata(data:string) {
        this.data = data;
    }

    getdata():string{
        return this.data;
    }

    setdate(date:string) {
        this.date = date;
    }

    getdate():string{
        return this.date;
    }

    seticon(icon:string) {
        this.icon = icon;
    }

    geticon():string{
        return this.icon;
    }

    setstatus(status:string) {
        this.status = status;
    }

    getstatus():string{
        return this.status;
    }

}