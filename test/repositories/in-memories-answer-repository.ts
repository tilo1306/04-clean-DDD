import { IAnswersRepository } from '@/domain/forum/application/repositories/IAnswersRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements IAnswersRepository {
  public db: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.db.push(answer)
  }
}
