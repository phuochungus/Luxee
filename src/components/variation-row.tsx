import React from "react";
import { Variation } from "@/pages";
import { VariationDisplayRow } from "@/components/variation-display-row";
import { VariationEditRow } from "@/components/variation-edit-row";

interface VariationRowProps {
    variation: Variation;
    openEditor?: boolean;
    setVariation: (name: string, values: string[]) => void;
    deleteVariation: () => void;
}

export function VariationRow(props: VariationRowProps) {
    const [openEditor, setOpenEditor] = React.useState(props.openEditor ?? false);

    return (
        <>
            {openEditor ? (
                <VariationEditRow
                    variation={props.variation}
                    deleteVariation={props.deleteVariation}
                    setVariation={props.setVariation}
                    closeEditor={() => {
                        setOpenEditor(false);
                    }}
                />
            ) : (
                <VariationDisplayRow
                    variation={props.variation}
                    openEditor={() => {
                        setOpenEditor(true);
                    }}
                />
            )}
        </>
    );
}
