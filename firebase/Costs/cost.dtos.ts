import { Cost } from './cost.model'

export interface CreateCostDto
  extends Omit<Cost, 'id' | 'createdAt' | 'updatedAt' | 'category'> {}

export interface UpdateCostdAt extends Pick<Cost, 'updatedAt'> {}

export interface UpdateCostDto extends Partial<CreateCostDto> {}

export interface FindCostDto extends Partial<Readonly<Omit<Cost, 'tags'>>> {
  tags: ReadonlyArray<string>
}
