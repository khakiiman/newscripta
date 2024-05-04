import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { toast } from 'sonner';

import SearchBar from '../search/SearchBar';
import { getDataFromSessionStorage, storeDataInSessionStorage } from '../../utils/helper/index';
import { logOut } from '../../firebase/index';

import { HiOutlineMenu as Bars3Icon, HiChevronDown as ChevronDownIcon, HiOutlineX as XMarkIcon } from 'react-icons/hi'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { BiLogOut } from "react-icons/bi";

const products = [
  { name: 'Business', href: '/categories/business' },
  { name: 'Health', href: '/categories/health' },
  { name: 'Entertainment', href: '/categories/entertainment' },
  { name: 'Science', href: '/categories/science' },
  { name: 'Technology', href: '/categories/technology' },
]

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState(getDataFromSessionStorage('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("user info changed")
      setUserData(getDataFromSessionStorage('user'));
    }
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, []);

  const handleLogOut = () => {
    toast('You been successfully logged out.');
    logOut()
      .then(() => {
        toast.success('Logged Out!');
        storeDataInSessionStorage('user', {});
        window.dispatchEvent(new Event('storage'));
      })
      .catch((error) => {
        console.error(error)
        toast.error('Something went wrong')
      })
  }

  return (
    <header className="">
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SearchBar />
          <>{userData?.email ? (
            <>
              <button
                onClick={handleLogOut}
                className='flex gap-2 items-center  text-gray-900 ml-3'
              >
                <BiLogOut className='h-6 w-6 hover:scale-105 rotate-180' />
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-sm font-semibold leading-6 text-gray-900 ml-3">
              Login
            </Link>
          )}</>
        </div>
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
              <div className='py-5'>
                <SearchBar />
              </div>
              <div className="space-y-2 py-6">
                <Link
                  to="/categories/general"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  General
                </Link>
                <Link
                  to="/categories/sports"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
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
                            className="block rounded-lg p-0 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Link to={item.href} className='py-2 pl-6 pr-3' onClick={() => setMobileMenuOpen(false)}>
                              {item.name}
                            </Link>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

              </div>
              <>
                {userData?.email ? (
                  <div className='flex flex-col justify-start items-start space-y-4 p-6'>
                    <button
                      onClick={handleLogOut}
                      className='flex items-center gap-2 -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      <BiLogOut />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="py-6">
                    <Link
                      to="/auth"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <hr className='sm:flex sm:px-20' />
    </header>
  )
}

export default Header