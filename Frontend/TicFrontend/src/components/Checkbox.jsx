export default function Checkbox({ label, checked, onChange }) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className="
                    w-5 h-5
                    border border-gray-300
                    rounded-sm
                    text-blue-500
                    bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                    appearance-none
                    checked:bg-blue-500 checked:border-blue-500
                    checked:hover:bg-blue-600
                    "                
                checked={checked}
                onChange={onChange}
            />
            <span className="text-sm font-medium text-gray-800">{label}</span>
        </label>
    );
}