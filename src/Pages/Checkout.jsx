import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSummary from "../components/orderSummary";
import PaymentMethodSelector from "../components/paymentMethodSelector";
import PaymentSection from "../components/paymentSection";
import ShippingForm from "../components/shipping-form";
import SuccessModal from "../components/successModal";
import Navigation from "../layouts/Navigation";
import { getRazorpayKeyId } from "../thunks/payment.thunk";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  const dispatch = useDispatch();
  const { razorpayKeyId } = useSelector((state) => state.payment);
  const { items, subtotal, tax, totalAmount } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(getRazorpayKeyId());
  }, [dispatch]);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "COD") handleCODSuccess();
    else setCurrentStep(3);
  };

  const handleCODSuccess = () => {
    setSuccessOrder({
      orderId: "ORD-" + Date.now(),
      paymentMethod: "cod",
      message: "Placed! Pay on delivery.",
    });
  };

  const handlePaymentSuccess = (response) => {
    setSuccessOrder({
      orderId: response.razorpay_order_id || "ORD-" + Date.now(),
      paymentId: response.razorpay_payment_id,
      paymentMethod: "ONLINE",
    });
  };

  const handleCloseSuccess = () => {
    setSuccessOrder(null);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navigation />
      <div className="max-w-[1800px] mx-auto px-6 lg:px-32 pt-6 pb-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-12">
          {/* LEFT: ORDER SUMMARY (60%) */}
          <aside className="w-full lg:w-[60%] order-2 lg:order-1">
            <div className="sticky top-6">
              <OrderSummary
                cartItems={items}
                subTotal={subtotal}
                tax={tax}
                total={totalAmount}
              />
            </div>
          </aside>

          {/* RIGHT: FORMS (40%) */}
          <main className="w-full lg:w-[40%] order-1 lg:order-2">
            <div className="w-full">
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                  <ShippingForm onSubmit={handleShippingSubmit} />
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                  <PaymentMethodSelector
                    onMethodSelect={handlePaymentMethodSelect}
                    total={totalAmount}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                  <PaymentSection
                    paymentMethod={paymentMethod}
                    shippingData={shippingData}
                    total={totalAmount}
                    razorpayKeyId={razorpayKeyId}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={(err) => console.error(err)}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <SuccessModal
        isOpen={!!successOrder}
        orderId={successOrder?.orderId}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
