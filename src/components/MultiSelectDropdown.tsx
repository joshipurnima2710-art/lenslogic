import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

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

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
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

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          min-w-[180px]
          h-8
          px-4
          border
          rounded
          bg-white
          flex
          items-center
          justify-between
          text-sm
          transition-all
          ${
            open
              ? "border-[#10B981] ring-2 ring-[#10B981]/10"
              : "border-gray-300 hover:border-[#10B981]"
          }
        `}
      >
        <span className="truncate">
          {selected.length > 0
            ? `${label} (${selected.length})`
            : label}
        </span>

        <ChevronDown
          size={16}
          className={`
            text-gray-500
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            top-12
            left-0
            w-56
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          <div className="max-h-64 overflow-y-auto py-2">
            {options.map(option => {
              const checked =
                selected.includes(
                  option.id
                );

              return (
                <button
                  key={option.id}
                  onClick={() =>
                    onChange(option.id)
                  }
                  className="
                    w-full
                    px-4
                    py-2
                    flex
                    items-center
                    justify-between
                    hover:bg-gray-50
                    text-sm
                  "
                >
                  <span
                    className={
                      checked
                        ? "text-[#10B981] font-medium"
                        : "text-gray-700"
                    }
                  >
                    {option.name}
                  </span>

                  {checked && (
                    <Check
                      size={16}
                      className="text-[#10B981]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;