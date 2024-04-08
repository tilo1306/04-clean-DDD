import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface IEditQuestionUseCase {
  authorId: string
  title: string
  content: string
  questionId: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: IEditQuestionUseCase): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
