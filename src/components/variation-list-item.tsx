import React from "react";
import { Variation } from "@/pages";
import { VariationListItemDisplay } from "@/components/variation-list-item-display/variation-list-item-display";
import { VariationListItemEdit } from "@/components/variation-list-item-edit";

interface VariationRowProps {
    variation: Variation;
    openEditor?: boolean;
    setVariation: (name: string, values: string[]) => void;
    deleteVariation: () => void;
}

export function VariationListItem(props: VariationRowProps) {
    const [openEditor, setOpenEditor] = React.useState(props.openEditor ?? false);

    return (
        <>
            {openEditor ? (
                <VariationListItemEdit
                    variation={props.variation}
                    deleteVariation={props.deleteVariation}
                    setVariation={props.setVariation}
                    closeEditor={() => {
                        setOpenEditor(false);
                    }}
                />
            ) : (
                <VariationListItemDisplay
                    variation={props.variation}
                    openEditor={() => {
                        setOpenEditor(true);
                    }}
                />
            )}
        </>
    );
}
