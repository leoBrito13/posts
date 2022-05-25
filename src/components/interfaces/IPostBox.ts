import { ImgHTMLAttributes } from "react";

export interface IPostBox {
    id:number  
    title: {rendered:any}
    excerpt: {rendered:any }
    date:string;
    link:string;
    image:string;
}