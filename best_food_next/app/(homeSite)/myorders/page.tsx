import Image from "next/image";

const MyOrders = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-5 text-2xl">My orders</h1>

      <div className="space-y-4">
        {/* 1.order */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className=" relative overflow-hidden aspect-square rounded-xl">
              <Image
                fill
                src="/pizza1.jpg"
                className="hover:scale-110 object-cover transition h-full w-full "
                alt="pizza"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h2 className="mb-4 text-xl">Pizza Order</h2>
            <p className="mb-2">
              <strong>Order date: </strong>17.6.2024
            </p>
            <p className="mb-2">
              <strong>Size: </strong> Medium
            </p>
            <p className="mb-2">
              <strong>Quantity: </strong>3
            </p>
            <p className="mb-2">
              <strong>Total Price: </strong>50$
            </p>

            <div className=" cursor-pointer inline-block py-4 px-6 bg-red-400 text-white rounded-xl">
              Go to Order
            </div>
          </div>
        </div>
        {/* 2.order */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className=" relative overflow-hidden aspect-square rounded-xl">
              <Image
                fill
                src="/pizza1.jpg"
                className="hover:scale-110 object-cover transition h-full w-full "
                alt="pizza"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h2 className="mb-4 text-xl">Pizza Order</h2>
            <p className="mb-2">
              <strong>Order date: </strong>17.6.2024
            </p>
            <p className="mb-2">
              <strong>Size: </strong> Small
            </p>
            <p className="mb-2">
              <strong>Quantity: </strong>3
            </p>
            <p className="mb-2">
              <strong>Total Price: </strong>70$
            </p>

            <div className=" cursor-pointer inline-block py-4 px-6 bg-red-400 text-white rounded-xl">
              Go to Order
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyOrders;
