import { InMemoryAnswerAttachmentsRepository } from '@/test/repositories/in-memory-answer-attachments-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memories-answer-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.db[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswerRepository.db[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.db[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
