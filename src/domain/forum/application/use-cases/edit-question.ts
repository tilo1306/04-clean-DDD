import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'

interface IEditQuestionUseCase {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface IEditQuestionResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: IEditQuestionUseCase): Promise<IEditQuestionResponse> {
    const findQuestion = await this.questionRepository.findById(questionId)

    if (!findQuestion) {
      throw new Error('Question not found.')
    }

    if (findQuestion.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    findQuestion.title = title
    findQuestion.content = content

    await this.questionRepository.save(findQuestion)

    return {
      question: findQuestion,
    }
  }
}
