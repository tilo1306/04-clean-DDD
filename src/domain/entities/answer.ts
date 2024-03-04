import { randomUUID } from "node:crypto"

interface IAnswerProps{
  content: string
  autorId: string
  questionId: string
}

export class Answer {
  public id: string
  public content: string
  public autorId: string
  public questionId: string

  constructor(props: IAnswerProps, id?: string){
    this.id = id ?? randomUUID()
    this.content = props.content
    this.autorId = props.autorId
    this.questionId = props.questionId
  }

}