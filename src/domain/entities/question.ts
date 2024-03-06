import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../core/entities/entity"

interface IQuestionProps{
  title: string
  content: string
  autorId: string,
  slug: Slug
}

export class Question extends Entity<IQuestionProps> {}