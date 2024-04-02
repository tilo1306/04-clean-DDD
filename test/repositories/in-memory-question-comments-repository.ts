import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/IQuestionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public db: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.db.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.db.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.db.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.db.splice(itemIndex, 1)
  }
}
