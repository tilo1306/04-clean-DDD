import { PaginationParams } from '@/core/repositories/pagination-params'
import { IAnswersRepository } from '@/domain/forum/application/repositories/IAnswersRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements IAnswersRepository {
  public db: Answer[] = []

  async create(answer: Answer) {
    this.db.push(answer)
  }

  async findById(id: string) {
    const answer = this.db.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.db
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer) {
    const itemIndex = this.db.findIndex((item) => item.id === answer.id)

    this.db[itemIndex] = answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.db.findIndex((item) => item.id === answer.id)

    this.db.splice(itemIndex, 1)
  }
}
