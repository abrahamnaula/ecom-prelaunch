import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
export default function SortMenu() {
    return (
        <div className="sm:-mt-cstm md:-mt-midsh text-right">
            <Menu as="div" className="inline-block text-left">
                <div>
                    <Menu.Button className="text-black font-nhg font-medium
                                            sm:text-xxs sm:text-black sm:font-nhg sm:font-medium
                                            focus:outline-none pt-0">
                        SORT +
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="bg-bebe absolute right-0 w-56 origin-top-right divide-y divide-gray-100
                                           shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-grayBkg text-white' : 'text-gray-900'
                                        }   group flex w-full items-center rounded-none px-2 py-2 
                                            text-xs sm:text-sm font-nhg font-medium`}
                                    >
                                        DATE, NEW TO OLD
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-grayBkg text-white' : 'text-gray-900'
                                        }   group flex w-full items-center rounded-none px-2 py-2 
                                            text-xs sm:text-sm font-nhg font-medium`}
                                    >
                                        DATE, OLD TO NEW
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-grayBkg text-white' : 'text-gray-900'
                                        }   group flex w-full items-center rounded-none px-2 py-2 text-xs 
                                            sm:text-sm font-nhg font-medium`}
                                    >
                                        PRICE, LOW TO HIGH
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-grayBkg text-white' : 'text-gray-900'
                                        }   group flex w-full items-center rounded-none px-2 py-2 text-xs 
                                            sm:text-sm font-nhg font-medium`}
                                    >
                                        PRICE, HIGH TO LOW
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
