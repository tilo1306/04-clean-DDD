import { Slug } from "./value-objects/slug"
import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"
import { Optional } from "../core/types/optional"
import dayjs from "dayjs"

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

  get authorId() {
    return this.props.autorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  static create (
    props: Optional<IQuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID
  ){
    const question = new Question({
      ...props,
      createdAt: new Date(),
      slug: props.slug ?? Slug.createFromText(props.title),
    }, id)

    return question

  }
}