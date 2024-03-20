import { Question } from '../../enterprise/entities/question'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  deleteQuestion(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
