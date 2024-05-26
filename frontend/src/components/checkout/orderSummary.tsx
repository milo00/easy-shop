import bigDecimal from "js-big-decimal";
import Loader from "../loader/loader";

interface IOrderSummaryProps {
  numOfItems: number;
  totalCost: number;
  discount?: number;
  loading?: boolean;
}

const OrderSummary = (props: IOrderSummaryProps) => {
  const discountValue =
    Number(bigDecimal.multiply(props.discount, props.totalCost))?.toFixed(2) ??
    0;

  return (
    <>
      <h2>PODSUMOWANIE ZAMÓWIENIA:</h2>
      <Loader loading={!!props.loading} basic width={75}>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <span>{props.numOfItems} przedmiotów</span>
            <span>{props.totalCost} PLN</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>dostawa</span>
            <span>9.99 PLN</span>
          </div>
          {props.discount ? (
            <div className="d-flex justify-content-between text-primary fw-bolder">
              <span>zniżka</span>
              <span>-{discountValue} PLN</span>
            </div>
          ) : null}
        </div>
        <div className="d-flex justify-content-between fw-bolder">
          <span>koszt całkowity</span>
          <span>
            {bigDecimal.add(
              9.99,
              bigDecimal.subtract(props.totalCost, discountValue)
            )}{" "}
            PLN
          </span>
        </div>
      </Loader>
    </>
  );
};

export default OrderSummary;
