import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { IAnswersRepository } from '../repositories/IAnswersRepository'
import { Answer } from '../entities/answer'

const fakeAnswerQuestion: IAnswersRepository = {
  create: async function (answer: Answer): Promise<void> {
    return
  }
}

test("Create an Answer", async ()=> {

  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerQuestion)

  const answer = await answerQuestion.execute({
    content: 'New Answer',
    instructorId: '1',
    questionId: '1'
  })

  expect(answer.content).toEqual('New Answer',)
})