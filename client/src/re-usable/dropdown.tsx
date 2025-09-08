



import { Dropdown, DropdownItem } from "flowbite-react";
import type { ReactNode } from "react";
import { SmallTooltip } from "./tooltip";
import { MoreVertical } from "lucide-react";

type DropdownProps = {
  label: ReactNode;
  items: { name?: string }[];
  onClick?: (item: { name?: string }) => void;
  disabled?: boolean; 
};

export function CustomDropdown({ label, items, onClick, disabled }: DropdownProps) {
  if (disabled) {
    return (
      <div className="p-2 text-gray-400 cursor-not-allowed">
          <SmallTooltip
              bgColor="black"
              textColor=""
              longText="fadjadhj"
              element={<MoreVertical />}
              position="top"
            />
        {/* {label} */}
      </div>
    );
  }

  return (
    <Dropdown label={label} arrowIcon={false}>
      {items.map((item, index) => (
        <DropdownItem className="text-white mb-1" key={index} onClick={() => onClick?.(item)}>
          {item.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

