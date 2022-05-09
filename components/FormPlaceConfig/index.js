import { config } from "process"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updatePlace } from "../../firebase/places"
import Checkbox from "../inputs/checkbox"

const FormPlaceConfig = ({ place }) => {

  const { register, watch, handleSubmit, formState: { isDirty, } } = useForm({ defaultValues: place.config })
  const FORM_STATUS = {
    0: 'Guardar',
    1: 'Guardado',
    2: 'Guardando',
    3: 'Cancelado'
  }

  useEffect(() => {
    isDirty && setLabelSave(0)
  }, [watch()])

  const defaultLabel = 1
  const [labelSave, setLabelSave] = useState(defaultLabel);
  const onSubmit = data => {
    setLabelSave(2)
    updatePlace(place.id, {
      config: data
    }).then(res => {
      setLabelSave(1)
    })
  }

  return (
    <div>
      <h2 className="text-center">Configuración</h2>
      <div className="grid max-w-sm  mx-auto my-6">
        <div className="divider" />
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="flex items-center justify-evenly ">
            <span className="label-text whitespace-nowrap">Huespedes visibles para : </span>
            <div className="flex items-center justify-evenly w-full">
              <Checkbox {...register('guestsVisiblesFor.admin')} label='Admin' />
              <Checkbox {...register('guestsVisiblesFor.guests')} label='Huespedes' disabled />
              <Checkbox {...register('guestsVisiblesFor.all')} label='Todos' />
            </div>
          </div>

          <div className="flex w-full justify-center mt-2">
            <button className="btn btn-sm btn-primary" disabled={[1, 2, 3].includes(labelSave)}>
              {FORM_STATUS[labelSave]}
            </button>
          </div>
        </form>
        <div className="divider" />
      </div>
    </div>
  )
}

export default FormPlaceConfig