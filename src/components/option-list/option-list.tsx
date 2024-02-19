import { useFieldArray, useFormContext } from "react-hook-form";
import { OptionListItem, Product } from "@/components";

import "./style.css";

export function OptionList() {
    const { control, setValue } = useFormContext<Product>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    return (
        <ul className="list-group">
            {fields.map((field, index) => (
                <li className="list-group-item" key={field.id}>
                    <OptionListItem
                        parentFieldIndex={index}
                        isToggle={field.name == "" && field.values.length == 0}
                        deleteOption={() => remove(index)}
                    />
                </li>
            ))}

            <li className="list-group-item">
                <span
                    id="add-variation"
                    className="text-primary"
                    onClick={() => {
                        append({ name: "", values: [] });
                    }}
                >
                    + Add more...
                </span>
            </li>
        </ul>
    );
}
