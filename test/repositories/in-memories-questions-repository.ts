import { IQuestionsRepository } from '@/domain/forum/application/repositories/IQuestionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public db: Question[] = []

  async create(question: Question): Promise<void> {
    this.db.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.db.find((question) => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = this.db.find((item) => item.id.toString() === questionId)

    if (!question) {
      return null
    }

    return question
  }

  async deleteQuestion(question: Question): Promise<void> {
    const itemIndex = this.db.findIndex((item) => item.id === question.id)

    this.db.splice(itemIndex, 1)
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.db.findIndex((item) => item.id === question.id)

    this.db[itemIndex] = question
  }
}
