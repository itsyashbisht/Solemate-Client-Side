import { getRazorpayKeyId } from "../thunks/payment.thunk";
import SuccessModal from "../components/successModal";
import { useEffect, useState } from "react";
import PaymentSection from "../components/paymentSection";
import OrderSummary from "../components/orderSummary";
import PaymentMethodSelector from "../components/paymentMethodSelector";
import ShippingForm from "../components/shipping-form";
import Navigation from "../layouts/Navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch Razorpay key from server action to keep it secure
    dispatch(getRazorpayKeyId());
  }, [dispatch]);

  const { items, subtotal, tax, discount, totalAmount, loading, error } =
    useSelector((state) => state.cart);

  const { razorpayKeyId } = useSelector((state) => state.payment);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "COD") {
      // For COD, directly create order
      handleCODSuccess();
    } else {
      // For online payment, proceed to payment section
      setCurrentStep(3);
    }
  };

  const handleCODSuccess = () => {
    setSuccessOrder({
      orderId: "ORD-" + Date.now(),
      paymentMethod: "cod",
      message: "Your order has been placed! You will pay on delivery.",
    });
  };

  const handlePaymentSuccess = (response) => {
    setSuccessOrder({
      orderId: response.razorpay_order_id || "ORD-" + Date.now(),
      paymentId: response.razorpay_payment_id,
      paymentMethod: "ONLINE",
    });
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    alert("Payment failed: " + error);
  };

  const handleCloseSuccess = () => {
    setSuccessOrder(null);
    // Redirect to home or orders page
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="flex flex-col lg:flex-row h-full lg:min-h-[calc(100vh-80px)]">
        {/* Left Column - Order Summary */}
        <OrderSummary cartItems={items} />

        {/* Right Column - Shipping & Payment */}
        <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
          <div className="p-6 lg:p-12 max-w-2xl">
            {currentStep === 1 ? (
              <ShippingForm onSubmit={handleShippingSubmit} />
            ) : currentStep === 2 ? (
              <PaymentMethodSelector
                onMethodSelect={handlePaymentMethodSelect}
                total={totalAmount}
              />
            ) : (
              <PaymentSection
                paymentMethod={paymentMethod}
                shippingData={shippingData}
                total={totalAmount}
                razorpayKeyId={razorpayKeyId}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
          </div>

          {/* Mobile Order Summary */}
          <div className="lg:hidden bg-gray-50 border-t border-gray-200 p-6 mb-20">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-medium text-black">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-black">Total</span>
                <span className="font-semibold text-black text-lg">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={!!successOrder}
        orderId={successOrder?.orderId}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
