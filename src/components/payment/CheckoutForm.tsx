import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AxiosInstance } from "../../libs/axiosInstance";
import { appContext } from "../../context/createContext";
import toast from "react-hot-toast";
import { UserType } from "../../types";
import { useNavigate } from "react-router-dom";

type Props = {
  amount?: number;
  coin?: number;
};

type IntentPayload = {
  clientSecret: string;
};

const CheckoutForm = ({ amount, coin }: Props) => {
  const { userInfo, setUserInfo } = useContext(appContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!amount) return;
      const { data } = await AxiosInstance.post<IntentPayload>(
        "/payment/create-payment-intent",
        { price: amount }
      );
      setClientSecret(data.clientSecret);
    })();
  }, [amount]);

  const updateUserCoin = async () => {
    const { data } = await AxiosInstance.put<UserType>(
      "/users/update-coin-after-payment",
      { coinAmount: coin }
    );
    setUserInfo(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(
        error?.message || "Something went wrong to create payment method"
      );
    } else {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: userInfo?.email,
              name: userInfo?.displayName,
            },
          },
        });

      if (confirmError) {
        toast.error(
          confirmError?.message ||
            "Something went wrong to confirm payment method"
        );
      } else {
        if (paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
        }
      }
    }

    await updateUserCoin();
    navigate("/all-recipes");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="button mt-6 w-full disabled:hover:bg-orange-100 bg-orange-100 transition-all hover:bg-orange-400 hover:text-white"
        disabled={!stripe || !clientSecret.trim() || isLoading}
      >
        Pay {amount} $
      </button>
    </form>
  );
};

export default CheckoutForm;
