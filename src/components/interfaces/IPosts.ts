export interface IPosts {
    id:number  
    title: {rendered:any}
    excerpt: {rendered:any }
    categories:[];
    date:string;
    link:string;
    _embedded:any;
}