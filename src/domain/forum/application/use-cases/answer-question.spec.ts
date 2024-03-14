/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswersRepository } from '../repositories/IAnswersRepository'

const fakeAnswerQuestion: IAnswersRepository = {
  create: async function (answer: Answer): Promise<void> {},
}

test('Create an Answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerQuestion)

  const answer = await answerQuestion.execute({
    content: 'New Answer',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('New Answer')
})
