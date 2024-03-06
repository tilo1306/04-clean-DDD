import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"

interface IAnswerProps{
  content: string
  autorId: UniqueEntityID
  questionId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity <IAnswerProps> {
  get content (){
    return this.props.content
  }
}