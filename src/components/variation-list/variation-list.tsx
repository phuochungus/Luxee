import { VariationListItem } from "@/components";
import { Variation } from "@/pages";

import "./style.css";

interface VariationListProps {
    variations: Variation[];
    setVariations: (variations: Variation[]) => void;
}

export function VariationList(props: VariationListProps) {
    return (
        <ul className="list-group">
            {props.variations.map((variation: Variation, index: number) => (
                <li
                    className="list-group-item list-group-item-action"
                    key={variation.name}
                >
                    <VariationListItem
                        variation={variation}
                        openEditor={variation.name == "" && variation.values.length == 0}
                        setVariation={(name: string, values: string[]) =>
                            props.setVariations(
                                props.variations.map((e: Variation) =>
                                    e.name == variation.name
                                        ? { name: name, values: values }
                                        : e
                                )
                            )
                        }
                        deleteVariation={() =>
                            props.setVariations(
                                props.variations.filter(
                                    (e: Variation) => e.name != variation.name
                                )
                            )
                        }
                    />
                </li>
            ))}

            <li className="list-group-item">
                <span
                    id="add-variation"
                    className="text-primary"
                    onClick={() =>
                        props.setVariations([
                            ...props.variations,
                            {
                                name: "",
                                values: [],
                            },
                        ])
                    }
                >
                    + Add more...
                </span>
            </li>
        </ul>
    );
}
