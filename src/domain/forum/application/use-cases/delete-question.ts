import { IQuestionsRepository } from '../repositories/IQuestionsRepository'

interface IDeleteQuestionUseCase {
  authorId: string
  questionId: string
}

interface IDeleteQuestionResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCase): Promise<IDeleteQuestionResponse> {
    const findQuestion = await this.questionRepository.findById(questionId)

    if (!findQuestion) {
      throw new Error('Question not found.')
    }

    if (findQuestion.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionRepository.deleteQuestion(findQuestion)

    return {}
  }
}
