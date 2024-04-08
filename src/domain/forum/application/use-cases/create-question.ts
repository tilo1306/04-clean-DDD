import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'
import { Either, right } from '@/core/either'

interface ICreateQuestionUseCase {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionUseCase): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
