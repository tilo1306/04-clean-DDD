import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | void>
}
