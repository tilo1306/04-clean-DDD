import { InMemoryQuestionsRepository } from '@/test/repositories/in-memories-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create an Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Title question',
      content: 'Content question',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.db[0].authorId).toEqual(
      question.authorId,
    )
    expect(inMemoryQuestionsRepository.db[0].title).toEqual(question.title)
    expect(inMemoryQuestionsRepository.db[0].content).toEqual(question.content)
  })
})
