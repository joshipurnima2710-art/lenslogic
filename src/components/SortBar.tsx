import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SortDropdown = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          h-11
          pl-4
          pr-10
          rounded-xl
          border
          border-gray-200
          bg-white
          appearance-none
          text-sm
          min-w-[180px]
          outline-none
          hover:border-[#10B981]
        "
      >

        <option value="newest">
          Newest
        </option>

        <option value="lowtohigh">
          Price: Low to High
        </option>

        <option value="hightolow">
          Price: High to Low
        </option>

        
      </select>

      <ChevronDown
        size={16}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          pointer-events-none
          text-gray-400
        "
      />
    </div>
  );
};

export default SortDropdown;