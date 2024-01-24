import { Variation } from "@/pages";
import { Breadcrumbs, Button } from "@mui/material";

interface VariationDisplayRowProps {
    variation: Variation;
    openEditor: () => void;
}

export function VariationListItemDisplay(props: VariationDisplayRowProps) {
    return (
        <div className="d-flex justify-content-between align-items-space">
            <div>
                <h6>{props.variation.name}</h6>
                <ol className="breadcrumb mb-0">
                    {props.variation.values.map((value, index) => (
                        <li className="breadcrumb-item" key={value}>
                            {value}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="d-flex align-items-center">
                <div>
                    <button
                        className="btn btn-outline-primary"
                        onClick={props.openEditor}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
