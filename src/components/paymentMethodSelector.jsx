import { Check, CreditCard, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

export default function PaymentMethodSelector({ onMethodSelect, total }) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    onMethodSelect(method);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-black mb-2">
          Payment Method
        </h2>
        <p className="text-gray-600 text-sm">
          Choose how you'd like to pay for your order
        </p>
      </div>

      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div
          onClick={() => handleSelect("COD")}
          className={`relative p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedMethod === "COD"
              ? "border-black bg-black bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "COD"
                  ? "border-black bg-black"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "COD" && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Truck
                  className={`w-5 h-5 ${selectedMethod === "COD" ? "text-black" : "text-gray-400"}`}
                />
                <h3 className="font-semibold text-black">Cash on Delivery</h3>
              </div>
              <p className="text-sm text-gray-600 mt-2 ml-8">
                Pay when your order arrives at your doorstep
              </p>
              <div className="mt-3 ml-8 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Total Amount:{" "}
                  <span className="font-semibold text-black">
                    ${total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Online Payment */}
        <div
          onClick={() => handleSelect("ONLINE")}
          className={`relative p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedMethod === "ONLINE"
              ? "border-black bg-black bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "ONLINE"
                  ? "border-black bg-black"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === "ONLINE" && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CreditCard
                  className={`w-5 h-5 ${selectedMethod === "ONLINE" ? "text-black" : "text-gray-400"}`}
                />
                <h3 className="font-semibold text-black">
                  Pay Online (Razorpay)
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2 ml-8">
                Secure payment via credit card, debit card, or UPI
              </p>
              <div className="mt-3 ml-8 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Supported Methods: Visa, Mastercard, UPI, Netbanking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="pt-6 border-t border-gray-200">
        <Button
          onClick={() => selectedMethod && onMethodSelect(selectedMethod)}
          disabled={!selectedMethod}
          className="w-full bg-black hover:bg-black hover:opacity-90 text-white py-3 rounded-lg font-medium transition-all"
        >
          Continue with{" "}
          {selectedMethod === "COD"
            ? "Cash on Delivery"
            : selectedMethod === "ONLINE"
              ? "Online Payment"
              : "Payment"}
        </Button>
      </div>
    </div>
  );
}
