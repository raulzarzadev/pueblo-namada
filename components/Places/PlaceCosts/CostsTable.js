import { deleteCost } from '../../../firebase/Costs/main'
import { FirebaseCRUD } from '../../../firebase/FirebaseCRUD'
import ModalDelete from '../../Modal/ModalDelete'
import sortByDate from '../../../utils/sortByDate'
import Modal from '../../Modal'
import { useState } from 'react'
import { CurrencySpan } from '../../CurrencySpan'
import Image from 'next/image'
import PreviewImage from '../../PreviewImage'
import { format } from 'date-fns'
const CostsTable = ({ costs = [] }) => {
  return (
    <div>
      <table className="table-auto w-full text-center">
        <thead>
          <tr className="">
            <th className="px-1 py-2">Nombre</th>
            <th className="px-1 py-2">Fecha</th>
            <th className="px-1 py-2">Costo</th>
          </tr>
        </thead>
        <tbody>
          {sortByDate(costs)?.map((cost) => (
            <RowCost key={cost.id} cost={cost} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RowCost = ({ cost }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const handleDeleteCost = (costId) => {
    deleteCost(costId)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  return (
    <tr onClick={handleOpen} className={'hover:bg-base-100 cursor-pointer'}>
      <td className="p-1 ">{cost.title}</td>
      <td className="p-1 ">{format(cost.date, 'dd MMMM yy ')}</td>
      <td className="p-1 text-left">
        <CurrencySpan cost={cost.value} />{' '}
      </td>
      <td className="p-1 ">
        <Modal title={'Detalles'} open={open} handleOpen={handleOpen}>
          <h2 className="font-bold">{cost?.title}</h2>
          <p>{`${format(cost?.date, 'dd MMMM yy HH:mm')}`}</p>
          <p>{cost?.description}</p>
          <p className="text-left  mx-auto">
            <CurrencySpan cost={cost.value} />
          </p>

          {cost?.image && <PreviewImage image={cost.image} />}

          <ModalDelete handleDelete={() => handleDeleteCost(cost.id)} />
        </Modal>
      </td>
    </tr>
  )
}

export default CostsTable
