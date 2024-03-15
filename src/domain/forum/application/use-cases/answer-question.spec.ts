import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memories-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      content: 'New Answer',
      instructorId: '2',
      questionId: '1',
    })

    expect(answer.content).toEqual('New Answer')
    expect(inMemoryAnswerRepository.db[0].questionId).toEqual(answer.questionId)
    expect(inMemoryAnswerRepository.db[0].authorId).toEqual(answer.authorId)
  })
})
