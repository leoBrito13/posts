export interface IPosts {
    id:number  
    title: {rendered:any}
    excerpt: {rendered:any }
    categories:[];
    date:String;
    link:string;
    _embedded:any;
}