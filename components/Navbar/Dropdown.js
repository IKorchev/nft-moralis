import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { useChain, useMoralis } from "react-moralis"
import { useRouter } from "next/router"
export default function Dropdown() {
  const { account } = useChain()
  const router = useRouter()
  const { logout } = useMoralis()
  return (
    <Menu as='div' className='relative inline-block text-left '>
      <div>
        <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-lg font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          Account
          <ChevronDownIcon
            className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as='div'
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute z-50 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push(`/user/${account}`)}
                  className={`${
                    active ? "bg-purple-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-lg`}>
                  NFTs
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? "bg-red-500 text-white" : "text-gray-900 bg-red-300"
                  } group flex rounded-md items-center w-full px-2 py-2 text-lg mt-1`}>
                  Disconnect
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
