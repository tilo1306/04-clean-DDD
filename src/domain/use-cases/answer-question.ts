import { Answer } from './../entities/answer';
import { IAnswersRepository } from "../repositories/IAnswersRepository"
import { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository :IAnswersRepository ){}
 async execute({ instructorId,questionId,content}: AnswerQuestionUseCaseRequest){

    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create( answer )

    return answer

  }
}