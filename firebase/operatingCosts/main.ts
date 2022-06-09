import { FirebaseCRUD } from "../FirebaseCRUD";
import { Cost } from "./cost.model";
const CostsCRUD = new FirebaseCRUD('costs')

export const createCost = (Cost: Cost) => CostsCRUD.create(Cost)
export const updateCost = (CostId: string, newCost: Cost) => CostsCRUD.update(CostId, newCost)
export const deleteCost = (CostId: string) => CostsCRUD.delete(CostId)
export const getCost = (CostId: string) => CostsCRUD.get(CostId)
export const listen = (CostId: string, cb: CallableFunction) => CostsCRUD.listen(CostId, cb)
export const listenAllCosts = (cb: CallableFunction) => CostsCRUD.listenAll(cb)