import { deleteCost } from "../../../firebase/Costs/main"
import { FirebaseCRUD } from "../../../firebase/FirebaseCRUD"
import ModalDelete from "../../Modal/ModalDelete"
import sortByDate from "../../../utils/sortByDate"
const CostsTable = ({ costs = [] }) => {
  console.log(costs)
  const handleDeleteCost = (costId) => {
    console.log(costId)
    deleteCost(costId)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Costo</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortByDate(costs)?.map((cost, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{cost.title}</td>
              <td className="border px-4 py-2">{cost.value}</td>
              <td className="border px-4 py-2">{FirebaseCRUD.format(cost.date, 'dd MMM yy')}</td>
              <td className="border px-4 py-2">
                <ModalDelete handleDelete={() => handleDeleteCost(cost.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default CostsTable