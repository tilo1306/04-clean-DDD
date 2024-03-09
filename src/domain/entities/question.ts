import { Slug } from "./value-objects/slug"
import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"
import { Optional } from "../core/types/optional"

interface IQuestionProps{
  autorId: UniqueEntityID,
  bestAnswerId?: UniqueEntityID
  content: string
  title: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<IQuestionProps> {
  static create (
    props: Optional<IQuestionProps, 'createdAt'>,
    id?: UniqueEntityID
  ){
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id)

    return question

  }
}