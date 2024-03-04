import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test("Create an Answer", ()=> {

  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    content: 'New Answer',
    instructorId: '1',
    questionId: '1'
  })

  expect(answer.content).toEqual('New Answer',)
})