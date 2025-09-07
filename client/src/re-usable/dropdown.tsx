import { Dropdown, DropdownItem } from "flowbite-react";
import type { ReactNode } from "react";

type DropdownProps = {
  label: ReactNode;
  items: { name?: string}[];
  onClick?: (item: { name?: string }) => void;
};

export function CustomDropdown({ label, items,onClick}: DropdownProps) {
  return (
    <Dropdown label={label} arrowIcon={false}>
      {items.map((item, index) =>
      (
          <DropdownItem key={index}onClick={() => onClick?.(item)}>
            {item.name}
          </DropdownItem>
        )
      )}
    </Dropdown>
  );
}
