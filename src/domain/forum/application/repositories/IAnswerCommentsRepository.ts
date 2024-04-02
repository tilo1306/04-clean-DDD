import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
