import { isEqual } from "date-fns"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updatePlace } from "../../firebase/places"
import Checkbox from "../inputs/checkbox"

const FormPlaceConfig = ({ place }) => {

  const { register, watch, handleSubmit, formState: { isDirty, } } = useForm({
    defaultValues: {
      ...place.config
    }
  })
  const FORM_STATUS = {
    0: 'Guardar',
    1: 'Guardado',
    2: 'Guardando',
    3: 'Cancelado'
  }


  function deepEqual(x, y) {
    const isObject = x => typeof x == "object" && x != null;
    if (x === y) {
      return true;
    } else if (!isObject(x) || !isObject(y)) {
      return false;
    }
    if (Object.keys(x).length != Object.keys(y).length) {
      return false;
    }

    for (var prop in x) {
      if (!y.hasOwnProperty(prop)) {
        return false;
      }
      if (!deepEqual(x[prop], y[prop])) {
        return false;
      }
    }
    return true;
  }


  const defaultLabel = 1
  const [labelSave, setLabelSave] = useState(defaultLabel);
  useEffect(() => {
    deepEqual(watch(), { ...place.config }) ? setLabelSave(1) : setLabelSave(0)
  }, [watch()])

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
      <h2 className="text-center font-bold text-xl">Configuración</h2>
      <div className="grid max-w-sm  mx-auto mb-6">
        <div className="divider" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-evenly ">
            <span className="label-text whitespace-nowrap">Huespedes visibles para : </span>
            <div className="flex items-center justify-evenly w-full">
              <Checkbox {...register('guestsVisiblesFor.admin')} label='Admin' />
              {/*   <Checkbox {...register('guestsVisiblesFor.guests')} label='Huespedes' /> */}
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