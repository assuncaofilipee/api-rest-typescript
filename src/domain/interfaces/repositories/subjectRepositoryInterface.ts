import SubjectInterface from "../entities/subject";

export default interface SubjectRepositoryInterface {
  get(limit: number, offset: number): Promise<[SubjectInterface[], number]>
  save(subject: SubjectInterface): Promise<SubjectInterface>;
}