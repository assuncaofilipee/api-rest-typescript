import SubjectInterface from "../entities/subject";

export default interface SubjectRepositoryInterface {
  find(limit: number, offset: number): Promise<[SubjectInterface[], number]>
  save(subject: SubjectInterface): Promise<SubjectInterface>;
  findOneById(id: string): Promise<SubjectInterface | null>;
  delete(id: string): Promise<void>;
}