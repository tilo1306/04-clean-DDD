import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override: Partial<IQuestionProps> = {}) {
  const newQuestion = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example Question',
    slug: Slug.create('example'),
    content: 'Example content',
    ...override,
  })

  return newQuestion
}
