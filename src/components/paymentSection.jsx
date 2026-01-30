import { AlertCircle, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, createOrder } from "../thunks/order.thunk";
import { verifyPayment } from "../thunks/payment.thunk";

export default function PaymentSection({
  shippingData,
  total,
  onPaymentSuccess,
  onPaymentError,
  razorpayKeyId,
  paymentMethod,
}) {
  const dispatch = useDispatch();

  // REDUX SELECTORS
  const { loading: orderLoading, error: orderError } = useSelector(
    (state) => state.order,
  );
  const { verifying: paymentVerifying, error: paymentError } = useSelector(
    (state) => state.payment,
  );

  // LOCAL STATE
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // COMBINED STATES
  const isBusy = isLoading || orderLoading || paymentVerifying;
  const displayError = localError || orderError || paymentError;

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

  // CANCEL ORDER HELPER FUNCTION
  const handleOrderCancellation = async (orderIdToCancel) => {
    try {
      await dispatch(cancelOrder(orderIdToCancel)).unwrap();
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  // HANDLE RAZORPAY PAYMENT INITIATION
  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    setLocalError(null);

    try {
      // LOAD RAZORPAY SCRIPT
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        const errorMsg = "Razorpay SDK failed to load. Please try again.";
        setLocalError(errorMsg);
        onPaymentError(errorMsg);
        setIsLoading(false);
        return;
      }

      // CREATE ORDER
      const payload = {
        paymentMethod: paymentMethod,
        shippingAddress: shippingData,
      };

      const orderData = await dispatch(createOrder(payload)).unwrap();
      const { order, razorpayOrder } = orderData.data;
      const createdOrderId = order?._id;

      // OPEN RAZORPAY CHECKOUT
      setIsLoading(false);
      openRazorpayCheckout({ order, razorpayOrder }, createdOrderId);
    } catch (err) {
      console.error("Failed to create order:", err);
      const errorMsg =
        err?.message || "Failed to create order. Please try again.";
      setLocalError(errorMsg);
      onPaymentError(errorMsg);
      setIsLoading(false);
    }
  };

  // OPEN RAZORPAY CHECKOUT MODAL
  const openRazorpayCheckout = (orderData, createdOrderId) => {
    try {
      const { razorpayOrder, order } = orderData;

      if (!razorpayOrder || !order) {
        throw new Error("Invalid order data received from server");
      }

      const options = {
        key: razorpayKeyId,
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Solemate",
        description: "Order Payment",

        // HANDLE SUCCESSFUL PAYMENT
        handler: async function (response) {
          try {
            setIsLoading(true);

            // VERIFY PAYMENT WITH BACKEND
            const result = await dispatch(
              verifyPayment({
                paymentInfo: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
              }),
            ).unwrap();

            setIsLoading(false);
            setLocalError(null);
            onPaymentSuccess(result);
          } catch (err) {
            setIsLoading(false);
            const errorMsg =
              err?.message ||
              "Payment verification failed. Please contact support.";
            setLocalError(errorMsg);

            // CANCEL ORDER IF PAYMENT VERIFICATION FAILS
            await handleOrderCancellation(createdOrderId);
            onPaymentError(errorMsg);
          }
        },

        // HANDLE USER CANCELLATION
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            const cancelMsg = "Payment cancelled by user";
            setLocalError(cancelMsg);

            // CANCEL ORDER IF USER CANCELS PAYMENT
            handleOrderCancellation(createdOrderId);
            onPaymentError(cancelMsg);
          },
        },

        // PREFILL USER DATA
        prefill: {
          name: order.shippingAddress.fullname,
          email: order.shippingAddress.email,
          contact: order.shippingAddress.phone,
        },

        // THEME
        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Failed to open Razorpay:", err);
      const errorMsg = err.message || "Failed to open payment modal";
      setLocalError(errorMsg);

      // CANCEL ORDER IF RAZORPAY FAILS TO OPEN
      handleOrderCancellation(createdOrderId);
      onPaymentError(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* STEPPER */}
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

      {/* ERROR MESSAGE */}
      {displayError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Payment Error</p>
            <p className="text-sm text-red-700 mt-1">{displayError}</p>
          </div>
        </div>
      )}

      {/* PAYMENT METHOD SECTION */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h3 className="text-base font-semibold text-black mb-5">
          Payment Method
        </h3>

        {/* RAZORPAY CARD */}
        <div className="border border-gray-300 rounded-lg p-5 bg-white mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-black text-sm">
                Secure Checkout via Razorpay
              </p>
              <p className="text-xs text-gray-500">
                Safe, Fast & Secure Payment
              </p>
            </div>
          </div>
        </div>

        {/* TRUST INDICATORS */}
        <div className="mb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              <span className="font-medium text-green-700">Safe & Secure</span>{" "}
              • SSL Encrypted • PCI Compliant
            </p>
          </div>
        </div>

        {/* PAYMENT BUTTON */}
        <button
          onClick={handleRazorpayPayment}
          disabled={isBusy || !!displayError}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mb-4"
        >
          {isBusy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>
                {orderLoading
                  ? "Creating Order..."
                  : paymentVerifying
                    ? "Verifying Payment..."
                    : "Processing..."}
              </span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay ${total.toFixed(2)} • Secure Checkout
            </>
          )}
        </button>

        {/* ACCEPTED PAYMENT METHODS */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>We accept all major payment methods</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
              Visa
            </span>
            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
              Mastercard
            </span>
            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
              UPI
            </span>
            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
              NetBanking
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BUTTON */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <button
          onClick={handleRazorpayPayment}
          disabled={isBusy || !!displayError}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isBusy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>
                {orderLoading
                  ? "Creating..."
                  : paymentVerifying
                    ? "Verifying..."
                    : "Processing..."}
              </span>
            </>
          ) : (
            `Pay $${total.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}
