import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiOutlineSelector as ChevronUpDownIcon } from "react-icons/hi";
import { HiCheck as CheckIcon } from "react-icons/hi";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";


export default function ComboBoxDefaultWrapper({
  value = {},
  onChange,
  onBlur,
  label,
  options,
  error,
}) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
        return option.label.toLowerCase().includes(query.toLowerCase());
      });

  const getValue = (val) => {
    return val?.id ? options.find((option) => option.id === val.id) : val;
  };

  return (
    <>
      <Combobox value={getValue(value)} onChange={onChange} nullable>
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 mt-6">
          {label}
        </Combobox.Label>
        <div className="relative mt-3">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md sm:text-sm">
            <Combobox.Button className="w-full inset-y-0 right-0 flex items-center pr-2">
              <Combobox.Input
                className="
                input
                form-input
                block 
                w-full 
                rounded-md 
                border-0 
                py-1.5 
                px-1
                text-gray-900 
                shadow-sm 
                ring-1 
                ring-inset 
                ring-gray-300 
                placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset 
                focus:ring-gray-600 
                sm:text-sm 
                sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(option) => option?.label || value.label}
                placeholder="Start typing to search..."
                onBlur={onBlur}
              />
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default py-2 pl-10 pr-4 ${active ? "bg-gray-400 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-gray-700"
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </>
  );
}