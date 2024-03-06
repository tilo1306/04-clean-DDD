import { Entity } from "../core/entities/entity"

interface IAnswerProps{
  content: string
  autorId: string
  questionId: string
}

export class Answer extends Entity <IAnswerProps> {}