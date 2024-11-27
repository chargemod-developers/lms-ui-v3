import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import config  from '../config/config';
import axios from "axios";
import HeaderWithClock from '../components/general/header/HeaderWithClock';

const { razorpayId } = config;
const {serverUrl} = config;

const PaymentPage = () => {
  const { duration, consumed, amount } = useParams();
  const navigate = useNavigate()
  const paymentHandler = async () => {
    const orderData = {
      amount: Math.ceil(amount).toFixed(2) * 100,
      currency: "INR",
      receipt: Date.now().toString(),
    };

    const createOrder = await axios.post(
      `${serverUrl}/createPayment`,
      orderData
    );

    if (createOrder.status !== 200) {
      console.log("Error in creating order");
      return;
    }
    console.log(createOrder.data);

    const options = {
      key: razorpayId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "chargeMod",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: createOrder?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };
        const validatePayment = await axios.post(
          `${serverUrl}/validatePayment`,
          body
        );

        console.log(validatePayment);
        if (validatePayment.status == 200) {
          navigate("/thank-you");
        }

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Evee Cloud",
        email: "eveecloud@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "chargeMod Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log("payment failed");
      console.log(response.error);
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
  return (
    <div className="w-full h-full rounded-xl  flex flex-col justify-between">
        <HeaderWithClock />
        <div className="flex justify-center relative items-center">
          {/* <img src={gifUrl} width={250} height={250} alt="" /> */}
          <div className="bg-cardBg text-white absolute opacity-80 h-auto w-full md:w-5/6 rounded-r-3xl rounded-tl-3xl font-manrope">
            <div className="m-5">
              <div className="rounded h-3/4 flex justify-between gap-5">
                <div className=" w-1/2 rounded flex flex-col gap-3">
                  <div className="h-1/2 border-2 border-bgBlue p-3 rounded-2xl flex flex-col justify-center">
                    <h1 className="text-colorThree  text-xl font-semibold text-center">
                      Total energy consumption
                    </h1>
                    <p className="text-center text-lg font-bold mt-2">
                      {consumed} kWh
                    </p>
                  </div>
                  <div className="border-2 border-bgBlue p-4 h-1/2 rounded-2xl flex flex-col justify-center">
                    <h1 className="text-colorThree  text-xl font-semibold text-center">
                      Duration
                    </h1>
                    <p className="text-center text-lg font-bold mt-2">
                      {parseFloat(duration).toFixed(2)} Minutes
                    </p>
                  </div>
                </div>
                <div className="border-2 border-bgBlue w-1/2 rounded-2xl flex flex-col justify-center">
                  <h1 className="text-colorThree  text-2xl font-semibold text-center">
                    Amount
                  </h1>
                  <p className="text-center text-2xl font-bold mt-2">
                    ₹ {Math.ceil(amount).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-5 w-full h-1/4">
                <button
                  onClick={paymentHandler}
                  className="w-full rounded-3xl border-2 border-[#3B8CE2] bg-gradient-to-r from-colorTwo to-colorThree py-2 font-semibold hover:bg-[#3B8CE2] hover:text-white"
                >
                  PAY
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
  )
}

export default PaymentPage