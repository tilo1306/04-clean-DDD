import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { IQuestionsRepository } from '../repositories/IQuestionsRepository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { IQuestionAttachmentsRepository } from '../repositories/IQuestionAttachmentsRepository'
import { QuestionAttachmentList } from '@/core/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IEditQuestionUseCase {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
    attachmentsIds,
  }: IEditQuestionUseCase): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
