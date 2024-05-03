import { Fragment, useState } from 'react'
import {
  HiOutlineMenu as Bars3Icon,
  HiChevronDown as ChevronDownIcon,
  HiOutlineX as XMarkIcon,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

const products = [
  { name: 'Business', href: '/categories/business' },
  { name: 'Health', href: '/categories/health' },
  { name: 'Entertainment', href: '/categories/entertainment' },
  { name: 'Science', href: '/categories/science' },
  { name: 'Technology', href: '/categories/technology' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="h-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 py-1.5">
            <span className="sr-only">News Aggregator</span>
            <span className="font-logo text-2xl tracking-widest font-bold outlined-text">NEWS</span>
            <span className="font-logo text-2xl tracking-widest font-bold">CRIPTA</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link to="/categories/general" className="text-sm font-semibold leading-6 text-gray-900">
            General
          </Link>
          <Link to="/categories/sports" className="text-sm font-semibold leading-6 text-gray-900">
            Sports
          </Link>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              More
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3   overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 cursor-pointer"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 py-1.5">
              <span className="sr-only">News Aggregator</span>
              <span className="font-logo text-2xl tracking-widest font-bold outlined-text">NEWS</span>
              <span className="font-logo text-2xl tracking-widest font-bold">CRIPTA</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/categories/general"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  General
                </Link>
                <Link
                  to="/categories/sports"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sports
                </Link>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        More
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {products.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="span"
                            // href={item.href}
                            className="block rounded-lg p-0 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Link to={item.href} className="py-2 pl-6 pr-3">
                              {item.name}
                            </Link>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header