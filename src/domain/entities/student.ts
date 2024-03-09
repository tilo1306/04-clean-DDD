import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface IStudent {
  name: string
}

export class Student extends Entity<IStudent> {
  static create(
    props: IStudent,
    id?: UniqueEntityID
  ) {
    const student = new Student(props,id)

    return student
  }
}