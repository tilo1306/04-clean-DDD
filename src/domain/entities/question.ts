import { randomUUID } from "node:crypto"

interface IQuestionProps{
  title: string
  content: string
  autorId: string,
}

 export class Question {

  public id: string
  public title: string
  public content:string
  public autorId:string

   constructor(props: IQuestionProps, id?:string){

    this.id = id ?? randomUUID()
     this.title = props.title
     this.content = props.content
     this.autorId = props.autorId

  }
}