/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '@/core/either'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface IDeleteQuestionUseCase {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCase): Promise<DeleteQuestionUseCaseResponse> {
    const findQuestion = await this.questionRepository.findById(questionId)

    if (!findQuestion) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== findQuestion.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.deleteQuestion(findQuestion)

    return right({})
  }
}
