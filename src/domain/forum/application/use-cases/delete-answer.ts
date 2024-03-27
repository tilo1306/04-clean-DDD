import { IAnswersRepository } from '../repositories/IAnswersRepository'

interface IDeleteAnswerUseCase {
  authorId: string
  answerId: string
}

interface IDeleteAnswerResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: IDeleteAnswerUseCase): Promise<IDeleteAnswerResponse> {
    const findAnswer = await this.answerRepository.findById(answerId)

    if (!findAnswer) {
      throw new Error('Answer not found.')
    }

    if (findAnswer.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerRepository.delete(findAnswer)

    return {}
  }
}
