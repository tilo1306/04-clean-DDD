/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '@/core/either'
import { IAnswerCommentsRepository } from '../repositories/IAnswerCommentsRepository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
