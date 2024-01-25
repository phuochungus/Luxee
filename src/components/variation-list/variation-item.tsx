import React from "react";
import { Variation } from "@/pages";
import { VariationListItemEdit } from "@/components";

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
                    closeEditor={() => setOpenEditor(false)}
                />
            ) : (
                <div
                    className="d-flex justify-content-between align-items-space"
                    onClick={() => setOpenEditor(true)}
                >
                    <div>
                        <h6 className="mb-0">{props.variation.name}</h6>
                        <ol className="breadcrumb mb-0">
                            {props.variation.values.map((value) => (
                                <li className="breadcrumb-item" key={value}>
                                    <span>{value}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => setOpenEditor(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            onClick={props.deleteVariation}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
