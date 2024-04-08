import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/IAnswersRepository'

interface IFetchQuestionAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
