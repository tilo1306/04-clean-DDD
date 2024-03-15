import { IQuestionsRepository } from '@/domain/forum/application/repositories/IQuestionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public db: Question[] = []

  async create(question: Question): Promise<void> {
    this.db.push(question)
  }
}
