import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"
import { Optional } from "../core/types/optional"

interface IAnswerProps{
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity <IAnswerProps> {
  get content (){
    return this.props.content
  }

  static create (
    props: Optional<IAnswerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)

    return answer
  }
}