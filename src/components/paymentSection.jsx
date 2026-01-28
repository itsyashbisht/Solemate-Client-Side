import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../thunks/order.thunk";
import { verifyPayment } from "../thunks/payment.thunk";

export default function PaymentSection({
  shippingData,
  total,
  onPaymentSuccess,
  onPaymentError,
  razorpayKeyId,
  paymentMethod,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { verfying, success } = useSelector((state) => state.payment);

  const { currentOrder, loading, error } = useSelector((state) => state.order);

  // LOAD RAZORPAY SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsLoading(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      setIsLoading(false);
      return;
    }

    const payload = {
      paymentMethod: paymentMethod,
      shippingAddress: shippingData,
    };

    // CREATE ORDER (BACKEDN FETCHES CART)
    dispatch(createOrder(payload));
    openRazorpayCheckout(currentOrder);
  };

  const openRazorpayCheckout = (orderData) => {
    const { razorpayOrder, order } = orderData;

    const options = {
      key: razorpayKeyId,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Solemate",
      description: "Order Payment",

      handler: async function (response) {
        // 1. DISPATCH THE VERIFICATION
        // IF USING CREATEASYNCTHUNK, WE CAN UNWRAP THE RESULT TO HANDLE SUCCESS HERE
        try {
          const result = await dispatch(
            verifyPayment({
              paymentInfo: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            }),
          ).unwrap();

          // 2. ONLY RUN SUCCESS LOGIC IF THE BACKEDN VERIFICATION ACTUALLY PASSED
          setIsLoading(false);
          onPaymentSuccess(result);
        } catch (err) {
          setIsLoading(false);
          onPaymentError("Payment verification failed");
        }
      },

      modal: {
        ondismiss: () => {
          setIsLoading(false);
          onPaymentError("Payment cancelled by user");
        },
      },

      prefill: {
        // Use fullname or name based on your data structure
        name: order.shippingAddress.fullname,
        email: order.shippingAddress.email,
        contact: order.shippingAddress.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold">
            1
          </div>
          <span className="text-sm font-medium text-gray-400">Shipping</span>
        </div>
        <div className="h-px flex-1 mx-4 bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
            2
          </div>
          <span className="text-sm font-medium text-black">Payment</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border border-gray-200 rounded-lg p-8 bg-gray-50">
        <h3 className="text-lg font-semibold text-black mb-6">
          Payment Method
        </h3>

        <div className="border border-gray-300 rounded-lg p-6 bg-white mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-black">
                Secure Checkout via Razorpay
              </p>
              <p className="text-xs text-gray-500">
                Safe, Fast & Secure Payment
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-xs text-gray-600">
              <span className="font-medium text-green-700">Safe & Secure</span>{" "}
              • SSL Encrypted • PCI Compliant
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handleRazorpayPayment}
          disabled={isLoading}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-base hover:bg-gray-900 disabled:bg-gray-400 transition flex items-center justify-center gap-2 mb-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ${total.toFixed(2)} • Secure Checkout
            </>
          )}
        </button>

        {/* Payment Methods Info */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>We accept all major payment methods</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">
              Visa
            </span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">
              Mastercard
            </span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">
              UPI
            </span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs">
              NetBanking
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleRazorpayPayment}
          disabled={isLoading}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-base hover:bg-gray-900 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}
