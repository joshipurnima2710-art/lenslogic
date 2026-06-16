import { useEffect, useRef, useState } from "react";

type Option = {
  id: number;
  name: string;
  brand_id: number | null;
};

type Props = {
  label: string;
  options: Option[];
  selected: number[];
  onChange: (optionId: number) => void;
};

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Show selected names
  const selectedNames = options
    .filter((option) =>
      selected.includes(option.id)
    )
    .map((option) => option.name)
    .join(", ");

  return (
    <div
      className="relative w-60"
      ref={dropdownRef}
    >
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full
          bg-white
          border
          border-gray-300
          rounded-md
          px-4
          py-2
          text-sm
          flex
          justify-between
          items-center
          shadow-sm
          hover:border-blue-500
        "
      >
        <span className="truncate">
          {selectedNames || label}
        </span>

        <span className="text-gray-400">
          ▼
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            mt-2
            w-full
            bg-white
            border
            border-gray-200
            rounded-md
            shadow-lg
            z-50
            max-h-64
            overflow-y-auto
          "
        >
          {options.map((option) => (
            <label
              key={option.id}
              className="
                flex
                items-center
                gap-3
                px-4
                py-2
                text-sm
                hover:bg-gray-100
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={selected.includes(
                  option.id
                )}
                onChange={() =>
                  onChange(option.id)
                }
              />

              {option.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;