import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  deleteQuestion(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
