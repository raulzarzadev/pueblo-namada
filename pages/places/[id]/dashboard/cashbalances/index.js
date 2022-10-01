import { selectCashBalanceState } from "@/store/slices/cashBalancesSlice";
import CashBalancesList from "comps/CashBalancesList";
import { useSelector } from "react-redux";

const CashBalances = () => {
  return (
    <div>
      <CashBalancesList />
    </div>
  );
}

export default CashBalances;