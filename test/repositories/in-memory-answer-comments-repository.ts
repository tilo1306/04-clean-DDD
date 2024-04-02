import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/IAnswerCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository
{
  public db: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.db.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async create(answerComment: AnswerComment) {
    this.db.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.db.findIndex((item) => item.id === answerComment.id)

    this.db.splice(itemIndex, 1)
  }
}
