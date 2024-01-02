import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface DescriptionPopoverProps {
  description: string;
}

const DescriptionPopover = ({ description }: DescriptionPopoverProps) => {
  const formattedDescription =
    description.length > 30
      ? description.slice(0, 30).trim() + "..."
      : description;

  const chunks = description.match(/.{1,50}/g);
  const formattedChunks = chunks ? chunks.join(" ") : description;
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <span>{formattedDescription}</span>
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-4 -translate-x-1/2 transform w-[32rem] shadow-md shadow-lime-500">
              <div className="overflow-hidden shadow-lg ring-1 ring-black/5 text-wrap">
                <div className="bg-slate-700 p-4 text-wrap border border-lime-500 flex justify-center items-center flex-wrap h-auto">
                  {formattedChunks}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DescriptionPopover;
