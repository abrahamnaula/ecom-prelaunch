import { Popover, Transition } from '@headlessui/react'
import {Fragment, useState} from 'react'
import FilterMenu from "../Refine";

export default function PopRefine() {

    return (
        <div className="fixed w-full min-w-sm mt-1.5">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="flex text-black font-nhg font-medium text-xxs sm:text-xxs p-0"
                        >
                            REFINE +
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
                            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2
                                                      transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5
                                                      border border-grayBkg">

                                    <div className="bg-bebe p-0.5">
                                        <FilterMenu />
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}