import { VariationListItem, VariationListItemDisplay } from "@/components";
import { Variation } from "@/pages";
import { Box, Divider } from "@mui/material";

export function VariationList(props: any) {
    return (
        <ul className="list-group">
            {props.product.variations.map((variation: Variation, index: number) => (
                <li className="list-group-item" key={variation.name}>
                    <VariationListItem
                        variation={variation}
                        openEditor={variation.name == "" && variation.values.length == 0}
                        setVariation={(name: string, values: string[]) => {
                            props.setProduct({
                                ...props.product,
                                variations: props.product.variations.map(
                                    (e: Variation, i: number) => {
                                        if (i == index) {
                                            return {
                                                name: name,
                                                values: values,
                                            };
                                        } else {
                                            return e;
                                        }
                                    }
                                ),
                            });
                        }}
                        deleteVariation={() => {
                            props.setProduct({
                                ...props.product,
                                variations: props.product.variations.filter(
                                    (_: any, i: number) => i != index
                                ),
                            });
                        }}
                    />
                </li>
            ))}

            <li className="list-group-item">
                <span
                    id="add-variation"
                    className="text-primary"
                    onClick={() => {
                        props.setProduct({
                            ...props.product,
                            variations: [
                                ...props.product.variations,
                                {
                                    name: "",
                                    values: [],
                                },
                            ],
                        });
                    }}
                >
                    + Add more...
                </span>
            </li>
        </ul>
    );
}
