import FormAccommodation from "comps/FormAccommodation"
import FormCashBalance from "comps/FormCashBalance"
import FormGuest from "comps/FormGuest"
import MainModal from "comps/Modal/MainModal"

const OptionsPlace = ({ place, guests }) => <div>
  <h3 className='text-xl font-bold text-left my-4'>
    Options
  </h3>
  <div className='grid gap-2 sm:flex justify-evenly'>
    <MainModal
      title={ 'New Payment' }
      OpenComponentType='primary'
      buttonLabel='New Payment'
    >
      <FormAccommodation
        place={ place }
        guests={ guests }
      />
    </MainModal>
    <MainModal
      title={ 'New Guest' }
      OpenComponentType='primary'
      buttonLabel='New Guest'
    >
      {/* <FormPlace place={place} /> */ }
      <FormGuest />
    </MainModal>
    <MainModal
      title='New cost'
      buttonLabel='New cost'
      OpenComponentType='primary'
    >
      <div>
        <FormCost place={ place } />
      </div>
    </MainModal>
    <MainModal
      title={ 'Cash Balance' }
      OpenComponentType='primary'
      buttonLabel='Cash Balance'
    >
      <FormCashBalance place={ place } />
    </MainModal>
  </div>
</div>

export default OptionsPlace