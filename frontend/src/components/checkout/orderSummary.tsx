import bigDecimal from "js-big-decimal";
import React from "react";
import Loader from "../loader";

interface IOrderSummaryProps {
  numOfItems: number;
  totalCost: number;
  discount?: number;
}

const OrderSummary = (props: IOrderSummaryProps) => {
  const discountValue =
    Number(bigDecimal.multiply(props.discount, props.totalCost))?.toFixed(2) ??
    0;

  return (
    <>
      <h2>ORDER SUMMARY:</h2>
      <Loader loading={!props.numOfItems} basic>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <span>{props.numOfItems} items</span>
            <span>{props.totalCost} PLN</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>shipping</span>
            <span>9.99 PLN</span>
          </div>
          {props.discount ? (
            <div className="d-flex justify-content-between text-primary fw-bolder">
              <span>discount</span>
              <span>-{discountValue} PLN</span>
            </div>
          ) : null}
        </div>
        <div className="d-flex justify-content-between fw-bolder">
          <span>total cost</span>
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
