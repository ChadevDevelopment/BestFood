import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const links = [
  { href: "/settings" },
  { href: "/support" },
  { href: "/license" },
];

export default function DropDown() {
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-start justify-start gap-2 rounded-md py-1.5 px-20 text-sm font-semibold text-black focus:outline-none">
          Options
          <ChevronDownIcon className="size-4 fill-blackho" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 rounded-xl transition duration-100 shadow border border-white bg-white absolute p-1 text-sm text-blackho z-99999 focus:outline-none"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                <PencilIcon className="size-4 fill-white" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                <Square2StackIcon className="size-4 fill-white" />
                Duplicate
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-gray" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                <ArchiveBoxXMarkIcon className="size-4 fill-white" />
                Archive
                <kbd className="ml-auto hidden font-sans text-xs text-black">
                  ⌘A
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                <TrashIcon className="size-4 fill-white" />
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-black">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
