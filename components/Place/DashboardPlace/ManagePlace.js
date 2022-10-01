import { selectPlaceState } from "@/store/slices/placeSlice";
import FormCashBalance from "comps/FormCashBalanceV2";
import Modal from "comps/Modal";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const ManagePlace = () => {

  return (
    <div>
      <div className="flex w-full justify-around">
        <AllBalancesModal />
        <CashBalanceModal />
      </div>
    </div>
  );
}



const AllBalancesModal = () => {
  const [openCashBalance, setOpenCashBalance] = useState()
  const handleOpenCashBalance = () => {
    setOpenCashBalance(!openCashBalance)
  }
  const place = useSelector(selectPlaceState)

  return <>
    <Link href={ `/places/${place.id}/dashboard/cashbalances` }>
      <a className="btn btn-outline btn-sm">
        Cash balances
      </a>
    </Link>

  </>
}

const CashBalanceModal = () => {
  const [openCashBalance, setOpenCashBalance] = useState()
  const handleOpenCashBalance = () => {
    setOpenCashBalance(!openCashBalance)
  }
  const place = useSelector(selectPlaceState)

  return <>
    <button
      onClick={ () => handleOpenCashBalance() }
      className="btn btn-primary btn-sm"
    >
      Cash Balance
    </button>
    <Modal
      open={ openCashBalance }
      handleOpen={ handleOpenCashBalance }
      title='Cash Balance'
    >
      <FormCashBalance />

    </Modal>
  </>
}

export default ManagePlace;