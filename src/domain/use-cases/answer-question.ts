import { Answer } from './../entities/answer';
import { IAnswersRepository } from "../repositories/IAnswersRepository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository :IAnswersRepository ){}
 async execute({ instructorId,questionId,content}: AnswerQuestionUseCaseRequest){

    const answer = new Answer({
      autorId: instructorId,
      content,
      questionId
    })

    await this.answersRepository.create( answer )

    return answer

  }
}