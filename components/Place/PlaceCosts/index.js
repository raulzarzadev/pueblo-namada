import { useEffect, useState } from 'react'
import { listenPlaceCosts } from '../../../firebase/Costs/main'
import FormCost from '../../FormCost'
import MainModal from '../../Modal/MainModal'
import CostsTable from './CostsTable'

const PlaceCosts = ({ place }) => {
  const [placeCosts, setPlaceCosts] = useState([])
  useEffect(() => {
    listenPlaceCosts(place?.id, setPlaceCosts)
  }, [place])
  return (
    <div className="my-4">
      <h2 className="font-bold text-center">Gastos</h2>
      <div className="flex justify-center my-4">
        <MainModal
          title="Nuevo gasto"
          buttonLabel="Nuevo Gasto"
          OpenComponentType={'primary'}>
          <div>
            <h3 className="text-center font-bold text-xl">Nuevo gasto</h3>
            <FormCost place={place} />
          </div>
        </MainModal>
      </div>
      <div>
        <CostsTable costs={placeCosts} />
      </div>
    </div>
  )
}

export default PlaceCosts
