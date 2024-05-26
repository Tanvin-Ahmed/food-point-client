import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pricingData } from "../utils/data";
import { LiaCoinsSolid } from "react-icons/lia";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KcXGkHXCKhZWvFTIQZJF2gJNKcgFpC71BbmlDbrLm1AjQiqvRK8nW0HWk5ii5BCSeTDmYKM3N3x7K8gRpOrcbpm00IZTAgbWa"
);

type PriceType = {
  id: number;
  amount: number;
  coins: number;
  details: string[];
};

const Payment = () => {
  const { id } = useParams();
  const [priceData, setPriceData] = useState<PriceType | null>(null);

  useEffect(() => {
    const data = pricingData.find((p) => p.id === Number(id));
    if (data) setPriceData(data);
  }, [id]);

  return (
    <section>
      <h1 className="text-4xl font-bold">Complete payment process</h1>
      <div className="mt-8">
        <div className="p-4 mx-auto shadow-md rounded-md h-full max-w-md flex flex-col justify-between bg-orange-50">
          <div className="flex justify-center items-center">
            <h2 className="text-orange-500 text-3xl font-bold flex justify-center items-center">
              <LiaCoinsSolid className="text-orange-500 :hover:text-white" />{" "}
              {priceData?.coins} Coins
            </h2>
          </div>
          <div className="mt-12">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={priceData?.amount}
                coin={priceData?.coins}
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
