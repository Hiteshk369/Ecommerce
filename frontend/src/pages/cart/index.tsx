import FormInput from "../../components/FormInput";
import Navbar from "../../components/Navbar";

const Cart = () => {
  return (
    <main className="w-screen h-screen">
      <Navbar />
      <section className="pt-24 w-full h-full">
        <div className="max-w-[1200px] m-auto flex gap-4">
          <div className="w-[60%] h-full flex flex-col gap-4">
            <div className="w-full border border-lightGray rounded-md px-4 pt-4 pb-8 flex flex-col gap-2">
              <p className="text-xl font-medium pt-2 pb-4">
                Delivery Information
              </p>
              <FormInput
                id="fullName"
                label="Full Name"
                placeholderText="Enter your full name"
                required
              />
              <div className="flex w-full gap-4">
                <FormInput
                  id="email"
                  label="Email"
                  placeholderText="Enter your email id"
                  required
                />
                <FormInput
                  id="phoneNumber"
                  label="Phone number"
                  placeholderText="Enter your phone number"
                  required
                />
              </div>
              <FormInput
                id="address"
                label="Address"
                placeholderText="Enter your address"
                required
              />
              <div className="flex w-full gap-4">
                <FormInput
                  id="city"
                  label="City"
                  placeholderText="Enter your city"
                  required
                />
                <FormInput
                  id="state"
                  label="State"
                  placeholderText="Enter your state"
                  required
                />
                <FormInput
                  id="pinCode"
                  label="Pin code"
                  placeholderText="Enter your pin code"
                  required
                />
              </div>
            </div>
            <div className="w-full border border-lightGray rounded-md px-4 py-4">
              <p className="text-xl font-medium pt-2 pb-7">Payment Method</p>
              <div className="flex  justify-evenly">
                <div className="flex items-center gap-1">
                  <input type="radio" value="Male" name="gender" required />
                  <p className="text-neutral-600">Online Payment</p>
                </div>
                <div className="flex items-center gap-1">
                  <input type="radio" value="Female" name="gender" required />
                  <p className="text-neutral-600">Cash On Delivery</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[35%] h-full border border-lightGray rounded-md px-4 py-2">
            <p className="text-xl font-medium pt-2 pb-3">Order Summary</p>
            <div className="h-[260px] overflow-y-scroll">Cart Items</div>
            <div className="flex flex-col gap-1 py-3 border-b border-lightGray">
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Subtotal</p>
                <p className="font-medium">120000</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Tax</p>
                <p className="text-darkGray font-medium">+ 499</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Shipment cost</p>
                <p className="text-darkGray font-medium">+ 101</p>
              </div>
            </div>
            <div className="pt-3 flex justify-between">
              <p className="font-medium">Grand total</p>
              <p className="font-medium">120600</p>
            </div>
            <button className="mt-4 mb-3 w-full flex items-center justify-center bg-darkBlue py-2 rounded-md">
              <p className="text-white font-medium">Continue to payment</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
