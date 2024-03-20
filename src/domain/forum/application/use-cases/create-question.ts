import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'

interface ICreateQuestionUseCase {
  authorId: string
  title: string
  content: string
}

interface ICreateQuestionResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionUseCase): Promise<ICreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
