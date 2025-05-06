// Example.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// ① import the named export
import { InnerImageZoom } from "react-inner-image-zoom";
// ② import the zoom styles
import "react-inner-image-zoom/lib/styles.min.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ isOpen, data, onClose }) {
  // 1) pick the first in-stock size
  const [selectedSize, setSelectedSize] = useState(
    data.size.find((s) => s.inStock) || data.size[0]
  );

  // 2) lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-10">
        {/* BACKDROP */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        {/* PANEL */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel className="relative w-full max-w-4xl transform overflow-hidden rounded bg-white p-6 text-left shadow-xl transition-all">
                {/* close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
                  {/* ─── zoomable image ─── */}
                  <div className="sm:col-span-4 lg:col-span-5">
                    <InnerImageZoom
                      className="rounded-lg bg-gray-100 object-cover w-full"
                      src={data.image_url}
                      zoomSrc={data.image_url}
                      zoomType="hover"
                      zoomPreload={true}
                      zoomScale={1.5}
                    />
                  </div>

                  {/* ─── product details ─── */}
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {data.product_title}
                    </h2>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      MRP ₹{data.price}
                    </p>

                    <div className="mt-6 flex items-center">
                      <span className="mr-2 font-medium">Color:</span>
                      <div className="flex space-x-2">
                        {data.color.map((c, idx) => (
                          <div
                            key={idx}
                            className="h-6 w-6 rounded-full border-2 border-white"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-10">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          Size
                        </div>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4 grid grid-cols-4 gap-4"
                      >
                        {data&&data.size.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active, checked }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                              )
                            }
                          >
                            {({ checked }) => (
                              <span
                                className={classNames(
                                  checked ? "font-semibold" : "",
                                  "block"
                                )}
                                style={{ color: size.inStock ? "black" : "gray" }}
                              >
                                {console.log(size ,"sizess")}
                                {size}
                              </span>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </fieldset>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 w-full rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
