import { Slug } from "./value-objects/slug"
import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"

interface IQuestionProps{
  autorId: UniqueEntityID,
  bestAnswerId?: UniqueEntityID
  content: string
  title: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<IQuestionProps> {}